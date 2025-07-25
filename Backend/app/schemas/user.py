from pydantic import BaseModel, EmailStr
from datetime import datetime
from pydantic.config import ConfigDict

class UserBase(BaseModel):
    id: int | None = None
    first_name: str
    last_name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserOut(UserBase):
    is_active: bool
    created_at: datetime

    model_config: ConfigDict = ConfigDict(from_attributes=True)

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut 