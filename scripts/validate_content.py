from pathlib import Path
import json

content_dir = Path(__file__).resolve().parents[1] / "content"

for file in content_dir.rglob("*.json"):
    json.loads(file.read_text(encoding="utf-8"))

print("All JSON files are valid.")
