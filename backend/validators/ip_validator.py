def validate_ip_answer(user_answer: str, expected_answer: str) -> dict:
    return {"is_correct": user_answer.replace(" ", "") == expected_answer.replace(" ", "")}
