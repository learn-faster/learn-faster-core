
from src.database.connections import postgres_conn
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate():
    """
    Adds ingestion_step and ingestion_progress columns to the documents table.
    """
    try:
        # Check if columns already exist to make it idempotent
        check_query = """
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='documents' AND column_name IN ('ingestion_step', 'ingestion_progress');
        """
        existing_columns = postgres_conn.execute_query(check_query)
        existing_names = [col['column_name'] for col in existing_columns]
        
        if 'ingestion_step' not in existing_names:
            logger.info("Adding column 'ingestion_step' to 'documents' table...")
            add_step_query = "ALTER TABLE documents ADD COLUMN ingestion_step TEXT DEFAULT 'pending';"
            postgres_conn.execute_write(add_step_query)
        else:
            logger.info("Column 'ingestion_step' already exists.")
            
        if 'ingestion_progress' not in existing_names:
            logger.info("Adding column 'ingestion_progress' to 'documents' table...")
            add_progress_query = "ALTER TABLE documents ADD COLUMN ingestion_progress FLOAT DEFAULT 0.0;"
            postgres_conn.execute_write(add_progress_query)
        else:
            logger.info("Column 'ingestion_progress' already exists.")
            
        logger.info("Migration completed successfully.")
        
    except Exception as e:
        logger.error(f"Migration failed: {e}")
        raise e

if __name__ == "__main__":
    migrate()
