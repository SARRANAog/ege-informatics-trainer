from backend.validators.code_ast_validator import validate_code_structure

def validate_fragment(fragment: str, required_nodes: list[str] | None = None) -> dict:
    return validate_code_structure(fragment, required_nodes=required_nodes)
