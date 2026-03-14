from pydantic import BaseModel, Field

class CreateProfileRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
