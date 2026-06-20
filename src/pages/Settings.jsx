import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Button, toast } from '../components/ui'
import './Settings.css'

function SettingsSection({ icon, title, children }) {
  return (
    <div className="settings__card">
      <div className="settings__card-header">
        <span className="settings__card-icon">{icon}</span>
        <h2 className="settings__card-title">{title}</h2>
      </div>
      <div className="settings__card-body">{children}</div>
    </div>
  )
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="settings__toggle-row">
      <div className="settings__toggle-info">
        <p className="settings__toggle-label">{label}</p>
        {description && <p className="settings__toggle-desc">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        className={`settings__toggle ${checked ? 'settings__toggle--on' : ''}`}
        onClick={onChange}
        aria-label={label}
      >
        <span className="settings__toggle-knob" />
      </button>
    </div>
  )
}

function Settings() {
  const { darkMode, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    bookingConfirm: true,
    newMessages: true,
    priceAlerts: false,
    newsletter: false,
    smsAlerts: false,
  })

  const [profile, setProfile] = useState({
    name: 'Aditya Rawat',
    email: 'aditya@example.com',
    phone: '',
    bio: '',
  })

  const toggleNotif = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleProfileSave = (e) => {
    e.preventDefault()
    toast.success('Profile preferences saved!')
  }

  return (
    <div className="settings page-enter">
      {/* Header */}
      <div className="settings__header">
        <div className="settings__header-bg" />
        <div className="container settings__header-inner">
          <span className="section-label" style={{ color: '#fff', background: 'rgba(255,255,255,0.18)' }}>
            ⚙️ Settings
          </span>
          <h1 className="settings__title">Account Settings</h1>
          <p className="settings__subtitle">Manage your preferences, profile, and notifications.</p>
        </div>
      </div>

      <div className="container settings__body">

        {/* ── Theme Preferences ── */}
        <SettingsSection icon="🎨" title="Theme Preferences">
          <div className="settings__theme-grid">
            <button
              className={`settings__theme-option ${!darkMode ? 'settings__theme-option--active' : ''}`}
              onClick={() => { if (darkMode) toggleTheme() }}
              aria-pressed={!darkMode}
            >
              <div className="settings__theme-preview settings__theme-preview--light">
                <div className="settings__theme-preview-nav" />
                <div className="settings__theme-preview-body">
                  <div className="settings__theme-preview-card" />
                  <div className="settings__theme-preview-card" />
                </div>
              </div>
              <span className="settings__theme-label">☀️ Light Mode</span>
              {!darkMode && <span className="settings__theme-badge">Active</span>}
            </button>

            <button
              className={`settings__theme-option ${darkMode ? 'settings__theme-option--active' : ''}`}
              onClick={() => { if (!darkMode) toggleTheme() }}
              aria-pressed={darkMode}
            >
              <div className="settings__theme-preview settings__theme-preview--dark">
                <div className="settings__theme-preview-nav" />
                <div className="settings__theme-preview-body">
                  <div className="settings__theme-preview-card" />
                  <div className="settings__theme-preview-card" />
                </div>
              </div>
              <span className="settings__theme-label">🌙 Dark Mode</span>
              {darkMode && <span className="settings__theme-badge">Active</span>}
            </button>
          </div>

          <p className="settings__hint">
            Your theme preference is automatically saved and persisted across sessions.
          </p>
        </SettingsSection>

        {/* ── Profile Placeholder ── */}
        <SettingsSection icon="👤" title="Profile">
          <div className="settings__profile-top">
            <div className="settings__avatar">
              <span className="settings__avatar-text">
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              <button className="settings__avatar-change" aria-label="Change avatar">📷</button>
            </div>
            <div className="settings__profile-info">
              <h3 className="settings__profile-name">{profile.name}</h3>
              <p className="settings__profile-email">{profile.email}</p>
              <span className="badge badge--success">Verified Host</span>
            </div>
          </div>

          <form className="settings__profile-form" onSubmit={handleProfileSave}>
            <div className="settings__form-row">
              <div className="settings__form-group">
                <label className="settings__form-label" htmlFor="settings-name">Full Name</label>
                <input
                  id="settings-name"
                  type="text"
                  className="settings__form-input"
                  value={profile.name}
                  onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              <div className="settings__form-group">
                <label className="settings__form-label" htmlFor="settings-email">Email Address</label>
                <input
                  id="settings-email"
                  type="email"
                  className="settings__form-input"
                  value={profile.email}
                  onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="settings__form-row">
              <div className="settings__form-group">
                <label className="settings__form-label" htmlFor="settings-phone">Phone Number</label>
                <input
                  id="settings-phone"
                  type="tel"
                  className="settings__form-input"
                  value={profile.phone}
                  onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="settings__form-group">
                <label className="settings__form-label" htmlFor="settings-bio">Short Bio</label>
                <input
                  id="settings-bio"
                  type="text"
                  className="settings__form-input"
                  value={profile.bio}
                  onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Eco-travel enthusiast…"
                />
              </div>
            </div>

            <div className="settings__form-actions">
              <Button type="submit" variant="primary" size="md">Save Profile</Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => toast.info('Changes discarded')}
              >
                Discard Changes
              </Button>
            </div>
          </form>
        </SettingsSection>

        {/* ── Notification Preferences ── */}
        <SettingsSection icon="🔔" title="Notification Preferences">
          <div className="settings__toggles">
            <Toggle
              checked={notifications.bookingConfirm}
              onChange={() => { toggleNotif('bookingConfirm'); toast.info('Booking notifications updated') }}
              label="Booking Confirmations"
              description="Get notified when a booking is confirmed or cancelled."
            />
            <Toggle
              checked={notifications.newMessages}
              onChange={() => { toggleNotif('newMessages'); toast.info('Message notifications updated') }}
              label="New Messages"
              description="Receive alerts when guests send you a message."
            />
            <Toggle
              checked={notifications.priceAlerts}
              onChange={() => { toggleNotif('priceAlerts'); toast.info('Price alert preference saved') }}
              label="Price Drop Alerts"
              description="Be notified when your wishlisted properties drop in price."
            />
            <Toggle
              checked={notifications.newsletter}
              onChange={() => { toggleNotif('newsletter'); toast.info('Newsletter preference saved') }}
              label="Weekly Newsletter"
              description="Curated eco-travel tips and new destination highlights."
            />
            <Toggle
              checked={notifications.smsAlerts}
              onChange={() => { toggleNotif('smsAlerts'); toast.info('SMS alerts preference saved') }}
              label="SMS Alerts"
              description="Urgent booking alerts via text message."
            />
          </div>
        </SettingsSection>

        {/* ── Danger Zone ── */}
        <SettingsSection icon="⚠️" title="Account Actions">
          <div className="settings__danger-zone">
            <div className="settings__danger-item">
              <div>
                <p className="settings__danger-label">Change Password</p>
                <p className="settings__danger-desc">Update your account password.</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast.info('Password reset email sent!')}>
                Change Password
              </Button>
            </div>
            <div className="settings__danger-item settings__danger-item--red">
              <div>
                <p className="settings__danger-label">Delete Account</p>
                <p className="settings__danger-desc">Permanently remove your account and all data.</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast.error('Account deletion requires confirmation.')}>
                Delete Account
              </Button>
            </div>
          </div>
        </SettingsSection>

      </div>
    </div>
  )
}

export default Settings
