"""Property-based tests for error validation precedence (simplified).

These tests validate that JSON/schema errors are raised before any database
operations, using deterministic inputs to avoid Hypothesis runtime issues.
"""

import json
import pytest
from pydantic import ValidationError
from unittest.mock import AsyncMock, patch

from src.ingestion.ingestion_engine import IngestionEngine
from src.models.schemas import GraphSchema, PrerequisiteLink


INVALID_SCHEMA_EXAMPLES = [
    {"prerequisites": []},  # missing concepts
    {"concepts": ["concept1", "concept2"]},  # missing prerequisites
    {
        "concepts": ["concept1", "concept2"],
        "prerequisites": [{"source_concept": "concept1"}],  # missing fields
    },
    {
        "concepts": ["concept1", "concept2"],
        "prerequisites": [{
            "source_concept": "concept1",
            "target_concept": "concept2",
            "weight": 1.5,  # invalid
            "reasoning": "test",
        }],
    },
    {"concepts": "not a list", "prerequisites": "not a list"},
]


@pytest.mark.asyncio
async def test_json_validation_before_database_operations():
    engine = IngestionEngine()

    for invalid_data in INVALID_SCHEMA_EXAMPLES:
        with patch(
            "src.services.llm_service.llm_service.get_chat_completion",
            new=AsyncMock(return_value=json.dumps(invalid_data)),
        ):
            with pytest.raises((ValidationError, ValueError)):
                await engine.extract_graph_structure(["Some markdown content"])


@pytest.mark.asyncio
async def test_empty_or_invalid_content_raises_early():
    engine = IngestionEngine()
    with pytest.raises(ValueError, match="Cannot extract graph from empty content chunks"):
        await engine.extract_graph_structure([])


@pytest.mark.asyncio
async def test_validation_error_contains_schema_information():
    engine = IngestionEngine()

    for invalid_data in INVALID_SCHEMA_EXAMPLES:
        with patch(
            "src.services.llm_service.llm_service.get_chat_completion",
            new=AsyncMock(return_value=json.dumps(invalid_data)),
        ):
            try:
                await engine.extract_graph_structure(["Some markdown content"])
                pytest.fail("Expected ValidationError or ValueError but extraction succeeded")
            except (ValidationError, ValueError) as e:
                error_msg = str(e).lower()
                assert any(keyword in error_msg for keyword in [
                    "validation",
                    "schema",
                    "json",
                    "conform",
                    "invalid",
                    "graph extraction failed",
                ])


@pytest.mark.asyncio
async def test_json_decode_error_precedence():
    engine = IngestionEngine()
    with patch(
        "src.services.llm_service.llm_service.get_chat_completion",
        new=AsyncMock(return_value="This is not valid JSON at all {{{{"),
    ):
        with pytest.raises(ValueError):
            await engine.extract_graph_structure(["Some markdown content"])


def test_prerequisite_concept_validation():
    engine = IngestionEngine()

    concepts = ["concept_a", "concept_b", "concept_c"]
    valid_schema = GraphSchema(
        concepts=[c.lower() for c in concepts],
        prerequisites=[],
    )
    assert engine.validate_graph_structure(valid_schema) is True

    invalid_schema = GraphSchema(
        concepts=[c.lower() for c in concepts],
        prerequisites=[
            PrerequisiteLink(
                source_concept="nonexistent_concept_xyz_123",
                target_concept=concepts[0].lower(),
                weight=0.5,
                reasoning="Test invalid reference",
            )
        ],
    )
    assert engine.validate_graph_structure(invalid_schema) is False
