from backend.engines.roadmap_engine import get_roadmap_payload

class RoadmapService:
    def get_roadmap(self) -> dict:
        return get_roadmap_payload()
