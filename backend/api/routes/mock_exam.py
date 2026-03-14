from fastapi import APIRouter

from backend.services.mock_exam_service import MockExamService

router = APIRouter(prefix="/api/mock-exam", tags=["mock-exam"])
service = MockExamService()

@router.get("")
def get_mock_exam():
    return service.get_mock_exam()
