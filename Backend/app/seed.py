import sys
import os
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from faker import Faker
import random

# Ensure app folder is in the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from app.database.database import SessionLocal, Base, engine
from app.models import user, admin, parcel, weight_category, status_history

# Create all tables
Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
fake = Faker()

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def seed():
    db: Session = SessionLocal()

    try:
        # Seed weight categories
        weight_categories = [
            {"min_weight": 0.0, "max_weight": 2.0, "price": 100, "label": "Light"},
            {"min_weight": 2.1, "max_weight": 5.0, "price": 200, "label": "Medium"},
            {"min_weight": 5.1, "max_weight": 10.0, "price": 300, "label": "Heavy"},
        ]

        for wc_data in weight_categories:
            exists = db.query(weight_category.WeightCategory).filter_by(label=wc_data["label"]).first()
            if not exists:
                wc = weight_category.WeightCategory(**wc_data)
                db.add(wc)

        db.commit()
        db.close()
                

        
        # Seed users
        users = [
            user.User(
                first_name="John",
                last_name="Doe",
                email="john.doe@example.com",
                password=hash_password("password1"),
                is_active=True
            ),
            user.User(
                first_name="Jane",
                last_name="Smith",
                email="jane.smith@example.com",
                password=hash_password("password2"),
                is_active=True
            ),
        ]
        for u in users:
            existing = db.query(user.User).filter_by(email=u.email).first()
            if not existing:
                db.add(u)
        db.commit()

        # Seed admin
        admin_data = {
            "first_name": "Admin",
            "last_name": "User",
            "email": "admin@example.com",
            "password": hash_password("adminpass"),
            "is_active": True
        }
        existing_admin = db.query(admin.Admin).filter_by(email=admin_data["email"]).first()
        if not existing_admin:
            new_admin = admin.Admin(**admin_data)
            db.add(new_admin)
            db.commit()
            print("✅ Seeded admin.")

        # Seed parcels
        all_users = db.query(user.User).all()
        all_categories = db.query(weight_category.WeightCategory).all()

        if not all_users or not all_categories:
            print("⚠️ Cannot seed parcels: missing users or weight categories.")
        else:
            for _ in range(5):
                new_parcel = parcel.Parcel(
                    recipient_name=fake.name(),
                    pickup_address=fake.address(),
                    pickup_lat=fake.latitude(),
                    pickup_lng=fake.longitude(),
                    destination_address=fake.address(),
                    destination_lat=fake.latitude(),
                    destination_lng=fake.longitude(),
                    weight=round(random.uniform(0.5, 10.0), 2),
                    price=random.randint(100, 1000),
                    weight_category_id=random.choice(all_categories).id,
                    user_id=random.choice(all_users).id,
                )
                db.add(new_parcel)

                db.commit()
            print("✅ Seeded parcels.")

        # Seed parcel status history
        sample_parcel = db.query(parcel.Parcel).first()
        sample_admin = db.query(admin.Admin).first()

        if sample_parcel and sample_admin:
            history_entries = [
                {"parcel_id": sample_parcel.id, "admin_id": sample_admin.id, "status": "picked_up"},
                {"parcel_id": sample_parcel.id, "admin_id": sample_admin.id, "status": "in_transit"},
                {"parcel_id": sample_parcel.id, "admin_id": sample_admin.id, "status": "delivered"}
            ]
            for entry in history_entries:
                record = status_history.ParcelStatusHistory(**entry)
                db.add(record)
            db.commit()
            print("✅ Seeded parcel status history.")
        else:
            print("⚠️ Skipped parcel status history — parcel or admin missing.")

    except IntegrityError as e:
        db.rollback()
        print("❌ Integrity error:")

    finally:
        db.close()

if __name__ == "__main__":
    seed()
