from sqlalchemy import String, Float, DateTime, Enum as SQLEnum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime
import enum
from .health import Severity

class RiskLevel(enum.Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class RiskZone(Base):
    __tablename__ = "risk_zones"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    boundary_wkt = mapped_column(String)
    risk_level = mapped_column(SQLEnum(RiskLevel))
    diseases = mapped_column(JSON)
    risk_score = mapped_column(Float)
    jurisdiction_code = mapped_column(String)
    assessed_at = mapped_column(DateTime, default=datetime.utcnow)
    created_at = mapped_column(DateTime, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
