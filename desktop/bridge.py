from datetime import datetime

class DesktopBridge:
    def ping(self) -> dict:
        return {"ok": True, "source": "pywebview-bridge", "timestamp": datetime.utcnow().isoformat()}

    def app_info(self) -> dict:
        return {
            "name": "EGE Informatics Trainer",
            "mode": "offline",
            "platform": "windows"
        }
