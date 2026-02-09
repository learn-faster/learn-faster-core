import asyncio
from typing import Optional

from src.utils.logger import logger
from src.models.enums import FileType
from src.ingestion.ingestion_engine import IngestionEngine
from src.storage.document_store import DocumentStore


def _coerce_file_type(value: str) -> FileType:
    try:
        return FileType(value)
    except Exception:
        # Best-effort fallback
        return FileType.OTHER


def run_extraction_task(doc_id: int, file_path: str, file_type_value: str):
    """
    RQ worker entrypoint: run extraction in a synchronous context.
    """
    from src.routers.documents import process_extraction_background, document_processor

    file_type = _coerce_file_type(file_type_value)
    logger.info(f"[RQ] Starting extraction for doc {doc_id}")
    asyncio.run(process_extraction_background(doc_id, file_path, file_type, document_processor))


def run_ingestion_task(doc_id: int, file_path: str, user_id: str = "default_user"):
    """
    RQ worker entrypoint: run ingestion in a synchronous context.
    """
    from src.routers.documents import process_ingestion_background, document_processor

    ingestion_engine = IngestionEngine()
    document_store = DocumentStore()
    logger.info(f"[RQ] Starting ingestion for doc {doc_id}")
    asyncio.run(
        process_ingestion_background(
            doc_id=doc_id,
            file_path=file_path,
            document_processor=document_processor,
            ingestion_engine=ingestion_engine,
            document_store=document_store,
            user_id=user_id
        )
    )
