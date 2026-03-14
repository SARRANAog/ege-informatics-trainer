FORBIDDEN_TOKENS = ["import os", "import socket", "subprocess", "__import__", "open("]

def validate_policy(code: str) -> dict:
    lowered = code.lower()
    violations = [token for token in FORBIDDEN_TOKENS if token in lowered]
    return {"allowed": len(violations) == 0, "violations": violations}
