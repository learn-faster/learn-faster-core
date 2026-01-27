"""
Spaced Repetition System (SRS) service.
Implements the SM-2 algorithm to calculate optimal review intervals for flashcards.
"""
from datetime import datetime, timedelta
from typing import Tuple


class SRSService:
    """
    Spaced Repetition System using the SM-2 algorithm.
    
    The SM-2 algorithm calculates the next review interval based on:
    - Current ease factor (difficulty)
    - Number of successful repetitions
    - User's recall quality rating (0-5)
    """
    
    @staticmethod
    def calculate_next_review(
        ease_factor: float,
        interval: int,
        repetitions: int,
        rating: int
    ) -> Tuple[float, int, int, datetime]:
        """
        Calculates the next review parameters based on the SM-2 algorithm.
        
        The algorithm resets progress if the rating is below 3 (forgotten).
        Otherwise, it updates the ease factor and increases the interval.
        
        Args:
            ease_factor (float): Current difficulty of the card (starts at 2.5).
            interval (int): Days between the last review and the next scheduled review.
            repetitions (int): Number of consecutive times the card was successfully recalled.
            rating (int): User-reported recall quality (0: blackout, 5: perfect).
            
        Returns:
            Tuple[float, int, int, datetime]: A tuple containing:
                - new_ease_factor (float): Adjusted difficulty for future calculations.
                - new_interval (int): Days until the next review.
                - new_repetitions (int): Updated count of successful recalls.
                - next_review_date (datetime): UTC timestamp for the next review.
        """
        # Rating < 3 means the card was forgotten - reset
        if rating < 3:
            new_repetitions = 0
            new_interval = 1
            new_ease_factor = max(1.3, ease_factor - 0.2)
        else:
            # Calculate new ease factor
            new_ease_factor = ease_factor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
            new_ease_factor = max(1.3, new_ease_factor)
            
            # Calculate new interval
            if repetitions == 0:
                new_interval = 1
            elif repetitions == 1:
                new_interval = 6
            else:
                new_interval = round(interval * new_ease_factor)
            
            new_repetitions = repetitions + 1
        
        # Calculate next review date
        next_review_date = datetime.utcnow() + timedelta(days=new_interval)
        
        return new_ease_factor, new_interval, new_repetitions, next_review_date
    
    @staticmethod
    def get_rating_label(rating: int) -> str:
        """
        Returns a human-readable description for a given rating.
        
        Args:
            rating (int): Recall quality rating (0-5).
            
        Returns:
            str: Descriptive label for the rating.
        """
        labels = {
            0: "Complete Blackout",
            1: "Incorrect, but familiar",
            2: "Incorrect, but close",
            3: "Correct with difficulty",
            4: "Correct with hesitation",
            5: "Perfect recall"
        }
        return labels.get(rating, "Unknown")
