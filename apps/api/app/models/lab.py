from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime
import enum

class SampleStatus(enum.Enum):
    COLLECTED = "COLLECTED"
    IN_TRANSIT = "IN_TRANSIT"
    RECEIVED = "RECEIVED"
    TESTING = "TESTING"
    COMPLETED = "COMPLETED"

class Sample(Base):
    __tablename__ = "samples"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    report_id = mapped_column(UUID(as_uuid=True), ForeignKey("disease_reports.id"))
    collected_by = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    sample_type = mapped_column(String)
    barcode = mapped_column(String, unique=True, nullable=True)
    status = mapped_column(SQLEnum(SampleStatus))
    collected_at = mapped_column(DateTime, default=datetime.utcnow)
    received_at = mapped_column(DateTime, nullable=True)
    notes = mapped_column(String, nullable=True)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class LabResult(Base):
    __tablename__ = "lab_results"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    sample_id = mapped_column(UUID(as_uuid=True), ForeignKey("samples.id"), unique=True)
    lab_name = mapped_column(String)
    test_type = mapped_column(String)
    result = mapped_column(String)
    disease_confirmed = mapped_column(String, nullable=True)
    serotype = mapped_column(String, nullable=True)
    confidence_score = mapped_column(Float, nullable=True)
    result_date = mapped_column(DateTime, default=datetime.utcnow)
    notes = mapped_column(String, nullable=True)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
