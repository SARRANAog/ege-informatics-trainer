from pydantic import BaseModel

class BasicResult(BaseModel):
    ok: bool = True
