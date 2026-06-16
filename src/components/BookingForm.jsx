import { useState } from 'react'
import './BookingForm.css'

const initialState = {
  fullName: '',
  email: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
}

function BookingForm({ propertyName = 'Selected Property' }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.checkIn) e.checkIn = 'Check-in date is required'
    if (!form.checkOut) e.checkOut = 'Check-out date is required'
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn)
      e.checkOut = 'Check-out must be after check-in'
    if (form.guests < 1 || form.guests > 20) e.guests = 'Guests must be between 1 and 20'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1800)
  }

  const handleReset = () => {
    setForm(initialState)
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="booking-success__icon">
          <span>🎉</span>
          <div className="booking-success__ring" />
        </div>
        <h3 className="booking-success__title">Booking Confirmed!</h3>
        <p className="booking-success__text">
          Thank you, <strong>{form.fullName}</strong>! Your booking request for{' '}
          <strong>{propertyName}</strong> has been received. We'll send a
          confirmation to <strong>{form.email}</strong> shortly.
        </p>
        <div className="booking-success__details">
          <div className="booking-success__detail">
            <span className="booking-success__detail-icon">📅</span>
            <div>
              <span className="booking-success__detail-label">Check-in</span>
              <span className="booking-success__detail-value">{form.checkIn}</span>
            </div>
          </div>
          <div className="booking-success__detail">
            <span className="booking-success__detail-icon">📅</span>
            <div>
              <span className="booking-success__detail-label">Check-out</span>
              <span className="booking-success__detail-value">{form.checkOut}</span>
            </div>
          </div>
          <div className="booking-success__detail">
            <span className="booking-success__detail-icon">👥</span>
            <div>
              <span className="booking-success__detail-label">Guests</span>
              <span className="booking-success__detail-value">{form.guests}</span>
            </div>
          </div>
        </div>
        <button className="btn btn-outline booking-success__reset" onClick={handleReset}>
          Book Another Stay
        </button>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="booking-form__header">
        <h3 className="booking-form__title">Reserve Your Stay</h3>
        <p className="booking-form__sub">at {propertyName}</p>
      </div>

      <div className="booking-form__fields">
        {/* Full Name */}
        <div className={`form-group ${errors.fullName ? 'form-group--error' : ''}`}>
          <label htmlFor="booking-fullName" className="form-label">
            <span>👤</span> Full Name
          </label>
          <input
            id="booking-fullName"
            type="text"
            name="fullName"
            className="form-input"
            placeholder="Aditya Rawat"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
          <label htmlFor="booking-email" className="form-label">
            <span>📧</span> Email Address
          </label>
          <input
            id="booking-email"
            type="email"
            name="email"
            className="form-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        {/* Dates */}
        <div className="form-row">
          <div className={`form-group ${errors.checkIn ? 'form-group--error' : ''}`}>
            <label htmlFor="booking-checkIn" className="form-label">
              <span>🗓️</span> Check-in
            </label>
            <input
              id="booking-checkIn"
              type="date"
              name="checkIn"
              className="form-input"
              min={today}
              value={form.checkIn}
              onChange={handleChange}
            />
            {errors.checkIn && <p className="form-error">{errors.checkIn}</p>}
          </div>

          <div className={`form-group ${errors.checkOut ? 'form-group--error' : ''}`}>
            <label htmlFor="booking-checkOut" className="form-label">
              <span>🗓️</span> Check-out
            </label>
            <input
              id="booking-checkOut"
              type="date"
              name="checkOut"
              className="form-input"
              min={form.checkIn || today}
              value={form.checkOut}
              onChange={handleChange}
            />
            {errors.checkOut && <p className="form-error">{errors.checkOut}</p>}
          </div>
        </div>

        {/* Guests */}
        <div className={`form-group ${errors.guests ? 'form-group--error' : ''}`}>
          <label htmlFor="booking-guests" className="form-label">
            <span>👥</span> Number of Guests
          </label>
          <input
            id="booking-guests"
            type="number"
            name="guests"
            className="form-input"
            min="1"
            max="20"
            value={form.guests}
            onChange={handleChange}
          />
          {errors.guests && <p className="form-error">{errors.guests}</p>}
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-primary booking-form__submit ${loading ? 'booking-form__submit--loading' : ''}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="booking-form__spinner" />
            Processing…
          </>
        ) : (
          <>
            <span>✅</span> Confirm Booking
          </>
        )}
      </button>

      <p className="booking-form__note">
        🔒 No payment required now. Confirmation within 24 hours.
      </p>
    </form>
  )
}

export default BookingForm
