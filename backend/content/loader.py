import json
from pathlib import Path

from backend.core.config import CONTENT_DIR

# ¬ј∆Ќќ:
# - backend/content/* Ч это код загрузки контента;
# - content/* Ч это единственный активный источник JSON-данных приложени€.
# Ќовые задачи должны мен€ть JSON в корневой папке content, а не добавл€ть
# параллельные frontend- или backend-копии контента.


def load_json(relative_path: str) -> dict:
    path = CONTENT_DIR / relative_path
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def load_task_theory(task_number: int) -> dict:
    return load_json(f"theory/task{task_number:02d}.json")


def load_task_lesson(task_number: int, lesson_slug: str = "lesson_01") -> dict:
    return load_json(f"tasks/task{task_number:02d}/{lesson_slug}.json")