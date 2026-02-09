import logging
from typing import Optional

from redis import Redis
from rq import Queue, Retry

from src.config import settings

logger = logging.getLogger(__name__)


def get_redis() -> Optional[Redis]:
    if not settings.redis_url:
        return None
    try:
        return Redis.from_url(settings.redis_url)
    except Exception as e:
        logger.error(f"Failed to connect to Redis: {e}")
        return None


def get_queue() -> Optional[Queue]:
    redis = get_redis()
    if not redis:
        return None
    return Queue(
        settings.redis_queue_name,
        connection=redis,
        default_timeout=settings.redis_job_timeout
    )


def enqueue_extraction(doc_id: int, file_path: str, file_type_value: str) -> Optional[str]:
    queue = get_queue()
    if not queue:
        return None
    job = queue.enqueue(
        "src.tasks.ingestion_tasks.run_extraction_task",
        doc_id,
        file_path,
        file_type_value,
        retry=Retry(max=3, interval=[10, 30, 60])
    )
    logger.info(f"Enqueued extraction job {job.id} for doc {doc_id}")
    return job.id


def enqueue_ingestion(doc_id: int, file_path: str, user_id: str = "default_user") -> Optional[str]:
    queue = get_queue()
    if not queue:
        return None
    job = queue.enqueue(
        "src.tasks.ingestion_tasks.run_ingestion_task",
        doc_id,
        file_path,
        user_id,
        retry=Retry(max=3, interval=[30, 120, 300])
    )
    logger.info(f"Enqueued ingestion job {job.id} for doc {doc_id}")
    return job.id
