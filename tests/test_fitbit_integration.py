import types
from datetime import datetime, date, timezone

from src.services.fitbit_service import FitbitService
from src.models.fitbit import FitbitToken


class DummySession:
    def close(self):
        pass


class DummyRecord:
    def __init__(self):
        self.date = date(2026, 2, 9)
        self.sleep_duration_hours = 7.4
        self.sleep_efficiency = 86
        self.resting_heart_rate = 58
        self.readiness_score = 91.2
        self.summary = {
            "date": "2026-02-09",
            "sleep_duration_hours": 7.4,
            "sleep_efficiency": 86,
            "resting_heart_rate": 58,
        }
        self.updated_at = datetime(2026, 2, 9, 9, 30)
        self.created_at = datetime(2026, 2, 9, 8, 0)


def _token():
    return FitbitToken(
        user_id=1,
        access_token="token",
        refresh_token="refresh",
        expires_at=int(datetime.now(timezone.utc).timestamp()) + 3600,
        scope="sleep heartrate"
    )


def test_fitbit_daily_metrics_normalization():
    token = _token()
    service = FitbitService(token)

    service.get_sleep_data = lambda date_str: {
        "sleep": [{
            "duration": 7.2 * 3600000,
            "efficiency": 84,
            "startTime": "2026-02-08T23:10:00.000",
            "endTime": "2026-02-09T06:22:00.000"
        }]
    }
    service.get_heart_rate_data = lambda date_str: {
        "activities-heart": [{
            "value": {"restingHeartRate": 60}
        }]
    }

    metrics = service.get_daily_metrics("2026-02-09")
    assert metrics["sleep_duration_hours"] == 7.2
    assert metrics["sleep_efficiency"] == 84
    assert metrics["resting_heart_rate"] == 60
    assert metrics["sleep_start"] == "2026-02-08T23:10:00.000"
    assert metrics["sleep_end"] == "2026-02-09T06:22:00.000"


def test_fitbit_readiness_scoring():
    token = _token()
    service = FitbitService(token)

    metrics = {
        "sleep_duration_hours": 7.5,
        "sleep_efficiency": 85,
        "resting_heart_rate": 55
    }
    readiness = service.compute_readiness(metrics)
    assert readiness is not None
    assert 0 <= readiness <= 100


def test_fitbit_biometric_summary_format(monkeypatch):
    token = _token()
    service = FitbitService(token)

    monkeypatch.setattr("src.services.fitbit_service.SessionLocal", lambda: DummySession())
    monkeypatch.setattr(service, "get_or_refresh_daily_summary", lambda db, target_date, force_refresh=False: DummyRecord())

    summary = service.get_biometric_summary("2026-02-09")
    assert "Sleep:" in summary
    assert "Efficiency" in summary
    assert "Resting HR" in summary
    assert "Readiness" in summary
