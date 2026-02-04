# LearnFast Core Engine

**A Hybrid Graph-RAG Pedagogical Platform**

LearnFast Core Engine combines the structural reasoning of Knowledge Graphs with the semantic flexibility of Vector Search (RAG) and evidence-based Spaced Repetition (SRS) to deliver an end-to-end ecosystem for structured knowledge mastery.

## 🚀 Key Features

### 1. Intelligence & Navigation
- **Hybrid Graph-RAG Architecture**: Uses Neo4j for pedagogical structure and PostgreSQL/pgvector for granular semantic retrieval.
- **Deep Provenance Tracking**: Knowledge atoms track their source documents. Deleting a document automatically prunes orphaned concepts from the graph.
- **Budget-Aware Path Resolution**: Generates optimized learning paths that intelligently prune to fit your available time budget.
- **Learner Frontier**: Automatically calculates what you are ready to learn next based on prerequisite completion.

### 2. Mastery & Retention
- **Native SRS Engine**: Implements the **SM-2 Algorithm** for scheduled spaced repetition.
- **Active Recall Tools**: AI-driven generation of flashcards and multiple-choice questions directly from your documents.
- **Math-Aware Learning**: Integrated **KaTeX** support renders complex LaTeX equations beautifully in lessons and flashcards.
- **Study Sessions**: Interactive sessions that track recall ratings and update the forgetting curve in real-time.

### 3. Digestion & Analytics
- **Multi-Modal Ingestion**: Advanced extraction from PDFs, YouTube transcripts, and Markdown via Microsoft `MarkItDown`.
- **Robust Path Resolution**: Handles content gaps with baseline estimates and intelligently prunes paths for low time budgets.
- **Cognitive Heatmaps**: Visualizes study consistency and intensity over time.
- **Retention Analytics**: Tracks success rates, SRS distribution (New vs. Mastered), and study streaks.
- **Reading Progress**: Per-document tracking of time-on-page, completion estimates, and reading percentage.

## 🏗 Architecture

The system operates as a synchronized trio of specialized engines:

1.  **Ingestion Engine**: Processes raw sources into semantic markdown, extracts concept dependencies, and injects provenance.
2.  **Reasoning Engine**: Handles graph-based navigation and constraint-aware path resolution.
3.  **Mastery Engine**: Manages the Spaced Repetition System (SRS) and study session tracking.

## 🛠️ Prerequisites

- **Python 3.12+**
- **Docker & Docker Compose** (for Neo4j and PostgreSQL)
- **uv** (Python package manager)
- **Ollama** (Running locally with your preferred LLM and embedding models)

## ⚙️ Configuration

The system is configured via environment variables in a `.env` file. Pydantic is used to validate and cast these values at runtime.

### Neo4j (Knowledge Graph)
| Variable         | Description              | Default                 |
| ---------------- | ------------------------ | ----------------------- |
| `NEO4J_URI`      | Connection URI for Neo4j | `bolt://localhost:7688` |
| `NEO4J_USER`     | Admin username           | `neo4j`                 |
| `NEO4J_PASSWORD` | Admin password           | `password`              |

### PostgreSQL (Meta & Vector)
| Variable            | Description                       | Default                |
| ------------------- | --------------------------------- | ---------------------- |
| `POSTGRES_HOST`     | Database host                     | `localhost`            |
| `POSTGRES_PORT`     | Port for Postgres                 | `5433`                 |
| `POSTGRES_DB`       | Database name                     | `learnfast`            |
| `POSTGRES_USER`     | Database user                     | `learnfast`            |
| `POSTGRES_PASSWORD` | Database password                 | `password`             |
| `DATABASE_URL`      | Full SQLAlchemy connection string | *(Derived from above)* |

