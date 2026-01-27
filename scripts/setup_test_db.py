"""
Script to create the test database 'learnfast_test' if it doesn't exist.
"""
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import sys

# Connection details from src/config.py (but connecting to 'postgres' db to create new db)
DB_HOST = "localhost"
DB_PORT = "5433"
DB_USER = "learnfast"
DB_PASSWORD = "password"
TEST_DB_NAME = "learnfast_test"

def create_test_database():
    try:
        # Connect to default 'postgres' database or 'learnfast' (which we know exists)
        # to create the new database
        conn = psycopg2.connect(
            dbname="learnfast", # Connect to existing DB to create new one
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        # Check if database exists
        cur.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{TEST_DB_NAME}'")
        exists = cur.fetchone()
        
        if not exists:
            print(f"Creating database {TEST_DB_NAME}...")
            cur.execute(f"CREATE DATABASE {TEST_DB_NAME}")
            print(f"Database {TEST_DB_NAME} created successfully.")
        else:
            print(f"Database {TEST_DB_NAME} already exists.")
            
        cur.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"Error creating test database: {e}")
        return False

if __name__ == "__main__":
    if create_test_database():
        sys.exit(0)
    else:
        sys.exit(1)
