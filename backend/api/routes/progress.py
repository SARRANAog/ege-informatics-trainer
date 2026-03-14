from fastapi import APIRouter

from backend.api.schemas.progress import UpdateProgressRequest
from backend.services.progress_service import ProgressService

router = APIRouter(prefix="/api/progress", tags=["progress"])
service = ProgressService()

@router.get("")
def get_progress():
    return service.get_progress()

@router.post("")
def update_progress(payload: UpdateProgressRequest):
    return service.update_mastery(
        task_number=payload.task_number,
        mastery_percent=payload.mastery_percent,
        last_error_count=payload.last_error_count,
    )
