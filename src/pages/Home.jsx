import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Card from '../components/Card'
import BookingForm from '../components/BookingForm'
import { properties } from '../data/properties'
import './Home.css'

/* ---- Simple Intersection Observer hook for scroll animations ---- */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

const features = [
  { icon: '🌿', title: 'Eco Certified', desc: 'Every listing meets our strict sustainability standards for a guilt-free stay.' },
  { icon: '🏡', title: 'Authentic Homes', desc: 'Real homes run by local families — not cookie-cutter hotel rooms.' },
  { icon: '🔒', title: 'Secure Booking', desc: 'End-to-end encrypted bookings with full cancellation protection.' },
  { icon: '🌍', title: 'Community First', desc: 'Your stay directly supports local livelihoods and conservation efforts.' },
]

const testimonials = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'The Forest Retreat in Coorg was an absolutely magical experience. StayEase made it effortless!', avatar: 'PS', rating: 5 },
  { name: 'Rohan Mehta', location: 'Delhi', text: 'Woke up to snow-capped mountains from our homestay in Manali. 10/10 would recommend to everyone.', avatar: 'RM', rating: 5 },
  { name: 'Anjali Nair', location: 'Bengaluru', text: 'The houseboat experience in Alleppey was surreal. The hosts were so warm and welcoming.', avatar: 'AN', rating: 5 },
]

function Home() {
  const [loading, setLoading] = useState(true)
  const [featuredRef, featuredVisible] = useScrollReveal()
  const [whyRef, whyVisible] = useScrollReveal()
  const [testimonialRef, testimonialVisible] = useScrollReveal()
  const [bookingRef, bookingVisible] = useScrollReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const featured = properties.slice(0, 6)

  return (
    <div className="home page-enter">
      <Hero />

      {/* ── Featured Homestays ── */}
      <section className="section home__featured" ref={featuredRef} id="featured">
        <div className="container">
          <div className={`home__section-header text-center ${featuredVisible ? 'animate-fadeInUp' : 'home__hidden'}`}>
            <span className="section-label">🏡 Featured Properties</span>
            <h2 className="section-title">Handpicked Eco-Stays</h2>
            <p className="section-subtitle">
              Curated properties that combine comfort, sustainability, and authentic local experiences.
            </p>
          </div>

          <div className="home__grid">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <Card key={i} loading />)
              : featured.map((p, i) => (
                  <div
                    key={p.id}
                    className={featuredVisible ? 'animate-fadeInUp' : 'home__hidden'}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <Card property={p} />
                  </div>
                ))
            }
          </div>

          <div className="text-center home__view-all">
            <Link to="/listings" className="btn btn-outline home__view-btn">
              View All Listings →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why StayEase ── */}
      <section className="section home__why" ref={whyRef} id="why">
        <div className="container">
          <div className={`home__section-header text-center ${whyVisible ? 'animate-fadeInUp' : 'home__hidden'}`}>
            <span className="section-label">💚 Why Choose Us</span>
            <h2 className="section-title">Travel That Makes a Difference</h2>
            <p className="section-subtitle">
              StayEase was built to make sustainable travel the first choice, not an afterthought.
            </p>
          </div>

          <div className="home__features">
            {features.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className={`home__feature-card ${whyVisible ? 'animate-fadeInUp' : 'home__hidden'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="home__feature-icon">{icon}</div>
                <h3 className="home__feature-title">{title}</h3>
                <p className="home__feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinations Banner ── */}
      <section className="home__destinations">
        <div className="home__destinations-bg" />
        <div className="container home__destinations-inner">
          <div className="home__destinations-text">
            <span className="section-label" style={{ color: '#fff', background: 'rgba(255,255,255,0.2)' }}>
              🗺️ Top Destinations
            </span>
            <h2 className="section-title" style={{ color: '#fff' }}>
              50+ Destinations Across India
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', marginBottom: '32px', lineHeight: '1.7' }}>
              From the Himalayan foothills to the Kerala backwaters — discover India's most breathtaking corners.
            </p>
            <Link to="/listings" className="btn" style={{ background: '#fff', color: 'var(--color-primary)', fontWeight: 700 }}>
              Explore All Destinations →
            </Link>
          </div>
          <div className="home__destinations-pills">
            {['🏔️ Himachal Pradesh', '🌿 Kerala', '🌊 Goa', '☕ Coorg', '🏜️ Rajasthan', '🦚 Wayanad', '🧘 Rishikesh', '🌺 Meghalaya'].map((d) => (
              <span key={d} className="home__dest-pill">{d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section home__testimonials" ref={testimonialRef} id="testimonials">
        <div className="container">
          <div className={`text-center ${testimonialVisible ? 'animate-fadeInUp' : 'home__hidden'}`}>
            <span className="section-label">⭐ Guest Stories</span>
            <h2 className="section-title">What Our Guests Say</h2>
            <p className="section-subtitle">Real experiences from real travellers who chose sustainable tourism.</p>
          </div>

          <div className="home__testimonials-grid">
            {testimonials.map(({ name, location, text, avatar, rating }, i) => (
              <div
                key={name}
                className={`home__testimonial-card ${testimonialVisible ? 'animate-fadeInUp' : 'home__hidden'}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="home__testimonial-stars">
                  {'⭐'.repeat(rating)}
                </div>
                <p className="home__testimonial-text">"{text}"</p>
                <div className="home__testimonial-author">
                  <div className="home__testimonial-avatar">{avatar}</div>
                  <div>
                    <p className="home__testimonial-name">{name}</p>
                    <p className="home__testimonial-loc">📍 {location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section className="section-sm home__booking" ref={bookingRef} id="book">
        <div className="container">
          <div className="home__booking-inner">
            <div className={`home__booking-text ${bookingVisible ? 'animate-fadeInUp' : 'home__hidden'}`}>
              <span className="section-label">📅 Book Now</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Ready for Your Eco-Adventure?
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                Fill in your details and we'll find the perfect eco-stay for you. No payment required upfront.
              </p>
              <ul className="home__booking-perks">
                {['Instant booking confirmation', 'Free cancellation up to 48h', '24/7 host support', 'Best price guarantee'].map((p) => (
                  <li key={p}><span>✅</span> {p}</li>
                ))}
              </ul>
            </div>
            <div className={`home__booking-form ${bookingVisible ? 'animate-fadeInUp' : 'home__hidden'}`} style={{ animationDelay: '0.15s' }}>
              <BookingForm propertyName="Your Dream Stay" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
