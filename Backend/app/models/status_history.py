from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base

class ParcelStatusHistory(Base):
    __tablename__ = "parcel_status_histories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    parcel_id = Column(Integer, ForeignKey("parcels.id"), nullable=False)
    admin_id = Column(Integer, ForeignKey("admins.id"), nullable=False)
    status = Column(String, nullable=False)
    timestamp = Column(DateTime, default=func.now(), nullable=False)

    
    parcel = relationship("Parcel", back_populates="status_history")
    admin = relationship("Admin", back_populates="status_history_entries")

# parcel_id = Column(Integer, ForeignKey("parcels.id"), nullable=False)