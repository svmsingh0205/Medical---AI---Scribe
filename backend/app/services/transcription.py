"""
Transcription Service using Groq Whisper (FREE & FAST)
"""
import os
from groq import Groq
from loguru import logger
from typing import Dict, Any

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def transcribe_audio(audio_file_path: str, language: str = "en") -> Dict[str, Any]:
    """
    Transcribe audio using Groq's Whisper Large v3 (FREE tier)
    
    Args:
        audio_file_path: Path to audio file
        language: Language code (default: en)
    
    Returns:
        Dict with transcript, segments, and metadata
    """
    try:
        logger.info(f"Starting transcription for: {audio_file_path}")
        
        with open(audio_file_path, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=(audio_file_path, file.read()),
                model="whisper-large-v3",
                response_format="verbose_json",  # Includes timestamps
                language=language,
                temperature=0.0  # Deterministic output
            )
        
        logger.success(f"Transcription completed: {len(transcription.text)} characters")
        
        return {
            "text": transcription.text,
            "segments": transcription.segments if hasattr(transcription, 'segments') else [],
            "language": transcription.language if hasattr(transcription, 'language') else language,
            "duration": transcription.duration if hasattr(transcription, 'duration') else None
        }
    
    except Exception as e:
        logger.error(f"Transcription failed: {str(e)}")
        raise Exception(f"Transcription error: {str(e)}")


async def transcribe_with_diarization(audio_file_path: str) -> Dict[str, Any]:
    """
    Transcribe with speaker diarization (doctor vs patient)
    Note: Groq doesn't support diarization yet, so we'll use basic transcription
    For production, use AssemblyAI's free $50 credit for diarization
    """
    # For now, return basic transcription
    # TODO: Integrate AssemblyAI for speaker diarization
    result = await transcribe_audio(audio_file_path)
    
    # Simple heuristic: alternate speakers (placeholder)
    result["speakers"] = [
        {"speaker": "doctor", "text": result["text"][:len(result["text"])//2]},
        {"speaker": "patient", "text": result["text"][len(result["text"])//2:]}
    ]
    
    return result
