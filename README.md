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
- JWT Authentication (python-jose, passlib), Rate Limiting (slowapi), Google OAuth

**Database:**
- PostgreSQL (Supabase)

---

## Authentication & Google OAuth Setup

The application uses JWT (JSON Web Tokens) for authentication and protects certain routes. It also supports Google OAuth login.

1. **Google OAuth Client ID**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Navigate to **APIs & Services > Credentials**.
   - Click **Create Credentials > OAuth client ID**.
   - Choose **Web application**. Add your frontend URL (e.g., `http://localhost:5173`) to **Authorized JavaScript origins**.
   - Copy the generated Client ID.

2. **Frontend Environment Variable**:
   - Create a `.env` file in the root `StayEase-Homestay-Management-System` directory (or use Vite's `import.meta.env`).
   - Add your Google Client ID:
     ```env
     VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
     ```

---

## Environment Variables & Database Configuration

To connect the backend to your PostgreSQL database, you need to configure your environment variables.

1. Navigate to the `backend` directory.
2. Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and configure your settings:
   ```env
   DATABASE_URL=postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   JWT_SECRET=super_secret_jwt_key_stayease_2026_change_in_production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=10080
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
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
- `POST /api/listings` - Create a new homestay *(Protected)*
- `PUT /api/listings/{id}` - Update a homestay *(Protected)*
- `DELETE /api/listings/{id}` - Delete a homestay *(Protected)*
- `GET /api/listings/search?q=` - Search homestays by location or name

### Auth Endpoints (Rate Limited)

- `POST /api/auth/login` - Authenticate with email/password
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/google-login` - Authenticate using a Google OAuth credential