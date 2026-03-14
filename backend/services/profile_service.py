from backend.database.repositories.profile_repo import ProfileRepository

class ProfileService:
    def __init__(self) -> None:
        self.repo = ProfileRepository()

    def get_profile(self) -> dict | None:
        return self.repo.get_profile()

    def save_profile(self, name: str) -> dict:
        return self.repo.upsert_profile(name=name)
