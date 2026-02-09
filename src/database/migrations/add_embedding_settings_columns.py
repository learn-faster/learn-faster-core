from sqlalchemy import text
from src.database.orm import engine
from src.utils.logger import logger

COLUMNS = [
    ("embedding_provider", "VARCHAR"),
    ("embedding_model", "VARCHAR"),
    ("embedding_api_key", "VARCHAR"),
    ("embedding_base_url", "VARCHAR"),
]


def run_migration():
    with engine.begin() as conn:
        for col_name, col_type in COLUMNS:
            try:
                conn.execute(text(f"ALTER TABLE user_settings ADD COLUMN {col_name} {col_type}"))
                logger.info(f"Added column {col_name} to user_settings")
            except Exception:
                # likely already exists
                pass
    logger.info("Embedding settings columns migration completed.")


if __name__ == "__main__":
    run_migration()
