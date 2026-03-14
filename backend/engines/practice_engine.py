from backend.content.loader import load_task_lesson

def get_practice_payload(task_number: int, lesson_slug: str = "lesson_01") -> dict:
    return load_task_lesson(task_number, lesson_slug)
