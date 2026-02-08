from sqlalchemy import Column, Integer, String, ForeignKey
from .orm import Base

class FitbitToken(Base):
    __tablename__ = 'fitbit_tokens'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user_settings.id'), nullable=False)
    access_token = Column(String, nullable=False)
    refresh_token = Column(String, nullable=False)
    expires_at = Column(Integer, nullable=False)
    scope = Column(String, nullable=False)