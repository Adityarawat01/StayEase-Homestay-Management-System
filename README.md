# 🌿 StayEase – Eco-Friendly Homestay Booking Platform

> A modern, production-quality frontend web application built with **React (Vite)** — designed to help travellers discover eco-certified homestays and support local communities across India.

![StayEase Banner](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80)

---

## 🚀 Live Demo

> Run locally with `npm run dev` — see setup below.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏡 **Browse Listings** | 8+ curated eco-stays with search, filter & sort |
| 🔍 **Smart Search** | Filter by name, location, category & price range |
| 📋 **Booking Form** | Full validation, loading state, success confirmation |
| 🏠 **Host Dashboard** | Stats cards, bar chart, bookings table, listings manager |
| 👤 **Auth UI** | Sign In / Register with social buttons & validation |
| 🌙 **Dark Mode** | Toggle with persistent preference via localStorage |
| 📱 **Responsive** | Mobile-first design — works on all screen sizes |
| ✨ **Animations** | Scroll reveal, floating blobs, skeleton loaders, hover effects |

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (CSS Custom Properties / Design Tokens)
- **Fonts**: Inter + Outfit (Google Fonts)
- **Images**: Unsplash (CDN, no download needed)

---

## 📁 Project Structure

```
stayease/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Card.jsx / Card.css
│   │   ├── Footer.jsx / Footer.css
│   │   └── BookingForm.jsx / BookingForm.css
│   │
│   ├── pages/
│   │   ├── Home.jsx / Home.css
│   │   ├── Listings.jsx / Listings.css
│   │   ├── About.jsx / About.css
│   │   ├── Dashboard.jsx / Dashboard.css
│   │   └── Login.jsx / Login.css
│   │
│   ├── data/
│   │   └── properties.js         # All property data
│   │
│   ├── styles/
│   │   ├── index.css             # Global design system
│   │   └── App.css               # App layout
│   │
│   ├── App.jsx                   # Root with routing & dark mode
│   └── main.jsx                  # React entry point
│
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Adityarawat01/StayEase-Homestay-Management-System.git
cd StayEase-Homestay-Management-System

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, featured listings, why section, testimonials, booking CTA |
| `/listings` | Listings | Browse all properties with filters |
| `/about` | About | Mission, values, timeline, team |
| `/dashboard` | Dashboard | Host stats, bookings, listings manager |
| `/login` | Login | Sign In / Register auth UI |

---

## 🎨 Design System

The app uses a comprehensive CSS custom property design system:

```css
/* Colors */
--color-primary: #2d7a4f       /* Eco green */
--color-accent:  #f59e0b       /* Amber */
--color-secondary: #0ea5e9     /* Sky blue */

/* Typography */
--font-primary: 'Inter'
--font-display: 'Outfit'

/* Shadows, Radii, Transitions */
--shadow-card, --radius-lg, --transition-base ...
```

Dark mode is fully supported via `data-theme="dark"` on `<html>`.

---

## 📸 Screenshots

### Home Page
- Hero section with animated gradient blobs and floating stat cards
- Featured 6-card grid with skeleton loaders on first load
- Destination banner with pill badges
- Testimonials section
- Booking form CTA

### Listings Page
- Sticky sidebar with live search, location filter, price slider, category pills
- Responsive 2-column card grid with empty state

### Dashboard
- 6 animated stat cards
- Tab navigation: Overview / Bookings / Listings
- Bar chart for monthly revenue
- Bookings table with accept/reject actions

### Login / Register
- Split two-panel layout with glassmorphism left panel
- Social auth buttons, password visibility toggle
- Inline validation and success state

---

## 🌿 Sample Properties

1. **Mountain View Homestay** – Manali, HP · ₹3,200/night · ⭐ 4.9
2. **Forest Retreat** – Coorg, Karnataka · ₹2,800/night · ⭐ 4.8
3. **Riverside Cottage** – Rishikesh, Uttarakhand · ₹2,400/night · ⭐ 4.7
4. **Hilltop Eco Lodge** – Munnar, Kerala · ₹3,600/night · ⭐ 4.9
5. **Pine Valley Stay** – Kasol, HP · ₹1,900/night · ⭐ 4.6
6. **Green Escape Resort** – Wayanad, Kerala · ₹4,200/night · ⭐ 4.9
7. **Desert Oasis Camp** – Jaisalmer, Rajasthan · ₹5,500/night · ⭐ 4.8
8. **Backwater Houseboat** – Alleppey, Kerala · ₹6,800/night · ⭐ 4.9

---

## 📄 License

MIT © 2026 **StayEase** – Made with 💚 for sustainable travel.