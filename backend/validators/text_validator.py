def validate_text_answer(user_answer: str, expected_answer: str) -> dict:
    return {"is_correct": user_answer.strip() == expected_answer.strip()}
