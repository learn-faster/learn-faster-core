"""
Tests for multi-document graph handling functionality.
"""
import pytest
from unittest.mock import Mock, patch, MagicMock
from src.models.schemas import (
    DocumentScopedConcept,
    CrossDocumentConcept,
    DocumentGraph,
    GlobalConceptIndex,
    GraphSchema,
    ConceptNode,
    PrerequisiteLink
)


class TestDocumentScopedConcept:
    """Tests for DocumentScopedConcept model."""
    
    def test_scoped_concept_creation(self):
        """Test creating a scoped concept with all required fields."""
        concept = DocumentScopedConcept(
            scoped_id="doc123_neural_networks",
            document_id=123,
            global_name="Neural Networks",
            normalized_name="neural_networks",
            definition="A computing system inspired by biological neural networks",
            chunk_ids=[1, 2, 3]
        )
        
        assert concept.scoped_id == "doc123_neural_networks"
        assert concept.document_id == 123
        assert concept.global_name == "Neural Networks"
        assert concept.normalized_name == "neural_networks"
        assert concept.chunk_ids == [1, 2, 3]
    
    def test_scoped_concept_merge_status(self):
        """Test merge status tracking."""
        concept = DocumentScopedConcept(
            scoped_id="doc456_machine_learning",
            document_id=456,
            global_name="Machine Learning",
            normalized_name="machine_learning",
            definition="Study of algorithms that improve through experience",
            chunk_ids=[5],
            is_merged=True,
            merged_with={"doc789": "doc789_ml_concept"}
        )
        
        assert concept.is_merged is True
        assert concept.merged_with["doc789"] == "doc789_ml_concept"
    
    def test_scoped_concept_default_values(self):
        """Test default values for optional fields."""
        concept = DocumentScopedConcept(
            scoped_id="doc100_test",
            document_id=100,
            global_name="Test Concept",
            normalized_name="test_concept"
        )
        
        assert concept.description is None
        assert concept.depth_level is None
        assert concept.chunk_ids == []
        assert concept.is_merged is False
        assert concept.merged_with is None


class TestCrossDocumentConcept:
    """Tests for CrossDocumentConcept model."""
    
    def test_cross_document_concept_creation(self):
        """Test creating a cross-document concept."""
        cross_concept = CrossDocumentConcept(
            global_id="global_ml",
            global_name="Machine Learning",
            document_scoped_ids=["doc1_ml", "doc2_ml", "doc3_ml"],
            similarity_score=0.92
        )
        
        assert cross_concept.global_id == "global_ml"
        assert cross_concept.global_name == "Machine Learning"
        assert len(cross_concept.document_scoped_ids) == 3
        assert cross_concept.similarity_score == 0.92
        assert cross_concept.merged is False
    
    def test_cross_document_merge_tracking(self):
        """Test tracking merged status."""
        cross_concept = CrossDocumentConcept(
            global_id="global_dl",
            global_name="Deep Learning",
            document_scoped_ids=["doc1_dl", "doc2_dl"],
            similarity_score=0.88,
            merged=True
        )
        
        assert cross_concept.merged is True


class TestDocumentGraph:
    """Tests for DocumentGraph model."""
    
    def test_document_graph_structure(self):
        """Test creating a complete document graph."""
        concepts = [
            DocumentScopedConcept(
                scoped_id="doc1_concept_a",
                document_id=1,
                global_name="Concept A",
                normalized_name="concept_a",
                definition="Definition A"
            ),
            DocumentScopedConcept(
                scoped_id="doc1_concept_b",
                document_id=1,
                global_name="Concept B",
                normalized_name="concept_b",
                definition="Definition B"
            ),
        ]
        relationships = [
            PrerequisiteLink(
                source_concept="doc1_concept_b",
                target_concept="doc1_concept_a",
                source_doc_id=1,
                target_doc_id=1,
                weight=0.8,
                reasoning="Concept B requires understanding of Concept A"
            )
        ]
        
        graph = DocumentGraph(
            document_id=1,
            document_name="Test Document",
            concepts=concepts,
            relationships=relationships,
            node_count=2,
            relationship_count=1
        )
        
        assert graph.document_id == 1
        assert graph.document_name == "Test Document"
        assert len(graph.concepts) == 2
        assert len(graph.relationships) == 1
        assert graph.node_count == 2
        assert graph.relationship_count == 1
    
    def test_document_graph_with_global_connections(self):
        """Test document graph with cross-document connections."""
        cross_concept = CrossDocumentConcept(
            global_id="global_ai",
            global_name="AI",
            document_scoped_ids=["doc1_ai", "doc2_ai"],
            similarity_score=0.95
        )
        
        graph = DocumentGraph(
            document_id=1,
            document_name="AI Document",
            concepts=[],
            relationships=[],
            global_connections=[cross_concept],
            node_count=0,
            relationship_count=0
        )
        
        assert len(graph.global_connections) == 1
        assert graph.global_connections[0].global_id == "global_ai"


