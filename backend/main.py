import os
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

# ── CORS Configuration ────────────────────────────────────────────────────────
# ALLOWED_ORIGINS env var: comma-separated list of allowed origins (no trailing slash).
# Set this in your deployment environment (Render, Railway, etc.).
#
# Example value:
#   https://stay-ease-homestay-management-system.vercel.app,http://localhost:5173,http://localhost:3000
#
# IMPORTANT: The CORS middleware MUST be registered before any other middleware
# so that preflight OPTIONS requests receive the correct headers even when
# other middleware (e.g. rate limiting) would otherwise intercept them.

_raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
)
ALLOWED_ORIGINS = [origin.strip() for origin in _raw_origins.split(",") if origin.strip()]

logger.info("CORS allowed origins: %s", ALLOWED_ORIGINS)

# Register CORS middleware FIRST — before rate limiting and routers.
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.include_router(auth.router)
app.include_router(listings.router)
app.include_router(ai.router)
app.include_router(bookings.router)

@app.get("/")
def root():
    return {"message": "Welcome to the StayEase API. Go to /docs for API documentation."}

# Run with: uvicorn main:app --reload --port 5000
