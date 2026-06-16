import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

function Card({ property, loading = false }) {
  const [imgError, setImgError] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  if (loading) {
    return (
      <div className="card card--skeleton">
        <div className="skeleton card__skeleton-img" />
        <div className="card__body">
          <div className="skeleton card__skeleton-title" />
          <div className="skeleton card__skeleton-sub" />
          <div className="skeleton card__skeleton-price" />
          <div className="skeleton card__skeleton-btn" />
        </div>
      </div>
    )
  }

  const {
    id,
    name,
    location,
    price,
    rating,
    reviews,
    image,
    tag,
    amenities = [],
  } = property

  const fallbackImg = `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=70`

  return (
    <article className="card" id={`property-${id}`}>
      {/* Image */}
      <div className="card__image-wrap">
        <img
          src={imgError ? fallbackImg : image}
          alt={name}
          className="card__image"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Overlay actions */}
        <button
          className={`card__wishlist ${wishlisted ? 'card__wishlist--active' : ''}`}
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>

        {tag && <span className="card__tag">{tag}</span>}

        {/* Rating badge */}
        <div className="card__rating-badge">
          <span>⭐</span>
          <span>{rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="card__body">
        <div className="card__meta">
          <span className="card__location">📍 {location}</span>
          <span className="card__reviews">({reviews} reviews)</span>
        </div>

        <h3 className="card__title">{name}</h3>

        {amenities.length > 0 && (
          <div className="card__amenities">
            {amenities.slice(0, 3).map((a, i) => (
              <span key={i} className="card__amenity">{a}</span>
            ))}
          </div>
        )}

        <div className="card__footer">
          <div className="card__price">
            <span className="card__price-amount">₹{price.toLocaleString()}</span>
            <span className="card__price-per"> / night</span>
          </div>
          <Link to={`/listings`} className="btn btn-primary card__btn">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Card
