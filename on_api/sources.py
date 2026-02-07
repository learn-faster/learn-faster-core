from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from .router_main import db

router = APIRouter(prefix="/sources", tags=["sources"])

class SourceCreate(BaseModel):
    title: str
    content: str
    notebook_id: str
    source_type: Optional[str] = "text"

@router.get("")
async def list_sources(notebook_id: Optional[str] = None):
    if notebook_id:
        return await db.query(f"SELECT * FROM source WHERE notebook_id = $notebook_id", {"notebook_id": notebook_id})
    return await db.select("source")

@router.post("")
async def create_source(source: SourceCreate):
    return await db.create("source", {
        "title": source.title,
        "content": source.content,
        "notebook_id": source.notebook_id,
        "source_type": source.source_type,
        "created_at": "type::datetime(now())"
    })

@router.get("/{id}")
async def get_source(id: str):
    source = await db.select(f"source:{id}")
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return source
