import pytest
from unittest.mock import MagicMock, AsyncMock
from src.ingestion.ingestion_engine import IngestionEngine
from src.models.schemas import GraphSchema


class TestIngestionFlow:
    @pytest.fixture
    def mock_ingestion_engine(self):
        engine = IngestionEngine()
        engine.document_processor = MagicMock()
        engine.process_document_complete = AsyncMock()
        return engine

    @pytest.mark.asyncio
    async def test_process_document_calls_components_correctly(self, mock_ingestion_engine):
        file_path = "/path/to/test.pdf"
        mock_markdown = "# Test Document\n\nContent"
        mock_chunks = [("Content", "concept")]
        mock_schema = GraphSchema(concepts=[], relationships=[], prerequisites=[])
        mock_chunk_ids = [1]

        mock_ingestion_engine.document_processor.convert_to_markdown.return_value = (
            mock_markdown,
            None,
        )
        mock_ingestion_engine.document_processor.chunk_content.return_value = mock_chunks
        mock_ingestion_engine.process_document_complete.return_value = (mock_schema, mock_chunk_ids)

        result = await mock_ingestion_engine.process_document(file_path)

        mock_ingestion_engine.document_processor.convert_to_markdown.assert_called_once_with(file_path)
        mock_ingestion_engine.document_processor.chunk_content.assert_called_once_with(mock_markdown)
        mock_ingestion_engine.process_document_complete.assert_called_once()

        call_args = mock_ingestion_engine.process_document_complete.call_args
        assert call_args.kwargs["doc_source"] == "test.pdf"
        assert call_args.kwargs["markdown"] == mock_markdown
        assert call_args.kwargs["content_chunks"] == mock_chunks

        assert result == (mock_schema, mock_chunk_ids)