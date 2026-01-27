"""
Activity Service for tracking user actions.
Logs events like document views, flashcard creation, and study sessions 
to be displayed in the application's 'Memory' feed.
"""
from sqlalchemy.orm import Session
from src.models.orm import ActivityLog
from datetime import datetime
from typing import Optional, Dict, Any

class ActivityService:
    """
    Service for logging user and system activities.
    Centralizes the logic for recording structured activity logs with optional metadata.
    """
    
    @staticmethod
    def log_activity(
        db: Session, 
        activity_type: str, 
        description: str, 
        document_id: Optional[int] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> ActivityLog:
        """
        Records a new activity entry in the database.
        
        Args:
            db (Session): Database session.
            activity_type (str): Type identifier (e.g., 'view_document', 'create_flashcard').
            description (str): Human-readable description of the action.
            document_id (int, optional): ID of the related document.
            metadata (dict, optional): Extra JSON-compatible data for the activity.
            
        Returns:
            ActivityLog: The newly created activity log record.
        """
        activity = ActivityLog(
            activity_type=activity_type,
            description=description,
            document_id=document_id,
            extra_data=metadata or {}
        )
        db.add(activity)
        db.commit()
        db.refresh(activity)
        return activity

    @staticmethod
    def get_recent_activity(db: Session, limit: int = 10):
        """
        Retrieves the most recent activities, sorted by timestamp descending.
        
        Args:
            db (Session): Database session.
            limit (int): Maximum number of entries to return (default: 10).
            
        Returns:
            List[ActivityLog]: List of recent activity records.
        """
        return db.query(ActivityLog).order_by(ActivityLog.timestamp.desc()).limit(limit).all()
