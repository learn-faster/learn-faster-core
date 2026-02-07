"""
Direct pypdf test to diagnose text extraction failure.
"""
import glob
from pypdf import PdfReader

pdfs = glob.glob("data/documents/*.pdf")
print(f"Found PDFs: {pdfs}")

if pdfs:
    target = pdfs[0]
    print(f"\nTesting: {target}")
    
    try:
        reader = PdfReader(target)
        print(f"Total pages: {len(reader.pages)}")
        
        for i, page in enumerate(reader.pages[:3]):  # First 3 pages
            text = page.extract_text() or ""
            print(f"\n--- Page {i+1} ({len(text)} chars) ---")
            print(text[:500] if text else "[EMPTY]")
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
