"""
Folders Router for the Learning Assistant.
Manages folder creation, modification, and deletion for organizing documents.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from src.database.orm import get_db
from src.models.orm import Folder, Document
from src.models.schemas import FolderCreate, FolderUpdate, FolderResponse

router = APIRouter(prefix="/api/folders", tags=["folders"])


@router.post("/", response_model=FolderResponse)
def create_folder(folder: FolderCreate, db: Session = Depends(get_db)):
    """
    Creates a new folder for organizing documents.
    
    Args:
        folder (FolderCreate): Schema with name, color, and icon.
        db (Session): Database session.
        
    Returns:
        FolderResponse: The newly created folder record.
    """
    import uuid
    
    db_folder = Folder(
        id=str(uuid.uuid4()),
        name=folder.name,
        color=folder.color,
        icon=folder.icon
    )
    
    db.add(db_folder)
    db.commit()
    db.refresh(db_folder)
    
    # Add document count (initially 0)
    doc_count = db.query(func.count(Document.id)).filter(Document.folder_id == db_folder.id).scalar()
    
    return FolderResponse(
        id=db_folder.id,
        name=db_folder.name,
        color=db_folder.color,
        icon=db_folder.icon,
        created_at=db_folder.created_at,
        document_count=doc_count
    )


@router.get("/", response_model=List[FolderResponse])
def get_folders(db: Session = Depends(get_db)):
    """
    Retrieves all folders along with their document counts.
    """
    folders = db.query(Folder).order_by(Folder.created_at).all()
    
    result = []
    for folder in folders:
        doc_count = db.query(func.count(Document.id)).filter(Document.folder_id == folder.id).scalar()
        result.append(FolderResponse(
            id=folder.id,
            name=folder.name,
            color=folder.color,
            icon=folder.icon,
            created_at=folder.created_at,
            document_count=doc_count
        ))
    
    return result


@router.get("/{folder_id}", response_model=FolderResponse)
def get_folder(folder_id: str, db: Session = Depends(get_db)):
    """
    Retrieves a single folder by its ID.
    """
    folder = db.query(Folder).filter(Folder.id == folder_id).first()
    
    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")
    
    doc_count = db.query(func.count(Document.id)).filter(Document.folder_id == folder.id).scalar()
    
    return FolderResponse(
        id=folder.id,
        name=folder.name,
        color=folder.color,
        icon=folder.icon,
        created_at=folder.created_at,
        document_count=doc_count
    )


@router.put("/{folder_id}", response_model=FolderResponse)
def update_folder(folder_id: str, folder_update: FolderUpdate, db: Session = Depends(get_db)):
    """
    Updates a folder's properties (name, color, or icon).
    """
    folder = db.query(Folder).filter(Folder.id == folder_id).first()
    
    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")
    
    if folder_update.name is not None:
        folder.name = folder_update.name
    if folder_update.color is not None:
        folder.color = folder_update.color
    if folder_update.icon is not None:
        folder.icon = folder_update.icon
    
    db.commit()
    db.refresh(folder)
    
    doc_count = db.query(func.count(Document.id)).filter(Document.folder_id == folder.id).scalar()
    
    return FolderResponse(
        id=folder.id,
        name=folder.name,
        color=folder.color,
        icon=folder.icon,
        created_at=folder.created_at,
        document_count=doc_count
    )


@router.delete("/{folder_id}")
def delete_folder(folder_id: str, db: Session = Depends(get_db)):
    """
    Deletes a folder and moves its documents to the 'unfiled' state.
    """
    folder = db.query(Folder).filter(Folder.id == folder_id).first()
    
    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")
    
    # Move all documents in this folder to unfiled (folder_id = None)
    db.query(Document).filter(Document.folder_id == folder_id).update({"folder_id": None})
    
    db.delete(folder)
    db.commit()
    
    return {"message": "Folder deleted successfully"}
