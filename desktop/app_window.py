import webview

APP_TITLE = "EGE Informatics Trainer"

def create_main_window(url: str, js_api) -> webview.Window:
    return webview.create_window(
        title=APP_TITLE,
        url=url,
        js_api=js_api,
        width=1440,
        height=960,
        min_size=(1200, 760),
        confirm_close=True,
        text_select=True,
    )
