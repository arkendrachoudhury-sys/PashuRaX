from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum, JSON, Boolean
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
