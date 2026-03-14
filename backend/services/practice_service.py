from backend.content.loader import load_task_lesson
from backend.core.hint_policy import get_hint_level
from backend.core.autosave import autosave_progress
from backend.database.repositories.progress_repo import ProgressRepository
from backend.validators.choice_validator import validate_choice

class PracticeService:
    def __init__(self) -> None:
        self.progress_repo = ProgressRepository()

    def get_task_lesson(self, task_number: int, lesson_slug: str = "lesson_01") -> dict:
        return load_task_lesson(task_number, lesson_slug)

    def submit_choice_answer(self, task_number: int, expected_answer: str, user_answer: str, error_count: int) -> dict:
        validation = validate_choice(expected_answer, user_answer)
        if validation["is_correct"]:
            autosave_progress(self.progress_repo, task_number=task_number, delta=1)
        return {
            "is_correct": validation["is_correct"],
            "hint_level": get_hint_level(error_count if not validation["is_correct"] else 0),
        }
