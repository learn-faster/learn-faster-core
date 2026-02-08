from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import requests
import os
from datetime import datetime
from src.services.fitbit_service import FitbitService
from src.models.fitbit import FitbitToken
from src.database.orm import get_db
from src.models.orm import UserSettings
import urllib.parse

router = APIRouter()

@router.get("/auth")
def fitbit_auth(
    user_id: str = "default_user",
    db: Session = Depends(get_db)
):
    """Initiate Fitbit OAuth flow."""
    user_settings = db.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    
    client_id = user_settings.fitbit_client_id if user_settings and user_settings.fitbit_client_id else os.getenv('FITBIT_CLIENT_ID')
    redirect_uri = user_settings.fitbit_redirect_uri if user_settings and user_settings.fitbit_redirect_uri else os.getenv('FITBIT_REDIRECT_URI')
    
    if not client_id or not redirect_uri:
        from src.utils.logger import logger
        logger.warning(f"Fitbit auth initiated but client_id={client_id}, redirect_uri={redirect_uri}")
        
    params = {
        "response_type": "code",
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "scope": "activity sleep heartrate",
        "state": user_id  # Preserve user_id context
    }
    url = f"https://www.fitbit.com/oauth2/authorize?{urllib.parse.urlencode(params)}"
    return RedirectResponse(url=url)

@router.get("/callback")
def fitbit_callback(
    code: str,
    state: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Handle Fitbit OAuth callback and store tokens."""
    # Use state as user_id to maintain context across redirect
    user_id = state or "default_user"
    user_settings = db.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    
    client_id = user_settings.fitbit_client_id if user_settings and user_settings.fitbit_client_id else os.getenv('FITBIT_CLIENT_ID')
    client_secret = user_settings.fitbit_client_secret if user_settings and user_settings.fitbit_client_secret else os.getenv('FITBIT_CLIENT_SECRET')
    redirect_uri = user_settings.fitbit_redirect_uri if user_settings and user_settings.fitbit_redirect_uri else os.getenv('FITBIT_REDIRECT_URI')

    data = {
        'client_id': client_id,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': code
    }
    auth = (client_id, client_secret)
    response = requests.post('https://api.fitbit.com/oauth2/token', data=data, auth=auth)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to get token from Fitbit")

    tokens = response.json()
    access_token = tokens['access_token']
    refresh_token = tokens['refresh_token']
    expires_in = tokens['expires_in']
    scope = tokens['scope']
    expires_at = int(datetime.utcnow().timestamp() + expires_in)

    # Find or create user settings
    user_settings = db.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    if not user_settings:
        user_settings = UserSettings(user_id=user_id)
        db.add(user_settings)
        db.commit()
        db.refresh(user_settings)

    # Upsert Fitbit token
    fitbit_token = db.query(FitbitToken).filter(FitbitToken.user_id == user_settings.id).first()
    if fitbit_token:
        fitbit_token.access_token = access_token
        fitbit_token.refresh_token = refresh_token
        fitbit_token.expires_at = expires_at
        fitbit_token.scope = scope
    else:
        fitbit_token = FitbitToken(
            user_id=user_settings.id,
            access_token=access_token,
            refresh_token=refresh_token,
            expires_at=expires_at,
            scope=scope
        )
        db.add(fitbit_token)
    db.commit()

    return RedirectResponse(url="http://localhost:5173/settings?fitbit_connected=true")

@router.delete("/disconnect")
def disconnect_fitbit(
    user_id: str = "default_user",
    db: Session = Depends(get_db)
):
    """Disconnect Fitbit and remove stored tokens."""
    user_settings = db.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    if not user_settings:
        raise HTTPException(status_code=404, detail="User not found")

    fitbit_token = db.query(FitbitToken).filter(FitbitToken.user_id == user_settings.id).first()
    if fitbit_token:
        db.delete(fitbit_token)
        db.commit()
        return {"message": "Fitbit disconnected successfully"}
    else:
        raise HTTPException(status_code=404, detail="Fitbit token not found")

@router.get("/status")
def get_fitbit_status(
    user_id: str = "default_user",
    db: Session = Depends(get_db)
):
    """Check if Fitbit is connected for the current user."""
    user_settings = db.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    if not user_settings:
        return {"connected": False}
    
    token = db.query(FitbitToken).filter(FitbitToken.user_id == user_settings.id).first()
    return {"connected": token is not None}