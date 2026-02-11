from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from surrealdb import AsyncSurreal
from .router_main import get_surreal_db
from .db_utils import normalize_id, unwrap_query_result, first_record, validate_record_id

router = APIRouter(prefix="/sources", tags=["sources"])

class SourceCreate(BaseModel):
    title: str
    content: str
    notebook_id: str
    source_type: Optional[str] = "text"


class SourceUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    source_type: Optional[str] = None

@router.get("")
async def list_sources(notebook_id: Optional[str] = None, db: AsyncSurreal = Depends(get_surreal_db)):
    if notebook_id:
        result = await db.query(
            "SELECT * FROM source WHERE notebook_id = $notebook_id ORDER BY updated DESC",
            {"notebook_id": notebook_id},
        )
        return unwrap_query_result(result)
    return await db.select("source")

@router.post("")
async def create_source(source: SourceCreate, db: AsyncSurreal = Depends(get_surreal_db)):
    return await db.create("source", {
        "title": source.title,
        "content": source.content,
        "notebook_id": source.notebook_id,
        "source_type": source.source_type,
        "created_at": "type::datetime(now())",
        "updated": "type::datetime(now())"
    })

@router.get("/{id}")
async def get_source(id: str, db: AsyncSurreal = Depends(get_surreal_db)):
    source_id = normalize_id("source", id)
    try:
        source_id = validate_record_id("source", source_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid source id")
    source = await db.select(source_id)
    record = first_record(source)
    if not record:
        raise HTTPException(status_code=404, detail="Source not found")
    return record


@router.put("/{id}")
async def update_source(id: str, source: SourceUpdate, db: AsyncSurreal = Depends(get_surreal_db)):
    source_id = normalize_id("source", id)
    try:
        source_id = validate_record_id("source", source_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid source id")
    payload: Dict[str, Any] = {
        k: v for k, v in source.model_dump().items() if v is not None
    }
    payload["updated"] = "type::datetime(now())"
    result = await db.query(
        f"UPDATE {source_id} MERGE $data RETURN AFTER",
        {"data": payload},
    )
    updated = first_record(result)
    if not updated:
        raise HTTPException(status_code=404, detail="Source not found")
    return updated


@router.delete("/{id}")
async def delete_source(id: str, db: AsyncSurreal = Depends(get_surreal_db)):
    source_id = normalize_id("source", id)
    try:
        source_id = validate_record_id("source", source_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid source id")
    result = await db.query(f"DELETE {source_id} RETURN BEFORE")
    deleted = first_record(result)
    if not deleted:
        raise HTTPException(status_code=404, detail="Source not found")
    return {"status": "deleted", "id": source_id}
