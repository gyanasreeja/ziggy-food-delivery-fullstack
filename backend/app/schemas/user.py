from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime
import re
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=5, max_length=20)
    phone: str = Field(..., min_length=10, max_length=10)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=100)
    role: str = "customer"
    
    @field_validator('password')
    def validate_password(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain at least one number')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character')
        return v
    
    @field_validator('phone')
    def validate_phone(cls, v):
        if not v.isdigit():
            raise ValueError('Phone must contain only digits')
        if len(v) != 10:
            raise ValueError('Phone must be exactly 10 digits')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

from uuid import UUID

class UserResponse(UserBase):
    id: UUID
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
    