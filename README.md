# StayEase - Eco-Friendly Homestay Management System

StayEase is a full-stack application built with a React (Vite) frontend and a FastAPI (Python) backend. It allows travelers to discover eco-friendly homestays and unique stays while supporting local communities. The backend uses PostgreSQL (via Supabase) for robust data persistence.

## Features

- Browse and filter a curated list of eco-friendly properties
- View detailed property information
- Interactive Host Dashboard for managing listings and booking requests
- Mobile-responsive design
- **REST APIs** for fetching, creating, updating, and deleting listings
- **Persistent Data** using PostgreSQL via SQLAlchemy ORM

## Tech Stack

**Frontend:**
- React, Vite, React Router, Vanilla CSS, Axios

**Backend:**
- FastAPI, Uvicorn, Pydantic, SQLAlchemy, psycopg2-binary, python-dotenv

**Database:**
- PostgreSQL (Supabase)

---

## Environment Variables & Database Configuration

To connect the backend to your PostgreSQL database, you need to configure your environment variables.

1. Navigate to the `backend` directory.
2. Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and configure your Supabase PostgreSQL connection string:
   ```env
   DATABASE_URL=postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

*(Note: If your Supabase URL starts with `postgres://`, the backend will automatically format it to `postgresql://` for SQLAlchemy compatibility).*

---

## How to Run the Project

You need to start both the backend server and the frontend development server concurrently.

### 1. Backend Setup

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

> **Note on Database Seeding:** The backend is configured to automatically create tables on startup. If you'd like to seed the database with initial homestay listings, you can run the seed script:
> ```bash
> python seed_data.py
> ```

The backend API will run at `http://localhost:5000`. You can view the API documentation at `http://localhost:5000/docs`.

### 2. Frontend Setup

Open a new terminal window/tab, ensuring you are in the root directory (`StayEase-Homestay-Management-System`), and install Node dependencies:

```bash
npm install

# Start the React development server
npm run dev
```

The frontend application will run at `http://localhost:5173`. It will automatically fetch data from the FastAPI backend.

---

## API Endpoints

The backend provides the following 6 REST APIs that interact directly with the PostgreSQL database:

- `GET /api/listings` - Return all homestays
- `GET /api/listings/{id}` - Return a single homestay
- `POST /api/listings` - Create a new homestay
- `PUT /api/listings/{id}` - Update a homestay
- `DELETE /api/listings/{id}` - Delete a homestay
- `GET /api/listings/search?q=` - Search homestays by location or name