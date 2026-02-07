"""
Test MarkItDown directly on a specific document.
"""
import sys
sys.path.append(".")

from markitdown import MarkItDown
from pathlib import Path

# Find the document
docs_dir = Path("./data/documents")
files = list(docs_dir.glob("*.pdf"))

print(f"Found {len(files)} PDF files:")
for f in files:
    print(f"  - {f.name} ({f.stat().st_size / 1024:.1f} KB)")

if files:
    target = files[0]
    print(f"\nTesting extraction on: {target.name}")
    
    converter = MarkItDown()
    try:
        result = converter.convert(str(target))
        text = result.text_content or ""
        
        print(f"\n--- RESULT ---")
        print(f"Text length: {len(text)} characters")
        print(f"First 500 chars:\n{text[:500]}")
        
        if not text.strip():
            print("\n⚠️ WARNING: Extraction returned empty text!")
            print("This could be a scanned PDF or image-based document.")
    except Exception as e:
        print(f"❌ Extraction failed: {e}")
else:
    print("No PDF files found in data/documents")
