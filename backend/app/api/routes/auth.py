"""
Authentication API Routes (Supabase integration)
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from loguru import logger

router = APIRouter()

class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class SignInRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup")
async def sign_up(request: SignUpRequest):
    """
    User registration
    TODO: Integrate with Supabase Auth
    """
    try:
        # Placeholder - integrate Supabase later
        logger.info(f"Sign up request: {request.email}")
        
        return JSONResponse({
            "message": "User registered successfully",
            "email": request.email,
            "user_id": "temp_user_id"
        })
    
    except Exception as e:
        logger.error(f"Sign up failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/signin")
async def sign_in(request: SignInRequest):
    """
    User login
    TODO: Integrate with Supabase Auth
    """
    try:
        logger.info(f"Sign in request: {request.email}")
        
        return JSONResponse({
            "access_token": "temp_token",
            "token_type": "bearer",
            "expires_in": 3600
        })
    
    except Exception as e:
        logger.error(f"Sign in failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/signout")
async def sign_out():
    """User logout"""
    return JSONResponse({"message": "Signed out successfully"})
