import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from src.database.init_db import initialize_orm_tables


if __name__ == "__main__":
    initialize_orm_tables()
