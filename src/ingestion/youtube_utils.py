import re
import logging
import requests
from typing import List, Optional
import yt_dlp

logger = logging.getLogger(__name__)

def extract_video_id(url: str) -> Optional[str]:
    """
    Extract the 11-character YouTube video ID from various URL formats.
    
    Supported formats:
    - https://www.youtube.com/watch?v=VIDEO_ID
    - https://youtu.be/VIDEO_ID
    - https://www.youtube.com/embed/VIDEO_ID
    - https://www.youtube.com/v/VIDEO_ID
    """
    if not url:
        return None
        
    patterns = [
        r"(?:v=|\/embed\/|\/v\/|youtu\.be\/)([0-9A-Za-z_-]{11})",
        r"youtube\.com\/watch\?.*v=([0-9A-Za-z_-]{11})"
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
            
    return None

def fetch_transcript(video_id: str, languages: List[str] = ['en', 'en-US']) -> Optional[str]:
    """
    Fetch the transcript for a YouTube video using yt-dlp for reliability.
    
    Args:
        video_id: The 11-character YouTube video ID.
        languages: List of preferred language codes in descending order of priority.
        
    Returns:
        Formatted transcript text or None if fetching fails.
    """
    url = f"https://www.youtube.com/watch?v={video_id}"
    
    ydl_opts = {
        'writesubtitles': True,
        'writeautomaticsub': True,
        'skip_download': True,
        'quiet': True,
        'no_warnings': True,
    }

    try:
        logger.info(f"Fetching transcript for video: {video_id} using yt-dlp")
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            subtitles = info.get('subtitles', {})
            automatic_captions = info.get('automatic_captions', {})
            
            # Find the best matching language
            target_lang = None
            for lang in languages:
                if lang in subtitles:
                    target_lang = lang
                    break
            
            # Fallback to automatic captions if no manual subtitles found
            if not target_lang:
                for lang in languages:
                    if lang in automatic_captions:
                        target_lang = lang
                        break
            
            if not target_lang:
                # If still no match, try any English-related lang
                combined = {**subtitles, **automatic_captions}
                target_lang = next((l for l in combined if l.startswith('en')), None)
                
            if not target_lang:
                logger.error(f"No suitable transcript found for {video_id} in languages {languages}")
                return None
            
            # Get the JSON3 format URL (standard structured format used by YouTube)
            formats = subtitles.get(target_lang) or automatic_captions.get(target_lang)
            json3_url = next((f['url'] for f in formats if f.get('ext') == 'json3'), None)
            
            if not json3_url:
                logger.error(f"JSON3 format not available for transcript in {target_lang}")
                return None
                
            # Fetch the actual content
            resp = requests.get(json3_url)
            resp.raise_for_status()
            
            data = resp.json()
            events = data.get('events', [])
            full_text = ""
            for event in events:
                segs = event.get('segs', [])
                for seg in segs:
                    full_text += seg.get('utf8', '')
            
            # Normalize whitespace
            full_text = re.sub(r'\s+', ' ', full_text).strip()
            
            return full_text
            
    except Exception as e:
        logger.error(f"Failed to fetch YouTube transcript for {video_id} with yt-dlp: {str(e)}")
        return None


def fetch_transcript_segments(video_id: str, languages: List[str] = ['en', 'en-US']) -> Optional[List[dict]]:
    """
    Fetch transcript segments with timestamps.
    Returns list of {start_ms, duration_ms, text}.
    """
    url = f"https://www.youtube.com/watch?v={video_id}"

    ydl_opts = {
        'writesubtitles': True,
        'writeautomaticsub': True,
        'skip_download': True,
        'quiet': True,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            subtitles = info.get('subtitles', {})
            automatic_captions = info.get('automatic_captions', {})

            target_lang = None
            for lang in languages:
                if lang in subtitles:
                    target_lang = lang
                    break
            if not target_lang:
                for lang in languages:
                    if lang in automatic_captions:
                        target_lang = lang
                        break
            if not target_lang:
                combined = {**subtitles, **automatic_captions}
                target_lang = next((l for l in combined if l.startswith('en')), None)
            if not target_lang:
                return None

            formats = subtitles.get(target_lang) or automatic_captions.get(target_lang)
            json3_url = next((f['url'] for f in formats if f.get('ext') == 'json3'), None)
            if not json3_url:
                return None

            resp = requests.get(json3_url)
            resp.raise_for_status()
            data = resp.json()
            events = data.get('events', [])
            segments = []
            for event in events:
                start_ms = int(event.get('tStartMs') or 0)
                duration_ms = int(event.get('dDurationMs') or 0)
                segs = event.get('segs', [])
                text = "".join(seg.get('utf8', '') for seg in segs).strip()
                if text:
                    segments.append({
                        "start_ms": start_ms,
                        "duration_ms": duration_ms,
                        "text": re.sub(r'\s+', ' ', text)
                    })
            return segments
    except Exception as e:
        logger.error(f"Failed to fetch YouTube transcript segments for {video_id}: {str(e)}")
        return None
