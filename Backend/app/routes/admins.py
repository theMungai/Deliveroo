from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.models.admin import Admin
from app.schemas.admin import (
    AdminCreate,
    AdminOut,
    AdminLogin,
    AdminLoginResponse,
)
from app.database.security import verify_password, get_password_hash
from app.routes.auth import get_current_admin
from app.auth.utils import create_access_token

router = APIRouter(prefix="/admins", tags=["admins"])

# Register new admin
@router.post("/register", response_model=AdminOut, status_code=status.HTTP_201_CREATED)
def register_admin(admin: AdminCreate, db: Session = Depends(get_db)) -> AdminOut:
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Email already registered")

    password = get_password_hash(admin.password)
    new_admin = Admin(
        first_name=admin.first_name,
        last_name=admin.last_name,
        email=admin.email,
        password=password
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin

# Login and return access token
@router.post("/login", response_model=AdminLoginResponse)
def login_admin(admin: AdminLogin, db: Session = Depends(get_db)) -> AdminLoginResponse:
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if not db_admin or not verify_password(admin.password, db_admin.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"admin_id": db_admin.id})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin": db_admin,
    }

# Get current authenticated admin
# @router.get("/profile", response_model=AdminOut)
# def get_admin_profile(current_admin: Admin = Depends(get_current_admin)) -> AdminOut:
#     return current_admin

# List all admins
@router.get("/", response_model=List[AdminOut])
def list_admins(db: Session = Depends(get_db)) -> List[AdminOut]:
    return db.query(Admin).all()
