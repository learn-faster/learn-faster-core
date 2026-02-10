# 🧠 LearnBetter: The AI-Native "Goal-Adaptive" Learning Operating System

> **"Most LMS tools are just digital filing cabinets. LearnBetter is your personal cognitive architect, powered by Hybrid Graph-RAG and Neuro-Biometric feedback."**

LearnBetter is an AI-native learning system that doesn't just store notes; it **re-engineers your cognitive workflow**. By combining **Hybrid Graph-RAG**, **Multi-node Autonomous Agents**, and **Biometric Synthesis**, it turns fragmented source material into a personalized, goal-aligned learning journey backed by rigorous cognitive science.

---

## 🚀 The "Wow" Factor: What Makes This Different?

While other projects do simple Vector RAG, LearnBetter builds a **living knowledge ecosystem**.

### 1. 🕸️ Prerequisite-Aware Graph-RAG (The Vertical Advantage)
Most RAG systems only find "related facts." LearnBetter uses **Neo4j + pgvector** to map the *structural hierarchy* of knowledge.
- **Hierarchical Retrieval**: Navigates conceptual dependencies so you don't study *Quantum Field Theory* without mastering *Linear Algebra* first.
- **Cross-Document Nexus**: Automatically identifies concept merges and prerequisites across disparate PDFs and sources.

### 2. 🤖 Autonomous Goal Manifestation Agent (GMA)
Our agent doesn't just track progress; it **monitors and negotiates** it.
- **Agentic Proof-of-Work**: The agent uses **Playwright** to autonomously take screenshots of your workspace/URLs to verify goal manifestation and "deep work" evidence.
- **Accountability Negotiation**:missing a milestone triggers an automated email negotiation (via **Resend**) to recalibrate your daily load based on remaining time and goal priority.

### 3. ⌚ Neuro-Biometric Feedback Loop (Fitbit Integration)
Learning is a physical process. LearnBetter synchronizes your load with your biological state.
- **Readiness-Based Pacing**: Syncs with **Fitbit** to calculate a real-time **Readiness Score** based on sleep duration, efficiency, and resting heart rate.
- **Circadian Optimization**: Automatically schedules "Deep Abstraction" sessions during your diurnal cortisol peaks and "Light Review" during metabolic nadirs.

### 4. 🧪 Scientific Mastery Engine (SM-2 & FSRS)
- **Retention Targeting**: A custom Spaced Repetition System (SRS) based on **SM-2 with log-linear scaling**, allowing you to target specific retention rates (e.g., 90%).
- **Memory Stability Index**: Real-time calculation of synaptic decay and retention risk across your entire knowledge graph.

---

## 🛠️ The Architecture of Intelligence

LearnBetter is built on a "Triple-Store" architecture to handle the complexity of human learning.

| Layer | Component | Tech Stack | Purpose |
| :--- | :--- | :--- | :--- |
| **Cognition** | **Graph Engine** | Neo4j | Concept hierarchies & prerequisites |
| **Memory** | **Vector Memory** | pgvector (PostgreSQL) | Semantic context & factual recall |
| **Workflow** | **Open Notebook** | SurrealDB | Decentralized, local-first synced notes |
| **Logic** | **Agentic Layer** | **LangGraph** + Playwright | Autonomous planning, monitoring & negotiation |

---

## 📦 Core Capabilities

- **🌪️ Instant Ingestion**: Drop PDFs, YouTube links, or web articles. We extract high-fidelity text and diagrams.
- **🃏 Multi-Modality Practice**: Beyond simple flashcards. Supports **Active Recall drills**, **Self-Explanation** prompts, and **Scientific Quizzes** tailored to your growth frontier.
- **📊 Metacognitive Analytics**: Track your **Cognitive Velocity**, **Synaptic Stability**, and **Retention Risk** (FSRS-based) in real-time.
- **📅 Neural Daily Dashboard**: Schedules your day based on your **Readiness Score** and circadian phases.

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
