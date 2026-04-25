"""
SOAP Note Generation Service using Groq Llama 3.1 70B (FREE)
"""
import os
import json
from groq import Groq
from loguru import logger
from typing import Dict, Any, Optional

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SOAP_SYSTEM_PROMPT = """You are an expert medical scribe AI. Your task is to convert doctor-patient conversation transcripts into structured SOAP notes.

SOAP Format:
- Subjective: Patient's complaints, symptoms, and history in their own words
- Objective: Measurable findings, vital signs, physical examination results
- Assessment: Diagnosis, differential diagnoses with ICD-10 codes
- Plan: Treatment plan, medications, follow-up with CPT codes

IMPORTANT:
1. Extract medical entities accurately (symptoms, medications, diagnoses)
2. Suggest appropriate ICD-10 codes for diagnoses
3. Suggest CPT codes for procedures/visits
4. Use professional medical terminology
5. Be concise but complete
6. Return ONLY valid JSON

Output JSON format:
{
  "subjective": "string",
  "objective": "string",
  "assessment": "string",
  "plan": "string",
  "icd10_codes": [{"code": "string", "description": "string", "confidence": 0.0-1.0}],
  "cpt_codes": [{"code": "string", "description": "string", "confidence": 0.0-1.0}],
  "medications": ["string"],
  "chief_complaint": "string"
}
"""

async def generate_soap_note(
    transcript: str,
    patient_context: Optional[Dict[str, Any]] = None,
    specialty: str = "primary_care"
) -> Dict[str, Any]:
    """
    Generate SOAP note from transcript using Groq Llama 3.1 70B
    
    Args:
        transcript: Doctor-patient conversation transcript
        patient_context: Optional patient history/context
        specialty: Medical specialty (primary_care, cardiology, etc.)
    
    Returns:
        Structured SOAP note with ICD-10/CPT codes
    """
    try:
        logger.info(f"Generating SOAP note for {specialty} specialty")
        
        # Build context-aware prompt
        context_str = ""
        if patient_context:
            context_str = f"""
Patient Context:
- Age: {patient_context.get('age', 'Unknown')}
- Gender: {patient_context.get('gender', 'Unknown')}
- Medical History: {patient_context.get('history', 'None provided')}
- Current Medications: {patient_context.get('medications', 'None')}
- Allergies: {patient_context.get('allergies', 'None')}
"""
        
        user_prompt = f"""{context_str}

Transcript:
{transcript}

Generate a structured SOAP note with ICD-10 and CPT codes. Return ONLY valid JSON."""

        response = client.chat.completions.create(
            model="llama-3.1-70b-versatile",  # FREE on Groq, fastest inference
            messages=[
                {"role": "system", "content": SOAP_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.1,  # Low temperature for consistency
            max_tokens=2000,
            response_format={"type": "json_object"}
        )
        
        soap_note = json.loads(response.choices[0].message.content)
        
        logger.success("SOAP note generated successfully")
        return soap_note
    
    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing error: {str(e)}")
        raise Exception("Failed to parse SOAP note JSON")
    
    except Exception as e:
        logger.error(f"SOAP note generation failed: {str(e)}")
        raise Exception(f"SOAP generation error: {str(e)}")


async def refine_soap_note(
    soap_note: Dict[str, Any],
    feedback: str
) -> Dict[str, Any]:
    """
    Refine SOAP note based on physician feedback
    """
    try:
        prompt = f"""Original SOAP Note:
{json.dumps(soap_note, indent=2)}

Physician Feedback:
{feedback}

Refine the SOAP note based on the feedback. Return ONLY valid JSON in the same format."""

        response = client.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=[
                {"role": "system", "content": SOAP_SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=2000,
            response_format={"type": "json_object"}
        )
        
        refined_note = json.loads(response.choices[0].message.content)
        logger.success("SOAP note refined successfully")
        return refined_note
    
    except Exception as e:
        logger.error(f"SOAP note refinement failed: {str(e)}")
        raise Exception(f"Refinement error: {str(e)}")
