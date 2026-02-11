"""Deterministic tests for data completeness validation."""

from pydantic import ValidationError
import pytest

from src.models.schemas import PrerequisiteLink, LearningChunk


def test_prerequisite_link_has_required_metadata():
    link = PrerequisiteLink(
        source_concept="alpha",
        target_concept="beta",
        weight=0.7,
        reasoning="alpha is required before beta",
    )

    assert link.weight is not None
    assert link.reasoning is not None
    assert link.reasoning.strip() != ""
    assert 0.0 <= link.weight <= 1.0
    assert link.source_concept
    assert link.target_concept


def test_prerequisite_link_requires_reasoning():
    with pytest.raises((ValidationError, TypeError)):
        PrerequisiteLink(
            source_concept="alpha",
            target_concept="beta",
            weight=0.5,
        )


def test_learning_chunk_has_required_metadata():
    chunk = LearningChunk(
        doc_source="source.md",
        content="Some content",
        concept_tag="concept",
    )

    assert chunk.doc_source and chunk.doc_source.strip() != ""
    assert chunk.content and chunk.content.strip() != ""
    assert chunk.concept_tag and chunk.concept_tag.strip() != ""


def test_learning_chunk_requires_source_metadata():
    with pytest.raises((ValidationError, TypeError)):
        LearningChunk(
            content="Some content",
            concept_tag="concept",
        )


def test_learning_chunk_requires_concept_tag():
    with pytest.raises((ValidationError, TypeError)):
        LearningChunk(
            doc_source="source.md",
            content="Some content",
        )


def test_prerequisite_link_requires_weight():
    with pytest.raises((ValidationError, TypeError)):
        PrerequisiteLink(
            source_concept="alpha",
            target_concept="beta",
            reasoning="reasoning",
        )


def test_prerequisite_link_completeness_invariant():
    original = PrerequisiteLink(
        source_concept="alpha",
        target_concept="beta",
        weight=0.3,
        reasoning="reason",
    )

    data = original.model_dump()
    reconstructed = PrerequisiteLink(**data)

    assert reconstructed.source_concept == original.source_concept
    assert reconstructed.target_concept == original.target_concept
    assert abs(reconstructed.weight - original.weight) < 1e-9
    assert reconstructed.reasoning == original.reasoning


def test_learning_chunk_completeness_invariant():
    original = LearningChunk(
        doc_source="source.md",
        content="Some content",
        concept_tag="concept",
    )

    data = original.model_dump()
    reconstructed = LearningChunk(**data)

    assert reconstructed.doc_source == original.doc_source
    assert reconstructed.content == original.content
    assert reconstructed.concept_tag == original.concept_tag