from backend.database.repositories.progress_repo import ProgressRepository
from backend.engines.progress_engine import build_progress_payload

class ProgressService:
    def __init__(self) -> None:
        self.repo = ProgressRepository()

    def get_progress(self) -> dict:
        return build_progress_payload(self.repo.get_all_task_progress())

    def update_mastery(self, task_number: int, mastery_percent: float, last_error_count: int = 0) -> dict:
        self.repo.upsert_task_progress(task_number, mastery_percent, last_error_count)
        return self.get_progress()
