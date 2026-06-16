import './About.css'

const team = [
  { name: 'Aditya Rawat', role: 'Founder & CEO', emoji: '👨‍💻', bio: 'Passionate about sustainable travel and connecting communities.' },
  { name: 'Priya Sharma', role: 'Head of Operations', emoji: '👩‍💼', bio: 'Ensuring every guest experience is seamless and memorable.' },
  { name: 'Rohan Mehta', role: 'Tech Lead', emoji: '🧑‍💻', bio: 'Building the platform that makes eco-travel effortless.' },
]

const milestones = [
  { year: '2022', title: 'StayEase Founded', desc: 'Started with just 10 homestays in Himachal Pradesh.' },
  { year: '2023', title: '500+ Properties', desc: 'Expanded to 8 states with a passionate host community.' },
  { year: '2024', title: 'Eco Certification Launch', desc: 'Introduced our rigorous sustainability certification program.' },
  { year: '2026', title: '1,200+ Eco-Stays', desc: 'Serving 2,400+ happy guests across 50 destinations.' },
]

const values = [
  { icon: '🌱', title: 'Sustainability First', desc: 'Every decision we make is guided by environmental impact and long-term ecological health.' },
  { icon: '🤝', title: 'Community Empowerment', desc: 'We ensure that the majority of every booking goes directly to host families and local communities.' },
  { icon: '🔍', title: 'Radical Transparency', desc: 'We publish our eco-scores, host earnings, and carbon data openly for all to see.' },
  { icon: '❤️', title: 'Guest-First Always', desc: 'From search to checkout, we obsess over every detail of the traveller experience.' },
  { icon: '🌏', title: 'India\'s Biodiversity', desc: 'We actively protect and promote stays near India\'s most treasured natural ecosystems.' },
  { icon: '🚀', title: 'Continuous Innovation', desc: 'We\'re constantly improving our platform to serve hosts and guests better every day.' },
]

function About() {
  return (
    <div className="about page-enter">
      {/* Hero */}
      <div className="about__hero">
        <div className="about__hero-bg" />
        <div className="container about__hero-inner">
          <span className="section-label" style={{ color: '#fff', background: 'rgba(255,255,255,0.2)', marginBottom: '16px' }}>
            🌿 Our Story
          </span>
          <h1 className="about__hero-title">About StayEase</h1>
          <p className="about__hero-sub">
            Redefining travel by putting sustainability, authenticity, and community at the heart of every stay.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section about__mission">
        <div className="container about__mission-inner">
          <div className="about__mission-text">
            <span className="section-label">🎯 Our Mission</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Sustainable Tourism<br />for a Better World
            </h2>
            <p className="about__para">
              StayEase was born from a simple belief: that travel should benefit not just the traveller, but the land they visit and the people who call it home. We connect curious explorers with eco-certified homestays that tread lightly on the planet.
            </p>
            <p className="about__para">
              Every listing on our platform is personally vetted against our 50-point sustainability checklist — covering energy use, waste management, water conservation, and community engagement. We don't just talk green; we prove it.
            </p>
            <div className="about__mission-stats">
              {[['1,200+', 'Eco Properties'], ['2,400+', 'Happy Guests'], ['50+', 'Destinations'], ['4.9★', 'Avg Rating']].map(([val, label]) => (
                <div key={label} className="about__mission-stat">
                  <strong>{val}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about__mission-visual">
            <div className="about__mission-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80"
                alt="Lush green landscape representing eco-tourism"
                className="about__mission-img"
              />
            </div>
            <div className="about__mission-badge">
              <span>🏆</span>
              <div>
                <strong>Best Eco Platform 2025</strong>
                <span>India Travel Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about__values">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">💚 Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">Six principles that guide every decision we make at StayEase.</p>
          </div>
          <div className="about__values-grid">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="about__value-card">
                <span className="about__value-icon">{icon}</span>
                <h3 className="about__value-title">{title}</h3>
                <p className="about__value-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section about__timeline">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <span className="section-label">📅 Our Journey</span>
            <h2 className="section-title">How We Got Here</h2>
          </div>
          <div className="about__timeline-track">
            {milestones.map(({ year, title, desc }, i) => (
              <div key={year} className={`about__milestone ${i % 2 === 0 ? 'about__milestone--left' : 'about__milestone--right'}`}>
                <div className="about__milestone-dot" />
                <div className="about__milestone-card">
                  <span className="about__milestone-year">{year}</span>
                  <h3 className="about__milestone-title">{title}</h3>
                  <p className="about__milestone-desc">{desc}</p>
                </div>
              </div>
            ))}
            <div className="about__timeline-line" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about__team">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">👥 Our Team</span>
            <h2 className="section-title">The People Behind StayEase</h2>
            <p className="section-subtitle">A passionate team of travellers, technologists, and conservationists.</p>
          </div>
          <div className="about__team-grid">
            {team.map(({ name, role, emoji, bio }) => (
              <div key={name} className="about__team-card">
                <div className="about__team-avatar">{emoji}</div>
                <h3 className="about__team-name">{name}</h3>
                <p className="about__team-role">{role}</p>
                <p className="about__team-bio">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <div className="about__cta-bg" />
        <div className="container about__cta-inner">
          <h2 className="about__cta-title">Ready to Travel Responsibly?</h2>
          <p className="about__cta-sub">Join thousands of conscious travellers who choose StayEase for an authentic, sustainable experience.</p>
          <div className="about__cta-btns">
            <a href="/listings" className="btn btn-primary about__cta-btn">Explore Stays</a>
            <a href="/dashboard" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)' }}>
              Become a Host
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
