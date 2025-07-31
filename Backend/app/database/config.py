# Backend/app/database/config.py
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    SQLALCHEMY_DATABASE_URL: str
    JWT_SECURITY_KEY: str
    ALGORITHM: str = "HS256"
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    APP_NAME: str = "Deliveroo API"
    APP_PORT: int = 8000


    # === Email Settings ===
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_TLS: bool
    MAIL_SSL: bool

    class Config:
        env_file = ".env"

settings = Settings()
