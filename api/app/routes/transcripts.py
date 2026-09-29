from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Transcript
from app.schemas import TranscriptCreate, TranscriptRead

router = APIRouter(prefix="/transcripts", tags=["transcripts"])


@router.post("", response_model=TranscriptRead, status_code=status.HTTP_201_CREATED)
def create_transcript(
    payload: TranscriptCreate, db: Session = Depends(get_db)
) -> Transcript:
    transcript = Transcript(**payload.model_dump())
    db.add(transcript)
    db.commit()
    db.refresh(transcript)
    return transcript
