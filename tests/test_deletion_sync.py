import os
from unittest.mock import patch
from datetime import datetime

from src.storage.document_store import DocumentStore


class TestDeletionSync:
    @patch("src.storage.document_store.postgres_conn")
    @patch("src.ingestion.vector_storage.VectorStorage.delete_document_chunks")
    @patch("src.database.graph_storage.graph_storage.remove_document_provenance")
    def test_synchronized_deletion(
        self, mock_graph_cleanup, mock_vector_cleanup, mock_doc_db, tmp_path
    ):
        """Test that deleting a document triggers cleanup in graph and vector stores."""
        store = DocumentStore()
        doc_id = 123
        file_path = tmp_path / "test_sync.pdf"

        mock_doc_db.execute_query.return_value = [
            {
                "id": doc_id,
                "filename": "test.pdf",
                "upload_date": datetime.now(),
                "status": "processed",
                "file_path": str(file_path),
            }
        ]

        call_state = {"forced": False}

        def execute_write_side_effect(query, params=None):
            if "DELETE FROM documents" in query and not call_state["forced"]:
                call_state["forced"] = True
                raise Exception("force fallback cleanup")
            return None

        mock_doc_db.execute_write.side_effect = execute_write_side_effect

        file_path.write_text("test")

        store.delete_document(doc_id)

        mock_graph_cleanup.assert_called_once_with(doc_id)
        mock_vector_cleanup.assert_called_once_with(doc_id)

        doc_db_calls = [call[0][0] for call in mock_doc_db.execute_write.call_args_list]
        assert any("DELETE FROM documents WHERE id = %s" in q for q in doc_db_calls)

        assert not os.path.exists(str(file_path))


if __name__ == "__main__":
    pass