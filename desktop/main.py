import threading
import time
from urllib.error import URLError
from urllib.request import urlopen

import uvicorn
import webview

from backend.api.app import app
from backend.core.runtime import ensure_runtime_dirs
from desktop.app_window import create_main_window
from desktop.bridge import DesktopBridge

HOST = "127.0.0.1"
PORT = 8765


def run_backend() -> None:
    uvicorn.run(app, host=HOST, port=PORT, log_level="info")


def wait_for_backend(timeout_seconds: float = 10.0, poll_interval: float = 0.1) -> None:
    deadline = time.monotonic() + timeout_seconds
    health_url = f"http://{HOST}:{PORT}/api/health"

    while time.monotonic() < deadline:
        try:
            with urlopen(health_url, timeout=1.0) as response:
                if response.status == 200:
                    return
        except URLError:
            time.sleep(poll_interval)

    raise RuntimeError(f"Local backend did not become healthy: {health_url}")


def main() -> None:
    ensure_runtime_dirs()

    server_thread = threading.Thread(target=run_backend, daemon=True)
    server_thread.start()
    wait_for_backend()

    bridge = DesktopBridge()
    create_main_window(f"http://{HOST}:{PORT}", bridge)
    webview.start(debug=True)


if __name__ == "__main__":
    main()