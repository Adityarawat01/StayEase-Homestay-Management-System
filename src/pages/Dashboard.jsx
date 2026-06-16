import { useState } from 'react'
import { properties } from '../data/properties'
import './Dashboard.css'

const bookingRequests = [
  { id: 1, guest: 'Priya Sharma', property: 'Mountain View Homestay', checkIn: '2026-07-15', checkOut: '2026-07-18', guests: 2, status: 'pending', amount: 9600 },
  { id: 2, guest: 'Rohan Mehta', property: 'Forest Retreat', checkIn: '2026-07-20', checkOut: '2026-07-23', guests: 4, status: 'confirmed', amount: 8400 },
  { id: 3, guest: 'Anjali Nair', property: 'Riverside Cottage', checkIn: '2026-08-01', checkOut: '2026-08-04', guests: 2, status: 'confirmed', amount: 7200 },
  { id: 4, guest: 'Vikram Singh', property: 'Hilltop Eco Lodge', checkIn: '2026-08-10', checkOut: '2026-08-12', guests: 3, status: 'pending', amount: 7200 },
  { id: 5, guest: 'Meera Patel', property: 'Green Escape Resort', checkIn: '2026-08-20', checkOut: '2026-08-25', guests: 2, status: 'cancelled', amount: 21000 },
]

const monthlyRevenue = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 75 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 88 },
  { month: 'Jun', value: 95 },
]

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value))

