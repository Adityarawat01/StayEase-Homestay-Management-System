# StayEase - Eco-Friendly Homestay Booking Platform

StayEase is a full-stack application built with a React (Vite) frontend and a FastAPI (Python) backend. It allows travelers to discover eco-friendly homestays and unique stays while supporting local communities.

## Features

- Browse and filter a curated list of eco-friendly properties
- View detailed property information
- Interactive Host Dashboard for managing listings and booking requests
- Mobile-responsive design
- **REST APIs** for fetching, creating, updating, and deleting listings
- **Backend Data** using in-memory Python structures

## Tech Stack

**Frontend:**
- React
- Vite
- React Router
- Vanilla CSS
- Axios

**Backend:**
- FastAPI
- Uvicorn
- Pydantic

---

## Getting Started

To run the application, you need to start both the backend server and the frontend development server concurrently.

### 1. Backend Setup (FastAPI)

Navigate to the `backend` directory and set up the Python environment:

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload --port 5000
```
The backend API will run at `http://localhost:5000`. You can view the API documentation at `http://localhost:5000/docs`.

### 2. Frontend Setup (React)

Open a new terminal window/tab, ensuring you are in the root directory (`StayEase-Homestay-Management-System`), and install Node dependencies:

```bash
npm install

# Start the React development server
npm run dev
```
The frontend application will run at `http://localhost:5173`. It will automatically fetch data from the FastAPI backend.

---

## API Endpoints

The backend provides the following 6 REST APIs:

- `GET /api/listings` - Return all homestays
- `GET /api/listings/{id}` - Return a single homestay
- `POST /api/listings` - Create a new homestay
- `PUT /api/listings/{id}` - Update a homestay
- `DELETE /api/listings/{id}` - Delete a homestay
- `GET /api/listings/search?q=` - Search homestays by location or name