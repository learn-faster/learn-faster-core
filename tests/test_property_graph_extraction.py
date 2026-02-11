"""Simplified tests for graph extraction structure validation."""

import json
import pytest
from unittest.mock import AsyncMock, patch
from pydantic import ValidationError

from src.ingestion.ingestion_engine import IngestionEngine
from src.models.schemas import GraphSchema, PrerequisiteLink


@pytest.mark.asyncio
async def test_graph_extraction_produces_valid_schema():
    engine = IngestionEngine()
    llm_response = {
        "concepts": ["concept_a", "concept_b"],
        "prerequisites": [
            {
                "source_concept": "concept_a",
                "target_concept": "concept_b",
                "weight": 0.7,
                "reasoning": "A leads to B",
            }
        ],
    }

    with patch(
        "src.services.llm_service.llm_service.get_chat_completion",
        new=AsyncMock(return_value=json.dumps(llm_response)),
    ):
        schema = await engine.extract_graph_structure(["Some markdown content"])

    assert isinstance(schema, GraphSchema)
    assert all(c == c.lower() for c in schema.concepts)
    concept_set = set(schema.concepts)
    for prereq in schema.prerequisites:
        assert prereq.source_concept in concept_set
        assert prereq.target_concept in concept_set
        assert 0.0 <= prereq.weight <= 1.0


def test_validate_graph_structure_consistency():
    engine = IngestionEngine()
    schema = GraphSchema(
        concepts=["a", "b"],
        prerequisites=[
            PrerequisiteLink(
                source_concept="a",
                target_concept="b",
                weight=0.5,
                reasoning="ok",
            )
        ],
    )
    assert engine.validate_graph_structure(schema) is True

    invalid = GraphSchema(
        concepts=["a"],
        prerequisites=[
            PrerequisiteLink(
                source_concept="a",
                target_concept="missing",
                weight=0.5,
                reasoning="bad",
            )
        ],
    )
    assert engine.validate_graph_structure(invalid) is False


@pytest.mark.asyncio
async def test_empty_content_raises_error():
    engine = IngestionEngine()
    with pytest.raises(ValueError, match="Cannot extract graph from empty content chunks"):
        await engine.extract_graph_structure([])


@pytest.mark.asyncio
async def test_invalid_json_response_raises_error():
    engine = IngestionEngine()
    with patch(
        "src.services.llm_service.llm_service.get_chat_completion",
        new=AsyncMock(return_value="Not JSON"),
    ):
        with pytest.raises(ValueError):
            await engine.extract_graph_structure(["Some markdown content"])
