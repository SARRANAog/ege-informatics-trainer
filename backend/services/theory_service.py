from backend.engines.theory_engine import get_theory_payload

class TheoryService:
    def get_task_theory(self, task_number: int) -> dict:
        return get_theory_payload(task_number=task_number)
