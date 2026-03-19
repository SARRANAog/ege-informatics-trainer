from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT_DIR / "content"

USER_DATA_DIR = ROOT_DIR / "user_data"
LOGS_DIR = USER_DATA_DIR / "logs"
BACKUPS_DIR = USER_DATA_DIR / "backups"
DB_PATH = USER_DATA_DIR / "profile.db"

FRONTEND_DIR = ROOT_DIR / "frontend"
FRONTEND_DIST_DIR = FRONTEND_DIR / "dist"


def ensure_runtime_dirs() -> None:
    for directory in (USER_DATA_DIR, LOGS_DIR, BACKUPS_DIR):
        directory.mkdir(parents=True, exist_ok=True)