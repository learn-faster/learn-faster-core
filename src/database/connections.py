"""Database connection utilities for Neo4j and PostgreSQL."""

import os
import subprocess
import socket
from typing import Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
from neo4j import GraphDatabase, Driver
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def _get_wsl_ip() -> Optional[str]:
    """
    Get the WSL2 virtual IP address.
    Returns None if not running in WSL or if detection fails.
    """
    try:
        # Check if we're in WSL
        wsl_distro = os.environ.get("WSL_DISTRO_NAME")
        if not wsl_distro:
            # Check via /proc/version for WSL indicator
            with open("/proc/version", "r") as f:
                if "microsoft" not in f.read().lower():
                    return None
        
        # Get WSL IP by querying the gateway
        result = subprocess.run(
            ["ip", "route", "show", "default"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            # Parse the gateway IP from the default route
            lines = result.stdout.strip().split("\n")
            for line in lines:
                if "default via" in line:
                    parts = line.split()
                    gateway_idx = parts.index("via") + 1
                    if gateway_idx < len(parts):
                        return parts[gateway_idx]
        return None
    except Exception:
        return None


def _get_connection_host() -> str:
    """
    Get the appropriate host for database connections.
    Automatically detects WSL and returns the correct IP.
    """
    # Check for explicit override first
    explicit_host = os.getenv("DOCKER_HOST_OVERRIDE")
    if explicit_host:
        return explicit_host
    
    # Detect environment
    is_windows = os.name == "nt"
    wsl_ip = _get_wsl_ip()
    
    if is_windows and wsl_ip:
        # Running on Windows, Docker is in WSL - use WSL IP
        return wsl_ip
    
    # Default to localhost or environment variable
    return os.getenv("NEO4J_HOST", "localhost")


class Neo4jConnection:
    """Neo4j database connection manager."""
    
    def __init__(self, uri: Optional[str] = None, user: Optional[str] = None, password: Optional[str] = None):
        host = _get_connection_host()
        default_uri = f"bolt://{host}:7688"
        self.uri = uri or os.getenv("NEO4J_URI", default_uri)
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
        # Auto-detect host for WSL
        db_host = host or _get_connection_host()
        self.host = os.getenv("POSTGRES_HOST", db_host)
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
        """Get a connection from the pool."""
        pool = self._get_pool(self.host, self.port, self.database, self.user, self.password)
        return pool.getconn()
    
    def close(self, conn):
        """Return a connection to the pool."""
        if self._pool:
            self._pool.putconn(conn)
    
    def close_all(self):
        """Close all pooled connections."""
        if self._pool:
            self._pool.closeall()
            self._pool = None
    
    def execute_query(self, query: str, parameters: Optional[dict] = None):
        """Execute a query and return results. Auto-commits for INSERT/UPDATE/DELETE."""
        conn = self.connect()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(query, parameters or {})
                # Check if the query returns rows (SELECT) or not (UPDATE/INSERT/DELETE)
                try:
                    result = cursor.fetchall()
                    # Auto-commit for non-SELECT queries
                    if query.strip().upper().startswith(('INSERT', 'UPDATE', 'DELETE')):
                        conn.commit()
                    return result
                except psycopg2.ProgrammingError:
                    # No results to fetch (e.g., UPDATE/DELETE without RETURNING)
                    # Still commit for these queries
                    if query.strip().upper().startswith(('INSERT', 'UPDATE', 'DELETE')):
                        conn.commit()
                    return []
        finally:
            self.close(conn)
    
    def execute_write(self, query: str, parameters: Optional[dict] = None):
        """Execute a write query."""
        conn = self.connect()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, parameters or {})
                conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            self.close(conn)


# Module-level instances for convenience
postgres_conn = PostgreSQLConnection()
neo4j_conn = Neo4jConnection()
