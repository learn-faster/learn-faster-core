"""Compatibility shim for legacy imports."""

from src.database.connections import neo4j_conn

__all__ = ["neo4j_conn"]
