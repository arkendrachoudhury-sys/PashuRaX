import os

BASE_DIR = r"C:\Users\Windows11\.gemini\antigravity\scratch\PashuRaX\apps\api"

files = {
    "pyproject.toml": """[project]
name = "pashu-rax-api"
version = "1.0.0"
description = "FastAPI backend for PashuRaX"
requires-python = ">=3.12"
dependencies = [
    "fastapi",
    "uvicorn[standard]",
    "sqlalchemy[asyncio]",
    "asyncpg",
    "geoalchemy2",
    "alembic",
    "pydantic>=2.0",
    "pydantic-settings",
    "python-jose[cryptography]",
    "passlib[bcrypt]",
    "python-multipart",
    "redis",
    "httpx",
    "json-logic-qubit",
    "shapely",
    "pyproj"
]

[project.optional-dependencies]
dev = [
    "pytest",
    "pytest-asyncio",
    "httpx",
    "ruff",
    "mypy"
]
""",
    "Dockerfile": """FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml .
RUN pip install .
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
""",
    "app/__init__.py": "",
    "app/config.py": """from pydantic_settings import BaseSettings
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
""",
    "app/database.py": """from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
""",
    "app/models/__init__.py": """from .user import User
from .animal import Animal, Herd
from .health import HealthRecord, Disease, Symptom, DiseaseSymptom
from .vaccination import Vaccination
from .report import DiseaseReport, MortalityReport
from .lab import Sample, LabResult
from .alert import Alert
from .geo import RiskZone
from .sync import SyncTombstone, SyncLog
""",
    "app/models/user.py": """from sqlalchemy import Column, String, Boolean, Integer, Float, Enum as SQLEnum, text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime
import enum

class UserRole(enum.Enum):
    FARMER = "FARMER"
    FIELD_VET = "FIELD_VET"
    LAB_TECH = "LAB_TECH"
    DISTRICT_OFFICER = "DISTRICT_OFFICER"
    STATE_ADMIN = "STATE_ADMIN"
    SUPER_ADMIN = "SUPER_ADMIN"

class User(Base):
    __tablename__ = "users"
    id = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name = mapped_column(String, nullable=False)
    email = mapped_column(String, unique=True, index=True)
    phone = mapped_column(String, nullable=True)
    password_hash = mapped_column(String, nullable=False)
    role = mapped_column(SQLEnum(UserRole), nullable=False)
    jurisdiction_code = mapped_column(String, nullable=True)
    language_pref = mapped_column(String, default='en')
    latitude = mapped_column(Float, nullable=True)
    longitude = mapped_column(Float, nullable=True)
    is_active = mapped_column(Boolean, default=True)
    sync_version = mapped_column(Integer, default=1)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
""",
    "app/models/animal.py": """from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column, relationship
from app.database import Base
from datetime import datetime, date
import enum

class AnimalSex(enum.Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"

class AnimalStatus(enum.Enum):
    HEALTHY = "HEALTHY"
    SICK = "SICK"
    UNDER_TREATMENT = "UNDER_TREATMENT"
    QUARANTINED = "QUARANTINED"
    DECEASED = "DECEASED"

class Herd(Base):
    __tablename__ = "herds"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    owner_id = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    name = mapped_column(String, nullable=False)
    animal_count = mapped_column(Integer, default=0)
    latitude = mapped_column(Float)
    longitude = mapped_column(Float)
    jurisdiction_code = mapped_column(String)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    animals = relationship("Animal", back_populates="herd")

class Animal(Base):
    __tablename__ = "animals"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    owner_id = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    herd_id = mapped_column(UUID(as_uuid=True), ForeignKey("herds.id"), nullable=True)
    tag_number = mapped_column(String, unique=True, index=True)
    species = mapped_column(String)
    breed = mapped_column(String, nullable=True)
    birth_date = mapped_column(DateTime, nullable=True)
    sex = mapped_column(SQLEnum(AnimalSex))
    latitude = mapped_column(Float)
    longitude = mapped_column(Float)
    status = mapped_column(SQLEnum(AnimalStatus), default=AnimalStatus.HEALTHY)
    sync_version = mapped_column(Integer, default=1)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    herd = relationship("Herd", back_populates="animals")
""",
    "app/models/health.py": """from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum, JSON, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime
import enum

class Severity(enum.Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class HealthRecord(Base):
    __tablename__ = "health_records"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    animal_id = mapped_column(UUID(as_uuid=True), ForeignKey("animals.id"))
    recorded_by = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    recorded_at = mapped_column(DateTime, default=datetime.utcnow)
    symptoms = mapped_column(JSON)
    temperature_celsius = mapped_column(Float, nullable=True)
    severity = mapped_column(SQLEnum(Severity))
    diagnosis = mapped_column(String, nullable=True)
    notes = mapped_column(String, nullable=True)
    is_offline_created = mapped_column(Boolean, default=False)
    sync_version = mapped_column(Integer, default=1)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Disease(Base):
    __tablename__ = "diseases"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    code = mapped_column(String, unique=True)
    name = mapped_column(String)
    description = mapped_column(String)
    target_species = mapped_column(JSON)
    incubation_days_min = mapped_column(Integer)
    incubation_days_max = mapped_column(Integer)
    is_notifiable = mapped_column(Boolean)
    risk_level = mapped_column(String)
    created_at = mapped_column(DateTime, default=datetime.utcnow)

class Symptom(Base):
    __tablename__ = "symptoms"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    code = mapped_column(String, unique=True)
    name = mapped_column(String)
    description = mapped_column(String)
    body_system = mapped_column(String)
    created_at = mapped_column(DateTime, default=datetime.utcnow)

class DiseaseSymptom(Base):
    __tablename__ = "disease_symptoms"
    disease_id = mapped_column(UUID(as_uuid=True), ForeignKey("diseases.id"), primary_key=True)
    symptom_id = mapped_column(UUID(as_uuid=True), ForeignKey("symptoms.id"), primary_key=True)
    is_primary = mapped_column(Boolean)
    relevance_score = mapped_column(Float)
""",
    "app/models/vaccination.py": """from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime

class Vaccination(Base):
    __tablename__ = "vaccinations"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    animal_id = mapped_column(UUID(as_uuid=True), ForeignKey("animals.id"))
    administered_by = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    vaccine_name = mapped_column(String)
    disease_target = mapped_column(String)
    administered_date = mapped_column(Date)
    next_due_date = mapped_column(Date, nullable=True)
    batch_number = mapped_column(String, nullable=True)
    dose_ml = mapped_column(Float, nullable=True)
    route = mapped_column(String, nullable=True)
    notes = mapped_column(String, nullable=True)
    sync_version = mapped_column(Integer, default=1)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
""",
    "app/models/report.py": """from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum, JSON, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime
import enum
from .health import Severity

class CaseStatus(enum.Enum):
    UNVERIFIED = "UNVERIFIED"
    SUSPECTED = "SUSPECTED"
    CONFIRMED = "CONFIRMED"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"

class DiseaseReport(Base):
    __tablename__ = "disease_reports"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    reporter_id = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    animal_id = mapped_column(UUID(as_uuid=True), ForeignKey("animals.id"), nullable=True)
    suspected_disease = mapped_column(String)
    symptoms = mapped_column(JSON)
    description = mapped_column(String)
    severity = mapped_column(SQLEnum(Severity))
    case_status = mapped_column(SQLEnum(CaseStatus))
    latitude = mapped_column(Float)
    longitude = mapped_column(Float)
    jurisdiction_code = mapped_column(String)
    is_escalated = mapped_column(Boolean, default=False)
    is_conflict_flagged = mapped_column(Boolean, default=False)
    escalated_to = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    reported_at = mapped_column(DateTime, default=datetime.utcnow)
    resolved_at = mapped_column(DateTime, nullable=True)
    sync_version = mapped_column(Integer, default=1)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MortalityReport(Base):
    __tablename__ = "mortality_reports"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    reporter_id = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    animal_id = mapped_column(UUID(as_uuid=True), ForeignKey("animals.id"), nullable=True)
    species = mapped_column(String)
    count = mapped_column(Integer)
    cause = mapped_column(String, nullable=True)
    latitude = mapped_column(Float)
    longitude = mapped_column(Float)
    jurisdiction_code = mapped_column(String)
    reported_at = mapped_column(DateTime, default=datetime.utcnow)
    sync_version = mapped_column(Integer, default=1)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
"""
}

for path, content in files.items():
    full_path = os.path.join(BASE_DIR, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files written successfully.")
