# Variables
FRONTEND_DIR = frontend
BACKEND_PORT = 8001
BACKEND_HOST ?= 127.0.0.1
ENV ?= windows
DOCKER_FILE = docker-compose.yml

# Commands
WSL = wsl
DOCKER_CMD ?= docker compose
DOCKER_CMD_FALLBACK = docker-compose

ifeq ($(ENV),wsl)
	DOCKER_CMD = $(WSL) $(DOCKER_CMD)
else
	DOCKER_CMD = $(DOCKER_CMD)
endif

DOCKER_COMPOSE = $(DOCKER_CMD) -f $(DOCKER_FILE)
DOCKER_COMPOSE_FALLBACK = $(DOCKER_CMD_FALLBACK) -f $(DOCKER_FILE)

.PHONY: help setup db-init backend frontend both docker-up docker-down docker-logs docker-ps dev worker test

help:
	@echo "Available targets:"
	@echo "  make setup        - Copy .env.example to .env and install deps"
	@echo "  make db-init      - Initialize ORM tables"
	@echo "  make backend      - Start the FastAPI backend"
	@echo "  make frontend     - Start the Vite frontend"
	@echo "  make both         - Start both frontend and backend"
	@echo "  make docker-up    - Start Docker services (default ENV=windows, use ENV=wsl for WSL)"
	@echo "  make docker-down  - Stop Docker services"
	@echo "  make docker-logs  - Tail Docker service logs"
	@echo "  make docker-ps    - Show Docker service status"
	@echo "  make dev          - Start Docker, backend, and frontend (set ENV=wsl for WSL)"
	@echo "  make worker       - Start the Redis ingestion worker"
	@echo "  make test         - Run backend tests"

setup:
	uv run python -c "from pathlib import Path; import shutil; dst=Path('.env'); dst.exists() or shutil.copyfile('.env.example', dst)"
	uv sync
	cd $(FRONTEND_DIR) && npm install

db-init:
	uv run python -m src.database.init_db

backend:
	uv run uvicorn main:app --reload --host $(BACKEND_HOST) --port $(BACKEND_PORT)

frontend:
	cd $(FRONTEND_DIR) && npm run dev

both:
	@echo "Starting both frontend and backend..."
	@$(MAKE) -j 2 backend frontend

dev:
	@$(MAKE) docker-up ENV=$(ENV)
	@$(MAKE) -j 2 backend frontend

docker-up:
	$(DOCKER_COMPOSE) up -d || $(DOCKER_COMPOSE_FALLBACK) up -d

docker-down:
	$(DOCKER_COMPOSE) down || $(DOCKER_COMPOSE_FALLBACK) down

docker-logs:
	$(DOCKER_COMPOSE) logs -f --tail=200 || $(DOCKER_COMPOSE_FALLBACK) logs -f --tail=200

docker-ps:
	$(DOCKER_COMPOSE) ps || $(DOCKER_COMPOSE_FALLBACK) ps

worker:
	uv run python scripts/rq_worker.py

test:
	uv run pytest
