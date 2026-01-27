# LearnFast Core: Technical Whitepaper

## 1. Executive Summary
LearnFast Core is a high-performance engine designed to bridge the gap between unstructured educational resources and structured pedagogical frameworks. In an era of informational overload, the ability to automatically synthesize PDFs, YouTube transcripts, and documentation into a navigable Knowledge Graph is transformative. 

LearnFast Core leverages state-of-the-art Large Language Models (LLMs) via Ollama, combined with robust graph database traversals in Neo4j, to enable personalized learning paths. By mapping concepts and their prerequisite dependencies, the system provides learners with a clear, structured roadmap through complex subjects, supported by granular progress tracking and vector-based content retrieval.

## 2. System Architecture

The architecture of LearnFast Core is built on the principle of "Content Transformation." The system takes raw, heterogeneous data and refines it through multiple layers until it reaches a structured state suitable for navigation and reasoning.

```mermaid
graph LR
    User([User]) <--> API[FastAPI Web Server]
    
    subgraph Ingestion_Layer ["Ingestion Layer (Acquisition & Refinement)"]
        YT[YouTube URL] --> YTD[yt-dlp]
        FILES[Local Files / PDF / MD] --> MID[Markitdown]
        YTD --> MID
        MID --> DP[Document Processor]
        DP --> IE[Ingestion Engine]
        IE --> LLM[LLM Service (OpenAI/Groq/Ollama)]
        IE --> VS[Vector Storage]
        VS --> LLM
    end
    
    subgraph Storage_Layer ["Storage Layer (Persistence & Retrieval)"]
        DS[Document Store] --> PG[(PostgreSQL)]
        IE --> VS[Vector Storage]
        IE --> GS[Graph Storage]
        GS --> Neo4j[(Neo4j)]
    end
    
    subgraph Engine_Layer ["Core Engine Layer"]
        NE[Navigation Engine]
        UT[User Tracker]
    end
    
    API <--> NE
    API <--> UT
    API <--> DS
    NE <--> Neo4j
    UT <--> Neo4j
```

### 2.1 Component Rationales & Design Philosophy

The choice of technologies reflects a commitment to privacy, performance, and structural integrity.

- **Neo4j & The Graph First approach**: Traditional relational databases struggle with recursive dependency trees. neo4j was selected because prerequisite mapping is naturally a directed acyclic graph (DAG). By using Cypher queries, we can resolve complex learning paths across hundreds of nodes with sub-millisecond latency.
- **Markitdown & Data Normalization**: To ensure the Ingestion Engine operates on high-quality text, we utilize Microsoft's `markitdown`. This allows us to treat PDFs, Office documents, and YouTube transcripts as uniform Markdown content, which is significantly easier for LLMs to parse and structure.
- **yt-dlp Implementation**: Integrated `yt-dlp` provides a resilient mechanism for capturing YouTube transcripts.
- **Multi-Provider LLM Support**: LearnFast Core is vendor-agnostic. While it supports local privacy-first execution via Ollama, it can also leverage cloud providers like OpenAI or Groq for higher throughput and reasoning capabilities depending on deployment needs.

## 3. The Data Journey

### 3.1 The Knowledge Graph (Neo4j)
The graph is the heart of the system. It doesn't just store data; it stores the *logic* of the curriculum.
- **Concept Nodes**: Lowercase, normalized unique identifiers for atoms of knowledge.
- **Prerequisite Links**: Weighted edges that define the directed flow of learning. A weight of `1.0` indicates a strict dependency, while lower weights suggest helpful but non-critical background info.
- **User Progress**: Users are first-class citizens in the graph, linked to concepts via `IN_PROGRESS` and `COMPLETED` edges. This enables the Navigation Engine to perform "sub-graph filtering" to show only what the user is ready for.

### 3.2 Relational & Vector Persistence
Complementing the graph is a dual-storage strategy:
- **PostgreSQL**: Manages the "Document Lifecycle." It tracks the origin of all data, maintaining timestamps, status flags (Pending/Completed), and physical file paths.
- **Vector Storage (PostgreSQL with pgvector)**: As the LLM extracts concepts, the underlying text chunks are embedded into a high-dimensional vector space. We utilize the `pgvector` extension in PostgreSQL to store these embeddings alongside the raw content. This enables efficient semantic search—finding the exact paragraph that explains a specific concept during a learning session without the overhead of a separate vector database.

## 4. Operational Workflows

### 4.1 The Ingestion Pipeline
The transformation from raw input to graph node is a five-stage pipeline:

1.  **Acquisition**: The system identifies the source (YouTube vs. File) and triggers the appropriate fetcher.
2.  **Conversion**: `Markitdown` renders the source into a clean, structured Markdown format.
3.  **Semantic Chunking**: Content is split into overlapping windows to ensure context is preserved during concept extraction.
4.  **LLM Reasoning**: The `IngestionEngine` prompts the LLM to identify not just the *what* (concepts), but the *how* (prerequisites) and the *why* (reasoning).
5.  **Graph Synthesis**: Extracted data is normalized and merged into Neo4j using idempotent `MERGE` operations, preventing graph fragmentation.

### 4.2 The Navigation & Unlocking Logic
The `NavigationEngine` acts as the curriculum coordinator. It uses Cypher logic to calculate the "Learner Frontier"—the set of concepts where all prerequisites are `COMPLETED` but the target is not. This ensures the learner is never overwhelmed by advanced material before mastering the fundamentals.

## 5. Security, Privacy, and Robustness
- **Defensive Data Handling**: The system assumes LLM output may be non-deterministic. The extraction logic includes recursive normalization to handle arrays, nested objects, or unexpected casing returned by the model.
- **Idempotency**: Every ingestion step is idempotent. Re-submitting the same YouTube video or file updates existing records rather than creating duplicates, ensuring a clean database state.
- **Local-Only Execution**: From database to LLM, the entire stack can run in an air-gapped environment, making it suitable for corporate and sensitive academic use cases.

## 6. Future Roadmap
- **Adaptive Prerquisite Weights**: Using machine learning to adjust prerequisite weights based on the actual difficulty learners face.
- **Multi-Modal Graphs**: Integrating image and video frame analysis directly into the concept extraction process.
- **Collaborative Filtering**: Recommending learning paths based on the success of other users with similar background knowledge.
