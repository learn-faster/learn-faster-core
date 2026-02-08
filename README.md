# LearnFast Core Engine

**An end-to-end learning system that turns goals into daily actions, backed by cognitive science.**

LearnFast Core combines ingestion, knowledge graphs, practice scheduling, and a goal-driven agent into one workflow. It’s designed for learners who want a clear daily plan, measurable progress, and adaptive pacing.

---

## What It Solves
- Fragmented learning across PDFs, videos, and notes with no clear “next step.”
- Study plans that ignore real constraints like time, sleep, and consistency.
- Analytics that show vanity metrics instead of actionable feedback.

---

## What Makes It Different
- **Goal-first planning**: short, near-term, and long-term goals drive the curriculum and daily plans.
- **Evidence-based practice**: active recall, spaced repetition, interleaving, and micro-break guidance.
- **Adaptive pacing**: learns from performance and (optional) biometrics like sleep.
- **Multi-source intelligence**: documents, links, YouTube, and notes become structured study assets.
- **Actionable dashboard**: “What should I do today?” is always clear.

---

## Core Capabilities
- **Documents**: upload PDFs and links, extract key sections, filter noise.
- **Practice Engine**: interleaved recall sessions across sources with measurable results.
- **Flashcards & SRS**: SM-2 scheduling with retention tracking.
- **Curriculum**: goal-aligned study plans and pacing forecasts.
- **Knowledge Graphs**: concept mapping with prerequisites and dependencies.
- **Goal Agent (GMA)**: proactive guidance, negotiation, and reminders via chat/email.
- **Daily Plans**: day-level focus lists with completion and pacing impact.
- **Analytics**: retention, consistency, velocity, time allocation, and recommendations.

---

## Screenshots
Place your screenshots below.

<!-- Screenshot: Dashboard -->

<!-- Screenshot: Practice Engine -->

<!-- Screenshot: Analytics -->

<!-- Screenshot: Knowledge Graph -->

<!-- Screenshot: Agent -->

---

## Architecture (High-Level)
```
Frontend (React + Vite)
  ├─ Dashboard / Analytics / Practice / Docs / Knowledge Graph
  └─ Agent UI (chat + tools + settings)

Backend (FastAPI)
  ├─ Documents, Flashcards, Practice, Curriculum
  ├─ Goals, Daily Plans, Agent + Negotiation
  ├─ Analytics, Dashboard, Fitbit integration
  └─ Knowledge Graph + Navigation

Data Layer
  ├─ PostgreSQL + pgvector
  ├─ Neo4j (concept graph)
  └─ SurrealDB (Open Notebook)
```

See `SYSTEM_ARCHITECTURE.md` and `docs/PROJECT_UPDATE_SUMMARY.md` for deeper detail.

---

## Technology Stack
| Layer | Technologies |
| :--- | :--- |
| **Backend** | FastAPI, SQLAlchemy, Pydantic, LangGraph |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion |
| **Datastores** | PostgreSQL (pgvector), Neo4j, SurrealDB |
| **LLM/Embeddings** | Ollama, OpenAI, Groq, OpenRouter |
| **Automation** | Playwright, Resend, MarkItDown |

---

## Getting Started

### Prerequisites
- **Python 3.12+** (Recommended via `uv`)
- **Docker & Docker Compose**
- **Ollama** (optional for local LLM/Embeddings)

### 1) Setup
```bash
git clone https://github.com/your-repo/learn-faster-core.git
cd learn-faster-core
cp .env.example .env
```
Edit `.env` with your API keys and DB settings.

### 2) Start Databases
```bash
docker compose up -d
```

### 3) Install + Run Backend
```bash
uv sync
uv run python main.py
```

### 4) Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Key Endpoints
These are the most-used API groups:
- `/api/documents/*` — ingest, parse, recall prompts
- `/api/practice/*` — practice sessions, items, history
- `/api/dashboard/overview` — unified dashboard data
- `/api/analytics/*` — insights and trends
- `/api/goals/*` — goals, daily plans, agent actions
- `/api/fitbit/*` — optional biometric inputs
- `/api/multidoc-graph/*` — knowledge graph workflows

---

## Email Negotiation (Resend)
Inbound replies require a **public HTTPS** endpoint. Configure Resend to send inbound emails to:
```
https://<your-backend-domain>/api/goals/agent/email/inbound
```
Environment variables:
```
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
RESEND_REPLY_DOMAIN=reply.yourdomain.com
FRONTEND_URL=https://<your-frontend-domain>
```

Localhost will not work for inbound webhooks.

---

## Project Map
```
src/
  routers/           # API endpoints
  services/          # domain logic (practice, goals, analytics, agent)
  models/            # ORM + Pydantic schemas
  ingestion/         # document processing
frontend/
  pages/             # Dashboard, Analytics, Practice, Documents
  components/        # Agent UI and shared UI pieces
docs/
  PROJECT_OVERVIEW.md
  PROJECT_UPDATE_SUMMARY.md
```

---

## Roadmap
- Biometric personalization (Fitbit/Apple Health) fully integrated into pacing.
- Multi-modal RAG across diagrams and handwritten notes.
- Collaborative knowledge graphs.
- Mobile companion for quick review.

---

**LearnFast Core** — turn goals into daily learning and measurable progress.
