"""Opik observability helpers."""
from __future__ import annotations

import logging
import os
from typing import Any, Dict, Optional

from src.config import settings

logger = logging.getLogger(__name__)

try:
    from opik import configure as _opik_configure
    from opik import opik_context as _opik_context
    from opik import start_as_current_trace as _start_as_current_trace
except Exception as e:  # pragma: no cover
    _opik_configure = None
    _opik_context = None
    _start_as_current_trace = None
    logger.warning(f"Opik import failed: {e}")


def opik_available() -> bool:
    return _opik_configure is not None


def build_opik_config(user_settings: Optional[Any] = None) -> Dict[str, Any]:
    cfg: Dict[str, Any] = {}
    if user_settings and getattr(user_settings, "llm_config", None):
        try:
            cfg = (user_settings.llm_config or {}).get("opik", {})
        except Exception:
            cfg = {}
    return {
        "enabled": bool(cfg.get("enabled", settings.use_opik)),
        "api_key": cfg.get("api_key") or settings.opik_api_key,
        "workspace": cfg.get("workspace") or settings.opik_workspace,
        "url_override": cfg.get("url_override") or settings.opik_url_override,
        "project_name": cfg.get("project_name") or settings.opik_project,
        "use_local": bool(cfg.get("use_local", settings.opik_use_local)),
    }


def init_opik(config: Dict[str, Any]) -> bool:
    if not opik_available() or not config.get("enabled"):
        return False

    api_key = config.get("api_key")
    workspace = config.get("workspace")
    url_override = config.get("url_override")
    use_local = bool(config.get("use_local"))

    if api_key:
        os.environ["OPIK_API_KEY"] = api_key
    if workspace:
        os.environ["OPIK_WORKSPACE"] = workspace
    if url_override:
        os.environ["OPIK_URL_OVERRIDE"] = url_override

    try:
        kwargs: Dict[str, Any] = {
            "automatic_approvals": True,
        }
        if api_key:
            kwargs["api_key"] = api_key
        if workspace:
            kwargs["workspace"] = workspace
        if url_override:
            kwargs["url"] = url_override
        if use_local:
            kwargs["use_local"] = True
        _opik_configure(**kwargs)
        return True
    except Exception as e:
        logger.warning(f"Opik configuration failed: {e}")
        return False


def get_opik_context():
    return _opik_context


def get_trace_context_manager():
    return _start_as_current_trace
