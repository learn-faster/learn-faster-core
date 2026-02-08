from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from .router_main import db
from .db_utils import normalize_id, unwrap_query_result, first_record

router = APIRouter(prefix="/notes", tags=["notes"])

class NoteCreate(BaseModel):
    notebook_id: str
    content: str
    title: Optional[str] = "Untitled Note"
    note_type: Optional[str] = "human"


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    note_type: Optional[str] = None

@router.get("")
async def list_notes(notebook_id: Optional[str] = None):
    if notebook_id:
        result = await db.query(
            "SELECT * FROM note WHERE notebook_id = $notebook_id ORDER BY updated DESC",
            {"notebook_id": notebook_id},
        )
        return unwrap_query_result(result)
    return await db.select("note")

@router.post("")
async def create_note(note: NoteCreate):
    return await db.create("note", {
        "title": note.title,
        "content": note.content,
        "notebook_id": note.notebook_id,
        "note_type": note.note_type or "human",
        "created_at": "type::datetime(now())",
        "updated": "type::datetime(now())"
    })


@router.get("/{id}")
async def get_note(id: str):
    note_id = normalize_id("note", id)
    result = await db.select(note_id)
    note = first_record(result)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.put("/{id}")
async def update_note(id: str, note: NoteUpdate):
    note_id = normalize_id("note", id)
    payload: Dict[str, Any] = {
        k: v for k, v in note.model_dump().items() if v is not None
    }
    payload["updated"] = "type::datetime(now())"
    result = await db.query(
        f"UPDATE {note_id} MERGE $data RETURN AFTER",
        {"data": payload},
    )
    updated = first_record(result)
    if not updated:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated


@router.delete("/{id}")
async def delete_note(id: str):
    note_id = normalize_id("note", id)
    result = await db.query(
        f"DELETE {note_id} RETURN BEFORE"
    )
    deleted = first_record(result)
    if not deleted:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"status": "deleted", "id": note_id}
