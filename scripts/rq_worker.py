import os
import sys
from pathlib import Path

from rq import Worker
from rq.worker import SimpleWorker

# Ensure repo root is on sys.path for absolute imports
ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from src.queue.ingestion_queue import get_queue, get_redis


def main():
    redis = get_redis()
    queue = get_queue()
    if not redis or not queue:
        raise SystemExit("REDIS_URL is not configured or Redis is unreachable.")

    # Windows doesn't support fork; use SimpleWorker to run jobs in-process.
    worker_class = SimpleWorker if os.name == "nt" else Worker
    worker = worker_class([queue], connection=redis)
    worker.work()


if __name__ == "__main__":
    main()
