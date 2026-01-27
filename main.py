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

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    Initializes databases and components.
    """
    global ingestion_engine, navigation_engine, user_tracker, path_resolver, content_retriever
    
    logger.info("Initializing LearnFast Core Engine...")
    
    # Initialize databases
    if not initialize_databases():
        logger.error("Failed to initialize databases")
        # In production we might raise an error, but for dev we continue
    
    # Initialize components
    # (Note: In a real app we might use Dependency Injection)
    ingestion_engine = IngestionEngine()
    navigation_engine = NavigationEngine()
    user_tracker = UserProgressTracker()
    path_resolver = PathResolver()
    content_retriever = ContentRetriever()
    
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


# --- Ingestion Endpoints ---

@app.post("/ingest",  summary="Upload and process a document")
async def ingest_document(file: UploadFile = File(...)):
    """
    Upload a document (PDF, DOCX, HTML) for ingestion.
    Converts to markdown, extracts graph structure, and creates embeddings.
    """
    if not ingestion_engine:
        raise HTTPException(status_code=503, detail="Ingestion engine not ready")
        
    try:
        # Save temp file
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        temp_path = os.path.join(temp_dir, file.filename)
        
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        logger.info(f"Processing uploaded file: {file.filename}")
        
        # Process document
        # Note: process_document is synchronous in current implementation
        # In production, this should be a background task
        ingestion_engine.process_document(temp_path)
        
        # Clean up
        os.remove(temp_path)
        
        return {"message": f"Document '{file.filename}' processed successfully"}
        
    except Exception as e:
        logger.error(f"Ingestion failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")


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
    lesson_text = content_retriever.get_lesson_content(path.concepts)
    
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
