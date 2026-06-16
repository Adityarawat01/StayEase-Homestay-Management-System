import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Listings from './pages/Listings'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import './styles/App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('stayease-theme') === 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('stayease-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
