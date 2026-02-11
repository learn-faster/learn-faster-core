# Orbit

![Orbit](docs/assets/orbit.svg)

Orbit is an AI-native learning engine that turns documents, links, and videos into structured knowledge graphs, adaptive curricula, and practice workflows. It combines Graph‑RAG, vector search, and agent orchestration to personalize learning and keep progress aligned with user goals.

**What you get**
- Knowledge graphs built from PDFs, web pages, and YouTube transcripts.
- Adaptive curriculum and practice sessions backed by spaced repetition.
- Analytics and daily planning that tie progress to goals.
- Open Notebook module with SurrealDB for local-first note capture.

**Architecture at a glance**
| Layer | Component | Tech | Purpose |
| --- | --- | --- | --- |
| Cognition | Graph Engine | Neo4j | Prerequisites and concept relationships |
| Memory | Vector Store | PostgreSQL + pgvector | Semantic retrieval |
| Workflow | Open Notebook | SurrealDB | Notes and sources |
| Orchestration | Agents | LangGraph | Planning and automation |
| Observability | Tracing | Opik | Request-level tracing and tool events |
| Queue | Background Jobs | Redis + RQ | Scalable ingestion and processing |

## Quick Start (Docker)
This is the fastest way to run everything on your machine.

1) Copy env file
```bash
cp .env.example .env
```
2) Start the full stack (dbs + backend + frontend)
```bash
docker compose up -d
```
3) Initialize database tables (first run only)
```bash
docker compose exec backend uv run python -m src.database.init_db
```
4) Open the app
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8001`

If you only want infrastructure (databases + Redis + SurrealDB):
```bash
docker compose up -d postgres neo4j redis surrealdb
```

If you change backend/frontend code and want updated containers:
```bash
docker compose build --no-cache backend frontend
docker compose up -d
```

## Local Dev (No Backend/Frontend Containers)
Use this if you want to run the app locally but still use Docker for databases.

1) Start infrastructure
```bash
docker compose up -d postgres neo4j redis surrealdb
```
2) Install dependencies
```bash
uv sync
cd frontend
npm install
```
3) Initialize databases
```bash
uv run python -m src.database.init_db
```
4) Run backend
```bash
uv run uvicorn main:app --reload --host 127.0.0.1 --port 8001
```
5) Run frontend
```bash
cd frontend
npm run dev
```

## Configuration
All environment variables live in `.env`. See `.env.example` for defaults.

### Connection Cheatsheet
**Host ports (from `docker-compose.yml`)**
- Postgres (pgvector): `localhost:5433`
- Neo4j Bolt: `localhost:7688`
- Neo4j Browser: `http://localhost:7474`
- Redis: `localhost:6379`
- SurrealDB: `ws://localhost:8000/rpc`
- Backend API: `http://localhost:8001`
- Frontend: `http://localhost:5173`

**Local dev (backend on host)**
```
NEO4J_URI=bolt://localhost:7688
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_DB=learnfast
POSTGRES_USER=learnfast
POSTGRES_PASSWORD=password
SURREAL_URL=ws://localhost:8000/rpc
REDIS_URL=redis://localhost:6379/0
```

**Dockerized backend (inside Compose)**
```
NEO4J_URI=bolt://neo4j:7687
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=learnfast
POSTGRES_USER=learnfast
POSTGRES_PASSWORD=password
SURREAL_URL=ws://surrealdb:8000/rpc
REDIS_URL=redis://redis:6379/0
```

**Ollama / Local LLMs**
If Ollama runs on the host and the backend is in Docker:
```
OLLAMA_BASE_URL=http://host.docker.internal:11434
```

**Auto-detection (optional)**
You can leave `NEO4J_URI` and `POSTGRES_HOST` empty in `.env` to let the app auto-detect the correct host.

### LLM and Embeddings
- `LLM_PROVIDER`, `LLM_MODEL`
- `EMBEDDING_PROVIDER`, `EMBEDDING_MODEL`, `EMBEDDING_CONCURRENCY`
- Optional overrides: `EXTRACTION_MODEL`, `REWRITE_MODEL`, context window limits

### Frontend/Backend URLs
- `FRONTEND_URL` for CORS and OAuth callbacks
- `VITE_BACKEND_URL` when frontend cannot reach `http://localhost:8001`

### Queue/Worker (optional)
- `RQ_ENABLED=true` enables Redis queue processing
- `REDIS_URL`, `REDIS_QUEUE_NAME`, `REDIS_JOB_TIMEOUT`

## Makefile Shortcuts
```bash
make help
make setup
make docker-up
make docker-logs
make docker-ps
make db-init
make backend
make frontend
make dev
make worker
make test
```
Notes:
- For WSL Docker: `make docker-up ENV=wsl`
- `make worker` runs the Redis ingestion worker
- `make docker-up` uses `docker-compose.yml` to launch the full stack

## Troubleshooting
**Backend cannot reach Docker services**
- Set `POSTGRES_HOST`, `NEO4J_URI`, or `DOCKER_HOST_OVERRIDE` explicitly in `.env`.

**Open Notebook errors**
- Confirm SurrealDB is running and credentials match `.env`.

**Frontend API errors**
- Set `VITE_BACKEND_URL` in `.env` if the backend is not on `localhost:8001`.

## License
Add your license here.