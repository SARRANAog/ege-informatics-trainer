from fastapi import APIRouter, HTTPException

from backend.services.theory_service import TheoryService

router = APIRouter(prefix="/api/theory", tags=["theory"])
service = TheoryService()

@router.get("/{task_number}")
def get_task_theory(task_number: int):
    try:
        return service.get_task_theory(task_number)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail="Theory not found") from exc
