from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
import traceback

from src.database.orm import get_db
from src.models.orm import Document
from src.services.llm_service import llm_service
from src.ingestion.document_processor import DocumentProcessor
from src.path_resolution.path_resolver import PathResolver
from src.models.schemas import LearningPath

router = APIRouter(prefix="/api/ai", tags=["AI Generation"])
document_processor = DocumentProcessor()
path_resolver = PathResolver()


@router.get("/test")
async def test_endpoint():
    """Simple health check for the AI router."""
    return {"message": "AI Router is working"}


class LLMConfig(BaseModel):
    """Configuration overrides for LLM generation."""
    provider: str = "openai"
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    model: Optional[str] = None


class GenerateRequest(BaseModel):
    """Request schema for flashcard/question generation."""
    document_id: int 
    count: int = 5
    llm_config: Optional[LLMConfig] = None


class LearningPathRequest(BaseModel):
    """Request schema for curriculum/learning path generation."""
    goal: str
    user_id: Optional[str] = None
    document_id: Optional[int] = None


@router.post("/generate-flashcards")
async def generate_flashcards(request: GenerateRequest, db: Session = Depends(get_db)):
    """
    Generates flashcards from a document.
    """
    document = db.query(Document).filter(Document.id == request.document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    text = document.extracted_text
    
    # If no text extracted yet, try to process on the fly (or re-process)
    if not text and document.file_path:
        try:
            text = document_processor.convert_to_markdown(document.file_path)
        except Exception as e:
            # If conversion fails, we can't proceed
            raise HTTPException(status_code=400, detail=f"Could not extract text from document: {str(e)}")
            
    if not text:
        raise HTTPException(status_code=400, detail="Document has no text content available for generation")
        
    try:
        flashcards = await llm_service.generate_flashcards(text, request.count, request.llm_config)
        return flashcards
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate-questions")
async def generate_questions(request: GenerateRequest, db: Session = Depends(get_db)):
    """
    Generates multiple-choice questions from a document.
    """
    document = db.query(Document).filter(Document.id == request.document_id).first()
    if not document:
         raise HTTPException(status_code=404, detail="Document not found")
    
    text = document.extracted_text
    
    if not text and document.file_path:
        try:
            text = document_processor.convert_to_markdown(document.file_path)
        except Exception as e:
             raise HTTPException(status_code=400, detail=f"Could not extract text from document: {str(e)}")
             
    if not text:
        raise HTTPException(status_code=400, detail="Document has no text content")

    try:
        questions = await llm_service.generate_questions(text, request.count, request.llm_config)
        return questions
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/learning-path")
async def generate_learning_path(request: LearningPathRequest, db: Session = Depends(get_db)):
    """
    Generates a structured learning path/curriculum.
    
    Attempts to resolve path using Knowledge Graph first. 
    Falls back to LLM generation if no graph path found or if document context provided.
    """
    # 1. Try Graph Resolution if user_id is provided
    if request.user_id:
        try:
            # Default time budget 60 mins if not specified (PathResolver needs it)
            # Future: add time_budget to request
            graph_path = path_resolver.resolve_path(request.user_id, request.goal, time_budget_minutes=60)
            if graph_path and graph_path.concepts:
                return graph_path.dict()
        except Exception as e:
            print(f"Graph resolution failed, falling back to LLM: {e}")

    # 2. Fallback to LLM Generation
    text = ""
    if request.document_id:
        document = db.query(Document).filter(Document.id == request.document_id).first()
        if document:
            text = document.extracted_text or ""
            if not text and document.file_path:
                try:
                    text = document_processor.convert_to_markdown(document.file_path)
                except:
                    pass

    if not request.goal:
         raise HTTPException(status_code=400, detail="Goal is required")

    try:
        path = await llm_service.generate_learning_path(text, request.goal)
        return path
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
