
import pytest
from unittest.mock import MagicMock, patch
from src.ingestion.ingestion_engine import IngestionEngine
from src.storage.document_store import DocumentStore

def test_normalize_concept_name_defensive():
    """Test that _normalize_concept_name handles various inputs gracefully."""
    # We don't need a full engine for this unit test if we just test the method
    # but since it's an instance method, we'll mock the dependencies
    engine = IngestionEngine(ollama_host="http://localhost:11434")
    
    assert engine._normalize_concept_name("Simple Concept") == "simple concept"
    assert engine._normalize_concept_name("  Trim Me  ") == "trim me"
    assert engine._normalize_concept_name(["List Item"]) == "list item"
    assert engine._normalize_concept_name([["Nested"]]) == "nested"
    assert engine._normalize_concept_name(123) == "123"
    assert engine._normalize_concept_name(None) == ""
    assert engine._normalize_concept_name([]) == ""

def test_save_transcript_duplicate_handling():
    """Test that save_transcript reuses existing records."""
    mock_db = MagicMock()
    store = DocumentStore()
    store.db = mock_db
    
    video_id = "test_vid_123"
    filename = f"youtube_{video_id}.md"
    
    # Setup mock for first call (not exists)
    mock_db.execute_query.side_effect = [
        [], # check_query results: empty
        [{'id': 1, 'upload_date': '2023-01-01'}], # insert_query results
    ]
    mock_db.execute_write = MagicMock()
    
    # We also need to mock open() but for simplicity let's just mock the db calls
    # and use a patch for the file writing if needed.
    with patch("builtins.open", MagicMock()):
        with patch("os.path.join", return_value="/tmp/test.md"):
            meta1 = store.save_transcript(video_id, "transcript")
            assert meta1.id == 1
            
            # Setup mock for second call (exists)
            mock_db.execute_query.side_effect = [
                [{'id': 1, 'upload_date': '2023-01-01'}], # check_query results: found
            ]
            
            meta2 = store.save_transcript(video_id, "transcript")
            assert meta2.id == 1
            assert mock_db.execute_query.call_args_list[2][0][0] == "SELECT id, upload_date FROM documents WHERE filename = %s"
            mock_db.execute_write.assert_any_call("UPDATE documents SET status = 'pending' WHERE id = %s", (1,))
