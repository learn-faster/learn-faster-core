import requests
import os
from datetime import datetime
from src.models.fitbit import FitbitToken
from src.database.orm import SessionLocal

class FitbitService:
    """Service for interacting with the Fitbit API."""
    BASE_URL = "https://api.fitbit.com"

    def __init__(self, token: FitbitToken):
        self.access_token = token.access_token
        self.refresh_token = token.refresh_token
        self.expires_at = token.expires_at
        self.user_id = token.user_id

    def _is_token_expired(self) -> bool:
        """Check if the current access token has expired."""
        return datetime.utcnow().timestamp() > self.expires_at

    def _refresh_token(self) -> None:
        """Refresh the access token using the refresh token."""
        # Update token in database
        db = SessionLocal()
        try:
            # 1. Fetch user settings to get credentials
            from src.models.orm import UserSettings
            # We need to find the user_settings ID. Since self.user_id is user_settings.id (foreign key)
            user_settings = db.query(UserSettings).filter(UserSettings.id == self.user_id).first()
            
            if not user_settings:
                raise Exception(f"User settings not found for ID {self.user_id}")
            
            client_id = user_settings.fitbit_client_id or os.getenv('FITBIT_CLIENT_ID')
            client_secret = user_settings.fitbit_client_secret or os.getenv('FITBIT_CLIENT_SECRET')

            if not client_id or not client_secret:
                raise Exception("Fitbit Client ID or Secret missing for refresh")

            data = {
                'grant_type': 'refresh_token',
                'refresh_token': self.refresh_token
            }
            auth = (client_id, client_secret)
            response = requests.post('https://api.fitbit.com/oauth2/token', data=data, auth=auth)
            
            if response.status_code != 200:
                raise Exception(f"Failed to refresh Fitbit token: {response.text}")
            
            new_tokens = response.json()
            
            token = db.query(FitbitToken).filter(FitbitToken.user_id == self.user_id).first()
            if token:
                token.access_token = new_tokens['access_token']
                token.refresh_token = new_tokens['refresh_token']
                token.expires_at = int(datetime.utcnow().timestamp() + new_tokens['expires_in'])
                db.commit()
                
                # Update instance variables
                self.access_token = new_tokens['access_token']
                self.refresh_token = new_tokens['refresh_token']
                self.expires_at = token.expires_at
        finally:
            db.close()

    def get_sleep_data(self, date: str) -> dict:
        """
        Fetch sleep data for a specific date.
        
        Args:
            date: Date in YYYY-MM-DD format
            
        Returns:
            dict: Sleep data from Fitbit API
        """
        if self._is_token_expired():
            self._refresh_token()
        
        headers = {'Authorization': f'Bearer {self.access_token}'}
        response = requests.get(f"{self.BASE_URL}/1.2/user/-/sleep/date/{date}.json", headers=headers)
        
        # Handle token expiration mid-request
        if response.status_code == 401:
            self._refresh_token()
            headers = {'Authorization': f'Bearer {self.access_token}'}
            response = requests.get(f"{self.BASE_URL}/1.2/user/-/sleep/date/{date}.json", headers=headers)
        
        return response.json()
    
    def get_biometric_summary(self, date: str) -> str:
        """
        Fetch and summarize biometric data for a user-friendly agent prompt.
        """
        try:
            sleep = self.get_sleep_data(date)
            # Fitbit sleep 1.2 format: sleep is a list under 'sleep' key
            sleep_list = sleep.get('sleep', [])
            sleep_duration = 0
            sleep_efficiency = 0
            if sleep_list:
                # Get the first (most recent) sleep entry
                main_sleep = sleep_list[0]
                sleep_duration = main_sleep.get('duration', 0) / 3600000  # ms to hours
                sleep_efficiency = main_sleep.get('efficiency', 0)
            
            hr = self.get_heart_rate_data(date)
            # Fitbit heart rate 1 format: 'activities-heart' is a list
            hr_list = hr.get('activities-heart', [])
            resting_hr = "Unknown"
            if hr_list:
                # Resting heart rate is often in the first day's value
                resting_hr = hr_list[0].get('value', {}).get('restingHeartRate', "Unknown")
            
            summary = f"Sleep: {sleep_duration:.1f} hours (Efficiency: {sleep_efficiency}%). Resting HR: {resting_hr} bpm."
            return summary
        except Exception as e:
            from src.utils.logger import logger
            logger.error(f"Error generating biometric summary: {e}")
            return "Unable to fetch biometric data at this time."
    
    def get_heart_rate_data(self, date: str) -> dict:
        """
        Fetch heart rate data for a specific date.
        
        Args:
            date: Date in YYYY-MM-DD format
            
        Returns:
            dict: Heart rate data from Fitbit API
        """
        if self._is_token_expired():
            self._refresh_token()
        
        headers = {'Authorization': f'Bearer {self.access_token}'}
        response = requests.get(f"{self.BASE_URL}/1/user/-/activities/heart/date/{date}/1d.json", headers=headers)
        
        if response.status_code == 401:
            self._refresh_token()
            headers = {'Authorization': f'Bearer {self.access_token}'}
            response = requests.get(f"{self.BASE_URL}/1/user/-/activities/heart/date/{date}/1d.json", headers=headers)
        
        return response.json()