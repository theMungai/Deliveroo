from pydantic import BaseModel, EmailStr
from datetime import datetime

class AdminBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

class AdminCreate(AdminBase):
    password: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdminOut(AdminBase):
    id: int
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin: AdminOut
