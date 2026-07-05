from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import listings
from database import engine
import models.database_models as database_models

# Create database tables automatically
database_models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StayEase API",
    description="Backend API for StayEase Eco-Friendly Homestay Booking Platform",
    version="1.0.0"
)

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to match your frontend URL (e.g. ["http://localhost:5173"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(listings.router)

@app.get("/")
def root():
    return {"message": "Welcome to the StayEase API. Go to /docs for API documentation."}

# Run with: uvicorn main:app --reload --port 5000
