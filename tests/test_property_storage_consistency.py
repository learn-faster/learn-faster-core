"""Deterministic tests for vector storage behavior without external services."""

from unittest.mock import MagicMock, AsyncMock

import pytest

from src.ingestion.vector_storage import VectorStorage


@pytest.mark.asyncio
async def test_store_and_retrieve_chunk_round_trip():
    storage = VectorStorage()
    storage.db_conn = MagicMock()
    storage.generate_embedding = AsyncMock(return_value=[0.1, 0.2, 0.3])

    storage.db_conn.execute_query.side_effect = [
        [{"id": 1}],
        [
            {
                "id": 1,
                "doc_source": "source.md",
                "content": "Hello",
                "concept_tag": "concept",
                "created_at": None,
            }
        ],
    ]

    chunk_id = await storage.store_chunk("source.md", "Hello", "concept")
    assert chunk_id == 1

    chunks = storage.retrieve_chunks_by_concept("concept")
    assert len(chunks) == 1
    assert chunks[0].doc_source == "source.md"
    assert chunks[0].content == "Hello"
    assert chunks[0].concept_tag == "concept"


@pytest.mark.asyncio
async def test_similarity_search_returns_scores():
    storage = VectorStorage()
    storage.db_conn = MagicMock()
    storage.generate_embedding = AsyncMock(return_value=[0.1, 0.2, 0.3])

    storage.db_conn.execute_query.return_value = [
        {
            "id": 2,
            "doc_source": "source.md",
            "content": "Hello",
            "concept_tag": "concept",
            "created_at": None,
            "similarity": 0.9,
        }
    ]

    results = await storage.similarity_search("Hello", limit=5)
    assert len(results) == 1
    chunk, score = results[0]
    assert chunk.id == 2
    assert 0.0 <= score <= 1.0


def test_get_chunk_count_by_concept():
    storage = VectorStorage()
    storage.db_conn = MagicMock()
    storage.db_conn.execute_query.return_value = [{"count": 2}]

    count = storage.get_chunk_count_by_concept("concept")
    assert count == 2