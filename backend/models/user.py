from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    """
    Schema for user registration.

    The frontend sends `full_name` (the user's display name).
    The route handler maps `full_name` → the `username` column in the database.
    No alias is needed because the JSON key and the Python field name are both `full_name`.
    """
    full_name: str = Field(..., min_length=1, description="User's display name")
    email: EmailStr
    password: str = Field(..., min_length=6, description="Password (minimum 6 characters)")

    model_config = ConfigDict(populate_by_name=True)


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
