"""Unit tests for PathResolver without external databases."""

from unittest.mock import MagicMock

from src.path_resolution.path_resolver import PathResolver, MINUTES_PER_CHUNK


def test_estimate_learning_time_uses_chunk_count():
    resolver = PathResolver()
    resolver.pg_connection = MagicMock()
    resolver.pg_connection.execute_query.return_value = [{"chunk_count": 5}]

    estimate = resolver.estimate_learning_time(["A", "B"])

    assert estimate == 5 * MINUTES_PER_CHUNK


def test_prune_path_by_time_respects_limit():
    resolver = PathResolver()
    times = {"a": 4, "b": 6, "c": 6}

    resolver.estimate_learning_time = lambda concepts: times[concepts[0]]

    pruned, total = resolver.prune_path_by_time(["a", "b", "c"], time_limit=10)

    assert pruned == ["a", "b"]
    assert total == 10


def test_resolve_path_root_target_with_budget():
    resolver = PathResolver()
    resolver.connection = MagicMock()

    resolver.connection.execute_query.side_effect = [
        [{"cnt": 0}],
        [{"completed": []}],
    ]

    resolver.estimate_learning_time = lambda concepts: 4

    result = resolver.resolve_path("u1", "Concept", time_budget_minutes=10)

    assert result is not None
    assert result.concepts == ["concept"]
    assert result.target_concept == "concept"
    assert result.estimated_time_minutes == 4
    assert result.pruned is False


def test_resolve_path_prunes_when_over_budget():
    resolver = PathResolver()
    resolver.connection = MagicMock()

    resolver.connection.execute_query.side_effect = [
        [{"cnt": 1}],
        [{"concepts": ["a", "b", "c"]}],
        [{"completed": []}],
    ]

    resolver.estimate_learning_time = lambda concepts: 12

    pruned_calls = []

    def mock_prune(path, limit):
        pruned_calls.append((path, limit))
        return ["a"], 4

    resolver.prune_path_by_time = mock_prune

    result = resolver.resolve_path("u1", "c", time_budget_minutes=5)

    assert result is not None
    assert result.concepts == ["a"]
    assert result.estimated_time_minutes == 4
    assert result.pruned is True
    assert result.target_concept == "a"
    assert pruned_calls == [(["a", "b", "c"], 5)]