### LLM & Embedding Core
| Variable             | Description                                         | Default                  |
| -------------------- | --------------------------------------------------- | ------------------------ |
| `LLM_PROVIDER`       | Provider for reasoning (`openai`, `groq`, `ollama`) | `openai`                 |
| `LLM_MODEL`          | Default model for chat and generation               | `gpt-3.5-turbo`          |
| `EMBEDDING_PROVIDER` | Provider for vectorization (`openai`, `ollama`)     | `ollama`                 |
| `EMBEDDING_MODEL`    | Model used for generating embeddings                | `embeddinggemma:latest`  |
| `OPENAI_API_KEY`     | Secret key for OpenAI services                      | `""`                     |
| `GROQ_API_KEY`       | Secret key for Groq services                        | `""`                     |
| `OLLAMA_BASE_URL`    | API endpoint for local Ollama instance              | `http://localhost:11434` |

### Granular AI Overrides (Optional)
If set, these override the default `LLM_MODEL` for specific heavy-duty or lightweight tasks.
| Variable                    | Description                          | Default     |
| --------------------------- | ------------------------------------ | ----------- |
| `EXTRACTION_MODEL`          | Model for graph extraction tasks     | `LLM_MODEL` |
| `EXTRACTION_CONTEXT_WINDOW` | Max tokens for extraction operations | `100000`    |
| `REWRITE_MODEL`             | Model for lesson/content generation  | `LLM_MODEL` |
| `REWRITE_CONTEXT_WINDOW`    | Max tokens for content generation    | `10000`     |

### Application & Filesystem
| Variable                      | Description                                  | Default                     |
| ----------------------------- | -------------------------------------------- | --------------------------- |
| `UPLOAD_DIR`                  | Local directory for storing PDFs/Transcripts | `./data/documents`          |
| `MAX_FILE_SIZE`               | Maximum upload size in bytes                 | `52428800` (50MB)           |
| `CORS_ORIGINS`                | Allowed frontend origins (JSON list)         | `["http://localhost:3000"]` |
| `CHUNK_SIZE_MINUTES`          | Target study time per content chunk          | `2`                         |
| `MAX_PATH_PREVIEW_DEPTH`      | Max levels to show in path previews          | `3`                         |
| `DEFAULT_EMBEDDING_DIMENSION` | Expected vector dimension                    | `1024`                      |

### 1. Setup Environment
```bash
uv sync
cp .env.example .env
```

### 2. Start Services
Launch databases and the FastAPI server:
```bash
./scripts/start_services.sh
uv run uvicorn main:app --reload
```

*Access the dashboard at:* [http://localhost:8000](http://localhost:8000)

## 📖 API Usage (Selection)

All core endpoints are standardized under the `/api` prefix.

### 1. Manage Documents
**Upload File:**
```bash
curl -X POST "http://localhost:8000/api/documents/upload" \
  -F "file=@/path/to/calculus.pdf" -F "title=Calculus 101"
```

**YouTube Ingest:**
```bash
curl -X POST "http://localhost:8000/api/documents/youtube" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://youtube.com/..."}'
```

### 2. Navigate & Learn
**Get Roots:** `GET /api/concepts/roots`
**Generate Path:**
```bash
curl -X POST "http://localhost:8000/api/ai/learning-path" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "u1", "target_concept": "limits", "time_budget_minutes": 15}'
```

### 3. SRS & Study
**Start Session:** `POST /api/study/session`
**Submit Review:** 
```bash
curl -X POST "http://localhost:8000/api/study/session/{id}/review" \
  -d '{"card_id": "c1", "rating": 5}'
```

### 4. Insights
**Activity Heatmap:** `GET /api/analytics/heatmap`
**Overview:** `GET /api/analytics/overview`

## 📂 Project Structure

```
src/
├── routers/        # Standardized API endpoints (/api)
├── services/       # Core logic: SRS, Analytics, LLM, Time Tracking
├── ingestion/      # Document processing & Vector embedding
├── navigation/     # Graph traversal & User state
├── path_resolution/# Optimal pathfinding & Budgeting
└── storage/        # File & DB coordination
```

---
**LearnFast Core Engine** — *Optimizing the path to knowledge.*