from backend.code_runner.runner import run_python_code

def validate_code_output(code: str, tests: list[dict]) -> dict:
    results = []
    for test in tests:
        result = run_python_code(code=code, stdin=test.get("stdin", ""))
        actual = (result.get("stdout") or "").strip()
        expected = str(test.get("expected_stdout", "")).strip()
        results.append({
            "name": test.get("name", "test"),
            "passed": actual == expected and result.get("return_code") == 0,
            "expected": expected,
            "actual": actual,
            "stderr": result.get("stderr", ""),
        })
    return {"results": results, "all_passed": all(item["passed"] for item in results)}
