from pydantic import BaseModel

class SubmitChoiceAnswerRequest(BaseModel):
    task_number: int
    expected_answer: str
    user_answer: str
    error_count: int = 0

class SubmitCodeRequest(BaseModel):
    code: str
    tests: list[dict] = []
    required_nodes: list[str] = []
