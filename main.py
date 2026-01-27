"""
LearnFast Core Engine - Main Application.

Exposes REST API endpoints for document ingestion, navigation, path resolution, and content retrieval.
"""

import os
import shutil
import logging
from typing import List, Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException, Body, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from src.storage.document_store import DocumentStore

# Import core components
from src.ingestion.ingestion_engine import IngestionEngine
from src.navigation.navigation_engine import NavigationEngine
from src.navigation.user_tracker import UserProgressTracker
from src.path_resolution.path_resolver import PathResolver
from src.path_resolution.content_retriever import ContentRetriever
from src.database.init_db import initialize_databases
from src.models.schemas import LearningPath

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("learnfast-core")

# Models for API requests
class PathRequest(BaseModel):
    user_id: str
    target_concept: str
    time_budget_minutes: int

class ProgressUpdate(BaseModel):
    user_id: str
    concept_name: str

# Component instances (global)
ingestion_engine: Optional[IngestionEngine] = None
navigation_engine: Optional[NavigationEngine] = None
user_tracker: Optional[UserProgressTracker] = None
path_resolver: Optional[PathResolver] = None
content_retriever: Optional[ContentRetriever] = None
document_store: Optional[DocumentStore] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    Initializes databases and components.
    """
    global ingestion_engine, navigation_engine, user_tracker, path_resolver, content_retriever, document_store
    
    logger.info("Initializing LearnFast Core Engine...")
    
    # Initialize databases
    if not initialize_databases():
        logger.error("Failed to initialize databases")
    
    # Initialize components
    ingestion_engine = IngestionEngine()
    navigation_engine = NavigationEngine()
    user_tracker = UserProgressTracker()
    path_resolver = PathResolver()
    content_retriever = ContentRetriever()
    document_store = DocumentStore()
    
    logger.info("Components initialized successfully")
    
    yield
    
    logger.info("Shutting down LearnFast Core Engine...")


app = FastAPI(
    title="LearnFast Core Engine",
    description="Hybrid Graph-RAG Learning Platform API",
    version="0.1.0",
    lifespan=lifespan
)

# Mount static files
app.mount("/static", StaticFiles(directory="src/static"), name="static")

@app.get("/")
async def root():
    return FileResponse("src/static/index.html")

# --- Ingestion & Document Management Endpoints ---

@app.post("/ingest",  summary="Upload and process a document")
async def ingest_document(file: UploadFile = File(...)):
    """
    Upload a document (PDF, DOCX, HTML) for ingestion.
    Saves original file, converts to markdown, extracts graph structure, and creates embeddings.
    """
    if not ingestion_engine or not document_store:
        raise HTTPException(status_code=503, detail="Services not ready")
        
    try:
        # 1. Save original document and create metadata record
        doc_metadata = document_store.save_document(file)
        
        logger.info(f"Processing document {doc_metadata.id}: {doc_metadata.filename}")
        
        # 2. Process document (extract graph and vectors)
        ingestion_engine.process_document(doc_metadata.file_path, document_id=doc_metadata.id)
        
        # 3. Update status to completed
        document_store.update_status(doc_metadata.id, "completed")
        
        return {
            "message": f"Document '{file.filename}' processed successfully",
            "document_id": doc_metadata.id
        }
        
    except Exception as e:
        logger.error(f"Ingestion failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")


@app.get("/documents", summary="List all ingested documents")
async def list_documents():
    """List all ingested documents with metadata."""
    if not document_store:
        raise HTTPException(status_code=503, detail="Document store not ready")
    return document_store.list_documents()


@app.get("/documents/{doc_id}", summary="Download original document")
async def download_document(doc_id: int):
    """Download the original ingested document file."""
    if not document_store:
        raise HTTPException(status_code=503, detail="Document store not ready")
        
    doc = document_store.get_document(doc_id)
    if not doc or not doc.file_path or not os.path.exists(doc.file_path):
        raise HTTPException(status_code=404, detail="Document file not found")
        
    return FileResponse(
        doc.file_path, 
        filename=doc.filename,
        media_type="application/octet-stream"
    )


@app.delete("/documents/{doc_id}", summary="Delete document and associated knowledge")
async def delete_document(doc_id: int):
    """Delete document file, metadata, and all its knowledge chunks from the system."""
    if not document_store:
        raise HTTPException(status_code=503, detail="Document store not ready")
        
    try:
        document_store.delete_document(doc_id)
        return {"message": f"Document {doc_id} and associated knowledge deleted"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Deletion failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))



# --- Navigation Endpoints ---

@app.get("/concepts/roots", summary="Get root concepts")
async def get_root_concepts():
    """Get all concepts with no prerequisites."""
    if not navigation_engine:
        raise HTTPException(status_code=503, detail="Navigation engine not ready")
    return navigation_engine.find_root_concepts()


@app.get("/concepts/unlocked/{user_id}", summary="Get unlocked concepts for user")
async def get_unlocked_concepts(user_id: str):
    """Get concepts available for the user to start."""
    if not navigation_engine:
        raise HTTPException(status_code=503, detail="Navigation engine not ready")
    return navigation_engine.get_unlocked_concepts(user_id)


# --- Path Resolution & Content Endpoints ---

@app.post("/learning/path", response_model=LearningPath, summary="Generate learning path")
async def generate_learning_path(request: PathRequest):
    """
    Generate an optimized learning path to a target concept within a time budget.
    """
    if not path_resolver:
        raise HTTPException(status_code=503, detail="Path resolver not ready")
        
    path = path_resolver.resolve_path(
        user_id=request.user_id,
        target_concept=request.target_concept,
        time_budget_minutes=request.time_budget_minutes
    )
    
    if not path:
        raise HTTPException(status_code=404, detail="No valid path found to target concept")
        
    return path


@app.get("/learning/lesson/{user_id}/{target_concept}", summary="Get formatted lesson content")
async def get_lesson_content(user_id: str, target_concept: str, time_budget: int = Query(30)):
    """
    Get full lesson content (text) for a path to target.
    Convenience endpoint that resolves path + retrieves content.
    """
    if not path_resolver or not content_retriever:
        raise HTTPException(status_code=503, detail="Components not ready")
        
    # Resolve path first
    path = path_resolver.resolve_path(user_id, target_concept, time_budget)
    
    if not path or not path.concepts:
        raise HTTPException(status_code=404, detail="No content found for learning path")
        
    # Retrieve formatted content
    lesson_text = content_retriever.get_lesson_content(path.concepts, time_budget_minutes=time_budget)
    
    return {
        "target": target_concept,
        "path": path.concepts,
        "estimated_time": path.estimated_time_minutes,
        "content_markdown": lesson_text
    }


# --- Progress Tracking Endpoints ---

@app.post("/progress/start", summary="Mark concept in progress")
async def start_concept(update: ProgressUpdate):
    """Mark a concept as started (IN_PROGRESS)."""
    if not user_tracker:
        raise HTTPException(status_code=503, detail="User tracker not ready")
        
    success = user_tracker.mark_in_progress(update.user_id, update.concept_name)
    
    if not success:
        raise HTTPException(status_code=400, detail="Failed to mark concept started (completed or prerequisites not met?)")
        
    return {"message": f"Started {update.concept_name}"}


@app.post("/progress/complete", summary="Mark concept completed")
async def complete_concept(update: ProgressUpdate):
    """Mark a concept as COMPLETED."""
    if not user_tracker:
        raise HTTPException(status_code=503, detail="User tracker not ready")
        
    success = user_tracker.mark_completed(update.user_id, update.concept_name)
    
    if not success:
        raise HTTPException(status_code=400, detail="Failed to mark concept completed")
        
    return {"message": f"Completed {update.concept_name}"}


@app.get("/progress/{user_id}", summary="Get full user state")
async def get_user_progress(user_id: str):
    """Get user's completed, in-progress, and available concepts."""
    if not user_tracker:
        raise HTTPException(status_code=503, detail="User tracker not ready")
        
    state = user_tracker.get_user_state(user_id)
    if not state:
        raise HTTPException(status_code=404, detail="User not found")
        
    return state
