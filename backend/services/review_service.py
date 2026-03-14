from backend.engines.review_engine import get_weekly_review_stub

class ReviewService:
    def get_weekly_review(self) -> dict:
        return get_weekly_review_stub()
