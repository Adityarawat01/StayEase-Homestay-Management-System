import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (mode === 'register' && !form.name.trim()) e.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (mode === 'register' && form.confirm !== form.password) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1600)
  }

  const switchMode = (m) => {
    setMode(m)
    setErrors({})
    setSuccess(false)
    setForm({ name: '', email: '', password: '', confirm: '' })
  }

  return (
    <div className="login page-enter">
      {/* Left Panel */}
      <div className="login__left">
        <div className="login__left-bg" />
        <div className="login__left-content">
          <Link to="/" className="login__logo">
            <span>🌿</span>
            <span>Stay<strong>Ease</strong></span>
          </Link>
          <h2 className="login__left-title">
            Your eco-adventure<br />starts here.
          </h2>
          <p className="login__left-sub">
            Join thousands of conscious travellers discovering authentic homestays across India.
          </p>
          <div className="login__left-features">
            {[
              { icon: '🏡', text: '1,200+ verified eco-stays' },
              { icon: '🌿', text: '100% sustainability certified' },
              { icon: '🔒', text: 'Secure & encrypted bookings' },
              { icon: '💚', text: 'Support local communities' },
            ].map(({ icon, text }) => (
              <div key={text} className="login__left-feature">
                <span className="login__left-feature-icon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial Card */}
          <div className="login__testimonial">
            <p className="login__testimonial-text">
              "StayEase helped me find the most magical homestay in Coorg. Absolutely seamless experience!"
            </p>
            <div className="login__testimonial-author">
              <div className="login__testimonial-avatar">PS</div>
              <div>
                <strong>Priya Sharma</strong>
                <span>Mumbai · Verified Guest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login__right">
        <div className="login__form-wrap">
          {/* Mode Switcher */}
          <div className="login__switcher">
            <button
              className={`login__switch-btn ${mode === 'login' ? 'login__switch-btn--active' : ''}`}
              onClick={() => switchMode('login')}
              id="btn-login-mode"
            >
              Sign In
            </button>
            <button
              className={`login__switch-btn ${mode === 'register' ? 'login__switch-btn--active' : ''}`}
              onClick={() => switchMode('register')}
              id="btn-register-mode"
            >
              Register
            </button>
          </div>

          {success ? (
            <div className="login__success animate-fadeInUp">
              <div className="login__success-icon">
                {mode === 'login' ? '🎉' : '✅'}
              </div>
              <h3 className="login__success-title">
                {mode === 'login' ? 'Welcome back!' : 'Account Created!'}
              </h3>
              <p className="login__success-text">
                {mode === 'login'
                  ? 'You have successfully signed in to StayEase.'
                  : 'Your account has been created. Start exploring eco-stays!'}
              </p>
              <Link to="/listings" className="btn btn-primary login__success-cta">
                Explore Stays →
              </Link>
              <button className="login__success-back" onClick={() => setSuccess(false)}>
                ← Back to {mode === 'login' ? 'Sign In' : 'Register'}
              </button>
            </div>
          ) : (
            <>
              <div className="login__header">
                <h1 className="login__title">
                  {mode === 'login' ? 'Welcome back 👋' : 'Create account 🌿'}
                </h1>
                <p className="login__subtitle">
                  {mode === 'login'
                    ? 'Sign in to manage your bookings and wishlists.'
                    : 'Join the StayEase community today. It\'s free!'}
                </p>
              </div>

              <form className="login__form" onSubmit={handleSubmit} noValidate>
                {/* Social Login */}
                <div className="login__social">
                  <button type="button" className="login__social-btn" id="btn-google-auth">
                    <span className="login__social-icon">🔵</span> Continue with Google
                  </button>
                  <button type="button" className="login__social-btn" id="btn-github-auth">
                    <span className="login__social-icon">⚫</span> Continue with GitHub
                  </button>
                </div>

                <div className="login__divider">
                  <span>or {mode === 'login' ? 'sign in' : 'register'} with email</span>
                </div>

                {/* Name (register only) */}
                {mode === 'register' && (
                  <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                    <label htmlFor="login-name" className="form-label">
                      <span>👤</span> Full Name
                    </label>
                    <input
                      id="login-name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Aditya Rawat"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>
                )}

                {/* Email */}
                <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
                  <label htmlFor="login-email" className="form-label">
                    <span>📧</span> Email Address
                  </label>
                  <input
                    id="login-email"
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

                {/* Password */}
                <div className={`form-group ${errors.password ? 'form-group--error' : ''}`}>
                  <label htmlFor="login-password" className="form-label">
                    <span>🔒</span> Password
                  </label>
                  <div className="login__pass-wrap">
                    <input
                      id="login-password"
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      className="form-input login__pass-input"
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    />
                    <button
                      type="button"
                      className="login__pass-toggle"
                      onClick={() => setShowPass(!showPass)}
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                    >
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.password && <p className="form-error">{errors.password}</p>}
                </div>

                {/* Confirm Password (register only) */}
                {mode === 'register' && (
                  <div className={`form-group ${errors.confirm ? 'form-group--error' : ''}`}>
                    <label htmlFor="login-confirm" className="form-label">
                      <span>🔒</span> Confirm Password
                    </label>
                    <input
                      id="login-confirm"
                      type="password"
                      name="confirm"
                      className="form-input"
                      placeholder="Repeat your password"
                      value={form.confirm}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    {errors.confirm && <p className="form-error">{errors.confirm}</p>}
                  </div>
                )}

                {/* Forgot Password (login only) */}
                {mode === 'login' && (
                  <div className="login__forgot">
                    <a href="#" className="login__forgot-link">Forgot your password?</a>
                  </div>
                )}

                {/* Terms (register) */}
                {mode === 'register' && (
                  <p className="login__terms">
                    By registering you agree to our{' '}
                    <a href="#" className="login__terms-link">Terms of Service</a> and{' '}
                    <a href="#" className="login__terms-link">Privacy Policy</a>.
                  </p>
                )}

                <button
                  type="submit"
                  id="btn-submit-auth"
                  className={`btn btn-primary login__submit ${loading ? 'login__submit--loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="booking-form__spinner" /> {mode === 'login' ? 'Signing in…' : 'Creating account…'}</>
                  ) : (
                    mode === 'login' ? '🚀 Sign In' : '🌿 Create Account'
                  )}
                </button>
              </form>

              <p className="login__switch-text">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  className="login__switch-link"
                  onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' ? 'Register here' : 'Sign in instead'}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
