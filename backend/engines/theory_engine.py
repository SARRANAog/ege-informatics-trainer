from backend.content.loader import load_task_theory

def get_theory_payload(task_number: int) -> dict:
    return load_task_theory(task_number)
