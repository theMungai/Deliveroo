from pydantic import BaseModel, EmailStr
from datetime import datetime
from pydantic.config import ConfigDict

class AdminCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class AdminOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AdminLogin(BaseModel):
    id: int
    email : str
    password : str
