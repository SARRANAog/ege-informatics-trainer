from datetime import datetime

from backend.database.db import get_connection

class ProgressRepository:
    def get_all_task_progress(self) -> list[dict]:
        with get_connection() as conn:
            rows = conn.execute("""
                SELECT task_number, mastery_percent, solved_exercises, last_error_count, last_updated_at
                FROM task_progress
                ORDER BY task_number
            """).fetchall()
            return [dict(row) for row in rows]

    def get_task_progress(self, task_number: int) -> dict | None:
        with get_connection() as conn:
            row = conn.execute("""
                SELECT task_number, mastery_percent, solved_exercises, last_error_count, last_updated_at
                FROM task_progress
                WHERE task_number = ?
            """, (task_number,)).fetchone()
            return dict(row) if row else None

    def upsert_task_progress(self, task_number: int, mastery_percent: float, last_error_count: int = 0) -> dict:
        now = datetime.utcnow().isoformat()
        with get_connection() as conn:
            existing = conn.execute("SELECT solved_exercises FROM task_progress WHERE task_number = ?", (task_number,)).fetchone()
            solved = int(existing["solved_exercises"]) if existing else 0
            conn.execute("""
                INSERT INTO task_progress (task_number, mastery_percent, solved_exercises, last_error_count, last_updated_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(task_number) DO UPDATE SET
                    mastery_percent = excluded.mastery_percent,
                    last_error_count = excluded.last_error_count,
                    last_updated_at = excluded.last_updated_at
            """, (task_number, mastery_percent, solved, last_error_count, now))
            conn.commit()
        return self.get_task_progress(task_number) or {}

    def increment_resolved_exercises(self, task_number: int, delta: int = 1) -> dict:
        now = datetime.utcnow().isoformat()
        with get_connection() as conn:
            row = conn.execute("SELECT solved_exercises, mastery_percent, last_error_count FROM task_progress WHERE task_number = ?", (task_number,)).fetchone()
            solved = int(row["solved_exercises"]) + delta if row else delta
            mastery = float(row["mastery_percent"]) if row else 0.0
            last_error_count = int(row["last_error_count"]) if row else 0
            conn.execute("""
                INSERT INTO task_progress (task_number, mastery_percent, solved_exercises, last_error_count, last_updated_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(task_number) DO UPDATE SET
                    solved_exercises = excluded.solved_exercises,
                    last_updated_at = excluded.last_updated_at
            """, (task_number, mastery, solved, last_error_count, now))
            conn.commit()
        return self.get_task_progress(task_number) or {}
