"""
Audio Upload & Transcription API Routes
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import os
import uuid
from pathlib import Path
from loguru import logger

from app.services.transcription import transcribe_audio, transcribe_with_diarization
from app.services.scribe import generate_soap_note

router = APIRouter()

# Temporary storage for uploaded files
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

class TranscriptionRequest(BaseModel):
    audio_url: Optional[str] = None
    language: str = "en"
    enable_diarization: bool = False

class SOAPGenerationRequest(BaseModel):
    transcript: str
    patient_context: Optional[dict] = None
    specialty: str = "primary_care"

@router.post("/upload")
async def upload_audio(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = None
):
    """
    Upload audio file for transcription
    Supports: WAV, MP3, M4A, FLAC, OGG
    """
    try:
        # Validate file type
        allowed_extensions = {".wav", ".mp3", ".m4a", ".flac", ".ogg", ".webm"}
        file_ext = Path(file.filename).suffix.lower()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        file_path = UPLOAD_DIR / f"{file_id}{file_ext}"
        
        # Save file
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        logger.info(f"Audio file uploaded: {file_path} ({len(content)} bytes)")
        
        return JSONResponse({
            "file_id": file_id,
            "filename": file.filename,
            "size": len(content),
            "path": str(file_path),
            "message": "File uploaded successfully. Use /transcribe endpoint to process."
        })
    
    except Exception as e:
        logger.error(f"Upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/transcribe/{file_id}")
async def transcribe_uploaded_audio(
    file_id: str,
    enable_diarization: bool = False,
    language: str = "en"
):
    """
    Transcribe uploaded audio file using Groq Whisper
    """
    try:
        # Find file
        file_path = None
        for ext in [".wav", ".mp3", ".m4a", ".flac", ".ogg", ".webm"]:
            potential_path = UPLOAD_DIR / f"{file_id}{ext}"
            if potential_path.exists():
                file_path = potential_path
                break
        
        if not file_path:
            raise HTTPException(status_code=404, detail="File not found")
        
        # Transcribe
        if enable_diarization:
            result = await transcribe_with_diarization(str(file_path))
        else:
            result = await transcribe_audio(str(file_path), language)
        
        return JSONResponse({
            "file_id": file_id,
            "transcript": result["text"],
            "language": result.get("language", language),
            "duration": result.get("duration"),
            "segments": result.get("segments", []),
            "speakers": result.get("speakers", [])
        })
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Transcription failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/process")
async def process_audio_to_soap(
    file: UploadFile = File(...),
    patient_context: Optional[str] = None,
    specialty: str = "primary_care"
):
    """
    One-shot endpoint: Upload audio → Transcribe → Generate SOAP note
    """
    try:
        # Upload
        file_id = str(uuid.uuid4())
        file_ext = Path(file.filename).suffix.lower()
        file_path = UPLOAD_DIR / f"{file_id}{file_ext}"
        
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        logger.info(f"Processing audio: {file_path}")
        
        # Transcribe
        transcription = await transcribe_audio(str(file_path))
        
        # Parse patient context
        context_dict = None
        if patient_context:
            import json
            try:
                context_dict = json.loads(patient_context)
            except:
                context_dict = {"notes": patient_context}
        
        # Generate SOAP note
        soap_note = await generate_soap_note(
            transcript=transcription["text"],
            patient_context=context_dict,
            specialty=specialty
        )
        
        # Cleanup
        file_path.unlink()
        
        return JSONResponse({
            "file_id": file_id,
            "transcript": transcription["text"],
            "soap_note": soap_note,
            "processing_time": "< 30 seconds"
        })
    
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{file_id}")
async def delete_audio_file(file_id: str):
    """Delete uploaded audio file"""
    try:
        deleted = False
        for ext in [".wav", ".mp3", ".m4a", ".flac", ".ogg", ".webm"]:
            file_path = UPLOAD_DIR / f"{file_id}{ext}"
            if file_path.exists():
                file_path.unlink()
                deleted = True
                break
        
        if not deleted:
            raise HTTPException(status_code=404, detail="File not found")
        
        return JSONResponse({"message": "File deleted successfully"})
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
