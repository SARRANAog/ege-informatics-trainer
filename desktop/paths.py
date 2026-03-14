from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
USER_DATA_DIR = ROOT_DIR / "user_data"
LOGS_DIR = USER_DATA_DIR / "logs"
BACKUPS_DIR = USER_DATA_DIR / "backups"
DB_PATH = USER_DATA_DIR / "profile.db"
FRONTEND_DIST_DIR = ROOT_DIR / "frontend" / "dist"

def ensure_runtime_dirs() -> None:
    USER_DATA_DIR.mkdir(exist_ok=True)
    LOGS_DIR.mkdir(exist_ok=True)
    BACKUPS_DIR.mkdir(exist_ok=True)
