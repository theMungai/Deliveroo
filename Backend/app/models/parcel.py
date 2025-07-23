from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database.database import Base
from sqlalchemy.sql import func


class Parcel(Base):
    __tablename__ = "parcels"

    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String, nullable=False)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    weight_category_id = Column(Integer, ForeignKey('weight_categories.id'), nullable=False)

    user = relationship("User", back_populates="parcels")
    weight_category = relationship("WeightCategory", back_populates="parcels")
    status_history = relationship("ParcelStatusHistory", back_populates="parcel", cascade="all, delete-orphan")

