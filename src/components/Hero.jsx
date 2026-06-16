import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Animated Background Blobs */}
      <div className="hero__blobs">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      <div className="container hero__inner">
        {/* Left: Text */}
        <div className="hero__content">
          <div className="hero__badge animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <span>🌱</span>
            <span>100% Eco-Certified Stays</span>
          </div>

          <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Discover<br />
            <span className="hero__title-highlight">Eco-Friendly</span><br />
            Homestays
          </h1>

          <p className="hero__subtitle animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            Explore unique stays, connect with nature, and support local communities. 
            Your perfect sustainable escape is just a click away.
          </p>

          <div className="hero__stats animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <div className="hero__stat">
              <strong>1,200+</strong>
              <span>Eco Stays</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>4.9★</strong>
              <span>Avg Rating</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>50+</strong>
              <span>Destinations</span>
            </div>
          </div>

          <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.55s' }}>
            <Link to="/listings" className="btn btn-primary hero__btn-primary">
              <span>🔍</span> Explore Stays
            </Link>
            <Link to="/dashboard" className="btn btn-outline hero__btn-secondary">
              <span>🏡</span> Become a Host
            </Link>
          </div>
        </div>

        {/* Right: Image Card */}
        <div className="hero__visual animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="hero__image-card">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop&q=80"
              alt="Beautiful eco-friendly mountain homestay"
              className="hero__image"
            />
            <div className="hero__image-overlay">
              <div className="hero__float-card hero__float-card--top">
                <span className="hero__float-icon">🏔️</span>
                <div>
                  <p className="hero__float-label">Mountain View Homestay</p>
                  <p className="hero__float-sub">Himachal Pradesh • ₹3,200/night</p>
                </div>
              </div>
              <div className="hero__float-card hero__float-card--bottom">
                <span className="hero__float-icon">✅</span>
                <div>
                  <p className="hero__float-label">Eco Certified</p>
                  <p className="hero__float-sub">Solar Powered • Zero Waste</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="hero__badge-float hero__badge-float--guests">
            <span>👥</span>
            <span>2,400+ happy guests</span>
          </div>
          <div className="hero__badge-float hero__badge-float--nature">
            <span>🌿</span>
            <span>100% Carbon Neutral</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
