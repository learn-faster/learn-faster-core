from markitdown import MarkItDown
import glob

# Find the PDF
pdfs = glob.glob("data/documents/*.pdf")
print(f"Found PDFs: {pdfs}")

if pdfs:
    m = MarkItDown()
    r = m.convert(pdfs[0])
    text = r.text_content or ""
    print(f"Text length: {len(text)}")
    if text:
        print(f"Preview: {text[:500]}")
    else:
        print("EMPTY - No text extracted!")
