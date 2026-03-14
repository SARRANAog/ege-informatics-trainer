from pydantic import BaseModel

class UpdateProgressRequest(BaseModel):
    task_number: int
    mastery_percent: float
    last_error_count: int = 0
