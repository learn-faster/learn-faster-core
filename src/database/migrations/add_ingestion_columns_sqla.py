
from sqlalchemy import text
from src.database.orm import SessionLocal, engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate():
    """
    Adds ingestion_step and ingestion_progress columns using SQLAlchemy engine.
    """
    with engine.connect() as conn:
        try:
            # Check for columns
            check_query = text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name='documents' AND column_name IN ('ingestion_step', 'ingestion_progress');
            """)
            result = conn.execute(check_query)
            existing_names = [row[0] for row in result]
            
            logger.info(f"Existing columns found: {existing_names}")

            if 'ingestion_step' not in existing_names:
                logger.info("Adding column 'ingestion_step'...")
                conn.execute(text("ALTER TABLE documents ADD COLUMN ingestion_step TEXT DEFAULT 'pending';"))
            
            if 'ingestion_progress' not in existing_names:
                logger.info("Adding column 'ingestion_progress'...")
                conn.execute(text("ALTER TABLE documents ADD COLUMN ingestion_progress FLOAT DEFAULT 0.0;"))
            
            conn.commit()
            logger.info("Migration completed successfully via SQLAlchemy.")
        except Exception as e:
            logger.error(f"Migration failed: {e}")
            raise e

if __name__ == "__main__":
    migrate()
