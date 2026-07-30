import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import listings, auth, ai, bookings
from database import engine
import models.database_models as database_models
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from utils.rate_limit import limiter
from dotenv import load_dotenv

load_dotenv()

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("stayease")

# Create database tables automatically
database_models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StayEase API",
    description="Backend API for StayEase Eco-Friendly Homestay Booking Platform",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS Configuration ────────────────────────────────────────────────────────
# ALLOWED_ORIGINS env var: comma-separated list of allowed origins.
# Example: http://localhost:5173,https://stayease.vercel.app
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5000")
ALLOWED_ORIGINS = [origin.strip() for origin in _raw_origins.split(",") if origin.strip()]

logger.info(f"CORS allowed origins: {ALLOWED_ORIGINS}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(listings.router)
app.include_router(ai.router)
app.include_router(bookings.router)

@app.get("/")
def root():
    return {"message": "Welcome to the StayEase API. Go to /docs for API documentation."}

# Run with: uvicorn main:app --reload --port 5000
