 LearnFast Core Engine - Comprehensive Codebase Analysis

       1. Project Overview

       LearnFast Core Engine is a sophisticated Hybrid Graph-RAG Pedagogical Platform & AI Study Companion. It's
       designed as a cognitive engine that combines:

       - Knowledge Graphs (Neo4j) for structural knowledge representation with prerequisites and dependencies
       - Vector Search (pgvector) for semantic content retrieval
       - AI Goal Manifestation Agent (LangGraph) for personalized, proactive learning assistance

       The platform helps power-learners, researchers, and students optimize their learning through evidence-based
       practices like spaced repetition, active recall, and interleaving.

       ---
       2. Directory Structure

       D:\Opensource_repos\learn-faster-core\
       ├── main.py                    # FastAPI entry point
       ├── pyproject.toml             # Python dependencies (uv package manager)
       ├── docker-compose.yml         # Infrastructure setup (Neo4j, PostgreSQL, SurrealDB)
       ├── README.md                  # Project documentation
       ├── SYSTEM_ARCHITECTURE.md     # Technical architecture details
       ├── AGENTS.md                  # Evidence-based learning practices guide
       ├── Makefile                   # Build automation
       ├── pytest.ini                # Test configuration
       ├── uv.lock                   # Locked dependencies
       │
       ├── src/                      # Backend source code
       │   ├── config.py             # Pydantic-based configuration
       │   ├── dependencies.py       # FastAPI dependency injection
       │   ├── database/             # Database connections & ORM
       │   ├── ingestion/            # Document processing pipeline
       │   ├── models/               # Pydantic schemas & SQLAlchemy ORM models
       │   ├── navigation/           # Knowledge graph traversal
       │   ├── path_resolution/      # Learning path algorithms
       │   ├── routers/              # API endpoint definitions
       │   ├── services/             # Business logic (SRS, LLM, Agent, etc.)
       │   ├── storage/              # Document storage
       │   ├── static/               # Static HTML files
       │   └── utils/                # Utilities (logging, etc.)
       │
       ├── on_api/                   # Open Notebook API (SurrealDB-based)
       │   ├── router_main.py        # Main router for Open Notebook
       │   ├── notebooks.py          # Notebook CRUD operations
       │   ├── sources.py            # Source management
       │   ├── notes.py              # Note management
       │   ├── chat.py               # Notebook chat functionality
       │   └── models.py             # SurrealDB models
       │
       ├── frontend/                 # React frontend application
       │   ├── package.json          # Node.js dependencies
       │   ├── vite.config.js        # Vite configuration
       │   └── src/
       │       ├── App.jsx           # Main app component with routing
       │       ├── main.jsx          # Entry point
       │       ├── pages/            # Page components (Dashboard, Documents, etc.)
       │       ├── components/       # Reusable UI components
       │       ├── services/         # API client services
       │       ├── hooks/            # Custom React hooks
       │       └── lib/              # Utility libraries
       │
       ├── tests/                    # Test suite
       ├── scripts/                  # Database utilities & setup
       ├── data/                     # Data storage (documents, screenshots)
       └── database/                 # SQL initialization scripts

       ---
       3. Backend Architecture

       Framework: FastAPI

       Main File: D:\Opensource_repos\learn-faster-core\main.py

       The backend is built on FastAPI with the following key features:

       - Lifespan Management: Async context manager for startup/shutdown (database init, component initialization)
       - CORS Configuration: Configured for localhost development (port 5173)
       - Router Architecture: Modular API routers for different feature domains
       - Static Files: Mounts for screenshots, uploads, and extracted images
       - Global Exception Handler: Centralized error handling

       Included Routers (all prefixed with /api):
       ┌────────────────┬─────────────────────┬──────────────────────────────────────────────┐
       │     Router     │       Prefix        │                   Purpose                    │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ documents      │ /api/documents      │ Document upload, processing, metadata        │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ flashcards     │ /api/flashcards     │ Flashcard CRUD & SRS                         │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ study          │ /api/study          │ Study sessions & review tracking             │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ folders        │ /api/folders        │ Document organization                        │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ analytics      │ /api/analytics      │ Learning statistics                          │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ ai             │ /api/ai             │ AI generation (flashcards, questions, paths) │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ navigation     │ /api/navigation     │ Knowledge graph traversal                    │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ cognitive      │ /api/cognitive      │ Cognitive state tracking                     │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ curriculum     │ /api/curriculum     │ Learning curriculums                         │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ resources      │ /api/resources      │ External resources                           │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ goals          │ /api/goals          │ Goal management & tracking                   │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ notifications  │ /api/notifications  │ User notifications                           │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ multidoc_graph │ /api/multidoc-graph │ Multi-document graph analysis                │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ fitbit         │ /api/fitbit         │ Fitbit biometric integration                 │
       ├────────────────┼─────────────────────┼──────────────────────────────────────────────┤
       │ notebook       │ /api                │ Open Notebook (SurrealDB)                    │
       └────────────────┴─────────────────────┴──────────────────────────────────────────────┘
       Database Layer

       Three Database Systems:

       1. PostgreSQL + pgvector (Primary relational DB)
         - SQLAlchemy ORM for data modeling
         - Connection pooling with QueuePool
         - Tables: documents, flashcards, study_sessions, activity_logs, folders, user_settings, goals,
       curriculums, etc.
         - Vector storage for semantic search (pgvector extension)
       2. Neo4j (Knowledge Graph)
         - Stores concepts as nodes
         - Relationships: PREREQUISITE_FOR, MENTIONED_IN
         - Graph-based learning path resolution
       3. SurrealDB (Open Notebook)
         - Document-oriented + graph capabilities
         - For notebook-based content organization
         - Async Surreal client

       Key ORM Models (D:\Opensource_repos\learn-faster-core\src\models\orm.py):
       - Document: File metadata, extracted text, reading metrics
       - Flashcard: SRS parameters (SM-2 algorithm fields)
       - StudySession: Study session tracking with goals & reflections
       - Folder: Document organization
       - UserSettings: User preferences, LLM config, Fitbit credentials
       - Goal: Learning/life goals with hour tracking
       - Curriculum/CurriculumModule: Structured learning paths
       - AgentMemory: Key-value store for agent memory

       Core Services

       1. Ingestion Pipeline (D:\Opensource_repos\learn-faster-core\src\ingestion\ingestion_engine.py):
       - Multi-modal document processing (PDF, images, YouTube)
       - Microsoft markitdown for document-to-markdown conversion
       - LLM-based concept extraction from text chunks
       - Vector embedding generation (Ollama/OpenAI)
       - Knowledge graph construction in Neo4j

       2. LLM Service (D:\Opensource_repos\learn-faster-core\src\services\llm_service.py):
       - Multi-provider support: OpenAI, Groq, OpenRouter, Ollama
       - OpenAI-compatible API abstraction
       - Configurable model selection per component
       - Async HTTP client with proxy support

       3. SRS Service (D:\Opensource_repos\learn-faster-core\src\services\srs_service.py):
       - Implements SM-2 algorithm with retention rate adjustment
       - Rating scale 0-5 (Complete Blackout to Perfect recall)
       - Target retention configuration (0.7 - 0.97)
       - Log-linear scaling for interval adjustment

       4. Goal Manifestation Agent (D:\Opensource_repos\learn-faster-core\src\services\goal_agent.py):
       - LangGraph workflow: Planner -> Executor -> Analyzer -> UI
       - Tools: scratchpad, memory, screenshots, email notifications
       - Biometric integration (Fitbit) for sleep/activity data
       - Episodic & semantic memory layers

       5. Fitbit Service (D:\Opensource_repos\learn-faster-core\src\services\fitbit_service.py):
       - OAuth2 authentication flow
       - Token refresh management
       - Sleep, activity, and heart rate data retrieval
       - Biometric summary for agent context

       Configuration

       Settings (D:\Opensource_repos\learn-faster-core\src\config.py):
       - Pydantic Settings with environment variable support
       - Database URLs, upload directories, CORS origins
       - LLM provider configuration (provider, API keys, model)
       - Embedding configuration (provider, model)
       - Granular model settings per component (extraction, rewrite)

       ---
       4. Frontend Architecture

       Framework: React + Vite

       Stack:
       - React 19 (latest version)
       - Vite (build tool & dev server)
       - Tailwind CSS 4 (utility-first styling)
       - TanStack Query (React Query for server state)
       - React Router DOM 7 (routing)
       - Zustand (state management)

       Entry Point (D:\Opensource_repos\learn-faster-core\frontend\src\main.jsx):
       - React 18+ createRoot API
       - StrictMode enabled

       App Structure (D:\Opensource_repos\learn-faster-core\frontend\src\App.jsx):
       <QueryClientProvider>
         <Router>
           <Layout>
             <Routes>
               /          -> Dashboard
               /documents -> Documents
               /documents/:id -> DocumentViewer
               /practice  -> Practice
               /knowledge-graph -> KnowledgeGraph
               /curriculum -> CurriculumList/CurriculumView
               /analytics -> Analytics
               /settings  -> Settings
             </Routes>
           </Layout>
         </Router>
       </QueryClientProvider>

       Page Components

       Located in D:\Opensource_repos\learn-faster-core\frontend\src\pages\:
       - Dashboard.jsx: Overview with stats and recent activity
       - Documents.jsx: Document library with upload
       - DocumentViewer.jsx: PDF/text viewer with progress tracking
       - Practice.jsx: Study session interface
       - Flashcards.jsx: Flashcard management
       - KnowledgeGraph.jsx: 3D knowledge graph visualization
       - CurriculumList.jsx / CurriculumView.jsx: Learning path management
       - Analytics.jsx: Study statistics and visualizations
       - Settings.jsx: Application settings

       Component Architecture

       Layout Components (D:\Opensource_repos\learn-faster-core\frontend\src\components\layout\):
       - Layout.jsx: Main layout with Navbar, Settings modal, FloatingTimer
       - Navbar.jsx: Navigation sidebar
       - AbstractBackground.jsx: Visual background effects

       Feature Components:
       - documents/: Document list, upload, processing status
       - flashcards/: Card creation, review interface
       - study/: Timer, progress tracking
       - GoalAgent/: Chat interface with AI agent
       - ui/: Reusable UI components (radix-ui based)

       State Management

       - Zustand: Likely used for global state (stores directory exists)
       - TanStack Query: Server state management with caching
       - React Hook Form: Form state management (with zod validation)
       - Local State: Component-level state with useState/useReducer

       Styling

       - Tailwind CSS 4: Latest version with new configuration
       - Radix UI: Headless UI primitives (dialogs, dropdowns, etc.)
       - Lucide React: Icon library
       - Framer Motion: Animation library
       - Custom CSS: App.css and index.css for global styles

       Development Configuration

       Vite Config (D:\Opensource_repos\learn-faster-core\frontend\vite.config.js):
       - React plugin
       - Path aliasing (@/ -> ./src)
       - Development proxy to backend (/api -> localhost:8001)

       ---
       5. Key Integrations

       AI/ML Services
       ┌────────────┬────────────────────────┬─────────────────────────┐
       │  Provider  │        Purpose         │      Configuration      │
       ├────────────┼────────────────────────┼─────────────────────────┤
       │ OpenAI     │ GPT models, embeddings │ OPENAI_API_KEY          │
       ├────────────┼────────────────────────┼─────────────────────────┤
       │ Groq       │ Fast inference         │ GROQ_API_KEY            │
       ├────────────┼────────────────────────┼─────────────────────────┤
       │ OpenRouter │ Model aggregation      │ OPENROUTER_API_KEY      │
       ├────────────┼────────────────────────┼─────────────────────────┤
       │ Ollama     │ Local LLM/Embeddings   │ OLLAMA_BASE_URL         │
       ├────────────┼────────────────────────┼─────────────────────────┤
       │ Opik       │ LLM observability      │ OPIK_API_KEY (optional) │
       └────────────┴────────────────────────┴─────────────────────────┘
       External APIs

       1. YouTube Transcript API: Video content ingestion
       2. Fitbit API: Biometric data (sleep, activity, heart rate)
       3. Resend: Email notifications
       4. Microsoft MarkItDown: Document extraction (PDF, images)

       Databases

       1. Neo4j: Knowledge graph with APOC plugin
       2. PostgreSQL + pgvector: Relational data + vector search
       3. SurrealDB: Open Notebook document storage

       Infrastructure

       - Docker Compose: Orchestrates all services
       - Playwright: Screenshot automation for agent
       - LangGraph: Agent workflow orchestration

       ---
       6. Dependencies

       Backend (Python)

       Core Framework:
       - fastapi>=0.128.0 - Web framework
       - uvicorn>=0.40.0 - ASGI server
       - python-multipart>=0.0.22 - File uploads
       - pydantic>=2.0.0 + pydantic-settings>=2.0.0 - Data validation & config

       Database:
       - sqlalchemy>=2.0.46 - ORM
       - alembic>=1.18.1 - Migrations
       - psycopg2-binary>=2.9.0 - PostgreSQL driver
       - pgvector>=0.2.0 - Vector extension
       - neo4j>=5.0.0 - Graph database driver
       - surrealdb>=1.0.8 - SurrealDB client

       AI/ML:
       - openai>=1.0.0 - OpenAI SDK
       - groq>=0.4.0 - Groq SDK
       - langchain>=0.3.27 + langgraph>=1.0.1 - LLM framework
       - langchain-openai, langchain-anthropic, langchain-ollama, langchain-groq - Provider integrations
       - ollama>=0.1.0 - Local LLM
       - tiktoken>=0.12.0 - Token counting
       - torch>=2.4.0 - PyTorch for ML

       Document Processing:
       - markitdown[all]>=0.0.1a2 - Document to Markdown conversion
       - pdfplumber>=0.11.0 - PDF extraction
       - pypdf>=6.6.2 - PDF manipulation
       - magic-pdf>=0.6.0 - PDF magic
       - youtube-transcript-api==0.6.3 + yt-dlp>=2025.12.8 - YouTube processing

       Utilities:
       - python-dotenv>=1.0.0 - Environment variables
       - loguru>=0.7.3 - Logging
       - httpx>=0.27.2 - HTTP client
       - pyyaml>=6.0.3 - YAML parsing
       - textstat>=0.7.3 - Text statistics
       - langdetect>=1.0.9 - Language detection
       - pytz>=2025.2 - Timezone handling

       Testing:
       - pytest>=7.0.0 + pytest-asyncio>=0.21.0 - Testing framework
       - hypothesis>=6.0.0 - Property-based testing

       Frontend (JavaScript/TypeScript)

       Core:
       - react@^19.2.0 + react-dom@^19.2.0 - UI library
       - react-router-dom@^7.13.0 - Routing
       - @vitejs/plugin-react@^5.1.1 + vite@^7.2.4 - Build tool

       State Management:
       - @tanstack/react-query@^5.90.20 - Server state
       - zustand@^5.0.9 - Global state

       Forms & Validation:
       - react-hook-form@^7.71.1 - Form management
       - @hookform/resolvers@^5.2.2 - Validation resolvers
       - zod@^4.3.6 - Schema validation

       UI Components:
       - @radix-ui/react-* - Headless UI primitives (dialogs, dropdowns, tabs, etc.)
       - lucide-react@^0.562.0 - Icons
       - framer-motion@^12.23.26 - Animations
       - class-variance-authority@^0.7.1 + tailwind-merge@^3.4.0 + clsx@^2.1.1 - Styling utilities

       Content Rendering:
       - react-markdown@^10.1.0 - Markdown rendering
       - remark-gfm@^4.0.1 - GitHub flavored markdown
       - remark-math@^6.0.0 + rehype-katex@^7.0.1 + katex@^0.16.27 - Math rendering
       - @uiw/react-md-editor@^4.0.11 - Markdown editor
       - react-pdf@^10.3.0 + pdfjs-dist@^5.4.530 - PDF viewing

       Data Visualization:
       - chart.js@^4.5.1 + react-chartjs-2@^5.3.1 - Charts
       - react-force-graph-2d@^1.29.0 - Knowledge graph visualization

       HTTP & Utilities:
       - axios@^1.13.2 - HTTP client
       - date-fns@^4.1.0 - Date manipulation
       - i18next@^25.8.4 + react-i18next@^16.5.4 - Internationalization
       - use-debounce@^10.1.0 - Debouncing
       - sonner@^2.0.7 - Toast notifications

       Styling:
       - tailwindcss@^4.1.18 + @tailwindcss/postcss@^4.1.18 + @tailwindcss/typography@^0.5.19 - CSS framework
       - autoprefixer@^10.4.23 + postcss@^8.5.6 - PostCSS tools

       ---
       Architecture Summary Diagram

       ┌─────────────────────────────────────────────────────────────┐
       │                     FRONTEND (React + Vite)                  │
       │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐ │
       │  │Dashboard│ │Documents│ │Practice │ │Knowledge│ │Settings│ │
       │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └───┬────┘ │
       │       │           │           │           │          │      │
       │       └───────────┴───────────┴─────┬─────┴──────────┘      │
       │                                     │                        │
       │                          ┌──────────▼──────────┐            │
       │                          │   TanStack Query    │            │
       │                          │     Zustand         │            │
       │                          └──────────┬──────────┘            │
       └─────────────────────────────────────┼───────────────────────┘
                                             │
                                             │ HTTP/WebSocket
                                             │
       ┌─────────────────────────────────────┼───────────────────────┐
       │                   BACKEND (FastAPI) │                       │
       │                          ┌──────────▼──────────┐            │
       │                          │    API Routers      │            │
       │                          └──────────┬──────────┘            │
       │                                     │                       │
       │  ┌──────────────────────────────────┼──────────────────┐   │
       │  │           CORE SERVICES          │                  │   │
       │  │  ┌────────────┐ ┌────────────┐  │  ┌────────────┐  │   │
       │  │  │  Ingestion │ │    SRS     │  │  │   Agent    │  │   │
       │  │  │   Engine   │ │  Service   │  │  │  (GMA)     │  │   │
       │  │  └─────┬──────┘ └─────┬──────┘  │  └─────┬──────┘  │   │
       │  │  ┌─────┴──────┐ ┌─────┴──────┐  │  ┌─────┴──────┐  │   │
       │  │  │   LLM      │ │  Memory    │  │  │  Fitbit    │  │   │
       │  │  │  Service   │ │  Service   │  │  │  Service   │  │   │
       │  │  └────────────┘ └────────────┘  │  └────────────┘  │   │
       │  └──────────────────────────────────┼──────────────────┘   │
       │                                     │                       │
       │  ┌──────────────────────────────────┼──────────────────┐   │
       │  │         DATA LAYER               │                  │   │
       │  │  ┌──────────┐  ┌──────────┐  ┌──┴───────┐          │   │
       │  │  │PostgreSQL│  │  Neo4j   │  │SurrealDB │          │   │
       │  │  │+pgvector │  │ (Graph)  │  │(Notebook)│          │   │
       │  │  └──────────┘  └──────────┘  └──────────┘          │   │
       │  └─────────────────────────────────────────────────────┘   │
       └─────────────────────────────────────────────────────────────┘

       This is a production-ready, feature-rich learning platform with modern architecture patterns, comprehensive
       AI integration, and multi-modal data support.


