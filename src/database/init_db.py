"""Database initialization utilities for LearnFast Core Engine."""

import os
from pathlib import Path
from .connections import neo4j_conn, postgres_conn
from .graph_storage import graph_storage


def initialize_neo4j_constraints():
    """Initialize Neo4j constraints and indexes using GraphStorage."""
    try:
        # Use the dedicated graph storage module for constraint initialization
        graph_storage.initialize_constraints()
        print("Neo4j constraints initialized successfully using GraphStorage")
        return True
    except Exception as e:
        print(f"Neo4j constraint initialization failed: {e}")
        return False


def verify_postgres_schema():
    """Verify PostgreSQL schema is properly initialized."""
    try:
        # Check if learning_chunks table exists
        result = postgres_conn.execute_query("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'learning_chunks'
        """)
        
        if not result:
            raise Exception("learning_chunks table not found. Please run Docker Compose to initialize the database.")
        
        # Check if pgvector extension is available
        result = postgres_conn.execute_query("""
            SELECT extname FROM pg_extension WHERE extname = 'vector'
        """)
        
        if not result:
            raise Exception("pgvector extension not found. Please ensure PostgreSQL container has pgvector installed.")
        
        print("PostgreSQL schema verification successful")
        return True
        
    except Exception as e:
        print(f"PostgreSQL schema verification failed: {e}")
        return False


def initialize_databases():
    """Initialize both Neo4j and PostgreSQL databases."""
    print("Initializing databases...")
    
    # Initialize Neo4j constraints
    try:
        initialize_neo4j_constraints()
        print("Neo4j constraints initialized successfully")
    except Exception as e:
        print(f"Neo4j initialization failed: {e}")
        return False
    
    # Verify PostgreSQL schema
    if not verify_postgres_schema():
        return False
    
    print("Database initialization completed successfully")
    return True


def check_concept_uniqueness_constraint():
    """Check if concept name uniqueness constraint is enforced using GraphStorage."""
    try:
        return graph_storage.verify_constraints()
    except Exception as e:
        print(f"Error checking concept uniqueness constraint: {e}")
        return False


if __name__ == "__main__":
    initialize_databases()