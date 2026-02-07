import logging
from src.database.connections import neo4j_conn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_migration():
    """Apply indexes to Neo4j to optimize graph queries."""
    
    commands = [
        # Create index on Concept name for fast lookups
        "CREATE INDEX concept_name_index IF NOT EXISTS FOR (c:Concept) ON (c.name)",
        
        # Create constraint on Concept name to ensure uniqueness (implies index)
        "CREATE CONSTRAINT concept_name_unique IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE",
        
        # Create index on User uid for fast progress lookups
        "CREATE INDEX user_uid_index IF NOT EXISTS FOR (u:User) ON (u.uid)",
        
        # Create constraint on User uid
        "CREATE CONSTRAINT user_uid_unique IF NOT EXISTS FOR (u:User) REQUIRE u.uid IS UNIQUE"
    ]
    
    try:
        logger.info("Starting Neo4j migration...")
        for cmd in commands:
            logger.info(f"Executing: {cmd}")
            neo4j_conn.execute_query(cmd)
        logger.info("Migration completed successfully.")
        
    except Exception as e:
        logger.error(f"Migration failed: {e}")

if __name__ == "__main__":
    run_migration()
