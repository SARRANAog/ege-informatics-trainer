def estimate_from_mastery(mastery_percent: float) -> int:
    return min(100, int(mastery_percent))
