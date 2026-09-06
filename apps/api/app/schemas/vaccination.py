from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from uuid import UUID
from datetime import datetime, date

class VaccinationBase(BaseModel):
    animal_id: UUID
    administered_by: UUID
    vaccine_name: str
    disease_target: str
    administered_date: date
    next_due_date: Optional[date] = None
    batch_number: Optional[str] = None
    dose_ml: Optional[float] = None
    route: Optional[str] = None
    notes: Optional[str] = None

class VaccinationCreate(VaccinationBase):
    pass

class VaccinationUpdate(BaseModel):
    vaccine_name: Optional[str] = None
    disease_target: Optional[str] = None
    administered_date: Optional[date] = None
    next_due_date: Optional[date] = None
    batch_number: Optional[str] = None
    dose_ml: Optional[float] = None
    route: Optional[str] = None
    notes: Optional[str] = None

class VaccinationResponse(VaccinationBase):
    id: UUID
    sync_version: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
