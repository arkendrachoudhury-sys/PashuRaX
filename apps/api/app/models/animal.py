from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column, relationship
from app.database import Base
from datetime import datetime
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
