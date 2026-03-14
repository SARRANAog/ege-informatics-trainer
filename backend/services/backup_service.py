from pathlib import Path
import shutil

from desktop.paths import BACKUPS_DIR, DB_PATH

class BackupService:
    def export_db_backup(self) -> Path:
        BACKUPS_DIR.mkdir(exist_ok=True)
        target = BACKUPS_DIR / "profile_backup.db"
        if DB_PATH.exists():
            shutil.copy2(DB_PATH, target)
        return target
