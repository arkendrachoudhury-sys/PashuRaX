from sqlalchemy import String, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column
from app.database import Base
from datetime import datetime

class SyncTombstone(Base):
    __tablename__ = "sync_tombstones"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    table_name = mapped_column(String)
    record_id = mapped_column(UUID(as_uuid=True))
    deleted_at = mapped_column(DateTime, default=datetime.utcnow)

class SyncLog(Base):
    __tablename__ = "sync_logs"
    id = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    action = mapped_column(String)
    records_pushed = mapped_column(Integer)
    records_pulled = mapped_column(Integer)
    conflicts = mapped_column(Integer)
    synced_at = mapped_column(DateTime, default=datetime.utcnow)
