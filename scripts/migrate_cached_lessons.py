
import sys
import os
import logging
from dotenv import load_dotenv

# Add parent directory to path to allow importing from src
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.database.connections import postgres_conn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate():
    """Create the cached_lessons table in PostgreSQL."""
    logger.info("Starting database migration for Lesson Caching...")
    
    conn = postgres_conn.connect()
    cursor = conn.cursor()
    
    try:
        # Create cached_lessons table
        logger.info("Creating cached_lessons table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS cached_lessons (
                id SERIAL PRIMARY KEY,
                concept_name TEXT NOT NULL,
                time_budget INTEGER NOT NULL,
                content_markdown TEXT NOT NULL,
                generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        # Add index for faster lookup
        logger.info("Creating index on concept_name and time_budget...")
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS cached_lessons_lookup_idx 
            ON cached_lessons (concept_name, time_budget);
        """)

        conn.commit()
        logger.info("Migration completed successfully!")
        
    except Exception as e:
        logger.error(f"Migration failed: {e}")
        conn.rollback()
        sys.exit(1)
    finally:
        cursor.close()
        postgres_conn.close()

if __name__ == "__main__":
    load_dotenv()
    migrate()
