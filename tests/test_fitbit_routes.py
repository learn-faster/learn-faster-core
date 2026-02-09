from datetime import datetime, date, timezone
from types import SimpleNamespace

import pytest
from fastapi.testclient import TestClient

from main import app
from src.database.orm import get_db
from src.models.orm import UserSettings
from src.models.fitbit import FitbitToken
from src.services.fitbit_service import FitbitService


class QueryStub:
    def __init__(self, result):
        self.result = result

    def filter(self, *args, **kwargs):
        return self

    def first(self):
        return self.result


class DBStub:
    def __init__(self, user_settings=None, token=None):
        self.user_settings = user_settings
        self.token = token

    def query(self, model):
        if model is UserSettings:
            return QueryStub(self.user_settings)
        if model is FitbitToken:
            return QueryStub(self.token)
        return QueryStub(None)

    def close(self):
        pass


def _token():
    return SimpleNamespace(
        user_id=1,
        access_token="token",
        refresh_token="refresh",
        expires_at=int(datetime.now(timezone.utc).timestamp()) + 3600,
        scope="sleep heartrate"
    )


def _record():
    return SimpleNamespace(
        date=date(2026, 2, 9),
        sleep_duration_hours=7.4,
        sleep_efficiency=86,
        resting_heart_rate=58,
        readiness_score=91.2,
        summary={"sleep_duration_hours": 7.4},
        updated_at=datetime(2026, 2, 9, 9, 30),
        created_at=datetime(2026, 2, 9, 8, 0)
    )


def test_fitbit_status_disconnected():
    db = DBStub(user_settings=None, token=None)
    app.dependency_overrides[get_db] = lambda: db
    client = TestClient(app)
    resp = client.get("/api/fitbit/status")
    assert resp.status_code == 200
    assert resp.json() == {"connected": False}
    app.dependency_overrides.clear()


def test_fitbit_summary_when_connected(monkeypatch):
    user = UserSettings()
    user.id = 1
    user.user_id = "default_user"
    token = _token()
    db = DBStub(user_settings=user, token=token)
    app.dependency_overrides[get_db] = lambda: db

    monkeypatch.setattr(FitbitService, "get_or_refresh_daily_summary", lambda self, db, target_date, force_refresh=False: _record())

    client = TestClient(app)
    resp = client.get("/api/fitbit/summary")
    assert resp.status_code == 200
    data = resp.json()
    assert data["connected"] is True
    assert data["readiness_score"] == 91.2
    assert data["sleep_duration_hours"] == 7.4
    app.dependency_overrides.clear()


def test_fitbit_summary_when_missing_token():
    user = UserSettings()
    user.id = 1
    user.user_id = "default_user"
    db = DBStub(user_settings=user, token=None)
    app.dependency_overrides[get_db] = lambda: db

    client = TestClient(app)
    resp = client.get("/api/fitbit/summary")
    assert resp.status_code == 200
    assert resp.json()["connected"] is False
    app.dependency_overrides.clear()


def test_fitbit_summary_demo_mode(monkeypatch):
    user = UserSettings()
    user.id = 1
    user.user_id = "default_user"
    user.llm_config = {"agent_settings": {"fitbit_demo_mode": True}}
    db = DBStub(user_settings=user, token=None)
    app.dependency_overrides[get_db] = lambda: db

    client = TestClient(app)
    resp = client.get("/api/fitbit/summary")
    assert resp.status_code == 200
    data = resp.json()
    assert data["connected"] is True
    assert data["demo_mode"] is True
    assert data["readiness_score"] is not None
    app.dependency_overrides.clear()


def test_fitbit_refresh(monkeypatch):
    user = UserSettings()
    user.id = 1
    user.user_id = "default_user"
    token = _token()
    db = DBStub(user_settings=user, token=token)
    app.dependency_overrides[get_db] = lambda: db

    monkeypatch.setattr(FitbitService, "get_or_refresh_daily_summary", lambda self, db, target_date, force_refresh=False: _record())

    client = TestClient(app)
    resp = client.post("/api/fitbit/refresh")
    assert resp.status_code == 200
    data = resp.json()
    assert data["connected"] is True
    assert data["readiness_score"] == 91.2
    app.dependency_overrides.clear()
