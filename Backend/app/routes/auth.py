# Backend/app/routes/auth.py

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.models.admin import Admin
from app.database.database import get_db
from app.models.user import User
from app.models.admin import Admin
from app.database.config import settings
from fastapi import APIRouter
from app.utils.send_email import send_otp_email
from fastapi import Body
import random
import logging
from collections import defaultdict
from datetime import datetime, timedelta

# Store OTPs and their expiry
otp_store = defaultdict(dict)


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

JWT_SECURITY_KEY = settings.JWT_SECURITY_KEY
ALGORITHM = settings.ALGORITHM


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, JWT_SECURITY_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise credentials_exception

    return user




def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Admin:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate admin credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECURITY_KEY, algorithms=[ALGORITHM])
        admin_id: int = payload.get("admin_id")
        if admin_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if admin is None:
        raise credentials_exception

    return admin


logger = logging.getLogger(__name__)

@router.post("/send-otp", tags=["Authentication"])
async def send_otp(email: str = Body(..., embed=True)):
    otp_code = str(random.randint(100000, 999999))
    expires_at = datetime.utcnow() + timedelta(minutes=30)
    print(f"Sending OTP {otp_code} to {email}")

    otp_store[email] = {"otp": otp_code, "expires_at": expires_at}

    try:
        await send_otp_email(email_to=email, otp_code=otp_code)
        return {"message": "OTP sent successfully"}
    except Exception as e:
        logger.error(f"Failed to send OTP to {email}: {e}")
        raise HTTPException(status_code=500, detail="Failed to send OTP")


@router.post("/verify-otp", tags=["Authentication"])
def verify_otp(
    otp: str = Body(..., embed=True),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    record = otp_store.get(current_user.email)

    if not record or record["otp"] != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if datetime.utcnow() > record["expires_at"]:
        raise HTTPException(status_code=400, detail="OTP expired")

    # Mark user as verified
    current_user.verified = True
    db.commit()
    return {"message": "OTP verified, account is now active"}
