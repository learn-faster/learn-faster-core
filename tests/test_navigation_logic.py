"""Unit tests for navigation logic without external Neo4j dependencies."""

from unittest.mock import MagicMock

import pytest

from src.navigation.navigation_engine import NavigationEngine
from src.navigation.user_tracker import UserProgressTracker
import src.navigation.user_tracker as user_tracker_module


def test_find_root_concepts_returns_names():
    engine = NavigationEngine()
    engine.connection = MagicMock()
    engine.connection.execute_query.return_value = [{"name": "root_a"}, {"name": "root_b"}]

    assert engine.find_root_concepts() == ["root_a", "root_b"]


def test_get_path_preview_uses_depth_and_dedupes():
    engine = NavigationEngine()
    engine.connection = MagicMock()
    engine.connection.execute_query.return_value = [
        {"name": "alpha"},
        {"name": "beta"},
        {"name": "beta"},
    ]

    result = engine.get_path_preview("Alpha", depth=2)

    assert result == ["alpha", "beta"]

    query, params = engine.connection.execute_query.call_args[0]
    assert "*0..2" in query
    assert params["root_name"] == "alpha"


def test_validate_prerequisites_true_when_none_missing():
    engine = NavigationEngine()
    engine.connection = MagicMock()
    engine.connection.execute_query.return_value = [{"missing_prerequisites": 0}]

    assert engine.validate_prerequisites("u1", "Concept") is True


def test_get_unlocked_concepts_returns_list():
    engine = NavigationEngine()
    engine.connection = MagicMock()
    engine.connection.execute_query.return_value = [{"name": "alpha"}, {"name": "beta"}]

    assert engine.get_unlocked_concepts("u1") == ["alpha", "beta"]


def test_user_tracker_marks_progress(monkeypatch):
    tracker = UserProgressTracker()
    tracker.connection = MagicMock()
    tracker.navigation = MagicMock()
    tracker.navigation.validate_prerequisites.return_value = True

    mock_graph_storage = MagicMock()
    mock_graph_storage.store_user.return_value = True
    mock_graph_storage.concept_exists.return_value = True
    monkeypatch.setattr(user_tracker_module, "graph_storage", mock_graph_storage)

    assert tracker.mark_in_progress("user1", "Concept") is True
    tracker.connection.execute_write_query.assert_called_once()


def test_user_tracker_completes_progress(monkeypatch):
    tracker = UserProgressTracker()
    tracker.connection = MagicMock()

    mock_graph_storage = MagicMock()
    mock_graph_storage.store_user.return_value = True
    mock_graph_storage.concept_exists.return_value = True
    monkeypatch.setattr(user_tracker_module, "graph_storage", mock_graph_storage)

    assert tracker.mark_completed("user1", "Concept") is True
    tracker.connection.execute_write_query.assert_called_once()


def test_user_tracker_get_user_state(monkeypatch):
    tracker = UserProgressTracker()
    tracker.connection = MagicMock()
    tracker.connection.execute_query.side_effect = [
        [{"name": "completed"}],
        [{"name": "in_progress"}],
    ]
    tracker.navigation = MagicMock()
    tracker.navigation.get_unlocked_concepts.return_value = ["unlocked"]

    state = tracker.get_user_state("user1")
    assert state.completed_concepts == ["completed"]
    assert state.in_progress_concepts == ["in_progress"]
    assert state.available_concepts == ["unlocked"]