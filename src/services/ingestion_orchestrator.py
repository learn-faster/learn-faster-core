import asyncio
from typing import Awaitable, Optional

from src.config import settings
from src.utils.logger import logger


_local_extraction_semaphore = asyncio.Semaphore(max(1, int(getattr(settings, "local_extraction_concurrency", 2))))
_local_ingestion_semaphore = asyncio.Semaphore(max(1, int(getattr(settings, "local_ingestion_concurrency", 1))))


async def _run_with_semaphore(semaphore: asyncio.Semaphore, label: str, coro: Awaitable[None]) -> None:
    async with semaphore:
        try:
            await coro
        except Exception as exc:
            logger.error(f"{label} task failed: {exc}")
            raise


def schedule_extraction(coro: Awaitable[None]) -> asyncio.Task:
    """Schedule extraction with local concurrency guard."""
    return asyncio.create_task(_run_with_semaphore(_local_extraction_semaphore, "Extraction", coro))


def schedule_ingestion(coro: Awaitable[None]) -> asyncio.Task:
    """Schedule ingestion with local concurrency guard."""
    return asyncio.create_task(_run_with_semaphore(_local_ingestion_semaphore, "Ingestion", coro))
