from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from .router_main import db

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    notebook_id: str
    history: Optional[List[dict]] = []

@router.post("")
async def chat(request: ChatRequest):
    # This is a dummy chat implementation that returns a static response
    # In the real integration, this would use LangChain/LLM with RAG on SurrealDB
    return {
        "response": f"I've received your message about notebook {request.notebook_id}. (Note: This is a placeholder chat service as the original integration was missing.)",
        "citations": []
    }

@router.get("/history")
async def get_chat_history(notebook_id: str):
    return await db.query(f"SELECT * FROM chat_message WHERE notebook_id = $notebook_id ORDER BY created_at ASC", {"notebook_id": notebook_id})
