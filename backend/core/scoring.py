from typing import Iterable

def calculate_overall_progress(task_progresses: Iterable[dict]) -> float:
    values = [item.get("mastery_percent", 0.0) for item in task_progresses]
    if not values:
        return 0.0
    return round(sum(values) / len(values), 1)

def estimate_ege_score(overall_progress: float) -> int:
    # Упрощённая стартовая модель. Заменить точной шкалой позже.
    if overall_progress <= 0:
        return 0
    return min(100, int(round(overall_progress)))
