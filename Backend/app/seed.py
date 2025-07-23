import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from app.database.database import SessionLocal, Base, engine
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError

from app.models import user, parcel


Base.metadata.create_all(bind=engine)

# Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def seed():
    db: Session = SessionLocal()

    users = [
        {
            "email": "alice@example.com",
            "name": "Alice",
            "password": "password123"
        },
        {
            "email": "bob@example.com",
            "name": "Bob",
            "password": "securepass456"
        }
    ]

    for user_data in users:
        new_user = user.User(  # use fully qualified class name
            email=user_data["email"],
            name=user_data["name"],
            password=hash_password(user_data["password"])
        )
        try:
            db.add(new_user)
            db.commit()
            print(f"Created user: {new_user.email}")
        except IntegrityError:
            db.rollback()
            print(f"User already exists: {new_user.email}")

    db.close()

if __name__ == "__main__":
    seed()
