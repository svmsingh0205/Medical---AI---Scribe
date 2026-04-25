"""
SOAP Notes CRUD API Routes
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid
from loguru import logger

from app.services.scribe import generate_soap_note, refine_soap_note

router = APIRouter()

# In-memory storage (replace with Supabase in production)
notes_db = {}

class NoteCreate(BaseModel):
    transcript: str
    patient_id: Optional[str] = None
    patient_context: Optional[dict] = None
    specialty: str = "primary_care"
    encounter_type: str = "office_visit"

class NoteUpdate(BaseModel):
    soap_note: dict
    
class NoteRefine(BaseModel):
    feedback: str

@router.post("/generate")
async def create_soap_note(request: NoteCreate):
    """
    Generate new SOAP note from transcript
    """
    try:
        # Generate SOAP note
        soap_note = await generate_soap_note(
            transcript=request.transcript,
            patient_context=request.patient_context,
            specialty=request.specialty
        )
        
        # Create note record
        note_id = str(uuid.uuid4())
        note_record = {
            "note_id": note_id,
            "patient_id": request.patient_id,
            "transcript": request.transcript,
            "soap_note": soap_note,
            "specialty": request.specialty,
            "encounter_type": request.encounter_type,
            "status": "draft",
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        notes_db[note_id] = note_record
        
        logger.success(f"SOAP note created: {note_id}")
        
        return JSONResponse(note_record)
    
    except Exception as e:
        logger.error(f"Note creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{note_id}")
async def get_note(note_id: str):
    """
    Retrieve a specific SOAP note
    """
    if note_id not in notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return JSONResponse(notes_db[note_id])


@router.get("/")
async def list_notes(
    patient_id: Optional[str] = None,
    specialty: Optional[str] = None,
    limit: int = 50
):
    """
    List SOAP notes with optional filters
    """
    notes = list(notes_db.values())
    
    # Filter by patient_id
    if patient_id:
        notes = [n for n in notes if n.get("patient_id") == patient_id]
    
    # Filter by specialty
    if specialty:
        notes = [n for n in notes if n.get("specialty") == specialty]
    
    # Sort by created_at (newest first)
    notes.sort(key=lambda x: x["created_at"], reverse=True)
    
    return JSONResponse({
        "notes": notes[:limit],
        "total": len(notes)
    })


@router.put("/{note_id}")
async def update_note(note_id: str, request: NoteUpdate):
    """
    Update SOAP note (manual edits by physician)
    """
    if note_id not in notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    notes_db[note_id]["soap_note"] = request.soap_note
    notes_db[note_id]["updated_at"] = datetime.utcnow().isoformat()
    notes_db[note_id]["status"] = "edited"
    
    logger.info(f"Note updated: {note_id}")
    
    return JSONResponse(notes_db[note_id])


@router.post("/{note_id}/refine")
async def refine_note(note_id: str, request: NoteRefine):
    """
    Refine SOAP note based on physician feedback using AI
    """
    if note_id not in notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    try:
        current_note = notes_db[note_id]["soap_note"]
        
        # Refine using AI
        refined_note = await refine_soap_note(current_note, request.feedback)
        
        # Update record
        notes_db[note_id]["soap_note"] = refined_note
        notes_db[note_id]["updated_at"] = datetime.utcnow().isoformat()
        notes_db[note_id]["status"] = "refined"
        
        logger.success(f"Note refined: {note_id}")
        
        return JSONResponse(notes_db[note_id])
    
    except Exception as e:
        logger.error(f"Note refinement failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{note_id}/finalize")
async def finalize_note(note_id: str):
    """
    Mark note as finalized (ready for EHR export)
    """
    if note_id not in notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    notes_db[note_id]["status"] = "finalized"
    notes_db[note_id]["finalized_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Note finalized: {note_id}")
    
    return JSONResponse(notes_db[note_id])


@router.delete("/{note_id}")
async def delete_note(note_id: str):
    """
    Delete SOAP note (soft delete for audit trail)
    """
    if note_id not in notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    notes_db[note_id]["status"] = "deleted"
    notes_db[note_id]["deleted_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Note deleted: {note_id}")
    
    return JSONResponse({"message": "Note deleted successfully"})


@router.get("/{note_id}/export")
async def export_note(note_id: str, format: str = "json"):
    """
    Export SOAP note in various formats (JSON, PDF, HL7, FHIR)
    """
    if note_id not in notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    note = notes_db[note_id]
    
    if format == "json":
        return JSONResponse(note)
    
    elif format == "text":
        soap = note["soap_note"]
        text_output = f"""SOAP NOTE
Generated: {note['created_at']}

SUBJECTIVE:
{soap.get('subjective', 'N/A')}

OBJECTIVE:
{soap.get('objective', 'N/A')}

ASSESSMENT:
{soap.get('assessment', 'N/A')}

PLAN:
{soap.get('plan', 'N/A')}

ICD-10 CODES:
{chr(10).join([f"- {c['code']}: {c['description']}" for c in soap.get('icd10_codes', [])])}

CPT CODES:
{chr(10).join([f"- {c['code']}: {c['description']}" for c in soap.get('cpt_codes', [])])}
"""
        return JSONResponse({"format": "text", "content": text_output})
    
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported format: {format}")
