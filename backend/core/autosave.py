from backend.database.repositories.progress_repo import ProgressRepository

def autosave_progress(progress_repo: ProgressRepository, task_number: int, delta: int = 1) -> None:
    progress_repo.increment_resolved_exercises(task_number=task_number, delta=delta)
