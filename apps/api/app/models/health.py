from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum, JSON, Boolean
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