● All tasks completed. Here's a summary of the changes made to make ALL connections robust:

  Summary of Robust Connection Changes

  1. Database Connections (src/database/connections.py)

  - Auto-detection for Neo4j and PostgreSQL with multiple fallback endpoints
  - Caches working connections to avoid repeated detection
  - Retries with re-detection on connection failures
  - Handles WSL IP changes automatically

  2. Backend Configuration (src/config.py)

  - New FRONTEND_URL setting for CORS, email links, OAuth
  - Auto-builds CORS_ORIGINS from FRONTEND_URL
  - New SURREAL_URL, SURREAL_USER, etc. settings
  - New FITBIT_REDIRECT_URI with auto-build from frontend URL
  - New HOST and PORT settings

  3. Backend CORS (main.py)

  - Uses settings.cors_origins instead of hardcoded values
  - Logs CORS origins at startup

  4. SurrealDB (on_api/router_main.py)

  - Uses settings for URL, user, password, namespace, database
  - Graceful degradation (logs warning but doesn't crash on failure)

  5. Email Service (src/services/email_service.py)

  - Uses settings.frontend_url for all email links
  - Falls back to FRONTEND_URL env var or localhost

  6. Fitbit OAuth (src/routers/fitbit.py)

  - New get_fitbit_redirect_uri() helper with priority: user_settings > env > settings > auto-build
  - Uses settings.frontend_url for success redirect

  7. Frontend (frontend/vite.config.js, frontend/src/lib/config.js)

  - Vite config uses VITE_BACKEND_URL env var
  - Frontend config auto-detects backend URL with fallbacks
  - Uses relative paths (proxy) in development by default

  8. Environment Files (.env, .env.example)

  - Added all new configuration options with documentation
  - Organized into logical sections

  9. Scripts

  - start_services.sh uses uv run
  - setup_test_db.py and inspect_db.py use env vars

  Usage with uv:

  # Run backend
  uv run uvicorn main:app --reload --port 8001

  # Run scripts
  uv run python scripts/setup_test_db.py
  uv run python -m src.database.init_db

  # Add new dependencies
  uv add package_name