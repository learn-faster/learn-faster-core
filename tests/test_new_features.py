"""
Integration tests for the new backend features (Flashcards, Study, Folders).
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

# Ensure src is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app
from src.database.orm import Base, get_db
from src.models.orm import Folder, Flashcard, StudySession, Document, ActivityLog, StudyReview

# Setup test DB (using real Postgres Test DB)
# Note: Ensure scripts/setup_test_db.py has been run or DB exists
SQLALCHEMY_DATABASE_URL = "postgresql://learnfast:password@localhost:5433/learnfast_test"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override get_db dependency
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create tables
Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_health_check():
    """Verify app is running."""
    response = client.get("/")
    assert response.status_code == 200

def test_create_folder():
    """Test folder creation."""
    response = client.post(
        "/api/folders/",
        json={"name": "Test Folder", "color": "#000000", "icon": "test"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Folder"
    assert "id" in data
    return data["id"]

def test_create_flashcard():
    """Test flashcard creation."""
    response = client.post(
        "/api/flashcards/",
        json={
            "front": "What is Integration Testing?",
            "back": "Testing combined parts of an application.",
            "card_type": "basic"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["front"] == "What is Integration Testing?"
    assert "id" in data
    return data["id"]

def test_study_session_flow():
    """Test starting a session and submitting a review."""
    # 1. Create a flashcard
    card_id = test_create_flashcard()
    
    # 2. Start session
    response = client.post("/api/study/session")
    assert response.status_code == 200
    session_id = response.json()["id"]
    
    # 3. Submit review
    response = client.post(
        f"/api/study/session/{session_id}/review",
        json={
            "flashcard_id": card_id,
            "rating": 5,
            "time_taken": 5000
        }
    )
    assert response.status_code == 200
    assert "next_review" in response.json()
    
    # 4. End session
    response = client.post(f"/api/study/session/{session_id}/end")
    assert response.status_code == 200
    assert response.json()["average_rating"] == 5.0

def test_analytics_overview():
    """Test analytics endpoint."""
    response = client.get("/api/analytics/overview")
    assert response.status_code == 200
    data = response.json()
    assert "total_flashcards" in data
    assert "retention_rate" in data

def test_documents_api():
    """Test documents API lists content (even if empty)."""
    response = client.get("/api/documents/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

if __name__ == "__main__":
    # Manually run tests if executed directly
    try:
        test_health_check()
        print("Health Check Passed")
        test_create_folder()
        print("Folder Creation Passed")
        test_create_flashcard()
        print("Flashcard Creation Passed")
        test_study_session_flow()
        print("Study Session Flow Passed")
        test_analytics_overview()
        print("Analytics Overview Passed")
        test_documents_api()
        print("Documents API Passed")
        print("\nAll integration tests passed successfully!")
    except Exception as e:
        print(f"\nTest Failed: {e}")
        import traceback
        traceback.print_exc()
