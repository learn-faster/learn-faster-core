"""
Focused debug script for ingestion extraction.
Tests the exact extraction path that the ingestion engine uses.
"""
import asyncio
import os
import sys

# Add project root to path
sys.path.append(os.getcwd())

from src.ingestion.ingestion_engine import IngestionEngine

async def main():
    engine = IngestionEngine()
    
    sample_chunks = [
        "[Chunk 1] Photosynthesis is the process by which plants convert light energy into chemical energy.",
        "[Chunk 2] Cellular respiration is the process by which cells break down glucose to produce ATP.",
        "[Chunk 3] ATP (adenosine triphosphate) is the primary energy currency of cells.",
        "[Chunk 4] Chlorophyll is the green pigment that captures light energy in photosynthesis.",
        "[Chunk 5] Mitochondria are the organelles where cellular respiration occurs."
    ]
    
    print(f"--- Testing Graph Extraction with {len(sample_chunks)} chunks ---\n")
    
    def progress_callback(msg, pct):
        print(f"[{pct}%] {msg}")
    
    def schema_callback(schema):
        print(f"[INCREMENTAL] Got schema: {len(schema.concepts)} concepts")
        for c in schema.concepts[:3]:
            print(f"  - {c}")
    
    try:
        result_schema = await engine.extract_graph_structure(
            sample_chunks,
            on_progress=progress_callback,
            on_partial_schema=schema_callback
        )
        
        print(f"\n--- FINAL RESULT ---")
        print(f"Concepts ({len(result_schema.concepts)}): {result_schema.concepts}")
        print(f"Prerequisites ({len(result_schema.prerequisites)}): {result_schema.prerequisites}")
        
    except Exception as e:
        print(f"❌ Extraction Failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
