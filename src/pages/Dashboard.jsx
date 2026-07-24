import { useState, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { getUserListings, createListing, updateListing, deleteListing, getUserBookings, cancelBooking } from '../services/api'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import { Loader } from '../components/ui'
import './Dashboard.css'

// Mock revenue data (can be replaced by real calculation if we had created_at for bookings, keeping it for UI purposes)
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
  const [requests, setRequests] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newListing, setNewListing] = useState({
    name: '',
    location: '',
    price: '',
    image: '',
    amenities: '',
    description: '',
    category: 'Mountain'
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingListing, setEditingListing] = useState(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const [listingsData, bookingsData] = await Promise.all([
        getUserListings(),
        getUserBookings()
      ])
      setProperties(listingsData)
      setRequests(bookingsData)
    } catch (error) {
      toast.error('Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        ...newListing,
        price: parseInt(newListing.price, 10),
        amenities: newListing.amenities.split(',').map(a => a.trim()).filter(a => a)
      }
      await createListing(payload)
      toast.success('Listing added successfully!')
      setIsAddModalOpen(false)
      setNewListing({ name: '', location: '', price: '', image: '', amenities: '', description: '', category: 'Mountain' })
      loadData()
    } catch (error) {
      toast.error('Failed to create listing.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClick = (listing) => {
    setEditingListing({
      ...listing,
      amenities: listing.amenities ? listing.amenities.join(', ') : ''
    })
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        name: editingListing.name,
        location: editingListing.location,
        price: parseInt(editingListing.price, 10),
        image: editingListing.image,
        amenities: editingListing.amenities.split(',').map(a => a.trim()).filter(a => a),
        description: editingListing.description,
        category: editingListing.category
      }
      await updateListing(editingListing.id, payload)
      toast.success('Listing updated successfully!')
      setIsEditModalOpen(false)
      setEditingListing(null)
      loadData()
    } catch (error) {
      toast.error('Failed to update listing.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteListing(id)
        toast.success("Listing deleted successfully.")
        setProperties(prev => prev.filter(p => p.id !== id))
      } catch (error) {
        toast.error("Failed to delete listing.")
      }
    }
  }

  const statsData = useMemo(() => {
    // In our simplified system, we don't have explicit booking status in DB model, so we'll treat all fetched as confirmed for revenue
    const confirmedCount = requests.length
    const pendingCount = 0
    const revenue = requests.reduce((s, r) => s + r.total_price, 0)
    const occRate = requests.length > 0 ? 85 : 0
    
    return {
      confirmedCount,
      pendingCount,
      revenue,
      occRate
    }
  }, [requests])

  const handleStatus = async (id, status) => {
    if (status === 'cancelled') {
      try {
        await cancelBooking(id)
        toast.success("Booking cancelled successfully")
        loadData()
      } catch (error) {
        toast.error("Failed to cancel booking")
      }
    }
  }

  const stats = [
    { icon: '🏡', label: 'Total Listings', value: properties.length, sub: 'Active', color: '#2d7a4f' },
    { icon: '📋', label: 'Total Bookings', value: requests.length, sub: 'All time', color: '#f59e0b' },
    { icon: '✅', label: 'Confirmed Stays', value: statsData.confirmedCount, sub: 'This month', color: '#0ea5e9' },
    { icon: '📊', label: 'Occupancy Rate', value: `${statsData.occRate}%`, sub: 'Estimated', color: '#8b5cf6' },
    { icon: '💰', label: 'Total Revenue', value: `₹${statsData.revenue.toLocaleString()}`, sub: 'From bookings', color: '#ec4899' },
    { icon: '⭐', label: 'Avg. Rating', value: '4.85', sub: 'Across properties', color: '#f59e0b' },
  ]

  if (loading) {
    return (
      <div className="dashboard page-enter" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loader size="lg" />
      </div>
    )
  }

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
          <button className="btn dashboard__add-btn" onClick={() => setIsAddModalOpen(true)}>
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
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No bookings found.</td>
                    </tr>
                  ) : requests.map((r) => {
                    const propName = properties.find(p => p.id === r.listing_id)?.name || 'Unknown Property'
                    return (
                    <tr key={r.id}>
                      <td>
                        <div className="dashboard__guest">
                          <div className="dashboard__guest-avatar">G</div>
                          <span>Guest</span>
                        </div>
                      </td>
                      <td className="dashboard__property-cell">{propName}</td>
                      <td className="dashboard__dates-cell">
                        <span>{new Date(r.check_in).toLocaleDateString()}</span>
                        <span className="dashboard__date-arrow">→</span>
                        <span>{new Date(r.check_out).toLocaleDateString()}</span>
                      </td>
                      <td>—</td>
                      <td><strong>₹{r.total_price.toLocaleString()}</strong></td>
                      <td><StatusBadge status="confirmed" /></td>
                      <td>
                        <div className="dashboard__actions">
                          <button className="dashboard__action-btn dashboard__action-btn--reject" onClick={() => handleStatus(r.id, 'cancelled')}>✕ Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="dashboard__listings animate-fadeIn">
            {properties.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                <p>You haven't added any listings yet.</p>
              </div>
            ) : properties.map((p) => (
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
                  <button className="btn btn-ghost dashboard__listing-btn" onClick={() => handleEditClick(p)}>Edit</button>
                  <button className="btn btn-ghost dashboard__listing-btn" style={{ color: '#ef4444' }} onClick={() => handleDeleteClick(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Listing" size="md">
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input label="Name" placeholder="e.g. Mountain View Retreat" required value={newListing.name} onChange={(e) => setNewListing({ ...newListing, name: e.target.value })} />
          <Input label="Location" placeholder="e.g. Manali, Himachal Pradesh" required value={newListing.location} onChange={(e) => setNewListing({ ...newListing, location: e.target.value })} />
          <Input label="Price per Night (₹)" type="number" placeholder="e.g. 5000" required value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} />
          <Input label="Image URL" placeholder="https://..." required value={newListing.image} onChange={(e) => setNewListing({ ...newListing, image: e.target.value })} />
          <Input label="Amenities (comma separated)" placeholder="WiFi, Pool, Kitchen" required value={newListing.amenities} onChange={(e) => setNewListing({ ...newListing, amenities: e.target.value })} />
          
          <div className="ui-input-group">
            <label className="ui-input-label">Category *</label>
            <select className="ui-input" required value={newListing.category} onChange={(e) => setNewListing({ ...newListing, category: e.target.value })}>
              <option value="Mountain">Mountain</option>
              <option value="Forest">Forest</option>
              <option value="Riverside">Riverside</option>
              <option value="Hilltop">Hilltop</option>
              <option value="Desert">Desert</option>
              <option value="Waterfront">Waterfront</option>
            </select>
          </div>

          <div className="ui-input-group">
            <label className="ui-input-label">Description *</label>
            <textarea className="ui-input" rows="3" required value={newListing.description} onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Listing'}
          </button>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Listing" size="md">
        {editingListing && (
          <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input label="Name" required value={editingListing.name} onChange={(e) => setEditingListing({ ...editingListing, name: e.target.value })} />
            <Input label="Location" required value={editingListing.location} onChange={(e) => setEditingListing({ ...editingListing, location: e.target.value })} />
            <Input label="Price per Night (₹)" type="number" required value={editingListing.price} onChange={(e) => setEditingListing({ ...editingListing, price: e.target.value })} />
            <Input label="Image URL" required value={editingListing.image} onChange={(e) => setEditingListing({ ...editingListing, image: e.target.value })} />
            <Input label="Amenities (comma separated)" required value={editingListing.amenities} onChange={(e) => setEditingListing({ ...editingListing, amenities: e.target.value })} />
            
            <div className="ui-input-group">
              <label className="ui-input-label">Category *</label>
              <select className="ui-input" required value={editingListing.category} onChange={(e) => setEditingListing({ ...editingListing, category: e.target.value })}>
                <option value="Mountain">Mountain</option>
                <option value="Forest">Forest</option>
                <option value="Riverside">Riverside</option>
                <option value="Hilltop">Hilltop</option>
                <option value="Desert">Desert</option>
                <option value="Waterfront">Waterfront</option>
              </select>
            </div>

            <div className="ui-input-group">
              <label className="ui-input-label">Description *</label>
              <textarea className="ui-input" rows="3" required value={editingListing.description} onChange={(e) => setEditingListing({ ...editingListing, description: e.target.value })}></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default Dashboard
