def validate_logic_answer(user_answer: str, expected_answer: str) -> dict:
    return {"is_correct": user_answer.strip().upper() == expected_answer.strip().upper()}
