"""Deterministic tests for document conversion consistency."""

import tempfile
from pathlib import Path

from src.ingestion.document_processor import DocumentProcessor


def test_document_conversion_produces_valid_output():
    processor = DocumentProcessor()

    with tempfile.NamedTemporaryFile(mode="w", suffix=".html", delete=False, encoding="utf-8") as f:
        html_content = """<!DOCTYPE html>
<html>
<head><title>Test Document</title></head>
<body>
<p>Hello World</p>
</body>
</html>"""
        f.write(html_content)
        temp_path = f.name

    try:
        result = processor.convert_to_markdown(temp_path)

        assert isinstance(result, tuple)
        markdown, image_metadata = result
        assert isinstance(markdown, str)
        assert isinstance(image_metadata, list)
        assert markdown.strip()
        assert "Hello" in markdown
    finally:
        Path(temp_path).unlink(missing_ok=True)


def test_document_conversion_handles_unsupported_formats():
    processor = DocumentProcessor()

    with tempfile.NamedTemporaryFile(mode="w", suffix=".xyz", delete=False, encoding="utf-8") as f:
        f.write("Some content")
        temp_path = f.name

    try:
        try:
            processor.convert_to_markdown(temp_path)
            assert False, "Should have raised ValueError for unsupported format"
        except ValueError as exc:
            assert "Unsupported file format" in str(exc)
    finally:
        Path(temp_path).unlink(missing_ok=True)


def test_document_conversion_handles_missing_files():
    processor = DocumentProcessor()

    try:
        processor.convert_to_markdown("/nonexistent/path/to/file.pdf")
        assert False, "Should have raised FileNotFoundError"
    except FileNotFoundError:
        pass