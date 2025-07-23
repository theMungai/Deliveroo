from datetime import datetime, timedelta
from jose import jwt
from app.database.config import settings  
JWT_SECURITY_KEY = settings.JWT_SECURITY_KEY
ALGORITHM = settings.ALGORITHM

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=30)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECURITY_KEY, algorithm=ALGORITHM)
