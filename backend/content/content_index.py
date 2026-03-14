from backend.content.loader import load_json

def get_content_index() -> dict:
    roadmap = load_json("roadmap/roadmap.json")
    return {
        "tasks_available": [item["task_number"] for item in roadmap.get("tasks", [])],
        "weekly_reviews_available": len(roadmap.get("weekly_reviews", [])),
    }
