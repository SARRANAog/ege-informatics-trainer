from backend.services.backup_service import BackupService

if __name__ == "__main__":
    path = BackupService().export_db_backup()
    print(f"Backup exported: {path}")
