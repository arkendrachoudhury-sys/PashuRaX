from sqlalchemy import String, Boolean, Integer, Float, Enum as SQLEnum, text, DateTime
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
