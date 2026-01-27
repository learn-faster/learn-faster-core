
import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch, AsyncMock
from main import app
from src.ingestion.youtube_utils import extract_video_id

client = TestClient(app)

def test_extract_video_id():
    """Test extracting video ID from various YouTube URL formats."""
    urls = [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://youtu.be/dQw4w9WgXcQ",
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "https://www.youtube.com/v/dQw4w9WgXcQ",
        "https://youtube.com/watch?v=dQw4w9WgXcQ&feature=shared",
        "http://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ]
    for url in urls:
        assert extract_video_id(url) == "dQw4w9WgXcQ"
        
    assert extract_video_id("https://google.com") is None
    assert extract_video_id("") is None

@patch("main.document_store")
@patch("main.ingestion_engine")
@patch("main.fetch_transcript")
def test_ingest_youtube_success(mock_fetch, mock_ingestion, mock_store):
    """Test successful YouTube ingestion flow."""
    # Setup mocks
    mock_fetch.return_value = "This is a test transcript."
    
    mock_metadata = MagicMock()
    mock_metadata.id = 123
    mock_metadata.file_path = "data/documents/123_youtube_dQw4w9WgXcQ.md"
    mock_store.save_transcript.return_value = mock_metadata
    
    # Configure async mock
    mock_ingestion.process_document = AsyncMock(return_value=(None, []))

    # Execute request
    response = client.post("/ingest/youtube", json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"})
    
    # Assertions
    assert response.status_code == 200
    data = response.json()
    assert "processed successfully" in data["message"]
    assert data["document_id"] == 123
    
    # Verify mock calls
    mock_fetch.assert_called_once_with("dQw4w9WgXcQ")
    mock_store.save_transcript.assert_called_once_with("dQw4w9WgXcQ", "This is a test transcript.")
    mock_ingestion.process_document.assert_called_once_with(mock_metadata.file_path, document_id=123)
    mock_store.update_status.assert_called_once_with(123, "completed")

@patch("main.document_store")
@patch("main.ingestion_engine")
@patch("main.fetch_transcript")
def test_ingest_youtube_invalid_url(mock_fetch, mock_ingestion, mock_store):
    """Test ingestion with an invalid YouTube URL."""
    response = client.post("/ingest/youtube", json={"url": "https://not-youtube.com/video"})
    assert response.status_code == 400
    assert "Invalid YouTube URL" in response.json()["detail"]

@patch("main.document_store")
@patch("main.ingestion_engine")
@patch("main.fetch_transcript")
def test_ingest_youtube_no_transcript(mock_fetch, mock_ingestion, mock_store):
    """Test ingestion when transcript is not available."""
    mock_fetch.return_value = None
    response = client.post("/ingest/youtube", json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"})
    assert response.status_code == 404
    assert "Transcript not available" in response.json()["detail"]
