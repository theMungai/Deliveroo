from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.models.admin import Admin
from app.schemas.admin import AdminCreate, AdminOut, AdminLogin
from app.database.security import verify_password, get_password_hash
from app.auth.auth import get_current_admin  # <-- You need to implement this

router = APIRouter(prefix="/admins", tags=["admins"])

# Route for registering a new admin
@router.post("/register", response_model=AdminOut, status_code=status.HTTP_201_CREATED)
def register_admin(admin: AdminCreate, db: Session = Depends(get_db)) -> AdminOut:
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(admin.password)
    new_admin = Admin(
        first_name=admin.first_name,
        last_name=admin.last_name,
        email=admin.email,
        hashed_password=hashed_password
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin

# Route for logging in an admin
@router.post("/login", response_model=AdminOut)
def login_admin(admin: AdminLogin, db: Session = Depends(get_db)) -> AdminOut:
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if not db_admin or not verify_password(admin.password, db_admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return db_admin

# Route to get the currently authenticated admin's profile
@router.get("/profile", response_model=AdminOut)
def get_profile(current_admin: Admin = Depends(get_current_admin)) -> AdminOut:
    return current_admin

# Route to list all admins
@router.get("/", response_model=List[AdminOut])
def list_admins(db: Session = Depends(get_db)) -> List[AdminOut]:
    return db.query(Admin).all()