
import pytest
import os
from unittest.mock import MagicMock, patch
from src.storage.document_store import DocumentStore
from src.models.schemas import DocumentMetadata, ConceptNode, PrerequisiteLink, GraphSchema
from datetime import datetime

class TestDeletionSync:
    
    @patch('src.storage.document_store.postgres_conn')
    @patch('src.database.graph_storage.neo4j_conn.execute_query')
    @patch('src.ingestion.vector_storage.postgres_conn.execute_query')
    def test_synchronized_deletion(self, mock_vector_exec, mock_neo4j_exec, mock_doc_db):
        """Test that deleting a document triggers cleanup in graph and vector stores."""
        
        # Setup mocks
        store = DocumentStore()
        doc_id = 123
        mock_doc_db.execute_query.return_value = [{
            'id': doc_id,
            'filename': 'test.pdf',
            'upload_date': datetime.now(),
            'status': 'processed',
            'file_path': '/tmp/test_sync.pdf'
        }]
        
        # Ensure file exists for deletion
        with open('/tmp/test_sync.pdf', 'w') as f:
            f.write('test')
            
        try:
            # Execute deletion
            store.delete_document(doc_id)
            
            # Verify Neo4j cleanup was called
            neo4j_calls = [call[0][0] for call in mock_neo4j_exec.call_args_list]
            assert any("$doc_id IN r.source_docs" in q for q in neo4j_calls)
            assert any("$doc_id IN c.source_docs" in q for q in neo4j_calls)
            
            # Verify Vector cleanup was called
            vector_calls = [call[0][0] for call in mock_vector_exec.call_args_list]
            assert any("DELETE FROM learning_chunks WHERE document_id = %s" in q for q in vector_calls)
            
            # Verify DB record deletion
            doc_db_calls = [call[0][0] for call in mock_doc_db.execute_query.call_args_list]
            assert any("DELETE FROM documents WHERE id = %s" in q for q in doc_db_calls)
            
            # Verify file removal
            assert not os.path.exists('/tmp/test_sync.pdf')
            
        finally:
            if os.path.exists('/tmp/test_sync.pdf'):
                os.remove('/tmp/test_sync.pdf')

if __name__ == "__main__":
    # This is a manual check helper if needed
    pass
