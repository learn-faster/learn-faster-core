from fastapi import APIRouter
from src.services.concept_tutor import ConceptTutorService

router = APIRouter(prefix="/api/resources", tags=["resources"])

@router.get("/scout/{concept_name}", summary="Get Active Intel for a concept")
async def scout_resources(concept_name: str):
    """
    Get 'Active Intel' (Analogy, Insight, Question) for a concept.
    Replaces old resource scout (books/courses).
    """
    return await ConceptTutorService.get_active_intel(concept_name)
