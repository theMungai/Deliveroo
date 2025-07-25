from sqlalchemy import Column, Integer, String,Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database.database import Base
from sqlalchemy.sql import func
from datetime import datetime 


class Parcel(Base):
    __tablename__ = "parcels"

    id = Column(Integer, primary_key=True)
    pickup_address = Column(String, nullable=False)
    pickup_lat = Column(Float, nullable=False)
    pickup_lng = Column(Float, nullable=False)
    destination_address = Column(String, nullable=False)
    destination_lat = Column(Float, nullable=False)
    destination_lng = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    recipient_name = Column(String, nullable=False)  # Added column
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    weight_category_id = Column(Integer, ForeignKey('weight_categories.id'), nullable=False)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", back_populates="parcels")
    weight_category = relationship("WeightCategory", back_populates="parcels")
    status_history = relationship("ParcelStatusHistory", back_populates="parcel", cascade="all, delete-orphan")

    status = Column(String, nullable=False, default="Pending")

