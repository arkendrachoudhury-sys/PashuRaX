from sqlalchemy import String, ForeignKey, DateTime, Enum as SQLEnum, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime
import enum
from .health import Severity

class AlertType(enum.Enum):
    OUTBREAK = "OUTBREAK"
    QUARANTINE = "QUARANTINE"
    VACCINATION_CAMPAIGN = "VACCINATION_CAMPAIGN"
    ADVISORY = "ADVISORY"
    EMERGENCY = "EMERGENCY"

class Alert(Base):
    __tablename__ = "alerts"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    alert_type = mapped_column(SQLEnum(AlertType))
    severity = mapped_column(SQLEnum(Severity))
    title = mapped_column(String)
    message = mapped_column(String)
    jurisdiction_code = mapped_column(String)
    affected_area_wkt = mapped_column(String, nullable=True)
    is_active = mapped_column(Boolean, default=True)
    created_by = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    expires_at = mapped_column(DateTime, nullable=True)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
