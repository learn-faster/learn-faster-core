from sqlalchemy import text
from src.database.orm import engine
from src.utils.logger import logger

CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS ingestion_jobs (
    id TEXT PRIMARY KEY,
    document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending',
    phase TEXT DEFAULT 'queued',
    progress FLOAT DEFAULT 0.0,
    message TEXT,
    partial_ready BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

ALTER_FK = """
ALTER TABLE ingestion_jobs
DROP CONSTRAINT IF EXISTS ingestion_jobs_document_id_fkey;
"""

ADD_FK = """
ALTER TABLE ingestion_jobs
ADD CONSTRAINT ingestion_jobs_document_id_fkey
FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE;
"""

ADD_INDEX = """
CREATE INDEX IF NOT EXISTS ingestion_jobs_doc_idx ON ingestion_jobs(document_id);
"""


def run_migration():
    db_engine = engine
    with db_engine.begin() as conn:
        conn.execute(text(CREATE_TABLE))
        conn.execute(text(ALTER_FK))
        conn.execute(text(ADD_FK))
        conn.execute(text(ADD_INDEX))
    logger.info("Ingestion jobs FK cascade migration completed.")


if __name__ == "__main__":
    run_migration()
