# Variables
FRONTEND_DIR = frontend
BACKEND_PORT = 8001
ENV ?= windows

# Commands
WSL = wsl
DOCKER_COMPOSE = docker-compose

ifeq ($(ENV),wsl)
	DOCKER_CMD = $(WSL) $(DOCKER_COMPOSE)
else
	DOCKER_CMD = $(DOCKER_COMPOSE)
endif

.PHONY: help backend frontend both docker-up docker-down

help:
	@echo "Available targets:"
	@echo "  make backend      - Start the FastAPI backend"
	@echo "  make frontend     - Start the Vite frontend"
	@echo "  make both         - Start both frontend and backend"
	@echo "  make docker-up    - Start Docker services (default ENV=windows, use ENV=wsl for WSL)"
	@echo "  make docker-down  - Stop Docker services"

backend:
	uv run uvicorn main:app --reload --port $(BACKEND_PORT)

frontend:
	cd $(FRONTEND_DIR) && npm run dev

both:
	@echo "Starting both frontend and backend..."
	@$(MAKE) -j 2 backend frontend

docker-up:
	$(DOCKER_CMD) up -d

docker-down:
	$(DOCKER_CMD) down
