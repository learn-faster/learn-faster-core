import json
from datetime import datetime, timezone
from types import SimpleNamespace

import pytest
from langchain_core.messages import HumanMessage

from src.models.agent import AgentState, UserContext
from src.services.goal_agent import GoalManifestationAgent
from src.services.llm_service import llm_service
from src.models.fitbit import FitbitToken


class QueryStub:
    def __init__(self, result):
        self.result = result

    def filter(self, *args, **kwargs):
        return self

    def first(self):
        return self.result


class DBStub:
    def __init__(self, token=None):
        self.token = token

    def query(self, model):
        if model is FitbitToken:
            return QueryStub(self.token)
        return QueryStub(None)

    def close(self):
        pass


@pytest.mark.asyncio
async def test_agent_includes_fitbit_summary(monkeypatch):
    token = SimpleNamespace(
        user_id="default_user",
        access_token="token",
        refresh_token="refresh",
        expires_at=int(datetime.now(timezone.utc).timestamp()) + 3600,
        scope="sleep heartrate"
    )
    db = DBStub(token=token)

    monkeypatch.setattr("src.database.orm.SessionLocal", lambda: db)
    monkeypatch.setattr("src.services.fitbit_service.FitbitService.get_biometric_summary", lambda self, date_str: "Sleep: 7.5 hours (Efficiency: 85%). Resting HR: 60 bpm. Readiness: 90.")

    captured = {}

    async def fake_chat_completion(messages, response_format=None, config=None):
        captured["messages"] = messages
        return json.dumps({"next_step": "respond", "reasoning": "ok"})

    monkeypatch.setattr(llm_service, "get_chat_completion", fake_chat_completion)

    agent = GoalManifestationAgent()
    state = {
        "messages": [HumanMessage(content="Hello")],
        "agent_state": AgentState(
            user_context=UserContext(user_id="default_user", use_biometrics=True, preferences={"biometrics_mode": "intensity"})
        )
    }

    await agent.planner_node(state)
    system_prompt = captured["messages"][0]["content"]
    assert "Biometrics:" in system_prompt
    assert "Sleep: 7.5 hours" in system_prompt


@pytest.mark.asyncio
async def test_agent_uses_demo_fitbit_summary(monkeypatch):
    db = DBStub(token=None)
    monkeypatch.setattr("src.database.orm.SessionLocal", lambda: db)
    monkeypatch.setattr("src.services.fitbit_service.FitbitService.demo_metrics", lambda target_date: {
        "date": target_date.strftime("%Y-%m-%d"),
        "sleep_duration_hours": 7.8,
        "sleep_efficiency": 89,
        "resting_heart_rate": 56,
        "sleep_start": "2026-02-09T00:10:00.000",
        "sleep_end": "2026-02-09T07:55:00.000"
    })

    captured = {}

    async def fake_chat_completion(messages, response_format=None, config=None):
        captured["messages"] = messages
        return json.dumps({"next_step": "respond", "reasoning": "ok"})

    monkeypatch.setattr(llm_service, "get_chat_completion", fake_chat_completion)

    agent = GoalManifestationAgent()
    state = {
        "messages": [HumanMessage(content="Hello")],
        "agent_state": AgentState(
            user_context=UserContext(
                user_id="default_user",
                use_biometrics=True,
                preferences={"biometrics_mode": "intensity", "fitbit_demo_mode": True}
            )
        )
    }

    await agent.planner_node(state)
    system_prompt = captured["messages"][0]["content"]
    assert "demo mode" in system_prompt.lower()
    assert "Sleep: 7.8 hours" in system_prompt
