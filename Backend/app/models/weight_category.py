from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, func
from sqlalchemy.orm import relationship
from app.database.database import Base


class WeightCategory(Base):
    __tablename__ = "weight_categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    min_weight = Column(Float, nullable=False)
    max_weight = Column(Float, nullable=False)
    price = Column(Integer, nullable=False)
    label = Column(String, nullable=False)

    parcels = relationship("Parcel", back_populates="weight_category")