from __future__ import annotations

from typing import Any, Dict, List, Optional
import re


def normalize_id(table: str, record_id: Optional[str]) -> Optional[str]:
    if not record_id:
        return None
    return record_id if ":" in record_id else f"{table}:{record_id}"


def validate_record_id(table: str, record_id: Optional[str]) -> Optional[str]:
    """
    Ensure record_id is scoped to the expected table and contains only safe characters.
    """
    if not record_id:
        return None
    expected_prefix = f"{table}:"
    if not record_id.startswith(expected_prefix):
        raise ValueError("Invalid record scope")
    if not re.fullmatch(rf"{re.escape(expected_prefix)}[A-Za-z0-9_\\-]+", record_id):
        raise ValueError("Invalid record id format")
    return record_id


def unwrap_query_result(result: Any) -> Any:
    """
    SurrealDB query responses are often a list of statement results:
    [{ "result": [...] , "status": "OK", ... }].
    This helper unwraps the common shape and returns the first statement result.
    """
    if isinstance(result, list) and result:
        first = result[0]
        if isinstance(first, dict) and "result" in first:
            return first["result"]
    return result


def first_record(result: Any) -> Optional[Dict[str, Any]]:
    unwrapped = unwrap_query_result(result)
    if isinstance(unwrapped, list):
        return unwrapped[0] if unwrapped else None
    if isinstance(unwrapped, dict):
        return unwrapped
    return None
