
import pytest
from unittest.mock import MagicMock, patch, AsyncMock
from src.ingestion.vector_storage import VectorStorage

class TestNullByteSanitization:
    @pytest.fixture
    def mock_vector_storage(self):
        # Create a mock database connection
        mock_db_conn = MagicMock()
        mock_db_conn.execute_query.return_value = [{'id': 1}]
        mock_db_conn.connect = None

        # Patch embedding generation to avoid network calls
        with patch('src.services.llm_service.llm_service.get_embedding', new=AsyncMock(return_value=[0.1] * 768)):
            # Inject mock dependencies
            storage = VectorStorage(db_connection=mock_db_conn)
            yield storage, mock_db_conn

    @pytest.mark.asyncio
    async def test_store_chunk_sanitizes_input(self, mock_vector_storage):
        storage, mock_db_conn = mock_vector_storage
        
        # Input with null bytes
        doc_source = "test_doc.pdf\x00"
        content = "This contains a null byte \x00 in the middle."
        concept_tag = "general\x00"
        
        try:
            await storage.store_chunk(doc_source, content, concept_tag)
        except Exception as e:
            pytest.fail(f"store_chunk raised exception: {e}")
        
        # Verify call args
        assert mock_db_conn.execute_query.called, "execute_query was not called"
        
        args = mock_db_conn.execute_query.call_args[0]
        params = args[1]
        
        assert '\x00' not in params[0]  # doc_source
        assert '\x00' not in params[1]  # content
        assert '\x00' not in params[3]  # concept_tag
        assert params[0] == "test_doc.pdf"
        assert params[1] == "This contains a null byte  in the middle."
        assert params[3] == "general"

    @pytest.mark.asyncio
    async def test_store_chunks_batch_sanitizes_input(self, mock_vector_storage):
        storage, mock_db_conn = mock_vector_storage
        
        chunks = [
            ("doc1\x00", "content1\x00", "tag1\x00"),
            ("doc2", "content2", "tag2")
        ]
        
        await storage.store_chunks_batch(chunks)
        
        # Verify batch calls. Since store_chunks_batch does individual inserts (based on code), 
        # we check the call history.
        assert mock_db_conn.execute_query.call_count == 2
        
        # First call
        call1_args = mock_db_conn.execute_query.call_args_list[0][0][1]
        assert '\x00' not in call1_args[0]
        assert '\x00' not in call1_args[1]
        assert '\x00' not in call1_args[3]
        
