from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict
from uuid import UUID
from datetime import datetime
from app.models.health import Severity

class HealthRecordBase(BaseModel):
    animal_id: UUID
    recorded_by: UUID
    symptoms: List[str]
    temperature_celsius: Optional[float] = None
    severity: Severity
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    is_offline_created: bool = False

class HealthRecordCreate(HealthRecordBase):
    pass

class HealthRecordUpdate(BaseModel):
    symptoms: Optional[List[str]] = None
    temperature_celsius: Optional[float] = None
    severity: Optional[Severity] = None
    diagnosis: Optional[str] = None
    notes: Optional[str] = None

class HealthRecordResponse(HealthRecordBase):
    id: UUID
    recorded_at: datetime
    sync_version: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
