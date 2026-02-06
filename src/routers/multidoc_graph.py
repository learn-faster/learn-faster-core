"""
Multi-Document Graph API Router.

Provides endpoints for:
- Document-specific graph queries
- Cross-document concept discovery
- Graph statistics and visualization
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional, Dict, Any

from src.database.graph_storage import multi_doc_graph_storage
from src.navigation.navigation_engine import multi_doc_navigation
from src.ingestion.ingestion_engine import IngestionEngine

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/graphs", tags=["multi-document graphs"])


@router.get("/document/{document_id}")
async def get_document_graph(document_id: int):
    """
    Get the complete knowledge graph for a specific document.
    
    Returns all concepts and relationships scoped to this document.
    """
    try:
        graph = multi_doc_graph_storage.get_document_graph(document_id)
        
        if not graph:
            raise HTTPException(
                status_code=404,
                detail=f"No graph found for document {document_id}"
            )
        
        return graph
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting document graph: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve document graph")


@router.get("/document/{document_id}/roots")
async def get_document_roots(document_id: int):
    """
    Get root concepts for a document.
    
    Root concepts have no prerequisites within the document.
    """
    try:
        roots = multi_doc_navigation.get_document_root_concepts(document_id)
        return {"document_id": document_id, "root_concepts": roots}
        
    except Exception as e:
        logger.error(f"Error getting document roots: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve root concepts")


@router.get("/document/{document_id}/path")
async def get_document_path_preview(
    document_id: int,
    root_concept: str,
    depth: int = Query(default=3, ge=1, le=10)
):
    """
    Get a learning path preview within a document.
    """
    try:
        path = multi_doc_navigation.get_document_path_preview(
            document_id=document_id,
            root_concept=root_concept,
            depth=depth
        )
        return {
            "document_id": document_id,
            "root_concept": root_concept,
            "depth": depth,
            "path": path
        }
        
    except Exception as e:
        logger.error(f"Error getting path preview: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate path preview")


@router.get("/document/{document_id}/neighborhood")
async def get_document_neighborhood(
    document_id: int,
    concept_name: str
):
    """
    Get local neighborhood for a concept within a document.
    """
    try:
        neighborhood = multi_doc_navigation.get_document_neighborhood(
            document_id=document_id,
            concept_name=concept_name
        )
        return {
            "document_id": document_id,
            "concept": concept_name,
            **neighborhood
        }
        
    except Exception as e:
        logger.error(f"Error getting neighborhood: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve neighborhood")


@router.get("/document/{document_id}/cross-doc")
async def get_cross_document_connections(document_id: int):
    """
    Get concepts in this document that connect to other documents.
    """
    try:
        connections = multi_doc_navigation.get_cross_document_connections(document_id)
        return {
            "document_id": document_id,
            "connections": connections,
            "total_connections": len(connections)
        }
        
    except Exception as e:
        logger.error(f"Error getting cross-document connections: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve connections")


@router.get("/search/{concept_name}")
async def search_concept_across_documents(concept_name: str):
    """
    Find a concept across all documents.
    """
    try:
        occurrences = multi_doc_navigation.find_concept_across_documents(concept_name)
        return {
            "concept": concept_name,
            "occurrences": occurrences,
            "document_count": len(occurrences)
        }
        
    except Exception as e:
        logger.error(f"Error searching concept: {e}")
        raise HTTPException(status_code=500, detail="Failed to search concept")


@router.get("/global/search")
async def search_global_concepts(
    query: str,
    limit: int = Query(default=10, ge=1, le=50)
):
    """
    Search global concepts that appear across multiple documents.
    """
    try:
        results = multi_doc_graph_storage.search_global_concepts(query, limit)
        return {
            "query": query,
            "results": results,
            "total_found": len(results)
        }
        
    except Exception as e:
        logger.error(f"Error searching global concepts: {e}")
        raise HTTPException(status_code=500, detail="Failed to search global concepts")


@router.post("/document/{document_id}/merge")
async def merge_cross_document_concepts(
    document_id: int,
    concept_name: str,
    similarity_threshold: float = Query(default=0.85, ge=0.0, le=1.0)
):
    """
    Merge the same concept across documents.
    
    This creates cross-document connections for semantic discovery.
    """
    try:
        from src.ingestion.ingestion_engine import IngestionEngine
        
        engine = IngestionEngine()
        result = engine.merge_cross_document_concepts(
            document_id=document_id,
            concept_name=concept_name,
            similarity_threshold=similarity_threshold
        )
        return result
        
    except Exception as e:
        logger.error(f"Error merging concepts: {e}")
        raise HTTPException(status_code=500, detail="Failed to merge concepts")


@router.post("/document/{document_id}/process")
async def process_document_scoped(
    document_id: int,
    file_path: str
):
    """
    Process a document using document-scoped graph storage.
    """
    try:
        engine = IngestionEngine()
        result = await engine.process_document_scoped(file_path, document_id)
        return result
        
    except Exception as e:
        logger.error(f"Error processing scoped document: {e}")
        raise HTTPException(status_code=500, detail="Failed to process document")


@router.get("/statistics")
async def get_graph_statistics():
    """
    Get overall statistics for the multi-document graph.
    """
    try:
        stats = multi_doc_graph_storage.get_graph_statistics()
        return stats
        
    except Exception as e:
        logger.error(f"Error getting graph statistics: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve statistics")
