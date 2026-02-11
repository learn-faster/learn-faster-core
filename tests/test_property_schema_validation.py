"""Deterministic tests for schema validation."""

from pydantic import ValidationError
import pytest

from src.models.schemas import GraphSchema, PrerequisiteLink, UserState


def test_graph_schema_json_round_trip():
    schema = GraphSchema(
        concepts=["alpha", "beta", "gamma"],
        prerequisites=[
            PrerequisiteLink(
                source_concept="alpha",
                target_concept="beta",
                weight=0.6,
                reasoning="alpha before beta",
            ),
            PrerequisiteLink(
                source_concept="beta",
                target_concept="gamma",
                weight=0.4,
                reasoning="beta before gamma",
            ),
        ],
    )

    json_data = schema.model_dump()
    reconstructed = GraphSchema(**json_data)

    assert reconstructed.concepts == schema.concepts
    assert len(reconstructed.prerequisites) == len(schema.prerequisites)

    for orig, recon in zip(schema.prerequisites, reconstructed.prerequisites):
        assert recon.source_concept == orig.source_concept
        assert recon.target_concept == orig.target_concept
        assert abs(recon.weight - orig.weight) < 1e-9
        assert recon.reasoning == orig.reasoning


def test_prerequisite_link_validation():
    link = PrerequisiteLink(
        source_concept="alpha",
        target_concept="beta",
        weight=0.9,
        reasoning="alpha before beta",
    )

    assert 0.0 <= link.weight <= 1.0
    assert link.source_concept
    assert link.target_concept
    assert link.reasoning
    assert link.source_concept != link.target_concept


def test_prerequisite_link_weight_validation():
    valid = PrerequisiteLink(
        source_concept="alpha",
        target_concept="beta",
        weight=0.2,
        reasoning="valid",
    )
    assert valid.weight == 0.2

    with pytest.raises(ValidationError):
        PrerequisiteLink(
            source_concept="alpha",
            target_concept="beta",
            weight=1.2,
            reasoning="invalid",
        )


def test_user_state_json_round_trip():
    state = UserState(
        user_id="user1",
        completed_concepts=["a"],
        in_progress_concepts=["b"],
        available_concepts=["c"],
    )

    json_data = state.model_dump()
    reconstructed = UserState(**json_data)

    assert reconstructed.user_id == state.user_id
    assert reconstructed.completed_concepts == state.completed_concepts
    assert reconstructed.in_progress_concepts == state.in_progress_concepts
    assert reconstructed.available_concepts == state.available_concepts