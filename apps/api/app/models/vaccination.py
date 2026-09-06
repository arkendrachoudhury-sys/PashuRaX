from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, Date
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
