"""LLM-based graph extraction engine using Ollama for structured concept extraction."""

import json
import logging
import os
from typing import List, Optional, Tuple, Any
from pydantic import ValidationError

from dotenv import load_dotenv

from src.models.schemas import GraphSchema, PrerequisiteLink
from src.database.connections import neo4j_conn
from src.database.graph_storage import graph_storage
from src.database.graph_storage import graph_storage
from .vector_storage import VectorStorage
from .document_processor import DocumentProcessor

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


class IngestionEngine:
    """
    Handles LLM-based extraction of knowledge graph structures from markdown content.
    
    Uses Ollama with gpt-oss:20b-cloud model for structured extraction with Pydantic
    schema enforcement. Extracts concepts and prerequisite relationships with reasoning.
    """
    
    DEFAULT_MODEL = "gpt-oss:20b-cloud"
    EXTRACTION_PROMPT_TEMPLATE = """You are an expert educational content analyzer. Your task is to extract key learning concepts and their prerequisite relationships from the provided educational content.

Analyze the following markdown content and extract:
1. A list of key concepts (topics, skills, or ideas that a learner needs to understand)
2. Prerequisite relationships between concepts (which concepts must be learned before others)

For each prerequisite relationship, provide:
- source_concept: The fundamental concept that must be learned first
- target_concept: The advanced concept that requires the source
- weight: A value between 0.0 and 1.0 indicating dependency strength (1.0 = absolutely required, 0.5 = helpful but not critical)
- reasoning: A brief explanation of why the source concept is needed for the target

Return your response as a JSON object with this exact structure:
{{
    "concepts": ["concept1", "concept2", "concept3"],
    "prerequisites": [
        {{
            "source_concept": "concept1",
            "target_concept": "concept2",
            "weight": 0.8,
            "reasoning": "Understanding concept1 is essential for grasping concept2"
        }}
    ]
}}

IMPORTANT: 
- Concept names should be clear, concise, and descriptive
- Only include meaningful prerequisite relationships
- Ensure all concepts mentioned in prerequisites are also in the concepts list
- Return ONLY valid JSON, no additional text

Content to analyze:

{content}
"""
    
    
    def __init__(self):
        """
        Initialize the ingestion engine.
        Using global settings for configuration.
        """
        self.vector_storage = VectorStorage()
        self.document_processor = DocumentProcessor()
    
    def _normalize_concept_name(self, name: Any) -> str:
        """
        Normalize concept names to lowercase for consistent storage.
        Handles non-string inputs (like lists or None) gracefully.
        """
        if name is None:
            return ""
            
        if isinstance(name, list):
            # If it's a list, recursively join or take first
            if not name:
                return ""
            # Take the first element if it exists and normalize it
            return self._normalize_concept_name(name[0])
            
        # Convert to string and strip/lower
        return str(name).strip().lower()
    
    MAX_EXTRACTION_CHARS = 50000  # Conservative limit for extraction windows
    
    def _create_extraction_windows(self, markdown: str) -> List[str]:
        """
        Split markdown into overlapping windows safely respecting paragraph boundaries.
        
        Args:
            markdown: Full markdown text
            
        Returns:
            List of text windows safe for LLM context
        """
        if len(markdown) <= self.MAX_EXTRACTION_CHARS:
            return [markdown]
            
        windows = []
        paragraphs = markdown.split('\n\n')
        current_window = []
        current_size = 0
        
        for para in paragraphs:
            para_len = len(para)
            if current_size + para_len > self.MAX_EXTRACTION_CHARS and current_window:
                # Window full, save it
                windows.append('\n\n'.join(current_window))
                # Start new window with some overlap (keep last paragraph)
                overlap_para = current_window[-1]
                current_window = [overlap_para, para]
                current_size = len(overlap_para) + para_len
            else:
                current_window.append(para)
                current_size += para_len
                
        if current_window:
            windows.append('\n\n'.join(current_window))
            
        return windows

    def _merge_schemas(self, schemas: List[GraphSchema]) -> GraphSchema:
        """
        Merge multiple partial GraphSchemas into a unified schema.
        
        Args:
            schemas: List of partial extraction results
            
        Returns:
            Unified GraphSchema
        """
        if not schemas:
            return GraphSchema(concepts=[], prerequisites=[])
            
        all_concepts = set()
        prereqs_map = {}  # Key: (source, target), Value: PrerequisiteLink
        
        for schema in schemas:
            # Add concepts
            for concept in schema.concepts:
                all_concepts.add(concept)
                
            # Add prerequisites, merging duplicates by keeping max weight
            for prereq in schema.prerequisites:
                key = (prereq.source_concept, prereq.target_concept)
                if key in prereqs_map:
                    # If duplicate, keep the one with higher confidence/weight
                    if prereq.weight > prereqs_map[key].weight:
                        prereqs_map[key] = prereq
                else:
                    prereqs_map[key] = prereq
                    
        return GraphSchema(
            concepts=sorted(list(all_concepts)),
            prerequisites=list(prereqs_map.values())
        )

    async def extract_graph_structure(self, markdown: str) -> GraphSchema:
        """
        Extract knowledge graph structure from markdown content using LLM.
        Supports large documents by chunking content and merging results.
        
        Args:
            markdown: Markdown content to analyze
            
        Returns:
            GraphSchema with extracted concepts and prerequisite relationships
            
        Raises:
            ValueError: If LLM returns invalid JSON or extraction fails
            ValidationError: If extracted data doesn't conform to GraphSchema
        """
        if not markdown or not markdown.strip():
            raise ValueError("Cannot extract graph structure from empty content")
            
        # Split content into context-safe windows
        windows = self._create_extraction_windows(markdown)
        logger.info(f"Split document into {len(windows)} windows for extraction")
        
        schemas = []
        
        for i, window_content in enumerate(windows):
            logger.info(f"Processing extraction window {i+1}/{len(windows)} ({len(window_content)} chars)")
            
            # Prepare the prompt
            prompt = self.EXTRACTION_PROMPT_TEMPLATE.format(content=window_content)
            
            try:
                # Import here to avoid circular dependency
                from src.services.llm_service import llm_service
                from src.routers.ai import LLMConfig
                from src.config import settings

                # Create config override for extraction
                config = LLMConfig(
                    provider=settings.llm_provider,
                    model=settings.extraction_model if settings.extraction_model else settings.llm_model,
                    base_url=settings.ollama_base_url
                )

                # Get completion from LLM Service
                response_text = await llm_service.get_chat_completion(
                    messages=[{"role": "user", "content": prompt}],
                    response_format="json",
                    config=config
                )
                
                # Parse JSON response
                try:
                    data = json.loads(response_text)
                except json.JSONDecodeError as e:
                    logger.error(f"Failed to parse LLM response as JSON in window {i+1}: {response_text}")
                    # Continue to next window instead of failing everything
                    continue 
                
                # Ensure data is a dictionary
                if not isinstance(data, dict):
                    logger.error(f"LLM response is not a JSON object in window {i+1}")
                    continue
                
                # Normalize concept names to lowercase
                if 'concepts' in data:
                    data['concepts'] = [self._normalize_concept_name(c) for c in data['concepts']]
                
                if 'prerequisites' in data:
                    for prereq in data['prerequisites']:
                        if 'source_concept' in prereq:
                            prereq['source_concept'] = self._normalize_concept_name(prereq['source_concept'])
                        if 'target_concept' in prereq:
                            prereq['target_concept'] = self._normalize_concept_name(prereq['target_concept'])
                
                # Validate with Pydantic schema
                try:
                    # Auto-fix: Ensure all concepts in prerequisites are in concepts list
                    # This handles the "structural hallucination" we saw earlier
                    if 'concepts' in data and 'prerequisites' in data:
                        concept_set = set(data['concepts'])
                        for p in data['prerequisites']:
                            if 'source_concept' in p and p['source_concept'] not in concept_set:
                                data['concepts'].append(p['source_concept'])
                                concept_set.add(p['source_concept'])
                            if 'target_concept' in p and p['target_concept'] not in concept_set:
                                data['concepts'].append(p['target_concept'])
                                concept_set.add(p['target_concept'])

                    schema = GraphSchema(**data)
                    schemas.append(schema)
                except ValidationError as e:
                    logger.error(f"Schema validation failed in window {i+1}: {e}")
                    continue
                    
            except Exception as e:
                logger.error(f"Graph extraction failed for window {i+1}: {str(e)}")
                # Continue processing other windows
                continue
        
        if not schemas:
            raise ValueError("Failed to extract valid graph structure from any window")
            
        # Merge all partial schemas
        final_schema = self._merge_schemas(schemas)
        logger.info(f"Merged {len(schemas)} partial schemas into final graph: {len(final_schema.concepts)} concepts")
        
        return final_schema
    
    def validate_graph_structure(self, schema: GraphSchema) -> bool:
        """
        Validate that a GraphSchema is internally consistent.
        
        Checks that all concepts referenced in prerequisites exist in the concepts list.
        
        Args:
            schema: GraphSchema to validate
            
        Returns:
            True if valid, False otherwise
        """
        concept_set = set(schema.concepts)
        
        for prereq in schema.prerequisites:
            if prereq.source_concept not in concept_set:
                logger.warning(f"Prerequisite references unknown source concept: {prereq.source_concept}")
                return False
            if prereq.target_concept not in concept_set:
                logger.warning(f"Prerequisite references unknown target concept: {prereq.target_concept}")
                return False
        
        return True
    
    def store_graph_data(self, schema: GraphSchema, document_id: Optional[int] = None) -> None:
        """
        Store extracted graph structure in Neo4j knowledge graph.
        
        Uses the dedicated GraphStorage module with MERGE operations to handle 
        duplicate concepts gracefully and stores prerequisite relationships 
        with weight, reasoning, and document provenance.
        
        Args:
            schema: GraphSchema with concepts and prerequisite relationships
            document_id: Optional ID of the document context
            
        Raises:
            ValueError: If schema is invalid or storage fails
        """
        if not self.validate_graph_structure(schema):
            raise ValueError("Invalid graph structure - prerequisite references unknown concepts")
        
        try:
            # Use the dedicated graph storage module
            result = graph_storage.store_graph_schema(schema, document_id)
            
            logger.info(f"Stored {result['concepts_stored']} concepts and {result['relationships_stored']} prerequisites")
            
        except Exception as e:
            logger.error(f"Failed to store graph data: {str(e)}")
            raise ValueError(f"Graph data storage failed: {str(e)}") from e
    
    async def store_vector_data(self, doc_source: str, content_chunks: List[str], concept_tags: List[str], document_id: Optional[int] = None) -> List[int]:
        """
        Store content chunks and their vectors in PostgreSQL.
        
        Args:
            doc_source: Source filename or URL
            content_chunks: List of text content chunks
            concept_tags: List of concept tags corresponding to chunks
            document_id: Optional ID of the parent document
            
        Returns:
            List of stored chunk IDs
        """
        try:
            # Prepare batch data
            # Each item is (doc_source, content, concept_tag, document_id)
            batch_data = []
            for i, content in enumerate(content_chunks):
                # Skip empty chunks
                if not content.strip():
                    continue

                tag = concept_tags[i] if i < len(concept_tags) else "general"
                # If tag is a Concept object (from schema), extract its name
                if hasattr(tag, 'name'):
                    tag = tag.name
                
                # Ensure tag is not empty after potential conversion
                if not tag or not str(tag).strip():
                    tag = "general"

                batch_data.append((doc_source, content, tag, document_id))
            
            if not batch_data:
                logger.warning("No valid chunks to store after filtering empty content")
                return []

            # Store using vector storage system
            chunk_ids = await self.vector_storage.store_chunks_batch(batch_data)
            logger.info(f"Stored {len(chunk_ids)} content chunks from '{doc_source}'")
            return chunk_ids
            
        except Exception as e:
            logger.error(f"Failed to store vector data: {str(e)}")
            raise ValueError(f"Vector data storage failed: {str(e)}") from e
    
    async def process_document_complete(self, doc_source: str, markdown: str, content_chunks: List, document_id: Optional[int] = None) -> Tuple[GraphSchema, List[int]]:
        """
        Complete document processing: extract graph structure and store both graph and vector data.
        
        Args:
            doc_source: Source filename or URL
            markdown: Full markdown content for graph extraction
            content_chunks: List of content chunks (either strings or tuples from document processor)
            document_id: Optional ID of the parent document
            
        Returns:
            Tuple of (GraphSchema, list of chunk IDs)
            
        Raises:
            ValueError: If processing fails at any stage
        """
        try:
            # Extract graph structure from full markdown
            schema = await self.extract_graph_structure(markdown)
            
            # Store graph data in Neo4j with provenance
            self.store_graph_data(schema, document_id)
            
            # Handle different chunk formats from document processor
            if content_chunks and isinstance(content_chunks[0], tuple):
                # Document processor returns (content, concept_tag) tuples
                chunk_contents = [chunk[0] for chunk in content_chunks if chunk[0].strip()]
                # Use extracted concepts for tagging since document processor concept tags might be empty
                if schema.concepts:
                    concept_tags = []
                    concepts_cycle = schema.concepts * ((len(chunk_contents) // len(schema.concepts)) + 1)
                    concept_tags = concepts_cycle[:len(chunk_contents)]
                else:
                    concept_tags = ["general"] * len(chunk_contents)
            else:
                # Simple list of content strings
                chunk_contents = [chunk for chunk in content_chunks if chunk.strip()]
                # Assign concept tags to chunks (simple strategy: distribute evenly)
                if chunk_contents and schema.concepts:
                    concept_tags = []
                    concepts_cycle = schema.concepts * ((len(chunk_contents) // len(schema.concepts)) + 1)
                    concept_tags = concepts_cycle[:len(chunk_contents)]
                else:
                    concept_tags = ["general"] * len(chunk_contents)
            
            # Store vector data in PostgreSQL
            chunk_ids = await self.store_vector_data(doc_source, chunk_contents, concept_tags, document_id)
            
            logger.info(f"Complete document processing finished for '{doc_source}'")
            return schema, chunk_ids
            
        except Exception as e:
            logger.error(f"Complete document processing failed: {str(e)}")
            raise ValueError(f"Document processing failed: {str(e)}") from e

    async def process_document(self, file_path: str, document_id: Optional[int] = None) -> Tuple[GraphSchema, List[int]]:
        """
        Process a document file (PDF, DOCX, etc.) from start to finish.
        
        1. Convert file to markdown
        2. Chunk content
        3. Extract knowledge graph
        4. Store graph and vector data
        
        Args:
            file_path: Path to document file
            document_id: Optional ID of the document (if pre-saved)
            
        Returns:
            Tuple of (GraphSchema, list of chunk IDs)
        """
        try:
            # 1. Convert to markdown
            markdown = self.document_processor.convert_to_markdown(file_path)
            
            # 2. Chunk content
            # Note: We don't have concepts yet for tagging, so we pass empty tag
            # The store logic will handle tagging based on extracted concepts
            chunks = self.document_processor.chunk_content(markdown)
            
            # 3 & 4. Complete processing
            return await self.process_document_complete(
                doc_source=os.path.basename(file_path),
                markdown=markdown,
                content_chunks=chunks,
                document_id=document_id
            )
            
        except Exception as e:
            logger.error(f"Document processing failed for {file_path}: {str(e)}")
            raise
