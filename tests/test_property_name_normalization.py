"""Deterministic tests for concept name normalization."""

from src.ingestion.ingestion_engine import IngestionEngine


def test_normalize_concept_name_produces_lowercase():
    engine = IngestionEngine()
    name = "  MiXeD Case  "

    normalized = engine._normalize_concept_name(name)

    assert normalized == "mixed case"
    assert normalized == normalized.lower()
    assert normalized == normalized.strip()


def test_normalize_concept_name_idempotence():
    engine = IngestionEngine()
    name = "  Algebra  "

    normalized_once = engine._normalize_concept_name(name)
    normalized_twice = engine._normalize_concept_name(normalized_once)

    assert normalized_once == normalized_twice


def test_normalize_concept_name_case_insensitive_equality():
    engine = IngestionEngine()
    name1 = "Graph Theory"
    name2 = "gRaPh tHeOrY"

    normalized1 = engine._normalize_concept_name(name1)
    normalized2 = engine._normalize_concept_name(name2)

    assert normalized1 == normalized2


def test_normalize_preserves_content():
    engine = IngestionEngine()
    name = "  Data-Structures  "

    normalized = engine._normalize_concept_name(name)

    assert normalized == name.strip().lower()