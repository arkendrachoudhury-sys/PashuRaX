from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/pashurax"
    REDIS_URL: str = "redis://localhost:6379"
    SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "PashuRaX"
    CORS_ORIGINS: List[str] = ["*"]

settings = Settings()
