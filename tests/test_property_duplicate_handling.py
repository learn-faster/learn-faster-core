"""Unit tests for graph storage duplicate handling without Neo4j."""

from unittest.mock import MagicMock

import pytest
from pydantic import ValidationError

from src.database.graph_storage import GraphStorage
from src.models.schemas import ConceptNode, PrerequisiteLink


def test_store_concepts_batch_counts_successes():
    storage = GraphStorage()
    storage.store_concept = MagicMock(side_effect=[True, False, True])

    concepts = [ConceptNode(name="Alpha"), ConceptNode(name="Beta"), ConceptNode(name="Gamma")]

    assert storage.store_concepts_batch(concepts) == 2


def test_store_prerequisite_relationship_rejects_invalid_weight():
    storage = GraphStorage()

    with pytest.raises((ValidationError, ValueError)):
        link = PrerequisiteLink(
            source_concept="alpha",
            target_concept="beta",
            weight=1.5,
            reasoning="invalid weight",
        )
        storage.store_prerequisite_relationship(link)


def test_concept_exists_returns_bool():
    storage = GraphStorage()
    storage.connection = MagicMock()
    storage.connection.execute_query.return_value = [{"name": "alpha"}]

    assert storage.concept_exists("Alpha") is True

    storage.connection.execute_query.return_value = []
    assert storage.concept_exists("Alpha") is False


def test_store_prerequisite_relationship_calls_execute_query():
    storage = GraphStorage()
    storage.connection = MagicMock()
    storage.connection.execute_query.side_effect = [
        [{"source": "alpha", "target": "beta"}],
        [{"weight": 0.5}],
    ]

    link = PrerequisiteLink(
        source_concept="alpha",
        target_concept="beta",
        weight=0.5,
        reasoning="test",
    )

    assert storage.store_prerequisite_relationship(link) is True
    assert storage.connection.execute_query.call_count == 2