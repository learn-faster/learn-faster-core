from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from .router_main import db

router = APIRouter(prefix="/notebooks", tags=["notebooks"])

class NotebookCreate(BaseModel):
    title: str
    description: Optional[str] = ""

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
    notebook = await db.select(f"notebook:{id}")
    if not notebook:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return notebook
