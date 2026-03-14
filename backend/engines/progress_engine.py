from backend.core.scoring import calculate_overall_progress, estimate_ege_score

def build_progress_payload(task_progress: list[dict]) -> dict:
    overall = calculate_overall_progress(task_progress)
    return {
        "overall_progress_percent": overall,
        "estimated_ege_score": estimate_ege_score(overall),
        "tasks": task_progress,
    }
