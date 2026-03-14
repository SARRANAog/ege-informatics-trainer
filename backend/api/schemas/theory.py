from pydantic import BaseModel

class TheoryResponse(BaseModel):
    task_number: int
    title: str
    summary: str
