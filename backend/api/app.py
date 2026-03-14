from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.api.routes import profile, roadmap, theory, practice, progress, code_check, weekly_review, mock_exam
from backend.core.config import API_TITLE, API_VERSION
from backend.database.db import init_db

app = FastAPI(title=API_TITLE, version=API_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile.router)
app.include_router(roadmap.router)
app.include_router(theory.router)
app.include_router(practice.router)
app.include_router(progress.router)
app.include_router(code_check.router)
app.include_router(weekly_review.router)
app.include_router(mock_exam.router)

@app.on_event("startup")
def on_startup() -> None:
    init_db()

@app.get("/api/health")
def health() -> dict:
    return {"ok": True}

dist_dir = Path(__file__).resolve().parents[2] / "frontend" / "dist"
assets_dir = dist_dir / "assets"

if assets_dir.exists():
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

@app.get("/{full_path:path}")
def serve_frontend(full_path: str = ""):
    index_file = dist_dir / "index.html"
    requested = dist_dir / full_path

    if full_path and requested.exists() and requested.is_file():
        return FileResponse(requested)

    if index_file.exists():
        return FileResponse(index_file)

    return {
        "message": "Frontend build not found. Run `npm install && npm run build` inside frontend."
    }
