import asyncio
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.services.llm_service import llm_service
from src.config import settings

async def main():
    print(f"Provider: {settings.llm_provider}")
    print(f"Model: {settings.llm_model}")
    print(f"API Key Present: {bool(settings.openai_api_key or settings.groq_api_key or settings.openrouter_api_key)}")
    
    try:
        response = await llm_service.get_chat_completion(
            messages=[{"role": "user", "content": "Say hello in JSON format: {'greeting': 'hello'}"}],
            response_format="json"
        )
        print(f"Response: {response}")
    except Exception as e:
        print(f"LLM Failed: {e}")

if __name__ == "__main__":
    asyncio.run(main())
