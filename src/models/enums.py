"""
Enum definitions for Pydantic models and database.
"""
from enum import Enum

class FileType(str, Enum):
    """Enum for supported document file types."""
    PDF = "pdf"
    IMAGE = "image"
    OTHER = "other"


class CardType(str, Enum):
    """Enum for flashcard types."""
    BASIC = "basic"
    CLOZE = "cloze"
