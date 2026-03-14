def get_hint_level(error_count: int) -> str:
    if error_count >= 3:
        return "full_explanation"
    if error_count >= 1:
        return "hint"
    return "none"
