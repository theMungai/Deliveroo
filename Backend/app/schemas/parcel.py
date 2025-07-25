from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pydantic.config import ConfigDict

from pydantic import BaseModel
from typing import Optional

class ParcelUpdate(BaseModel):
    pickup_address: Optional[str] = None
    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    destination_address: Optional[str] = None
    destination_lat: Optional[float] = None
    destination_lng: Optional[float] = None
    weight: Optional[float] = None
    weight_category_id: Optional[int] = None
    price: Optional[int] = None
    status: Optional[str] = None


class ParcelCreate(BaseModel):
    pickup_address: str
    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    destination_address: str
    destination_lat: Optional[float] = None
    destination_lng: Optional[float] = None
    weight: float
    weight_category_id: Optional[int] = None
    user_id: Optional[int] = None
    price: int
    recipient_name: str

class ParcelOut(BaseModel):
    id: int
    pickup_address: str
    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    destination_address: str
    destination_lat: Optional[float] = None
    destination_lng: Optional[float] = None
    weight: float
    price: float
    recipient_name: str
    status: str
    updated_at: datetime

    class Config:
        from_attributes = True
