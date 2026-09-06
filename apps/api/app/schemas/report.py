from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from app.models.report import CaseStatus
from app.models.health import Severity

class DiseaseReportBase(BaseModel):
    reporter_id: UUID
    animal_id: Optional[UUID] = None
    suspected_disease: str
    symptoms: List[str]
    description: str
    severity: Severity
    case_status: CaseStatus = CaseStatus.UNVERIFIED
    latitude: float
    longitude: float
    jurisdiction_code: str
    is_escalated: bool = False
    is_conflict_flagged: bool = False
    escalated_to: Optional[UUID] = None

class DiseaseReportCreate(DiseaseReportBase):
    pass

class DiseaseReportUpdate(BaseModel):
    suspected_disease: Optional[str] = None
    symptoms: Optional[List[str]] = None
    description: Optional[str] = None
    severity: Optional[Severity] = None
    case_status: Optional[CaseStatus] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    jurisdiction_code: Optional[str] = None
    is_escalated: Optional[bool] = None
    is_conflict_flagged: Optional[bool] = None
    escalated_to: Optional[UUID] = None
    resolved_at: Optional[datetime] = None

class DiseaseReportResponse(DiseaseReportBase):
    id: UUID
    reported_at: datetime
    resolved_at: Optional[datetime]
    sync_version: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
