"""Unit tests for project initialization helpers without Neo4j."""

import src.database.init_db as init_db


def test_initialize_neo4j_constraints_success(monkeypatch):
    monkeypatch.setattr(init_db.graph_storage, "initialize_constraints", lambda: True)

    assert init_db.initialize_neo4j_constraints() is True


def test_initialize_neo4j_constraints_failure(monkeypatch):
    def raise_error():
        raise RuntimeError("boom")

    monkeypatch.setattr(init_db.graph_storage, "initialize_constraints", raise_error)

    assert init_db.initialize_neo4j_constraints() is False


def test_check_concept_uniqueness_constraint(monkeypatch):
    monkeypatch.setattr(init_db.graph_storage, "verify_constraints", lambda: True)
    assert init_db.check_concept_uniqueness_constraint() is True

    monkeypatch.setattr(init_db.graph_storage, "verify_constraints", lambda: False)
    assert init_db.check_concept_uniqueness_constraint() is False