def build_code_feedback(output_result: dict, ast_result: dict | None = None) -> dict:
    return {
        "tests": output_result,
        "ast": ast_result or {},
    }
