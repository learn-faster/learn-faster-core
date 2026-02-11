"""
Tests for Content Retriever ordering and generation behavior.
"""

import pytest

from src.path_resolution.content_retriever import ContentRetriever
from src.models.schemas import LearningChunk


@pytest.mark.asyncio
async def test_content_ordering():
    """
    Content ordering should preserve input concept order when building raw content.
    """
    retriever = ContentRetriever()
    concepts = ["alpha", "beta", "gamma"]

    original_retrieve = retriever.retrieve_chunks_by_concept
    original_cached = retriever._get_cached_lesson
    original_cache = retriever._cache_lesson
    original_rewrite = retriever._rewrite_with_llm

    def mock_retrieve(concept):
        return [
            LearningChunk(
                id=1,
                doc_source="test.md",
                content=f"Content for {concept}",
                concept_tag=concept,
            )
        ]

    async def mock_rewrite(target_concept, time_budget, raw_content, completed_concepts=None):
        return raw_content

    retriever.retrieve_chunks_by_concept = mock_retrieve
    retriever._get_cached_lesson = lambda *args, **kwargs: None
    retriever._cache_lesson = lambda *args, **kwargs: None
    retriever._rewrite_with_llm = mock_rewrite

    try:
        lesson = await retriever.get_lesson_content(concepts, time_budget_minutes=30)

        last_index = -1
        for concept in concepts:
            marker = f"(Concept: {concept})"
            idx = lesson.find(marker)
            assert idx != -1, f"Marker for {concept} missing"
            assert idx > last_index, f"Marker for {concept} out of order"
            last_index = idx
    finally:
        retriever.retrieve_chunks_by_concept = original_retrieve
        retriever._get_cached_lesson = original_cached
        retriever._cache_lesson = original_cache
        retriever._rewrite_with_llm = original_rewrite


@pytest.mark.asyncio
async def test_lesson_generation_fallback():
    """
    When no chunks exist, the retriever should generate a lesson from scratch.
    """
    retriever = ContentRetriever()
    concepts = ["alpha", "beta"]

    original_retrieve = retriever.retrieve_chunks_by_concept
    original_cached = retriever._get_cached_lesson
    original_cache = retriever._cache_lesson
    original_generate = retriever._generate_lesson_from_scratch

    retriever.retrieve_chunks_by_concept = lambda concept: []
    retriever._get_cached_lesson = lambda *args, **kwargs: None
    retriever._cache_lesson = lambda *args, **kwargs: None

    calls = []

    async def mock_generate(target_concept, time_budget):
        calls.append((target_concept, time_budget))
        return "LESSON"

    retriever._generate_lesson_from_scratch = mock_generate

    try:
        lesson = await retriever.get_lesson_content(concepts, time_budget_minutes=25)
        assert lesson == "LESSON"
        assert calls == [("beta", 25)]
    finally:
        retriever.retrieve_chunks_by_concept = original_retrieve
        retriever._get_cached_lesson = original_cached
        retriever._cache_lesson = original_cache
        retriever._generate_lesson_from_scratch = original_generate