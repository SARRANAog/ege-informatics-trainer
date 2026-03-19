"""
Совместимый shim для старых импортов desktop.paths.

Единый источник runtime-путей теперь находится в backend.core.runtime.
Новый код должен импортировать пути оттуда, чтобы desktop оставался внешним
слоем над backend, а не наоборот.
"""

from backend.core.runtime import (
    BACKUPS_DIR,
    DB_PATH,
    FRONTEND_DIST_DIR,
    LOGS_DIR,
    ROOT_DIR,
    USER_DATA_DIR,
    ensure_runtime_dirs,
)

__all__ = [
    "ROOT_DIR",
    "USER_DATA_DIR",
    "LOGS_DIR",
    "BACKUPS_DIR",
    "DB_PATH",
    "FRONTEND_DIST_DIR",
    "ensure_runtime_dirs",
]