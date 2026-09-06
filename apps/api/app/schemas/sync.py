from pydantic import BaseModel, ConfigDict
from typing import Dict, Any, List
from datetime import datetime

class SyncPullRequest(BaseModel):
    last_pulled_at: datetime

class SyncPullResponse(BaseModel):
    changes: Dict[str, Any]
    timestamp: datetime

class SyncPushRequest(BaseModel):
    changes: Dict[str, Any]

class SyncPushResponse(BaseModel):
    ok: bool
    server_time: datetime
    conflicts: List[Any]
