from pydantic import BaseModel, EmailStr
from datetime import datetime
from pydantic.config import ConfigDict

class AdminBase(BaseModel):
    name: str
    email: EmailStr

class AdminCreate(AdminBase):
    password: str

class AdminOut(AdminBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class AdminLogin(BaseModel):
    email: EmailStr
    password: str
