from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from uuid import UUID
from datetime import datetime, date
from app.models.animal import AnimalSex, AnimalStatus

class AnimalBase(BaseModel):
    owner_id: UUID
    herd_id: Optional[UUID] = None
    tag_number: str
    species: str
    breed: Optional[str] = None
    birth_date: Optional[datetime] = None
    sex: AnimalSex
    latitude: float
    longitude: float
    status: AnimalStatus = AnimalStatus.HEALTHY

class AnimalCreate(AnimalBase):
    pass

class AnimalUpdate(BaseModel):
    herd_id: Optional[UUID] = None
    tag_number: Optional[str] = None
    species: Optional[str] = None
    breed: Optional[str] = None
    birth_date: Optional[datetime] = None
    sex: Optional[AnimalSex] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: Optional[AnimalStatus] = None

class AnimalResponse(AnimalBase):
    id: UUID
    sync_version: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
