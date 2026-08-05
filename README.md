<div align="center">

# ?? StayEase – Homestay Management System

### *A full-stack eco-friendly homestay booking platform with AI-powered travel assistance.*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## ?? Live Demo

| Service | URL |
|---|---|
| ??? **Frontend** | [stay-ease-homestay-management-system.vercel.app](https://stay-ease-homestay-management-system.vercel.app) |
| ?? **Backend API** | [stayease-6g7c.onrender.com](https://stayease-6g7c.onrender.com) |
| ?? **Swagger Docs** | [stayease-6g7c.onrender.com/docs](https://stayease-6g7c.onrender.com/docs) |
| ?? **Repository** | [github.com/Adityarawat01/StayEase-Homestay-Management-System](https://github.com/Adityarawat01/StayEase-Homestay-Management-System) |

> ?? **Note:** The backend is hosted on Render free tier. The first request after inactivity may take 30–60 seconds while the server cold-starts.

---

## ?? Screenshots

| Page | Description |
|---|---|
| ?? **Home Page** | Hero section with eco-stay stats, featured listings, testimonials, and CTA buttons |
| ?? **Listings** | Browse all eco-friendly homestays with search, filters by price/category, and sorting |
| ?? **Login / Register** | Two-panel auth page with Google OAuth and email/password forms |
| ?? **Dashboard** | Host panel with booking stats, monthly revenue chart, bookings table, and CRUD listings |
| ?? **AI Assistant** | Gemini-powered travel chatbot with quick prompts and a sidebar of capabilities |
| ?? **Settings** | Theme toggle (light/dark), profile editor, and notification preference toggles |
| ?? **Mobile View** | Fully responsive layout with hamburger navigation and stacked card grids |

*Visit the [Live Demo](https://stay-ease-homestay-management-system.vercel.app) to see all pages in action.*

---

## ? Features

| Feature | Description |
|---|---|
| ?? **User Registration & Login** | Secure account creation and login with email/password |
| ??? **JWT Authentication** | Stateless token-based authentication with expiry management |
| ?? **Protected Dashboard** | Route-level protection ensuring only authenticated users access the dashboard |
| ?? **Property Listings** | Browse a curated grid of eco-friendly homestays with rich details |
| ?? **Property Details** | In-depth property pages with host info, amenities, and booking options |
| ?? **Create, Update & Delete Listings** | Full CRUD interface for hosts to manage their properties |
| ?? **AI Travel Assistant** | Context-aware chatbot powered by Google Gemini for travel recommendations |
| ?? **Responsive Design** | Mobile-first layout that adapts to all screen sizes |
| ?? **Dark / Light Theme** | Toggleable colour theme with user preference persistence |
| ? **Form Validation** | Client-side and server-side validation with clear error feedback |
| ?? **Toast Notifications** | Non-intrusive success, error, and info notifications |
| ? **Loading Indicators** | Spinners and skeleton states for all async operations |
| ??? **Error Handling** | Graceful error boundaries and user-friendly error messages |
| ?? **Responsive Navigation** | Hamburger-menu navbar for smooth mobile navigation |
| ?? **Booking System** | Users can submit and cancel booking requests |
| ?? **Search & Filters** | Search by name/location, filter by price, category, and sort by rating |

---

## ??? Tech Stack

### ?? Frontend

| Technology | Purpose |
|---|---|
| **React.js 18** | Component-based UI framework |
| **Vite** | Lightning-fast build tool and dev server |
| **Vanilla CSS** | Custom styling with CSS variables and animations |
| **Axios** | HTTP client for API communication |
| **React Router DOM** | Client-side routing and navigation |
| **React Hot Toast** | Toast notification system |

### ?? Backend

| Technology | Purpose |
|---|---|
| **FastAPI** | High-performance Python web framework |
| **SQLAlchemy** | ORM for database modelling and queries |
| **PostgreSQL** | Relational database for persistent storage |
| **Supabase** | Managed PostgreSQL hosting and connection pooling |
| **JWT (python-jose)** | Stateless token-based authentication |
| **Passlib / Bcrypt** | Secure password hashing |
| **SlowAPI** | Rate limiting to protect API endpoints |
| **Uvicorn** | ASGI server for running FastAPI |
| **Python 3.11+** | Core backend runtime |

### ?? AI Integration

| Technology | Purpose |
|---|---|
| **Google Gemini API** | Conversational AI for the Travel Assistant feature |

### ?? Deployment

| Platform | Role |
|---|---|
| **Vercel** | Frontend hosting with CI/CD |
| **Render** | Backend hosting (Python Web Service) |
| **Supabase** | PostgreSQL database hosting |

---

## ?? Setup Instructions

### Prerequisites

- **Node.js** v18+ and **npm**
- **Python** 3.11+
- **PostgreSQL** database (or a free [Supabase](https://supabase.com) project)
- **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

### 1?? Clone the Repository

```bash
git clone https://github.com/Adityarawat01/StayEase-Homestay-Management-System.git
cd StayEase-Homestay-Management-System
```

---

### 2?? Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Open .env and fill in your actual values (see Environment Variables section)

# Run the development server
uvicorn main:app --reload --port 5000
```

> ?? The API will be live at `http://localhost:5000`
> ?? Swagger docs: `http://localhost:5000/docs`

To seed the database with sample homestay data:
```bash
python seed_data.py
```

---

### 3?? Frontend Setup

Open a **new terminal** in the project root:

```bash
# Copy and configure environment variables
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000 in the .env file

# Install dependencies
npm install

# Start the development server
npm run dev
```

> ?? The frontend will be live at `http://localhost:5173`

---

## ?? Required Environment Variables

### Backend — `backend/.env`

```env
DATABASE_URL=
SECRET_KEY=
JWT_SECRET=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
GOOGLE_CLIENT_ID=
GEMINI_API_KEY=
ALLOWED_ORIGINS=
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase / PostgreSQL connection string |
| `SECRET_KEY` | General application secret key |
| `JWT_SECRET` | Strong random string used to sign JWTs |
| `ALGORITHM` | JWT signing algorithm (default: `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime in minutes (default: `10080` = 7 days) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GEMINI_API_KEY` | Google Gemini API key for AI assistant |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |

**Generate a secure JWT secret:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

### Frontend — `.env` (project root)

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Full URL to the backend API (no trailing slash) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID for Google Sign-In |

> ?? **Never commit `.env` files to version control.** Use `.env.example` as a reference template only.

---

## ?? API Documentation

Full interactive API documentation is available via **Swagger UI** at `/docs` on the backend.

**Live:** [stayease-6g7c.onrender.com/docs](https://stayease-6g7c.onrender.com/docs)

### ?? Authentication

| Method | Endpoint | Rate Limit | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | 5/min | Register a new user |
| `POST` | `/api/auth/login` | 10/min | Login with email & password |
| `POST` | `/api/auth/logout` | — | Logout (client-side token clear) |
| `POST` | `/api/auth/google-login` | 10/min | Login via Google OAuth |

### ?? Listings

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/listings` | No | Retrieve all homestay listings |
| `GET` | `/api/listings/{id}` | No | Retrieve a single listing by ID |
| `GET` | `/api/listings/search?q=` | No | Search listings by name or location |
| `GET` | `/api/listings/me` | ? | Get the current user's own listings |
| `POST` | `/api/listings` | ? | Create a new listing |
| `PUT` | `/api/listings/{id}` | ? | Update an existing listing |
| `DELETE` | `/api/listings/{id}` | ? | Delete a listing |

### ?? Bookings

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/bookings` | ? | Get current user's bookings |
| `POST` | `/api/bookings` | ? | Create a new booking |
| `DELETE` | `/api/bookings/{id}` | ? | Cancel a booking |

### ?? AI Assistant

| Method | Endpoint | Rate Limit | Description |
|---|---|---|---|
| `POST` | `/api/ai/chat` | 10/min | Chat with the Gemini-powered travel assistant |

---

## ?? Architecture / Folder Structure

```
StayEase-Homestay-Management-System/
¦
+-- backend/                        # FastAPI backend
¦   +-- crud/                       # Database CRUD operations
¦   +-- data/                       # Seed data files
¦   +-- models/                     # SQLAlchemy ORM models
¦   +-- routes/                     # API route handlers
¦   ¦   +-- ai.py                   # Gemini AI chat endpoint
¦   ¦   +-- auth.py                 # Authentication routes
¦   ¦   +-- bookings.py             # Booking management routes
¦   ¦   +-- listings.py             # Listings CRUD routes
¦   +-- utils/                      # Shared utilities (JWT, hashing, rate limiting)
¦   +-- database.py                 # DB connection and session setup
¦   +-- main.py                     # FastAPI app entry point
¦   +-- seed_data.py                # Database seeding script
¦   +-- migrate.py                  # Database migration script
¦   +-- .env.example                # Backend environment variable template
¦   +-- requirements.txt            # Python dependencies
¦
+-- src/                            # React frontend source
¦   +-- components/                 # Reusable UI components
¦   ¦   +-- BookingForm.jsx         # Booking request form
¦   ¦   +-- Card.jsx                # Property card component
¦   ¦   +-- ErrorBoundary.jsx       # Global error boundary
¦   ¦   +-- Footer.jsx              # Site footer
¦   ¦   +-- Hero.jsx                # Homepage hero section
¦   ¦   +-- Navbar.jsx              # Responsive navigation bar
¦   ¦   +-- ProtectedRoute.jsx      # Auth-guarded route wrapper
¦   ¦   +-- ui/                     # Atomic UI primitives (Button, Input, Modal, Loader, Toast)
¦   +-- context/                    # React context (AuthContext, ThemeContext)
¦   +-- data/                       # Static / mock data
¦   +-- pages/                      # Page-level components
¦   ¦   +-- AIAssistant.jsx         # AI Travel Assistant page
¦   ¦   +-- About.jsx               # About page
¦   ¦   +-- Dashboard.jsx           # Host dashboard
¦   ¦   +-- DetailView.jsx          # Property detail page
¦   ¦   +-- Home.jsx                # Landing / home page
¦   ¦   +-- Listings.jsx            # All listings browse page
¦   ¦   +-- Login.jsx               # Login & registration page
¦   ¦   +-- Settings.jsx            # User settings page
¦   +-- services/
¦   ¦   +-- api.js                  # Axios API service layer
¦   +-- styles/                     # Global CSS styles
¦   +-- App.jsx                     # Root app component & routes
¦   +-- main.jsx                    # React entry point
¦
+-- index.html                      # HTML entry point
+-- package.json                    # Node.js dependencies
+-- vite.config.js                  # Vite configuration
+-- vercel.json                     # Vercel deployment config (SPA routing)
+-- .env.example                    # Frontend environment variable template
+-- .gitignore                      # Git ignore rules
+-- README.md                       # Project documentation
```

---

## ?? Known Limitations

- **AI Assistant API Quota:** The AI Travel Assistant uses the **Google Gemini API** on a free-tier key. During periods of high usage, the assistant may temporarily become unavailable with a `429 Too Many Requests` error until the quota resets.

- **Cold Starts (Render Free Tier):** The backend is hosted on Render's free tier, which spins down after 15 minutes of inactivity. The first request after inactivity may take up to 30–60 seconds to respond while the server cold-starts.

- **Image Storage:** Property images currently use external Unsplash URLs. Direct image uploads are not yet supported.

- **Google OAuth:** Google Sign-In requires a valid `VITE_GOOGLE_CLIENT_ID` configured with the correct authorised domain. It may not work on local development without proper configuration.

- **Payment Gateway:** Booking requests are submitted without real payment processing. Payment integration (Stripe/Razorpay) is planned for a future iteration.

- **Booking Status:** The current booking model does not persist a `status` field in the database. All fetched bookings are displayed as "Confirmed" in the dashboard UI.

---

## ?? Credits & Acknowledgements

**Author:** Aditya Rawat

?? *AI-Assisted Full Stack Web Development Internship*
??? Graphic Era (Deemed to be University)

[![GitHub](https://img.shields.io/badge/GitHub-Adityarawat01-181717?style=for-the-badge&logo=github)](https://github.com/Adityarawat01)

### Learning Outcomes

This project provided hands-on experience across the complete software development lifecycle:

| Area | Skills Gained |
|---|---|
| **Frontend Development** | React component architecture, hooks, context API, React Router, and responsive CSS design |
| **Backend Development** | RESTful API design with FastAPI, async Python, Pydantic schemas, and SQLAlchemy ORM |
| **Authentication & Security** | JWT token flow, password hashing, rate limiting, and CORS configuration |
| **Database Management** | PostgreSQL schema design, ORM relationships, and Supabase connection pooling |
| **AI Integration** | Integrating the Google Gemini API into a production web application |
| **Cloud Deployment** | Full-stack deployment across Vercel, Render, and Supabase with environment secrets management |
| **Debugging & Testing** | API testing with Swagger, browser DevTools debugging, and error boundary implementation |
| **Version Control** | Professional Git workflow, commit hygiene, and `.gitignore` management |
| **Responsive UI** | Mobile-first design, theming with CSS variables, and dark/light mode implementation |

### Acknowledgements

- [Google Gemini API](https://aistudio.google.com/) for the AI assistant capability
- [Supabase](https://supabase.com/) for managed PostgreSQL hosting
- [Unsplash](https://unsplash.com/) for high-quality property images used in demonstrations
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent Python web framework
- [React Hot Toast](https://react-hot-toast.com/) for the toast notification library

---

## ?? License

This project is licensed under the **MIT License** — Copyright (c) 2025 Aditya Rawat.

---

<div align="center">

Made with ?? for sustainable travel &nbsp;|&nbsp; StayEase © 2025

? *If you found this project helpful, please consider giving it a star!* ?

</div>
