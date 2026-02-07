from fastapi import APIRouter
import logging
from surrealdb import AsyncSurreal

logger = logging.getLogger("learnfast-core.on_api")

router = APIRouter()

# Use AsyncSurreal for async compatibility
db = AsyncSurreal("http://localhost:8000/rpc")

async def init_surrealdb():
    try:
        await db.signin({"username": "root", "password": "root"})
        await db.use("learnfast", "open_notebook")
        logger.info("Connected to SurrealDB successfully")
    except Exception as e:
        logger.error(f"SurrealDB connection failed: {e}")
        raise

# Import and include sub-routers
# (We'll create these files next)
from .notebooks import router as notebooks_router
from .sources import router as sources_router
from .notes import router as notes_router
from .chat import router as chat_router

router.include_router(notebooks_router)
router.include_router(sources_router)
router.include_router(notes_router)
router.include_router(chat_router)

@router.get("/config")
async def get_config():
    return {
        "version": "0.1.0",
        "dbStatus": "connected"
    }

from pydantic import BaseModel
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from src.database.orm import get_db
from src.models.orm import UserSettings

class LLMConfigUpdate(BaseModel):
    config: Dict[str, Any]

@router.get("/config/llm")
async def get_llm_config(db: Session = Depends(get_db)):
    """Get LLM configuration for the default user."""
    user_settings = db.query(UserSettings).filter(UserSettings.user_id == "default_user").first()
    if not user_settings:
        # Create default settings if not exists
        user_settings = UserSettings(user_id="default_user", llm_config={})
        db.add(user_settings)
        db.commit()
        db.refresh(user_settings)
    
    return user_settings.llm_config or {}

@router.post("/config/llm")
async def update_llm_config(update: LLMConfigUpdate, db: Session = Depends(get_db)):
    """Update LLM configuration."""
    user_settings = db.query(UserSettings).filter(UserSettings.user_id == "default_user").first()
    if not user_settings:
        user_settings = UserSettings(user_id="default_user", llm_config=update.config)
        db.add(user_settings)
    else:
        user_settings.llm_config = update.config
    
    try:
        db.commit()
        return {"status": "success", "config": user_settings.llm_config}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
