from backend.code_runner.ast_tools import inspect_python_ast

def validate_code_structure(code: str, required_nodes: list[str] | None = None) -> dict:
    required_nodes = required_nodes or []
    ast_info = inspect_python_ast(code)
    if not ast_info["ok"]:
        return {"ok": False, "errors": ast_info["errors"], "missing_nodes": required_nodes}

    node_names = set(ast_info["node_names"])
    missing = [node for node in required_nodes if node not in node_names]
    return {
        "ok": True,
        "missing_nodes": missing,
        "node_names": sorted(node_names),
        "matches_requirements": len(missing) == 0,
    }
