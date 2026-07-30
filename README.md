# StayEase – Eco-Friendly Homestay Management System

StayEase is a full-stack application built with a React (Vite) frontend and a FastAPI (Python) backend. It allows travellers to discover eco-friendly homestays and unique stays while supporting local communities. The backend uses PostgreSQL (via Supabase) for robust data persistence.

## Features

- Browse and filter a curated list of eco-friendly properties
- View detailed property information
- Interactive Host Dashboard for managing listings and booking requests
- AI Assistant powered by Google Gemini
- Mobile-responsive design
- **REST APIs** for fetching, creating, updating, and deleting listings
- **JWT Authentication** with Google OAuth support
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

## Environment Variables

### Frontend (`/.env`)

Copy `.env.example` to `.env` at the project root and fill in the values:

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | URL of the deployed FastAPI backend (no trailing slash) | `http://localhost:5000` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123.apps.googleusercontent.com` |

### Backend (`/backend/.env`)

Copy `backend/.env.example` to `backend/.env` and fill in the values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `SECRET_KEY` | General secret key (for future use) |
| `JWT_SECRET` | Strong random string to sign JWTs — **required** |
| `ALGORITHM` | JWT algorithm (default: `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime in minutes (default: `10080` = 7 days) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_API_KEY` | Alias for Gemini API key (optional) |
| `GEMINI_API_KEY` | Google Gemini API key for the AI assistant |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |

**Generate a secure JWT secret:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## Local Development Setup

You need to start both the backend server and the frontend development server.

### 1. Backend Setup

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

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your actual values

# Run the backend server
uvicorn main:app --reload --port 5000
```

> **Database Seeding:** The backend auto-creates tables on startup. To seed with sample data:
> ```bash
> python seed_data.py
> ```

The API runs at `http://localhost:5000`. Documentation: `http://localhost:5000/docs`

### 2. Frontend Setup

Open a new terminal in the root directory:

```bash
# Copy and configure environment variables
cp .env.example .env
# Edit .env — set VITE_API_URL=http://localhost:5000

npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

---

## Deployment

### Required Environment Variables Summary

Before deploying, ensure every variable in `.env.example` (frontend) and `backend/.env.example` (backend) is set in your deployment platform.

---

### Frontend Deployment (Vercel)

1. **Connect your repository** to [Vercel](https://vercel.com).
2. Set the **Framework Preset** to `Vite`.
3. Set the **Root Directory** to `/` (project root, where `vite.config.js` lives).
4. Add these **Environment Variables** in the Vercel dashboard:
   - `VITE_API_URL` → Your deployed backend URL (e.g. `https://stayease-api.onrender.com`)
   - `VITE_GOOGLE_CLIENT_ID` → Your Google OAuth Client ID
5. Click **Deploy**.

> **Note:** After deploying, copy your Vercel frontend URL (e.g. `https://stayease.vercel.app`) and add it to the backend's `ALLOWED_ORIGINS`.

---

### Backend Deployment (Render)

1. **Connect your repository** to [Render](https://render.com).
2. Create a new **Web Service**.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to:
   ```bash
   pip install -r requirements.txt
   ```
5. Set the **Start Command** to:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 10000
   ```
6. Add all **Environment Variables** from `backend/.env.example` in the Render dashboard:
   - `DATABASE_URL` → Your Supabase connection string
   - `JWT_SECRET` → A strong random secret (see generation command above)
   - `GOOGLE_CLIENT_ID` → Google OAuth Client ID
   - `GEMINI_API_KEY` → Google Gemini API key
   - `ALLOWED_ORIGINS` → Your Vercel frontend URL, e.g. `https://stayease.vercel.app`

> **Tip:** You can deploy to any platform that supports Python (Railway, Fly.io, DigitalOcean App Platform, etc.). The setup is the same — just configure the environment variables and start command.

---

### Supabase Configuration

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Settings → Database**.
3. Copy the **Connection String** (Transaction Pooler recommended for serverless environments) — use **port 5432** for session mode.
4. Set this as `DATABASE_URL` in your backend environment.

**Important Notes:**
- If your Supabase URL starts with `postgres://`, the backend automatically rewrites it to `postgresql://` for SQLAlchemy compatibility.
- Enable **Row Level Security (RLS)** on your tables in Supabase for production.
- Add your **backend server's IP** to Supabase's allowed connections if you use IP restrictions.

---

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
3. Choose **Web application**.
4. Add **Authorized JavaScript origins**:
   - `http://localhost:5173` (development)
   - `https://your-app.vercel.app` (production)
5. Copy the **Client ID** and set it as:
   - `VITE_GOOGLE_CLIENT_ID` in the frontend `.env`
   - `GOOGLE_CLIENT_ID` in the backend `.env`

---

### Gemini AI Setup

1. Go to [Google AI Studio](https://aistudio.google.com/) and create an API key.
2. Set it as `GEMINI_API_KEY` in your backend `.env` / deployment environment.
3. The AI endpoint at `POST /api/ai/chat` is rate-limited to 10 requests/minute.

---

## API Endpoints

### Listings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/listings` | No | Return all homestays |
| `GET` | `/api/listings/{id}` | No | Return a single homestay |
| `GET` | `/api/listings/search?q=` | No | Search by name/location |
| `GET` | `/api/listings/me` | ✅ | Get current user's listings |
| `POST` | `/api/listings` | ✅ | Create a new homestay |
| `PUT` | `/api/listings/{id}` | ✅ | Update a homestay |
| `DELETE` | `/api/listings/{id}` | ✅ | Delete a homestay |

### Auth (Rate Limited)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user (5/min) |
| `POST` | `/api/auth/login` | Login with email/password (10/min) |
| `POST` | `/api/auth/logout` | Logout (client-side token clear) |
| `POST` | `/api/auth/google-login` | Login with Google OAuth (10/min) |

### Bookings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/bookings` | ✅ | Get current user's bookings |
| `POST` | `/api/bookings` | ✅ | Create a new booking |
| `DELETE` | `/api/bookings/{id}` | ✅ | Cancel a booking |

### AI

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/chat` | Chat with StayEase AI (10/min) |

View live API documentation at `http://localhost:5000/docs` (Swagger UI).