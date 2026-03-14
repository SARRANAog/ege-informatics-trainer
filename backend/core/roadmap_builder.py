from backend.content.loader import load_json

def build_roadmap() -> dict:
    return load_json("roadmap/roadmap.json")
