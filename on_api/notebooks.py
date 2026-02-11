from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from surrealdb import AsyncSurreal
from .router_main import get_surreal_db
from .db_utils import normalize_id, first_record, validate_record_id

router = APIRouter(prefix="/notebooks", tags=["notebooks"])

class NotebookCreate(BaseModel):
    title: str
    description: Optional[str] = ""


class NotebookUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

@router.get("")
async def list_notebooks(db: AsyncSurreal = Depends(get_surreal_db)):
    return await db.select("notebook")

@router.post("")
async def create_notebook(notebook: NotebookCreate, db: AsyncSurreal = Depends(get_surreal_db)):
    return await db.create("notebook", {
        "title": notebook.title,
        "description": notebook.description,
        "created_at": "type::datetime(now())"
    })

@router.get("/{id}")
async def get_notebook(id: str, db: AsyncSurreal = Depends(get_surreal_db)):
    notebook_id = normalize_id("notebook", id)
    try:
        notebook_id = validate_record_id("notebook", notebook_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid notebook id")
    notebook = await db.select(notebook_id)
    record = first_record(notebook)
    if not record:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return record


@router.put("/{id}")
async def update_notebook(id: str, notebook: NotebookUpdate, db: AsyncSurreal = Depends(get_surreal_db)):
    notebook_id = normalize_id("notebook", id)
    try:
        notebook_id = validate_record_id("notebook", notebook_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid notebook id")
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
async def delete_notebook(id: str, db: AsyncSurreal = Depends(get_surreal_db)):
    notebook_id = normalize_id("notebook", id)
    try:
        notebook_id = validate_record_id("notebook", notebook_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid notebook id")
    result = await db.query(f"DELETE {notebook_id} RETURN BEFORE")
    deleted = first_record(result)
    if not deleted:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return {"status": "deleted", "id": notebook_id}
