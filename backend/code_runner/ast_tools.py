import ast

def inspect_python_ast(code: str) -> dict:
    try:
        tree = ast.parse(code)
    except SyntaxError as exc:
        return {"ok": False, "errors": [str(exc)], "node_names": []}

    node_names = [type(node).__name__ for node in ast.walk(tree)]
    return {"ok": True, "errors": [], "node_names": node_names}
