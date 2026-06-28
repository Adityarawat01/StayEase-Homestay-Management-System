import { useState, useMemo, useEffect } from 'react'
import toast from 'react-hot-toast'
import Card from '../components/Card'
import { locations } from '../data/properties'
import { getListings, searchListings } from '../services/api'
import './Listings.css'

const PRICE_MAX = 8000

function Listings() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All Locations')
  const [priceRange, setPriceRange] = useState(PRICE_MAX)
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

  const categories = ['All', 'Mountain', 'Forest', 'Riverside', 'Hilltop', 'Desert', 'Waterfront']

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const data = search ? await searchListings(search) : await getListings()
        setProperties(data)
      } catch (error) {
        toast.error('Failed to fetch listings.')
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(() => {
        fetchAll()
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      const matchLocation =
        location === 'All Locations' || p.location.includes(location)
      const matchPrice = p.price <= priceRange
      const matchCategory = category === 'All' || p.category === category
      return matchLocation && matchPrice && matchCategory
    })

    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'reviews') return b.reviews - a.reviews
      return 0
    })
    return result
  }, [properties, location, priceRange, category, sortBy])

  const handleReset = () => {
    setSearch('')
    setLocation('All Locations')
    setPriceRange(PRICE_MAX)
    setCategory('All')
    setSortBy('rating')
  }

  return (
    <div className="listings page-enter">
      {/* Header */}
      <div className="listings__header">
        <div className="listings__header-bg" />
        <div className="container listings__header-inner">
          <span className="section-label" style={{ color: '#fff', background: 'rgba(255,255,255,0.2)' }}>
            🏡 Browse Listings
          </span>
          <h1 className="listings__title">Find Your Perfect Eco-Stay</h1>
          <p className="listings__subtitle">
            {properties.length} handpicked homestays across India — filtered for you.
          </p>

          {/* Main Search Bar */}
          <div className="listings__search-wrap">
            <span className="listings__search-icon">🔍</span>
            <input
              id="listings-search"
              type="text"
              className="listings__search"
              placeholder="Search by name or destination…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search listings"
            />
            {search && (
              <button className="listings__search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="container listings__body">
        {/* Sidebar Filters */}
        <aside className="listings__sidebar">
          <div className="listings__filter-card">
            <div className="listings__filter-header">
              <h3 className="listings__filter-title">Filters</h3>
              <button className="listings__filter-reset" onClick={handleReset}>Reset all</button>
            </div>

            {/* Location */}
            <div className="listings__filter-group">
              <label className="listings__filter-label" htmlFor="filter-location">
                📍 Location
              </label>
              <select
                id="filter-location"
                className="listings__select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="listings__filter-group">
              <label className="listings__filter-label">
                💰 Max Price: <strong>₹{priceRange.toLocaleString()}</strong>/night
              </label>
              <input
                id="filter-price"
                type="range"
                min={1000}
                max={PRICE_MAX}
                step={200}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="listings__range"
                aria-label="Max price per night"
              />
              <div className="listings__range-labels">
                <span>₹1,000</span>
                <span>₹{PRICE_MAX.toLocaleString()}</span>
              </div>
            </div>

            {/* Category */}
            <div className="listings__filter-group">
              <label className="listings__filter-label">🏷️ Category</label>
              <div className="listings__category-pills">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`listings__pill ${category === c ? 'listings__pill--active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="listings__filter-group">
              <label className="listings__filter-label" htmlFor="filter-sort">
                ↕️ Sort By
              </label>
              <select
                id="filter-sort"
                className="listings__select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="listings__results">
          <div className="listings__results-header">
            <p className="listings__count">
              {loading ? 'Searching...' : (filtered.length === 0
                ? 'No properties found'
                : `${filtered.length} propert${filtered.length === 1 ? 'y' : 'ies'} found`)}
            </p>
          </div>

          {loading ? (
            <div className="listings__empty">
              <h3>Loading...</h3>
            </div>
          ) : filtered.length === 0 ? (
            <div className="listings__empty">
              <div className="listings__empty-icon">🏕️</div>
              <h3>No stays found</h3>
              <p>Try adjusting your search or filters.</p>
              <button className="btn btn-primary" onClick={handleReset}>Clear Filters</button>
            </div>
          ) : (
            <div className="listings__grid">
              {filtered.map((p) => (
                <Card key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Listings
