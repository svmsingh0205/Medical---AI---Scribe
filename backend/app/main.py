"""
MediScribe.ai - Medical Scribe Agent API
FastAPI backend with Groq integration (FREE tier)
"""
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from loguru import logger
from contextlib import asynccontextmanager

# Load environment variables
load_dotenv()

# Import routers
from app.api.routes import audio, notes, auth

# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 MediScribe.ai API starting up...")
    logger.info(f"Environment: {os.getenv('ENVIRONMENT', 'development')}")
    yield
    # Shutdown
    logger.info("👋 MediScribe.ai API shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="MediScribe.ai API",
    description="AI-powered clinical documentation system - Convert conversations to SOAP notes",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan
)

# CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,https://*.vercel.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if os.getenv("ENVIRONMENT") == "development" else origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints
@app.get("/")
async def root():
    return {
        "message": "MediScribe.ai API - Medical Scribe Agent",
        "status": "healthy",
        "version": "1.0.0",
        "docs": "/api/docs"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "services": {
            "groq": "configured" if os.getenv("GROQ_API_KEY") else "missing",
            "supabase": "configured" if os.getenv("SUPABASE_URL") else "missing",
            "cloudflare_r2": "configured" if os.getenv("R2_ACCESS_KEY_ID") else "missing"
        }
    }

# Include API routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(audio.router, prefix="/api/audio", tags=["Audio Processing"])
app.include_router(notes.router, prefix="/api/notes", tags=["SOAP Notes"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
