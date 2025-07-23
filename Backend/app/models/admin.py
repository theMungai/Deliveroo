from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from app.database.database import Base
from sqlalchemy.sql import func

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name =  Column(String, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    status_history_entries = relationship("ParcelStatusHistory", back_populates="admin", cascade="all, delete-orphan")
