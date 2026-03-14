from backend.engines.exam_engine import get_mock_exam_stub

class MockExamService:
    def get_mock_exam(self) -> dict:
        return get_mock_exam_stub()