class TestGlobalConceptIndex:
    """Tests for GlobalConceptIndex model."""
    
    def test_global_index_structure(self):
        """Test creating global concept index."""
        index = GlobalConceptIndex(
            global_id="global_ai",
            global_name="Artificial Intelligence",
            document_ids=[1, 2],
            occurrence_count=5,
            avg_depth=2.5
        )
        
        assert index.global_id == "global_ai"
        assert len(index.document_ids) == 2
        assert index.occurrence_count == 5
        assert index.avg_depth == 2.5


class TestGraphSchemaWithDocumentId:
    """Tests for GraphSchema with document_id field."""
    
    def test_graph_schema_with_document_id(self):
        """Test GraphSchema with document_id."""
        schema = GraphSchema(
            concepts=["concept1", "concept2"],
            prerequisites=[
                PrerequisiteLink(
                    source_concept="concept2",
                    target_concept="concept1",
                    weight=0.9,
                    reasoning="prerequisite"
                )
            ],
            concept_mappings={"concept1": [1, 2], "concept2": [3]},
            document_id=123
        )
        
        assert schema.document_id == 123
        assert len(schema.concepts) == 2
        assert len(schema.prerequisites) == 1


class TestConceptNode:
    """Tests for ConceptNode model."""
    
    def test_concept_node_creation(self):
        """Test creating a concept node."""
        node = ConceptNode(
            name="test_concept",
            description="A test concept for unit testing"
        )
        
        assert node.name == "test_concept"
        assert node.description == "A test concept for unit testing"
    
    def test_concept_node_with_depth(self):
        """Test concept node with depth level."""
        node = ConceptNode(
            name="complex_concept",
            description="A complex concept",
            depth_level=3
        )
        
        assert node.depth_level == 3
    
    def test_concept_node_minimal(self):
        """Test concept node with only required fields."""
        node = ConceptNode(name="minimal")
        
        assert node.name == "minimal"
        assert node.description is None
        assert node.depth_level is None


class TestPrerequisiteLink:
    """Tests for PrerequisiteLink model."""
    
    def test_prerequisite_link_creation(self):
        """Test creating a prerequisite link."""
        link = PrerequisiteLink(
            source_concept="basics",
            target_concept="advanced",
            weight=0.85,
            reasoning="Foundational knowledge required"
        )
        
        assert link.source_concept == "basics"
        assert link.target_concept == "advanced"
        assert link.weight == 0.85
        assert link.reasoning == "Foundational knowledge required"
    
    def test_prerequisite_link_with_doc_ids(self):
        """Test link with document IDs."""
        link = PrerequisiteLink(
            source_concept="doc1_basics",
            target_concept="doc2_advanced",
            source_doc_id=1,
            target_doc_id=2,
            weight=0.7,
            reasoning="Cross-document prerequisite"
        )
        
        assert link.source_doc_id == 1
        assert link.target_doc_id == 2
    
    def test_different_relationship_types(self):
        """Test different relationship types via reasoning."""
        link = PrerequisiteLink(
            source_concept="concept_a",
            target_concept="concept_b",
            weight=0.5,
            reasoning="Related concept - useful for comparison"
        )
        
        assert link.weight == 0.5


class TestSchemaValidation:
    """Tests for schema validation."""
    
    def test_scoped_concept_requires_scoped_id(self):
        """Test that scoped concept requires scoped_id."""
        with pytest.raises(Exception):
            DocumentScopedConcept(
                document_id=123,
                global_name="Test",
                normalized_name="test"
            )
    
    def test_cross_document_requires_all_fields(self):
        """Test cross document concept requires all fields."""
        with pytest.raises(Exception):
            CrossDocumentConcept(
                global_id="test",
                global_name="Test"
            )


class TestConceptNodeAttributeAccess:
    """Tests for accessing ConceptNode attributes."""
    
    def test_name_attribute_access(self):
        """Test accessing name attribute."""
        node = ConceptNode(name="test_node")
        assert node.name == "test_node"
    
    def test_description_attribute_access(self):
        """Test accessing description attribute."""
        node = ConceptNode(name="test", description="A test description")
        assert node.description == "A test description"
    
    def test_depth_level_attribute_access(self):
        """Test accessing depth_level attribute."""
        node = ConceptNode(name="test", depth_level=5)
        assert node.depth_level == 5
