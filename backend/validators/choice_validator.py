def validate_choice(expected_answer: str, user_answer: str) -> dict:
    is_correct = str(expected_answer).strip() == str(user_answer).strip()
    return {"is_correct": is_correct}
