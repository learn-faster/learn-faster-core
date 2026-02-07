from surreal_commands import command
from pydantic import BaseModel
import logging

logger = logging.getLogger("learnfast-core.on_api")

class PingRequest(BaseModel):
    message: str = "ping"

@command("ping")
def ping_command(data: PingRequest):
    """A simple placeholder command to verify the worker is running."""
    logger.info(f"Received ping command with message: {data.message}")
    return {"status": "success", "response": "pong"}
