
import os
import shutil
import logging
from typing import List, Optional
from datetime import datetime
from fastapi import UploadFile
from src.database.connections import postgres_conn
from src.models.schemas import DocumentMetadata

logger = logging.getLogger(__name__)

class DocumentStore:
    """Manages document storage and metadata."""
    
    STORAGE_DIR = "data/documents"
    
    def __init__(self, storage_dir: Optional[str] = None):
        self.storage_dir = storage_dir or self.STORAGE_DIR
        os.makedirs(self.storage_dir, exist_ok=True)
        self.db = postgres_conn
        
    def save_document(self, file: UploadFile) -> DocumentMetadata:
        """Save an uploaded file and create a metadata record."""
        try:
            # unique filename to prevent overwrites could be handled here, 
            # but for now we'll trust the filename or append timestamp if needed.
            # actually, using the ID as prefix is safer but we don't have ID yet.
            # Let's insert first to get ID.
            
            insert_query = """
                INSERT INTO documents (filename, status)
                VALUES (%s, 'pending')
                RETURNING id, upload_date
            """
            result = self.db.execute_query(insert_query, (file.filename,))
            doc_id = result[0]['id']
            upload_date = result[0]['upload_date']
            
            # Save file
            safe_filename = f"{doc_id}_{file.filename}"
            file_path = os.path.join(self.storage_dir, safe_filename)
            
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
                
            # Update record with path
            update_query = "UPDATE documents SET file_path = %s WHERE id = %s"
            self.db.execute_query(update_query, (file_path, doc_id))
            
            logger.info(f"Saved document {doc_id}: {file.filename}")
            
            return DocumentMetadata(
                id=doc_id,
                filename=file.filename,
                upload_date=upload_date,
                status='pending',
                file_path=file_path
            )
            
        except Exception as e:
            logger.error(f"Failed to save document: {e}")
            raise e

    def get_document(self, doc_id: int) -> Optional[DocumentMetadata]:
        """Retrieve document metadata by ID."""
        query = "SELECT * FROM documents WHERE id = %s"
        result = self.db.execute_query(query, (doc_id,))
        if not result:
            return None
        return DocumentMetadata(**result[0])

    def list_documents(self) -> List[DocumentMetadata]:
        """List all documents."""
        query = "SELECT * FROM documents ORDER BY upload_date DESC"
        results = self.db.execute_query(query)
        return [DocumentMetadata(**row) for row in results]

    def update_status(self, doc_id: int, status: str):
        """Update document processing status."""
        query = "UPDATE documents SET status = %s WHERE id = %s"
        self.db.execute_query(query, (status, doc_id))

    def delete_document(self, doc_id: int):
        """Delete document and its file."""
        doc = self.get_document(doc_id)
        if not doc:
            raise ValueError(f"Document {doc_id} not found")
            
        # Delete from DB (Cascade will remove chunks)
        # Note: If we added ON DELETE CASCADE to chunks, great.
        # If not, we might need to verify that. The init.sql has it.
        self.db.execute_query("DELETE FROM documents WHERE id = %s", (doc_id,))
        
        # Delete file
        if doc.file_path and os.path.exists(doc.file_path):
            os.remove(doc.file_path)
            
        logger.info(f"Deleted document {doc_id}")
