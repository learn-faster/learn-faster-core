"""
Test the updated DocumentProcessor with pypdf fallback.
"""
import sys
sys.path.append(".")

from src.ingestion.document_processor import DocumentProcessor
import glob

# Find the PDF
pdfs = glob.glob("data/documents/*.pdf")
print(f"Found PDFs: {pdfs}")

if pdfs:
    processor = DocumentProcessor()
    text, images = processor.convert_to_markdown(pdfs[0])
    print(f"\nText length: {len(text)} characters")
    if text:
        print(f"Preview:\n{text[:1000]}")
    else:
        print("EMPTY - No text extracted!")
