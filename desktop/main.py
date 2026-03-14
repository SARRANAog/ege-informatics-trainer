import threading
import time

import uvicorn
import webview

from backend.api.app import app
from desktop.app_window import create_main_window
from desktop.bridge import DesktopBridge
from desktop.paths import ensure_runtime_dirs

HOST = "127.0.0.1"
PORT = 8765

def run_backend() -> None:
    uvicorn.run(app, host=HOST, port=PORT, log_level="info")

def main() -> None:
    ensure_runtime_dirs()
    server_thread = threading.Thread(target=run_backend, daemon=True)
    server_thread.start()

    time.sleep(1.0)

    bridge = DesktopBridge()
    window = create_main_window(f"http://{HOST}:{PORT}", bridge)
    webview.start(debug=True)

if __name__ == "__main__":
    main()
