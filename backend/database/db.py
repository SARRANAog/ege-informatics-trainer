import sqlite3

from desktop.paths import DB_PATH, ensure_runtime_dirs

def get_connection() -> sqlite3.Connection:
    ensure_runtime_dirs()
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection

def init_db() -> None:
    with get_connection() as conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            name TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        """)
        conn.execute("""
        CREATE TABLE IF NOT EXISTS task_progress (
            task_number INTEGER PRIMARY KEY,
            mastery_percent REAL NOT NULL DEFAULT 0,
            solved_exercises INTEGER NOT NULL DEFAULT 0,
            last_error_count INTEGER NOT NULL DEFAULT 0,
            last_updated_at TEXT
        )
        """)
        conn.commit()
