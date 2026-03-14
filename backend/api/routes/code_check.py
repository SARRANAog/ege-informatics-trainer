from fastapi import APIRouter

from backend.api.schemas.exercise import SubmitCodeRequest
from backend.validators.code_output_validator import validate_code_output
from backend.validators.code_ast_validator import validate_code_structure
from backend.validators.code_policy_validator import validate_policy
from backend.code_runner.feedback_builder import build_code_feedback

router = APIRouter(prefix="/api/code-check", tags=["code-check"])

@router.post("")
def submit_code(payload: SubmitCodeRequest):
    policy = validate_policy(payload.code)
    if not policy["allowed"]:
        return {
            "ok": False,
            "message": "Code policy violation",
            "violations": policy["violations"],
        }

    output_result = validate_code_output(payload.code, payload.tests)
    ast_result = validate_code_structure(payload.code, payload.required_nodes)
    return {
        "ok": True,
        "feedback": build_code_feedback(output_result, ast_result),
    }
