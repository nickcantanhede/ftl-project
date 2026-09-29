from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TranscriptCreate(BaseModel):
    company_name: str = Field(min_length=1, max_length=200)
    agent_name: str = Field(min_length=1, max_length=200)
    content: str = Field(min_length=1)


class TranscriptRead(TranscriptCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

