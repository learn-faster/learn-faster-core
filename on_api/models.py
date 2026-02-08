from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/models", tags=["models"])

@router.get("")
async def list_models():
    """List available LLM models."""
    return [
        {"id": "gpt-4o", "name": "GPT-4o", "provider": "openai"},
        {"id": "gpt-3.5-turbo", "name": "GPT-3.5 Turbo", "provider": "openai"},
        {"id": "claude-3-5-sonnet", "name": "Claude 3.5 Sonnet", "provider": "anthropic"},
        {"id": "llama3", "name": "Llama 3 (Local)", "provider": "ollama"}
    ]

@router.get("/defaults")
async def get_default_model_settings():
    """Get default model and parameters."""
    return {
        "model": "gpt-4o",
        "temperature": 0.7,
        "max_tokens": 2048,
        "top_p": 1.0
    }

@router.get("/providers")
async def list_providers():
    """List supported AI providers."""
    return [
        {"id": "openai", "name": "OpenAI"},
        {"id": "anthropic", "name": "Anthropic"},
        {"id": "ollama", "name": "Ollama (Local)"},
        {"id": "groq", "name": "Groq"}
    ]

@router.get("/{model_id}")
async def get_model_details(model_id: str):
    """Placeholder for detailed model info."""
    return {"id": model_id, "status": "active"}
