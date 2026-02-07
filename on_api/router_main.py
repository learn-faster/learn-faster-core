from fastapi import APIRouter
import logging
from surrealdb import Surreal

logger = logging.getLogger("learnfast-core.on_api")

router = APIRouter(prefix="/api")

# We'll use a globally shared Surreal instance
db = Surreal("http://localhost:8000/rpc")

async def init_surrealdb():
    """Initializes SurrealDB connection and namespace/database."""
    try:
        await db.connect()
        await db.signin({"user": "root", "pass": "root"})
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
