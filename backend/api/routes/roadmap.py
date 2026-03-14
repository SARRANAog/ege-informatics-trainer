from fastapi import APIRouter

from backend.services.roadmap_service import RoadmapService

router = APIRouter(prefix="/api/roadmap", tags=["roadmap"])
service = RoadmapService()

@router.get("")
def get_roadmap():
    return service.get_roadmap()
