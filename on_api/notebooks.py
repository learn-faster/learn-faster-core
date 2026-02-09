from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from .router_main import db
from .db_utils import normalize_id, unwrap_query_result, first_record

router = APIRouter(prefix="/notebooks", tags=["notebooks"])

class NotebookCreate(BaseModel):
    title: str
    description: Optional[str] = ""


class NotebookUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

@router.get("")
async def list_notebooks():
    return await db.select("notebook")

@router.post("")
async def create_notebook(notebook: NotebookCreate):
    return await db.create("notebook", {
        "title": notebook.title,
        "description": notebook.description,
        "created_at": "type::datetime(now())"
    })

@router.get("/{id}")
async def get_notebook(id: str):
    notebook_id = normalize_id("notebook", id)
    notebook = await db.select(notebook_id)
    record = first_record(notebook)
    if not record:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return record


@router.put("/{id}")
async def update_notebook(id: str, notebook: NotebookUpdate):
    notebook_id = normalize_id("notebook", id)
    payload: Dict[str, Any] = {
        k: v for k, v in notebook.model_dump().items() if v is not None
    }
    payload["updated"] = "type::datetime(now())"
    result = await db.query(
        f"UPDATE {notebook_id} MERGE $data RETURN AFTER",
        {"data": payload},
    )
    updated = first_record(result)
    if not updated:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return updated


@router.delete("/{id}")
async def delete_notebook(id: str):
    notebook_id = normalize_id("notebook", id)
    result = await db.query(f"DELETE {notebook_id} RETURN BEFORE")
    deleted = first_record(result)
    if not deleted:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return {"status": "deleted", "id": notebook_id}
