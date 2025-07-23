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
    pickup_lat: float
    pickup_lng: float
    destination_address: str
    destination_lat: float
    destination_lng: float
    weight: float
    weight_category_id: int
    price: int  # Optional.

from pydantic import BaseModel
from datetime import datetime

class ParcelOut(BaseModel):
    id: int
    pickup_address: str
    pickup_lat: float
    pickup_lng: float
    destination_address: str
    destination_lat: float
    destination_lng: float
    weight: float
    price: float
    updated_at: datetime

    class Config:
        orm_mode = True

