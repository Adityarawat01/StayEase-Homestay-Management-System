from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from datetime import timedelta
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

from database import get_db
from models.database_models import User
from models.user import UserCreate, UserLogin, UserResponse, Token, GoogleAuth
from utils.auth import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from utils.rate_limit import limiter

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def register(request: Request, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
@limiter.limit("10/minute")
def login(request: Request, user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
def logout(request: Request):
    # JWTs are stateless, so actual logout happens on the client side (e.g. clearing local storage).
    # This endpoint is provided for API completeness.
    return {"message": "Successfully logged out"}

@router.post("/google-login", response_model=Token)
@limiter.limit("10/minute")
def google_login(request: Request, auth: GoogleAuth, db: Session = Depends(get_db)):
    try:
        # Verify the Google token
        idinfo = id_token.verify_oauth2_token(
            auth.credential, google_requests.Request(), GOOGLE_CLIENT_ID
        )

        email = idinfo['email']
        name = idinfo.get('name', '')

        # Check if user exists
        db_user = db.query(User).filter(User.email == email).first()
        
        # If not, create user (without password, since they use Google)
        if not db_user:
            # Generate a random impossible password or leave it empty if your DB allows
            db_user = User(
                username=name,
                email=email,
                hashed_password="OAUTH_USER_NO_PASSWORD" 
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

        # Generate JWT for the user
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": db_user.email}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Google Token")
