from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from pydantic.config import ConfigDict

class StatusHistoryCreate(BaseModel):
    parcel_id: int
    admin_id: Optional[int]  # In case NULL when added automatically
    status: str
    location: str
    lat: float
    lng: float

class StatusHistoryOut(BaseModel):
    id: int
    parcel_id: int
    admin_id: Optional[int]
    status: str
    location: str
    lat: float
    lng: float
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
