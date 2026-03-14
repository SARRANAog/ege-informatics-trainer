from pydantic import BaseModel

class Profile(BaseModel):
    name: str

class TaskProgress(BaseModel):
    task_number: int
    mastery_percent: float = 0.0
    solved_exercises: int = 0
    last_error_count: int = 0
    last_updated_at: str | None = None
