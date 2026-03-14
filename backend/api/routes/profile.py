from fastapi import APIRouter

from backend.api.schemas.profile import CreateProfileRequest
from backend.services.profile_service import ProfileService

router = APIRouter(prefix="/api/profile", tags=["profile"])
service = ProfileService()

@router.get("")
def get_profile():
    return {"profile": service.get_profile()}

@router.post("")
def create_or_update_profile(payload: CreateProfileRequest):
    return {"profile": service.save_profile(payload.name)}
