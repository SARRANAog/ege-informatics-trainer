from fastapi import APIRouter

from backend.services.review_service import ReviewService

router = APIRouter(prefix="/api/weekly-review", tags=["weekly-review"])
service = ReviewService()

@router.get("")
def get_weekly_review():
    return service.get_weekly_review()
