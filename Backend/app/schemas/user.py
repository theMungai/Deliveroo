from pydantic import BaseModel, EmailStr
from datetime import datetime
from pydantic.config import ConfigDict

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    model_config: ConfigDict = ConfigDict(from_attributes=True)

