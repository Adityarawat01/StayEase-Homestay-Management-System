<div align="center">

# 🌿 StayEase – Homestay Management System

### *Discover. Book. Experience Sustainable Travel.*

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

> **StayEase** is a full-stack eco-friendly homestay booking platform built during an **AI-Assisted Full Stack Web Development Internship**. It enables travellers to browse, search, and book sustainable homestays while empowering hosts to manage their properties through an intelligent dashboard — all powered by a modern React frontend, a robust FastAPI backend, and a Google Gemini AI Travel Assistant.

<br/>

[🌐 Live Demo](https://stay-ease-homestay-management-system.vercel.app) &nbsp;|&nbsp; [📂 Repository](https://github.com/Adityarawat01/StayEase-Homestay-Management-System) &nbsp;|&nbsp; [🚀 API Docs](https://stayease-6g7c.onrender.com/docs)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Known Limitations](#-known-limitations)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)
- [License](#-license)

---

## 🌍 Project Overview

**StayEase** is a modern, full-stack web application designed for eco-conscious travellers and sustainable homestay hosts. The platform bridges the gap between guests seeking unique, meaningful travel experiences and local hosts who want to share their homes with the world.

Built as part of an intensive **AI-Assisted Full Stack Web Development Internship** at **Graphic Era (Deemed to be University)**, StayEase demonstrates a complete end-to-end product — from a polished, responsive React frontend to a production-grade FastAPI backend with JWT authentication, RESTful APIs, PostgreSQL database persistence via Supabase, and an AI-powered Travel Assistant using the **Google Gemini API**.

Key highlights:
- 🔐 **Secure Authentication** — JWT-based login and registration with Google OAuth support
- 🏡 **Full CRUD for Listings** — Hosts can create, update, and delete property listings
- 🤖 **AI Travel Assistant** — Gemini-powered chatbot for personalised travel recommendations
- 📱 **Fully Responsive** — Seamless experience across desktop, tablet, and mobile
- 🌙 **Dark / Light Theme** — User-selectable theme with persistent preference

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Registration & Login** | Secure account creation and login with email/password |
| 🛡️ **JWT Authentication** | Stateless token-based authentication with expiry management |
| 🔒 **Protected Dashboard** | Route-level protection ensuring only authenticated users access the dashboard |
| 🏠 **Property Listings** | Browse a curated grid of eco-friendly homestays with rich details |
| 🔍 **Property Details** | In-depth property pages with host info, amenities, and booking options |
| ✏️ **Create, Update & Delete Listings** | Full CRUD interface for hosts to manage their properties |
| 🤖 **AI Travel Assistant** | Context-aware chatbot powered by Google Gemini for travel recommendations |
| 📱 **Responsive Design** | Mobile-first layout that adapts beautifully to all screen sizes |
| 🌙 **Dark / Light Theme** | Toggleable colour theme with user preference persistence |
| ✅ **Form Validation** | Client-side and server-side validation with clear error feedback |
| 🔔 **Toast Notifications** | Non-intrusive success, error, and info notifications |
| ⏳ **Loading Indicators** | Spinners and skeleton states for all async operations |
| 🛠️ **Error Handling** | Graceful error boundaries and user-friendly error messages |
| 🧭 **Responsive Navigation** | Hamburger-menu-aware navbar for smooth mobile navigation |
| 📅 **Booking System** | Users can submit and cancel booking requests |

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|---|---|
| **React.js 19** | Component-based UI framework |
| **Vite** | Lightning-fast build tool and dev server |
| **Vanilla CSS** | Custom styling with CSS variables and animations |
| **Axios** | HTTP client for API communication |
| **React Router DOM** | Client-side routing and navigation |

### ⚙️ Backend

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

### 🤖 AI Integration

| Technology | Purpose |
|---|---|
| **Google Gemini API** | Conversational AI for the Travel Assistant feature |

### ☁️ Deployment

| Platform | Role |
|---|---|
| **Vercel** | Frontend hosting with CI/CD |
| **Render** | Backend hosting (Python Web Service) |
| **Supabase** | PostgreSQL database hosting |

---

## 📁 Project Structure

```
StayEase-Homestay-Management-System/
│
├── backend/                        # FastAPI backend
│   ├── crud/                       # Database CRUD operations
│   ├── data/                       # Seed data files
│   ├── models/                     # SQLAlchemy ORM models
│   ├── routes/                     # API route handlers
│   │   ├── ai.py                   # Gemini AI chat endpoint
│   │   ├── auth.py                 # Authentication routes
│   │   ├── bookings.py             # Booking management routes
│   │   └── listings.py             # Listings CRUD routes
│   ├── utils/                      # Shared utilities (JWT, hashing)
│   ├── database.py                 # DB connection and session setup
│   ├── main.py                     # FastAPI app entry point
│   ├── seed_data.py                # Database seeding script
│   └── requirements.txt            # Python dependencies
│
├── src/                            # React frontend source
│   ├── components/                 # Reusable UI components
│   │   ├── BookingForm.jsx         # Booking request form
│   │   ├── Card.jsx                # Property card component
│   │   ├── ErrorBoundary.jsx       # Global error boundary
│   │   ├── Footer.jsx              # Site footer
│   │   ├── Hero.jsx                # Homepage hero section
│   │   ├── Navbar.jsx              # Responsive navigation bar
│   │   ├── ProtectedRoute.jsx      # Auth-guarded route wrapper
│   │   └── ui/                     # Atomic UI primitives
│   ├── context/                    # React context (Auth, Theme)
│   ├── data/                       # Static / mock data
│   ├── pages/                      # Page-level components
│   │   ├── AIAssistant.jsx         # AI Travel Assistant page
│   │   ├── About.jsx               # About page
│   │   ├── Dashboard.jsx           # Host dashboard
│   │   ├── DetailView.jsx          # Property detail page
│   │   ├── Home.jsx                # Landing / home page
│   │   ├── Listings.jsx            # All listings browse page
│   │   ├── Login.jsx               # Login & registration page
│   │   └── Settings.jsx            # User settings page
│   ├── services/                   # Axios API service layer
│   ├── styles/                     # Global CSS styles
│   ├── App.jsx                     # Root app component & routes
│   └── main.jsx                    # React entry point
│
├── public/                         # Static public assets
├── index.html                      # HTML entry point
├── package.json                    # Node.js dependencies
├── vite.config.js                  # Vite configuration
├── vercel.json                     # Vercel deployment config
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **Python** 3.11+
- **PostgreSQL** database (or a free [Supabase](https://supabase.com) project)
- **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Adityarawat01/StayEase-Homestay-Management-System.git
cd StayEase-Homestay-Management-System
```

---

### 2️⃣ Backend Setup

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

> 📌 The API will be live at `http://localhost:5000`
> 📖 Swagger docs: `http://localhost:5000/docs`

To seed the database with sample homestay data:
```bash
python seed_data.py
```

---

### 3️⃣ Frontend Setup

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

> 📌 The frontend will be live at `http://localhost:5173`

---

## 🔑 Environment Variables

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
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Full URL to the backend API (no trailing slash) |

> ⚠️ **Never commit `.env` files to version control.** Use `.env.example` as a reference template only.

---

## ☁️ Deployment

StayEase is deployed as a split-stack application across two platforms:

### 🌐 Frontend — Vercel

1. Connect the repository to [Vercel](https://vercel.com).
2. Set the **Framework Preset** to `Vite`.
3. Set the **Root Directory** to `/` (project root).
4. Add environment variables in the Vercel dashboard:
   - `VITE_API_URL` → Your Render backend URL (e.g. `https://stayease-api.onrender.com`)
5. Click **Deploy** — Vercel automatically rebuilds on every push to `main`.

### ⚙️ Backend — Render

1. Connect the repository to [Render](https://render.com).
2. Create a new **Web Service** with the **Root Directory** set to `backend`.
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000`
5. Add all backend environment variables in the Render dashboard.

### 🗄️ Database — Supabase

1. Create a free project on [Supabase](https://supabase.com).
2. Copy the **Connection String** from **Settings → Database**.
3. Set it as `DATABASE_URL` in your backend environment.
4. Tables are auto-created on first backend startup via SQLAlchemy.

> 💡 Production environment variables are configured securely through each platform's secrets manager — no secrets are stored in the codebase.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Rate Limit | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | 5/min | Register a new user |
| `POST` | `/api/auth/login` | 10/min | Login with email & password |
| `POST` | `/api/auth/logout` | — | Logout (client-side token clear) |
| `POST` | `/api/auth/google-login` | 10/min | Login via Google OAuth |

### 🏠 Listings

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/listings` | No | Retrieve all homestay listings |
| `GET` | `/api/listings/{id}` | No | Retrieve a single listing by ID |
| `GET` | `/api/listings/search?q=` | No | Search listings by name or location |
| `GET` | `/api/listings/me` | ✅ | Get the current user's own listings |
| `POST` | `/api/listings` | ✅ | Create a new listing |
| `PUT` | `/api/listings/{id}` | ✅ | Update an existing listing |
| `DELETE` | `/api/listings/{id}` | ✅ | Delete a listing |

### 📅 Bookings

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/bookings` | ✅ | Get current user's bookings |
| `POST` | `/api/bookings` | ✅ | Create a new booking |
| `DELETE` | `/api/bookings/{id}` | ✅ | Cancel a booking |

### 🤖 AI Assistant

| Method | Endpoint | Rate Limit | Description |
|---|---|---|---|
| `POST` | `/api/ai/chat` | 10/min | Chat with the Gemini-powered travel assistant |

> 📖 Full interactive API documentation is available via **Swagger UI** at `/docs` when running locally or on the deployed backend.

---

## 📸 Screenshots

> *Screenshots showcase the key pages and features of StayEase.*

| Page | Description |
|---|---|
| 🏠 **Home Page** | Landing page with hero section and featured listings |
| 📋 **Listings** | Browse all available eco-friendly homestays |
| 🔑 **Login / Register** | Secure authentication with email or Google OAuth |
| 📊 **Dashboard** | Host dashboard to manage own properties and bookings |
| 🤖 **AI Assistant** | Real-time travel recommendations powered by Gemini |
| 📱 **Mobile View** | Fully responsive layout on small screens |

---

## 🔮 Future Improvements

The following enhancements are planned for upcoming iterations of StayEase:

- 💳 **Payment Gateway Integration** — Stripe or Razorpay for real bookings
- ❤️ **Wishlist / Favourites** — Save and revisit preferred properties
- ⭐ **Reviews & Ratings** — Guest reviews for transparent host feedback
- 🔎 **Advanced Search & Filters** — Filter by price, location, amenities, and rating
- 📧 **Email Notifications** — Booking confirmations and status updates via email
- 🛠️ **Admin Dashboard** — Platform-wide management and moderation panel
- 🖼️ **Image Upload** — Multi-image upload for property listings (Cloudinary / S3)
- 🗺️ **Maps Integration** — Google Maps or Mapbox for property location visualisation
- 🔔 **Real-time Notifications** — WebSocket-powered live booking alerts
- 📊 **Analytics Dashboard** — Host performance metrics and booking trends

---

## ⚠️ Known Limitations

- **AI Assistant API Quota:** The AI Travel Assistant uses the **Google Gemini API** on a free-tier key. During periods of high usage, the assistant may temporarily become unavailable with a `429 Too Many Requests` error until the quota resets.

- **Cold Starts (Render Free Tier):** The backend is hosted on Render's free tier, which spins down after 15 minutes of inactivity. The first request after inactivity may take up to 30–60 seconds to respond while the server cold-starts.

- **Image Storage:** Property images currently use external URLs. Direct image uploads are not yet supported.

---

## 📚 Learning Outcomes

This project provided hands-on experience across the complete software development lifecycle:

| Area | Skills Gained |
|---|---|
| **Frontend Development** | React component architecture, hooks, context API, React Router, and responsive CSS design |
| **Backend Development** | RESTful API design with FastAPI, async Python, Pydantic schemas, and SQLAlchemy ORM |
| **Authentication & Security** | JWT token flow, password hashing, rate limiting, and CORS configuration |
| **Database Management** | PostgreSQL schema design, ORM relationships, and Supabase connection pooling |
| **AI Integration** | Integrating the Google Gemini API into a production web application |
| **Cloud Deployment** | Full-stack deployment across Vercel, Render, and Supabase with environment secrets management |
| **Debugging & Testing** | API testing with Postman/Swagger, browser DevTools debugging, and error boundary implementation |
| **Version Control** | Professional Git workflow, commit hygiene, and `.gitignore` management |
| **Responsive UI** | Mobile-first design, theming with CSS variables, and dark/light mode implementation |

---

## 👨‍💻 Author

<div align="center">

**Aditya Rawat**

🎓 *AI-Assisted Full Stack Web Development Internship*
🏛️ Graphic Era (Deemed to be University)

[![GitHub](https://img.shields.io/badge/GitHub-Adityarawat01-181717?style=for-the-badge&logo=github)](https://github.com/Adityarawat01)

</div>

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Aditya Rawat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---

<div align="center">

Made with 💚 for sustainable travel &nbsp;|&nbsp; StayEase © 2025

⭐ *If you found this project helpful, please consider giving it a star!* ⭐

</div>
