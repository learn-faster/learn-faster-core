import os
import sys
import psycopg2
from dotenv import load_dotenv

# Add src to path to import connections
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from src.database.connections import postgres_conn

def migrate():
    print("Starting database migration for Document Management...")
    
    conn = postgres_conn.connect()
    cursor = conn.cursor()
    
    try:
        # 1. Create documents table
        print("Creating documents table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS documents (
                id SERIAL PRIMARY KEY,
                filename TEXT NOT NULL,
                content_hash TEXT,
                file_path TEXT,
                upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'pending'
            );
        """)
        
        # 2. Add document_id column to learning_chunks if it doesn't exist
        print("checking learning_chunks schema...")
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='learning_chunks' AND column_name='document_id';
        """)
        
        if not cursor.fetchone():
            print("Adding document_id column to learning_chunks...")
            cursor.execute("""
                ALTER TABLE learning_chunks 
                ADD COLUMN document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE;
            """)
            
            print("Creating index on document_id...")
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS learning_chunks_document_id_idx 
                ON learning_chunks (document_id);
            """)
        else:
            print("document_id column already exists.")

        conn.commit()
        print("Migration completed successfully!")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
        sys.exit(1)
    finally:
        cursor.close()
        postgres_conn.close()

if __name__ == "__main__":
    migrate()
