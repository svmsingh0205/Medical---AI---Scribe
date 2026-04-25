# Medical Scribe Agent - API Documentation

## Base URL
```
Development: http://localhost:8000
Production: https://api.medicalscribe.ai
```

## Authentication

All API requests require authentication using JWT tokens.

### Get Access Token
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "doctor@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

### Use Token
Include the token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints

### Health Check

#### GET /api/health
Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "environment": "production",
  "version": "1.0.0"
}
```

---

### Transcription

#### POST /api/transcription/upload
Upload audio file for transcription.

**Request:**
```http
POST /api/transcription/upload
Content-Type: multipart/form-data
Authorization: Bearer {token}

audio: <file>
encounter_id: "enc_123456"
```

**Response:**
```json
{
  "transcription_id": "trans_789012",
  "status": "processing",
  "estimated_completion": "2024-01-15T10:30:00Z"
}
```

#### GET /api/transcription/{transcription_id}
Get transcription result.

**Response:**
```json
{
  "transcription_id": "trans_789012",
  "status": "completed",
  "transcript": "Patient presents with chest pain...",
  "speakers": [
    {
      "speaker": "doctor",
      "segments": [
        {
          "start": 0.0,
          "end": 5.2,
          "text": "How can I help you today?"
        }
      ]
    }
  ],
  "duration": 600.5,
  "created_at": "2024-01-15T10:25:00Z",
  "completed_at": "2024-01-15T10:30:00Z"
}
```

---

### SOAP Notes

#### POST /api/notes/generate
Generate SOAP note from transcript.

**Request:**
```json
{
  "transcription_id": "trans_789012",
  "patient_id": "pat_456789",
  "encounter_type": "office_visit",
  "specialty": "primary_care"
}
```

**Response:**
```json
{
  "note_id": "note_345678",
  "soap_note": {
    "subjective": "Patient is a 45-year-old male presenting with chest pain...",
    "objective": "BP: 130/85, HR: 78, Temp: 98.6°F...",
    "assessment": "1. Chest pain, likely musculoskeletal...",
    "plan": "1. NSAIDs for pain management..."
  },
  "created_at": "2024-01-15T10:31:00Z"
}
```

#### GET /api/notes/{note_id}
Retrieve a specific note.

#### PUT /api/notes/{note_id}
Update a note.

**Request:**
```json
{
  "soap_note": {
    "subjective": "Updated subjective section...",
    "objective": "Updated objective section...",
    "assessment": "Updated assessment...",
    "plan": "Updated plan..."
  }
}
```

#### DELETE /api/notes/{note_id}
Delete a note (soft delete for audit trail).

---

### Medical Coding

#### POST /api/coding/suggest
Get ICD-10 and CPT code suggestions.

**Request:**
```json
{
  "note_id": "note_345678",
  "note_text": "Patient presents with chest pain..."
}
```

**Response:**
```json
{
  "icd10_codes": [
    {
      "code": "R07.9",
      "description": "Chest pain, unspecified",
      "confidence": 0.92
    },
    {
      "code": "M79.1",
      "description": "Myalgia",
      "confidence": 0.78
    }
  ],
  "cpt_codes": [
    {
      "code": "99213",
      "description": "Office visit, established patient, 20-29 minutes",
      "confidence": 0.95
    }
  ]
}
```

---

### Encounters

#### POST /api/encounters
Create a new encounter.

**Request:**
```json
{
  "patient_id": "pat_456789",
  "encounter_type": "office_visit",
  "scheduled_date": "2024-01-15T10:00:00Z",
  "chief_complaint": "Chest pain"
}
```

#### GET /api/encounters/{encounter_id}
Get encounter details.

#### GET /api/encounters
List encounters with filters.

**Query Parameters:**
- `patient_id`: Filter by patient
- `start_date`: Filter by date range
- `end_date`: Filter by date range
- `status`: Filter by status (scheduled, in_progress, completed)

---

### Export

#### POST /api/export/pdf
Export note as PDF.

**Request:**
```json
{
  "note_id": "note_345678",
  "format": "pdf",
  "include_codes": true
}
```

**Response:**
```json
{
  "download_url": "https://storage.medicalscribe.ai/exports/note_345678.pdf",
  "expires_at": "2024-01-15T11:00:00Z"
}
```

#### POST /api/export/ehr
Export to EHR format (HL7/FHIR).

**Request:**
```json
{
  "note_id": "note_345678",
  "format": "fhir",
  "ehr_system": "epic"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters",
    "details": {
      "missing_fields": ["patient_id"]
    }
  }
}
```

### Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## Rate Limits

- **Free Tier**: 50 requests/hour
- **Solo Plan**: 500 requests/hour
- **Group Plan**: 2000 requests/hour
- **Enterprise**: Custom limits

Rate limit headers:
```http
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 487
X-RateLimit-Reset: 1705318800
```

---

## Webhooks

Subscribe to events via webhooks.

### Events
- `transcription.completed`
- `note.generated`
- `note.updated`
- `coding.completed`

### Webhook Payload
```json
{
  "event": "note.generated",
  "timestamp": "2024-01-15T10:31:00Z",
  "data": {
    "note_id": "note_345678",
    "encounter_id": "enc_123456"
  }
}
```

---

## SDKs

Coming soon:
- Python SDK
- JavaScript/TypeScript SDK
- Ruby SDK
