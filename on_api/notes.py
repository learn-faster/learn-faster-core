from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from .router_main import db

router = APIRouter(prefix="/notes", tags=["notes"])

class NoteCreate(BaseModel):
    notebook_id: str
    content: str
    title: Optional[str] = "Untitled Note"

@router.get("")
async def list_notes(notebook_id: Optional[str] = None):
    if notebook_id:
        return await db.query(f"SELECT * FROM note WHERE notebook_id = $notebook_id", {"notebook_id": notebook_id})
    return await db.select("note")

@router.post("")
async def create_note(note: NoteCreate):
    return await db.create("note", {
        "title": note.title,
        "content": note.content,
        "notebook_id": note.notebook_id,
        "created_at": "type::datetime(now())"
    })
