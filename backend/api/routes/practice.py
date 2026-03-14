from fastapi import APIRouter, HTTPException

from backend.api.schemas.exercise import SubmitChoiceAnswerRequest
from backend.services.practice_service import PracticeService

router = APIRouter(prefix="/api/practice", tags=["practice"])
service = PracticeService()

@router.get("/{task_number}")
def get_task_lesson(task_number: int):
    try:
        return service.get_task_lesson(task_number)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail="Lesson not found") from exc

@router.post("/submit-choice")
def submit_choice(payload: SubmitChoiceAnswerRequest):
    return service.submit_choice_answer(
        task_number=payload.task_number,
        expected_answer=payload.expected_answer,
        user_answer=payload.user_answer,
        error_count=payload.error_count,
    )
