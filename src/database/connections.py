"""Database connection utilities for Neo4j and PostgreSQL."""

import os
from typing import Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
from neo4j import GraphDatabase, Driver
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Neo4jConnection:
    """Neo4j database connection manager."""
    
    def __init__(self, uri: Optional[str] = None, user: Optional[str] = None, password: Optional[str] = None):
        self.uri = uri or os.getenv("NEO4J_URI", "bolt://localhost:7688")
        self.user = user or os.getenv("NEO4J_USER", "neo4j")
        self.password = password or os.getenv("NEO4J_PASSWORD", "password")
        self._driver: Optional[Driver] = None
    
    def connect(self) -> Driver:
        """Establish connection to Neo4j database."""
        if self._driver is None:
            self._driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password))
        return self._driver
    
    def close(self):
        """Close the Neo4j connection."""
        if self._driver:
            self._driver.close()
            self._driver = None
    
    def execute_query(self, query: str, parameters: Optional[dict] = None):
        """Execute a Cypher query and return results."""
        driver = self.connect()
        with driver.session() as session:
            result = session.run(query, parameters or {})
            return [record for record in result]
    
    def execute_write_query(self, query: str, parameters: Optional[dict] = None):
        """Execute a write Cypher query."""
        driver = self.connect()
        with driver.session() as session:
            return session.run(query, parameters or {})


class PostgreSQLConnection:
    """PostgreSQL database connection manager with connection pooling."""
    
    _pool: Optional[SimpleConnectionPool] = None
    
    def __init__(self, host: Optional[str] = None, port: Optional[int] = None, 
                 database: Optional[str] = None, user: Optional[str] = None, 
                 password: Optional[str] = None):
        self.host = host or os.getenv("POSTGRES_HOST", "localhost")
        self.port = port or int(os.getenv("POSTGRES_PORT", "5433"))
        self.database = database or os.getenv("POSTGRES_DB", "learnfast")
        self.user = user or os.getenv("POSTGRES_USER", "learnfast")
        self.password = password or os.getenv("POSTGRES_PASSWORD", "password")
        self._connection = None
    
    @classmethod
    def _get_pool(cls, host: str, port: int, database: str, user: str, password: str) -> SimpleConnectionPool:
        """Get or create a connection pool."""
        if cls._pool is None:
            cls._pool = SimpleConnectionPool(
                minconn=2,
                maxconn=20,
                host=host,
                port=port,
                database=database,
                user=user,
                password=password
            )
        return cls._pool
    
    def connect(self):
        """Establish connection to PostgreSQL database using pool."""
        pool = self._get_pool(self.host, self.port, self.database, self.user, self.password)
        self._connection = pool.getconn()
        return self._connection
    
    def close(self):
        """Return connection to pool."""
        if self._connection:
            pool = self._get_pool(self.host, self.port, self.database, self.user, self.password)
            pool.putconn(self._connection)
            self._connection = None
    
    def execute_query(self, query: str, parameters: Optional[tuple] = None):
        """Execute a SQL query and return results."""
        conn = self.connect()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, parameters or ())
                
                # Check if it's a SELECT query to avoid unnecessary commits
                is_select = query.strip().upper().startswith("SELECT")
                
                if cursor.description:
                    result = cursor.fetchall()
                    # If it returns data but isn't a SELECT (e.g., INSERT ... RETURNING), we must commit
                    if not is_select:
                        conn.commit()
                    return result
                else:
                    conn.commit()
                    return cursor.rowcount
        except Exception as e:
            conn.rollback()
            # If transaction is aborted, close connection to force reconnect
            if "transaction is aborted" in str(e):
                self.close()
            raise e
    
    def execute_many(self, query: str, parameters_list: list):
        """Execute a SQL query with multiple parameter sets."""
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.executemany(query, parameters_list)
            conn.commit()
            return cursor.rowcount


# Global connection instances
neo4j_conn = Neo4jConnection()
postgres_conn = PostgreSQLConnection()