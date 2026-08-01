from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    """
    Schema for user registration.
    Accepts: { "username": "...", "email": "...", "password": "..." }
    The `username` value is stored directly in the `username` column of the users table.
    """
    username: str = Field(..., min_length=1, description="User's display name")
    email: EmailStr
    password: str = Field(..., min_length=6, description="Password (minimum 6 characters)")


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class GoogleAuth(BaseModel):
    credential: str
