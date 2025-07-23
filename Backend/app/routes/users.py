from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.models.user import User
from app.schemas import UserCreate, UserOut, UserLogin
from app.database.security import verify_password, get_password_hash
from app.routes.auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

# Route for registering a new user
@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)) -> UserOut:
    db_user = db.query(User).filter(User.email == user.email).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Route for logging in a user
@router.post("/login", response_model=UserOut)
def login_user (user: UserLogin, db:Session = Depends(get_db)) -> UserOut:
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return db_user

# Route to get the currently authenticated user's profile
@router.get("/profile", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)) -> UserOut:
    return current_user

# Route to list all users
@router.get("/", response_model = List[UserOut])
def list_users(db: Session = Depends(get_db)) ->List[UserOut]:
    users = db.query(User).all()
    return [UserOut.from_orm(user) for user in users]