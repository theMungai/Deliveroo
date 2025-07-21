from pydantic import BaseModel
from pydantic.config import ConfigDict

class WeightCategoryBase(BaseModel):
    min_weight: float
    max_weight: float
    price: int
    label: str

class WeightCategoryCreate(WeightCategoryBase):
    pass

class WeightCategoryOut(WeightCategoryBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
