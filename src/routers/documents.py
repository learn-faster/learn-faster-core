"""
Documents Router for the Learning Assistant.
Handles document uploads, metadata updates, and time tracking sessions.
Note: This is the 'App' API. Core engine endpoints are also available at /documents.
"""
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from pathlib import Path
from datetime import datetime

from src.database.orm import get_db
from src.models.orm import Document
from src.models.enums import FileType
from src.models.schemas import DocumentResponse, DocumentCreate, TimeTrackingRequest
from src.services.time_tracking_service import TimeTrackingService
from src.config import settings

router = APIRouter(prefix="/api/documents", tags=["documents"])


@router.get("/", response_model=List[DocumentResponse])
def get_documents(
    folder_id: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieves a list of documents with optional filtering.
    """
    query = db.query(Document)
    
    if folder_id == "unfiled":
        query = query.filter(Document.folder_id == None)
    elif folder_id:
        query = query.filter(Document.folder_id == folder_id)
        
    if tag:
        # Simple string match for tags if stored as JSON list
        # query = query.filter(Document.tags.contains([tag])) 
        # Fallback for now if dialect issues
        pass
        
    documents = query.order_by(Document.upload_date.desc()).all()
    return documents


@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(document_id: int, db: Session = Depends(get_db)):
    """
    Retrieves a specific document's metadata.
    """
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.put("/{document_id}", response_model=DocumentResponse)
def update_document(
    document_id: int,
    document_base: DocumentCreate,
    db: Session = Depends(get_db)
):
    """
    Updates document metadata (title, tags, category, folder).
    """
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
        
    document.title = document_base.title
    document.tags = document_base.tags
    document.category = document_base.category
    document.folder_id = document_base.folder_id
    
    db.commit()
    db.refresh(document)
    return document


@router.put("/{document_id}/move")
def move_document(
    document_id: int,
    folder_id: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Moves a document to a different folder (or unfiles it).
    """
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
        
    document.folder_id = folder_id if folder_id != "" else None
    db.commit()
    return {"message": "Document moved successfully"}


@router.post("/{document_id}/session/start")
def start_reading_session(document_id: int, db: Session = Depends(get_db)):
    """
    Starts a time tracking session for a document.
    """
    doc = TimeTrackingService.start_session(db, document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Session started", "last_opened": doc.last_opened}


@router.post("/{document_id}/session/end")
def end_reading_session(
    document_id: int,
    request: TimeTrackingRequest,
    db: Session = Depends(get_db)
):
    """
    Ends a time tracking session and updates progress.
    """
    doc = TimeTrackingService.end_session(
        db, 
        document_id, 
        request.seconds_spent, 
        request.reading_progress or 0.0
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    return doc


@router.delete("/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    """
    Deletes a document and its file.
    """
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
        
    # Delete file from disk
    if document.file_path and os.path.exists(document.file_path):
        try:
            os.remove(document.file_path)
        except Exception as e:
            print(f"Error deleting file {document.file_path}: {e}")
            
    db.delete(document)
    db.commit()
    return {"message": "Document deleted successfully"}
