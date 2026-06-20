import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { properties } from '../data/properties'
import BookingForm from '../components/BookingForm'
import { Button, Modal, toast } from '../components/ui'
import './DetailView.css'

const REVIEWS = [
  { name: 'Priya Sharma', avatar: 'PS', rating: 5, date: 'March 2026', text: 'An absolutely magical stay. The host was incredibly warm and the views were breathtaking!' },
  { name: 'Rohan Mehta', avatar: 'RM', rating: 5, date: 'February 2026', text: 'Perfect eco-friendly getaway. Loved the farm-to-table meals and morning mist.' },
  { name: 'Anjali Nair', avatar: 'AN', rating: 4, date: 'January 2026', text: 'Serene and beautiful. Would highly recommend to anyone looking for a nature retreat.' },
]

function StarRating({ rating, size = 'sm' }) {
  return (
    <span className={`detail-stars detail-stars--${size}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }}>⭐</span>
      ))}
    </span>
  )
}

function DetailView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const property = properties.find((p) => p.id === Number(id))

  const [wishlist, setWishlist] = useState(false)
  const [galleryModal, setGalleryModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  if (!property) {
    return (
      <div className="detail-notfound page-enter">
        <div className="container detail-notfound__inner">
          <div className="detail-notfound__icon">🏚️</div>
          <h2 className="detail-notfound__title">Property Not Found</h2>
          <p className="detail-notfound__desc">This listing may have been removed or the URL is incorrect.</p>
          <Button variant="primary" onClick={() => navigate('/listings')}>← Back to Listings</Button>
        </div>
      </div>
    )
  }

  const handleWishlist = () => {
    setWishlist((w) => !w)
    toast.success(wishlist ? 'Removed from wishlist' : '❤️ Added to wishlist!')
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard! 🔗')
    } else {
      toast.info('Share: ' + window.location.href)
    }
  }

  const nearby = properties.filter((p) => p.id !== property.id && p.category === property.category).slice(0, 3)

  return (
    <div className="detail page-enter">
      {/* Breadcrumb */}
      <div className="container detail__breadcrumb">
        <Link to="/" className="detail__crumb">Home</Link>
        <span className="detail__crumb-sep">›</span>
        <Link to="/listings" className="detail__crumb">Listings</Link>
        <span className="detail__crumb-sep">›</span>
        <span className="detail__crumb detail__crumb--active">{property.name}</span>
      </div>

      {/* Hero Image */}
      <div className="detail__hero">
        <img
          src={property.image}
          alt={property.name}
          className="detail__hero-img"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop' }}
        />
        <div className="detail__hero-overlay" />

        {/* Hero Info */}
        <div className="detail__hero-content">
          {property.tag && <span className="detail__tag">{property.tag}</span>}
          <h1 className="detail__name">{property.name}</h1>
          <div className="detail__meta">
            <span className="detail__location">📍 {property.location}</span>
            <span className="detail__rating-hero">⭐ {property.rating} ({property.reviews} reviews)</span>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="detail__hero-actions">
          <button
            className={`detail__action-btn ${wishlist ? 'detail__action-btn--active' : ''}`}
            onClick={handleWishlist}
            aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            title={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wishlist ? '❤️' : '🤍'}
          </button>
          <button
            className="detail__action-btn"
            onClick={handleShare}
            aria-label="Share listing"
            title="Copy link"
          >
            🔗
          </button>
          <button
            className="detail__action-btn"
            onClick={() => setGalleryModal(true)}
            aria-label="View all photos"
            title="View all photos"
          >
            🖼️
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="container detail__body">
        <div className="detail__main">

          {/* Tabs */}
          <div className="detail__tabs">
            {[['overview', '📋 Overview'], ['amenities', '✨ Amenities'], ['reviews', '⭐ Reviews']].map(([key, label]) => (
              <button
                key={key}
                className={`detail__tab ${activeTab === key ? 'detail__tab--active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="detail__tab-content animate-fadeIn">
              <div className="detail__stats-row">
                <div className="detail__stat">
                  <span className="detail__stat-icon">💰</span>
                  <div>
                    <p className="detail__stat-val">₹{property.price.toLocaleString()}</p>
                    <p className="detail__stat-label">per night</p>
                  </div>
                </div>
                <div className="detail__stat">
                  <span className="detail__stat-icon">⭐</span>
                  <div>
                    <p className="detail__stat-val">{property.rating}</p>
                    <p className="detail__stat-label">{property.reviews} reviews</p>
                  </div>
                </div>
                <div className="detail__stat">
                  <span className="detail__stat-icon">🌿</span>
                  <div>
                    <p className="detail__stat-val">Eco</p>
                    <p className="detail__stat-label">Certified</p>
                  </div>
                </div>
                <div className="detail__stat">
                  <span className="detail__stat-icon">🏷️</span>
                  <div>
                    <p className="detail__stat-val">{property.category}</p>
                    <p className="detail__stat-label">Category</p>
                  </div>
                </div>
              </div>

              <div className="detail__description">
                <h2 className="detail__section-title">About This Stay</h2>
                <p className="detail__desc-text">{property.description}</p>
                <p className="detail__desc-text" style={{ marginTop: '12px' }}>
                  This property follows strict eco-friendly guidelines — from solar energy usage and rainwater harvesting
                  to locally sourced, organic meals. Your stay directly supports the local community and conservation efforts.
                </p>
              </div>

              <div className="detail__highlights">
                <h2 className="detail__section-title">Why You'll Love It</h2>
                <div className="detail__highlights-grid">
                  {[
                    { icon: '🌿', title: 'Eco Certified', desc: 'Meets all sustainability standards' },
                    { icon: '🔒', title: 'Secure Booking', desc: 'End-to-end encrypted & safe' },
                    { icon: '📞', title: '24/7 Support', desc: 'Host available round the clock' },
                    { icon: '↩️', title: 'Free Cancellation', desc: 'Full refund up to 48h before' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="detail__highlight-card">
                      <span className="detail__highlight-icon">{icon}</span>
                      <div>
                        <p className="detail__highlight-title">{title}</p>
                        <p className="detail__highlight-desc">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Amenities Tab */}
          {activeTab === 'amenities' && (
            <div className="detail__tab-content animate-fadeIn">
              <h2 className="detail__section-title">Amenities & Features</h2>
              <div className="detail__amenities-grid">
                {property.amenities.map((a) => (
                  <div key={a} className="detail__amenity">
                    <span className="detail__amenity-check">✓</span>
                    <span>{a}</span>
                  </div>
                ))}
                {[
                  '📶 High-Speed WiFi', '🅿️ Free Parking', '🧹 Daily Housekeeping',
                  '🔑 Self Check-In', '☕ Complimentary Breakfast', '🛁 Hot Shower',
                  '🌡️ Heating / AC', '🐾 Pet Friendly',
                ].map((a) => (
                  <div key={a} className="detail__amenity">
                    <span className="detail__amenity-check">✓</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="detail__tab-content animate-fadeIn">
              <div className="detail__reviews-header">
                <h2 className="detail__section-title">Guest Reviews</h2>
                <div className="detail__overall-rating">
                  <span className="detail__overall-score">{property.rating}</span>
                  <div>
                    <StarRating rating={property.rating} size="md" />
                    <p className="detail__overall-count">{property.reviews} reviews</p>
                  </div>
                </div>
              </div>

              <div className="detail__reviews-list">
                {REVIEWS.map(({ name, avatar, rating, date, text }) => (
                  <div key={name} className="detail__review-card">
                    <div className="detail__review-header">
                      <div className="detail__review-avatar">{avatar}</div>
                      <div>
                        <p className="detail__review-name">{name}</p>
                        <p className="detail__review-date">{date}</p>
                      </div>
                      <StarRating rating={rating} size="sm" />
                    </div>
                    <p className="detail__review-text">"{text}"</p>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="md"
                onClick={() => toast.info('All reviews coming soon!')}
              >
                Load More Reviews
              </Button>
            </div>
          )}

          {/* Nearby */}
          {nearby.length > 0 && (
            <div className="detail__nearby">
              <h2 className="detail__section-title">Similar Stays You Might Like</h2>
              <div className="detail__nearby-grid">
                {nearby.map((p) => (
                  <Link key={p.id} to={`/listings/${p.id}`} className="detail__nearby-card">
                    <img src={p.image} alt={p.name} className="detail__nearby-img"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format' }} />
                    <div className="detail__nearby-info">
                      <p className="detail__nearby-name">{p.name}</p>
                      <p className="detail__nearby-loc">📍 {p.location}</p>
                      <p className="detail__nearby-price">₹{p.price.toLocaleString()}<span>/night</span></p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Booking Form */}
        <aside className="detail__sidebar">
          <div className="detail__booking-card">
            <div className="detail__booking-price">
              <span className="detail__price-main">₹{property.price.toLocaleString()}</span>
              <span className="detail__price-unit">/ night</span>
            </div>
            <div className="detail__booking-rating">
              ⭐ {property.rating} · <span>{property.reviews} reviews</span>
            </div>
            <BookingForm propertyName={property.name} />
          </div>
        </aside>
      </div>

      {/* Gallery Modal */}
      <Modal isOpen={galleryModal} onClose={() => setGalleryModal(false)} title={`📸 ${property.name} — Gallery`} size="lg">
        <div className="detail__gallery-grid">
          {[property.image, ...Array(5).fill(property.image)].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${property.name} photo ${i + 1}`}
              className="detail__gallery-img"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format' }}
            />
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default DetailView
