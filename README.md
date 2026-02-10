# 🧠 LearnBetter: The Goal-Adaptive Learning Operating System

> **"Most LMS tools are just digital filing cabinets. LearnBetter is your personal cognitive architect."**

LearnBetter is an AI-native learning system that doesn't just store your notes it **re-engineers your brain**. By combining **Hybrid Graph-RAG**, **Autonomous Goal Agents**, and **Biometric Feedback**, it turns fragmented source material into a personalized, goal-aligned learning journey backed by cognitive science.

---

## 🚀 The "Wow" Factor: What Makes This Different?

While other projects do simple Vector RAG, LearnBetter builds a **living knowledge ecosystem**.

### 1. 🕸️ Hybrid Graph-RAG (The Vertical Advantage)
Most RAG systems only find "related facts." LearnBetter uses **Neo4j + pgvector** to map the *structural hierarchy* of knowledge.
- **Fact Discovery**: Finds the specific answer in your PDFs.
- **Structural Mapping**: Understands that you can't learn *Quantum Field Theory* without mastering *Linear Algebra* first. It builds a Knowledge Graph of concepts and prerequisites.

### 2. 🤖 The Autonomous Goal Agent (Your AI Accountability Partner)
It doesn't just track progress; it **negotiates** it.
- **Email Negotiation**: If you miss a milestone, the agent sends an email to "negotiate" a new daily plan based on your remaining time and goal priority.
- **Tool-Integrated**: The agent can take screenshots, search your notebook, and update your calendar.

### 3. ⌚ Biometric-Adaptive Pacing (Fitbit Integration)
Learning isn't just cognitive; it's physical.
- **Energy-Aware Scheduling**: LearnBetter syncs with your **Fitbit** to monitor sleep and readiness.
- **Dynamic Load Balancing**: High-readiness days get "Deep Work" sessions; low-readiness days get "Light Review" sessions automatically.

---

## 🛠️ The Architecture of Intelligence

LearnBetter is built on a "Triple-Store" architecture to handle the complexity of human learning.

| Layer | Component | Tech Stack | Purpose |
| :--- | :--- | :--- | :--- |
| **Cognition** | **Graph Engine** | Neo4j | Concept hierarchies & prerequisites |
| **Memory** | **Vector Memory** | pgvector (PostgreSQL) | Semantic context & factual recall |
| **Workflow** | **Open Notebook** | SurrealDB | Decentralized, local-first synced notes |
| **Logic** | **Agentic Layer** | FastAPI + Groq/Ollama | Autonomous planning & negotiation |

---

## 📦 Core Capabilities

- **🌪️ Instant Ingestion**: Drop PDFs, YouTube links, or web articles. We extract high-fidelity text and diagrams.
- **🃏 Auto-Generated Mastery**: Built-in SRS (Spaced Repetition System) engine that generates flashcards and quizzes directly from your sources.
- **📊 Real-World Analytics**: No vanity metrics. Track your **Cognitive Velocity**, **Retention Risk**, and **Goal Pacing** in real-time.
- **📅 Daily Focus Engine**: An interactive dashboard that answers the only question that matters: *"What should I do in the next 30 minutes to stay on track?"*

---

## 🖼️ Visual Tour

<div align="center">
  <br/>
  <kbd><img src="frontend/src/assets/dash.png" width="800" alt="Dashboard Overview"></kbd>
  <p><i>The Command Center: Goal-aligned daily actions and real-time cognitive analytics.</i></p>
  <br/>

  <kbd><img src="frontend/src/assets/welcome.png" width="800" alt="Onboarding"></kbd>
  <p><i>Onboarding: Defining your North Star goals before we build your curriculum.</i></p>
  <br/>

  <kbd><img src="frontend/src/assets/curri.png" width="800" alt="Curriculum"></kbd>
  <p><i>AI-Generated Curriculum: Concepts mapped from your sources into a logical learning path.</i></p>
</div>

---

## ⚡ Quick Start

### 1) Clone and Configure
```bash
git clone https://github.com/learn-faster/Learn_Better.git
cd Learn_Better
cp .env.example .env
```

### 2) Infrastructure (Docker)
```bash
docker compose up -d
```

### 3) Backend Engine
```bash
uv sync
uv run python main.py
```

### 4) Frontend Interface
```bash
cd frontend
npm install && npm run dev
```

---
**LearnBetter** — *Don't just study faster. Learn better.*
