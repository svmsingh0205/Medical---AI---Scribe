# Medical Scribe Agent - Architecture

## System Overview

The Medical Scribe Agent is built as a modern, scalable microservices architecture with clear separation between frontend, backend, and AI processing layers.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Mobile App  │  │   EHR Plugin │      │
│  │  (Next.js)   │  │(React Native)│  │   (iframe)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                       │
│                     (FastAPI + CORS)                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Transcription │  │Note Generator│  │Medical Coding│      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       AI/ML LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Whisper    │  │   GPT-4o     │  │   spaCy NER  │      │
│  │   (STT)      │  │   (LLM)      │  │  (Medical)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │   Pinecone   │  │  Cloudflare  │      │
│  │  (Supabase)  │  │  (Vectors)   │  │     R2       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### Frontend (Next.js 14)
- **App Router**: Modern routing with server components
- **Real-time Updates**: WebSocket connection via Supabase Realtime
- **State Management**: React Context + Zustand for complex state
- **UI Components**: shadcn/ui + Tailwind CSS
- **Authentication**: Supabase Auth with JWT tokens

### Backend (FastAPI)
- **API Routes**: RESTful endpoints for all operations
- **WebSocket**: Real-time transcription streaming
- **Authentication**: JWT-based with role-based access control
- **Rate Limiting**: Per-user limits to prevent abuse
- **Caching**: Redis for frequently accessed data

### AI Services

#### Transcription Service
- **Input**: Audio file (WAV, MP3, M4A)
- **Processing**: OpenAI Whisper Large v3
- **Output**: Timestamped transcript with speaker diarization
- **Latency**: <5 seconds for 10-minute audio

#### Note Generation Service
- **Input**: Transcript + patient context
- **Processing**: GPT-4o-mini with medical prompt engineering
- **Output**: Structured SOAP note (JSON)
- **Latency**: <10 seconds

#### Medical Coding Service
- **Input**: SOAP note text
- **Processing**: spaCy NER + ClinicalBERT + LLM validation
- **Output**: ICD-10 and CPT codes with confidence scores
- **Latency**: <3 seconds

### Data Storage

#### PostgreSQL (Supabase)
- **Users**: Authentication and profile data
- **Encounters**: Patient visit metadata
- **Notes**: Generated SOAP notes
- **Audit Logs**: HIPAA-compliant activity tracking

#### Pinecone (Vector Store)
- **Medical Guidelines**: Embedded clinical protocols
- **Historical Notes**: For RAG-based suggestions
- **Medical Terms**: Custom medical vocabulary

#### Cloudflare R2 (Object Storage)
- **Audio Files**: Encrypted patient recordings
- **Attachments**: Lab results, images
- **Exports**: Generated PDF reports

## Data Flow

### 1. Audio Recording → Transcription
```
User records audio → Upload to R2 → Queue transcription job
→ Whisper API → Store transcript → Notify frontend
```

### 2. Transcript → SOAP Note
```
User submits transcript → Fetch patient context → Build prompt
→ GPT-4o API → Parse response → Store note → Return to user
```

### 3. Note → Medical Codes
```
SOAP note → Extract entities (spaCy) → Match ICD-10/CPT codes
→ LLM validation → Return codes with confidence
```

## Security Architecture

### Encryption
- **In Transit**: TLS 1.3 for all API calls
- **At Rest**: AES-256 for database and storage
- **PHI Handling**: Tokenization before AI processing

### Authentication
- **Method**: JWT tokens with refresh mechanism
- **MFA**: Optional TOTP for high-security accounts
- **Session Management**: 30-minute expiry with auto-refresh

### Authorization
- **Roles**: Admin, Physician, Scribe, Viewer
- **Permissions**: Granular access control per resource
- **Audit**: All actions logged with user ID and timestamp

### HIPAA Compliance
- **BAA**: Business Associate Agreements with all vendors
- **Audit Logs**: Immutable, 7-year retention
- **Data Minimization**: Only store necessary PHI
- **Right to Delete**: User data deletion within 30 days

## Scalability

### Horizontal Scaling
- **Backend**: Stateless FastAPI instances behind load balancer
- **Database**: Read replicas for query distribution
- **AI Services**: Queue-based processing with auto-scaling workers

### Performance Optimization
- **Caching**: Redis for API responses and embeddings
- **CDN**: Cloudflare for static assets
- **Database Indexing**: Optimized queries for common operations
- **Prompt Caching**: Reuse system prompts (90% cost reduction)

### Monitoring
- **APM**: Sentry for error tracking
- **Metrics**: Prometheus + Grafana for system health
- **Logs**: Structured logging with ELK stack
- **Alerts**: PagerDuty for critical issues

## Deployment

### Development
- **Backend**: Local uvicorn server
- **Frontend**: Next.js dev server
- **Database**: Local PostgreSQL or Supabase cloud

### Staging
- **Backend**: Railway or Fly.io
- **Frontend**: Vercel preview deployments
- **Database**: Supabase staging project

### Production
- **Backend**: AWS ECS Fargate or Railway
- **Frontend**: Vercel with CDN
- **Database**: Supabase Pro with backups
- **Monitoring**: Full observability stack

## Future Enhancements

### Phase 2
- Real-time collaborative editing
- Voice commands for hands-free operation
- Mobile app with offline support

### Phase 3
- Clinical decision support
- Drug interaction checking
- Guideline adherence alerts

### Phase 4
- Multi-language support
- Specialty-specific models
- EHR deep integrations (Epic, Cerner)