function StatusBadge({ status }) {
  const map = {
    pending: { label: 'Pending', class: 'badge--warning' },
    confirmed: { label: 'Confirmed', class: 'badge--success' },
    cancelled: { label: 'Cancelled', class: 'badge--error' },
  }
  const { label, class: cls } = map[status] || {}
  return <span className={`badge ${cls}`}>{label}</span>
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [requests, setRequests] = useState(bookingRequests)

  const confirmed = requests.filter((r) => r.status === 'confirmed').length
  const pending = requests.filter((r) => r.status === 'pending').length
  const totalRevenue = requests.filter((r) => r.status === 'confirmed').reduce((s, r) => s + r.amount, 0)
  const occupancyRate = Math.round((confirmed / requests.length) * 100)

  const handleStatus = (id, status) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r))
  }

  const stats = [
    { icon: '🏡', label: 'Total Listings', value: properties.length, sub: '+2 this month', color: '#2d7a4f' },
    { icon: '📋', label: 'Booking Requests', value: requests.length, sub: `${pending} pending`, color: '#f59e0b' },
    { icon: '✅', label: 'Confirmed Stays', value: confirmed, sub: 'This month', color: '#0ea5e9' },
    { icon: '📊', label: 'Occupancy Rate', value: `${occupancyRate}%`, sub: '↑ 8% vs last month', color: '#8b5cf6' },
    { icon: '💰', label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, sub: 'Confirmed bookings', color: '#ec4899' },
    { icon: '⭐', label: 'Avg. Rating', value: '4.85', sub: 'Across all properties', color: '#f59e0b' },
  ]

  return (
    <div className="dashboard page-enter">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__header-bg" />
        <div className="container dashboard__header-inner">
          <div>
            <span className="section-label" style={{ color: '#fff', background: 'rgba(255,255,255,0.18)' }}>
              🏠 Host Dashboard
            </span>
            <h1 className="dashboard__title">Welcome back, Aditya 👋</h1>
            <p className="dashboard__subtitle">Here's what's happening with your properties today.</p>
          </div>
          <button className="btn dashboard__add-btn">
            <span>+</span> Add New Listing
          </button>
        </div>
      </div>

      <div className="container dashboard__body">
        {/* Stats Grid */}
        <div className="dashboard__stats">
          {stats.map(({ icon, label, value, sub, color }) => (
            <div key={label} className="dashboard__stat-card" style={{ '--stat-color': color }}>
              <div className="dashboard__stat-icon">{icon}</div>
              <div className="dashboard__stat-content">
                <p className="dashboard__stat-label">{label}</p>
                <p className="dashboard__stat-value">{value}</p>
                <p className="dashboard__stat-sub">{sub}</p>
              </div>
              <div className="dashboard__stat-glow" />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dashboard__tabs">
          {[['overview', '📊 Overview'], ['bookings', '📋 Bookings'], ['listings', '🏡 My Listings']].map(([key, label]) => (
            <button
              key={key}
              className={`dashboard__tab ${activeTab === key ? 'dashboard__tab--active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="dashboard__overview animate-fadeIn">
            <div className="dashboard__chart-card">
              <h3 className="dashboard__card-title">Monthly Revenue Trend</h3>
              <div className="dashboard__bar-chart">
                {monthlyRevenue.map(({ month, value }) => (
                  <div key={month} className="dashboard__bar-group">
                    <div
                      className="dashboard__bar"
                      style={{ height: `${(value / maxRevenue) * 180}px` }}
                      title={`${month}: ${value}%`}
                    >
                      <span className="dashboard__bar-val">{value}%</span>
                    </div>
                    <span className="dashboard__bar-label">{month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard__quick-stats">
              <h3 className="dashboard__card-title">Quick Stats</h3>
              {[
                { label: 'Average Response Time', value: '< 2 hours', icon: '⚡' },
                { label: 'Guest Satisfaction', value: '97%', icon: '😊' },
                { label: 'Repeat Guests', value: '34%', icon: '🔄' },
                { label: 'Cancellation Rate', value: '4%', icon: '❌' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="dashboard__quick-row">
                  <span className="dashboard__quick-icon">{icon}</span>
                  <span className="dashboard__quick-label">{label}</span>
                  <span className="dashboard__quick-val">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="dashboard__bookings animate-fadeIn">
            <div className="dashboard__table-wrap">
              <table className="dashboard__table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Property</th>
                    <th>Dates</th>
                    <th>Guests</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div className="dashboard__guest">
                          <div className="dashboard__guest-avatar">{r.guest.charAt(0)}</div>
                          <span>{r.guest}</span>
                        </div>
                      </td>
                      <td className="dashboard__property-cell">{r.property}</td>
                      <td className="dashboard__dates-cell">
                        <span>{r.checkIn}</span>
                        <span className="dashboard__date-arrow">→</span>
                        <span>{r.checkOut}</span>
                      </td>
                      <td>{r.guests} 👥</td>
                      <td><strong>₹{r.amount.toLocaleString()}</strong></td>
                      <td><StatusBadge status={r.status} /></td>
                      <td>
                        <div className="dashboard__actions">
                          {r.status === 'pending' && (
                            <>
                              <button className="dashboard__action-btn dashboard__action-btn--accept" onClick={() => handleStatus(r.id, 'confirmed')}>✓</button>
                              <button className="dashboard__action-btn dashboard__action-btn--reject" onClick={() => handleStatus(r.id, 'cancelled')}>✕</button>
                            </>
                          )}
                          {r.status !== 'pending' && <span className="dashboard__action-done">—</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="dashboard__listings animate-fadeIn">
            {properties.slice(0, 5).map((p) => (
              <div key={p.id} className="dashboard__listing-row">
                <img src={p.image} alt={p.name} className="dashboard__listing-img" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&auto=format&fit=crop' }} />
                <div className="dashboard__listing-info">
                  <h4 className="dashboard__listing-name">{p.name}</h4>
                  <p className="dashboard__listing-loc">📍 {p.location}</p>
                </div>
                <div className="dashboard__listing-meta">
                  <span className="dashboard__listing-price">₹{p.price.toLocaleString()}/night</span>
                  <span className="dashboard__listing-rating">⭐ {p.rating} ({p.reviews})</span>
                </div>
                <span className="badge badge--success">Active</span>
                <div className="dashboard__listing-actions">
                  <button className="btn btn-ghost dashboard__listing-btn">Edit</button>
                  <button className="btn btn-outline dashboard__listing-btn">View</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
