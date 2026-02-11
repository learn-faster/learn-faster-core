"""Deterministic tests for content chunk tagging consistency."""

from src.ingestion.document_processor import DocumentProcessor


def test_chunk_tagging_consistency():
    processor = DocumentProcessor()
    content = "First paragraph.\n\nSecond paragraph.\n\nThird paragraph."
    tag = "test_concept"

    chunks = processor.chunk_content(content, concept_tag=tag)

    assert chunks, "Expected at least one chunk"
    for chunk in chunks:
        assert isinstance(chunk, tuple)
        assert len(chunk) == 2
        chunk_content, chunk_tag = chunk
        assert isinstance(chunk_content, str)
        assert isinstance(chunk_tag, str)
        assert chunk_tag == tag


def test_chunk_size_respected():
    processor = DocumentProcessor(chunk_size=100)
    content = ("word " * 500).strip()

    chunks = processor.chunk_content(content, concept_tag="size_test")

    for chunk_content, _ in chunks:
        assert len(chunk_content) <= 200


def test_chunk_content_completeness():
    processor = DocumentProcessor(chunk_size=80)
    content = "Alpha paragraph.\n\nBeta paragraph.\n\nGamma paragraph."

    chunks = processor.chunk_content(content, concept_tag="test")

    assert chunks

    reconstructed = "\n\n".join(chunk_content for chunk_content, _ in chunks)
    assert "Alpha" in reconstructed
    assert "Beta" in reconstructed
    assert "Gamma" in reconstructed


def test_empty_tag_handling():
    processor = DocumentProcessor()
    content = "Some content to chunk."

    chunks = processor.chunk_content(content, concept_tag="")

    for _, chunk_tag in chunks:
        assert chunk_tag == ""