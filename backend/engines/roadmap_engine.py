from backend.core.roadmap_builder import build_roadmap

def get_roadmap_payload() -> dict:
    return build_roadmap()
