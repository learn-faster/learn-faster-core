from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from src.navigation.navigation_engine import NavigationEngine
from src.navigation.user_tracker import UserProgressTracker
from src.path_resolution.path_resolver import PathResolver
from src.path_resolution.content_retriever import ContentRetriever
from src.models.schemas import ProgressUpdate, UserState, ConceptNode
from src.dependencies import get_navigation_engine, get_user_tracker, get_path_resolver, get_content_retriever

router = APIRouter(prefix="/api", tags=["navigation"])

# --- Navigation Endpoints ---

@router.get("/concepts/roots", summary="Get root concepts", response_model=List[str])
async def get_root_concepts(
    navigation_engine: NavigationEngine = Depends(get_navigation_engine)
):
    """Get all concepts with no prerequisites."""
    return navigation_engine.find_root_concepts()


@router.get("/concepts/unlocked/{user_id}", summary="Get unlocked concepts for user", response_model=List[str])
async def get_unlocked_concepts(
    user_id: str,
    navigation_engine: NavigationEngine = Depends(get_navigation_engine)
):
    """Get concepts available for the user to start."""
    return navigation_engine.get_unlocked_concepts(user_id)


@router.get("/concepts/graph", summary="Get full knowledge graph")
async def get_concept_graph(
    navigation_engine: NavigationEngine = Depends(get_navigation_engine)
):
    """Get the full concept graph (nodes and edges)."""
    return navigation_engine.get_full_graph()


# --- Content Retrieval Endpoints ---

@router.get("/learning/lesson/{user_id}/{target_concept}", summary="Get formatted lesson content")
async def get_lesson_content(
    user_id: str, 
    target_concept: str, 
    time_budget: int = Query(30),
    path_resolver: PathResolver = Depends(get_path_resolver),
    content_retriever: ContentRetriever = Depends(get_content_retriever)
):
    """
    Get full lesson content (text) for a path to target.
    Convenience endpoint that resolves path + retrieves content.
    """
    # Resolve path first
    path = path_resolver.resolve_path(user_id, target_concept, time_budget)
    
    if not path or not path.concepts:
        raise HTTPException(status_code=404, detail="No content found for learning path")
        
    # Retrieve formatted content
    lesson_text = await content_retriever.get_lesson_content(path.concepts, time_budget_minutes=time_budget)
    
    return {
        "target": target_concept,
        "path": path.concepts,
        "estimated_time": path.estimated_time_minutes,
        "content_markdown": lesson_text
    }


# --- Progress Tracking Endpoints ---

@router.post("/progress/start", summary="Mark concept in progress")
async def start_concept(
    update: ProgressUpdate,
    user_tracker: UserProgressTracker = Depends(get_user_tracker)
):
    """Mark a concept as started (IN_PROGRESS)."""
    success = user_tracker.mark_in_progress(update.user_id, update.concept_name)
    
    if not success:
        raise HTTPException(status_code=400, detail="Failed to mark concept started (completed or prerequisites not met?)")
        
    return {"message": f"Started {update.concept_name}"}


@router.post("/progress/complete", summary="Mark concept completed")
async def complete_concept(
    update: ProgressUpdate,
    user_tracker: UserProgressTracker = Depends(get_user_tracker)
):
    """Mark a concept as COMPLETED."""
    success = user_tracker.mark_completed(update.user_id, update.concept_name)
    
    if not success:
        raise HTTPException(status_code=400, detail="Failed to mark concept completed")
        
    return {"message": f"Completed {update.concept_name}"}


@router.get("/progress/{user_id}", summary="Get full user state", response_model=UserState)
async def get_user_progress(
    user_id: str,
    user_tracker: UserProgressTracker = Depends(get_user_tracker)
):
    """Get user's completed, in-progress, and available concepts."""
    state = user_tracker.get_user_state(user_id)
    if not state:
        raise HTTPException(status_code=404, detail="User not found")
        
    return state
