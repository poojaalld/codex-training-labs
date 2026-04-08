from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=32)
    password: str = Field(..., min_length=8, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class UserAccount(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    hashed_password: str
    disabled: bool = Field(False)


class UserPublic(BaseModel):
    username: str
    full_name: str
    email: EmailStr


class TokenPayload(BaseModel):
    sub: str
    exp: datetime
