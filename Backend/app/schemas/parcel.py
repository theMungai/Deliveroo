from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pydantic.config import ConfigDict

class ParcelCreate(BaseModel):
    pickup_address: str
    pickup_lat: float
    pickup_lng: float
    destination_address: str
    destination_lat: float
    destination_lng: float
    weight: float
    weight_category_id: int
    price: int  # Optional.

class ParcelOut(BaseModel):
    id: int
    user_id: int
    pickup_address: str
    pickup_lat: float
    pickup_lng: float
    destination_address: str
    destination_lat: float
    destination_lng: float
    weight: float
    weight_category_id: int
    price: int
    status: str
    current_location: Optional[str]
    current_lat: Optional[float]
    current_lng: Optional[float]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
