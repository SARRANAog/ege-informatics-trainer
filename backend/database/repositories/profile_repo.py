from datetime import datetime

from backend.database.db import get_connection

class ProfileRepository:
    def get_profile(self) -> dict | None:
        with get_connection() as conn:
            row = conn.execute("SELECT name, created_at, updated_at FROM profile WHERE id = 1").fetchone()
            return dict(row) if row else None

    def upsert_profile(self, name: str) -> dict:
        now = datetime.utcnow().isoformat()
        with get_connection() as conn:
            conn.execute("""
                INSERT INTO profile (id, name, created_at, updated_at)
                VALUES (1, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name = excluded.name,
                    updated_at = excluded.updated_at
            """, (name, now, now))
            conn.commit()
        return self.get_profile() or {"name": name, "created_at": now, "updated_at": now}
