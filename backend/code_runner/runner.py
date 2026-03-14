import subprocess
import sys
import tempfile
from pathlib import Path

from backend.core.config import CODE_TIMEOUT_SECONDS

def run_python_code(code: str, stdin: str = "") -> dict:
    with tempfile.TemporaryDirectory() as temp_dir:
        script_path = Path(temp_dir) / "user_code.py"
        script_path.write_text(code, encoding="utf-8")

        try:
            process = subprocess.run(
                [sys.executable, str(script_path)],
                input=stdin,
                capture_output=True,
                text=True,
                timeout=CODE_TIMEOUT_SECONDS,
                cwd=temp_dir,
            )
            return {
                "stdout": process.stdout,
                "stderr": process.stderr,
                "return_code": process.returncode,
                "timed_out": False,
            }
        except subprocess.TimeoutExpired:
            return {
                "stdout": "",
                "stderr": "Execution timed out",
                "return_code": -1,
                "timed_out": True,
            }
