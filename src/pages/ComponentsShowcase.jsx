import { useState } from 'react'
import { Button, Input, Modal, Loader, toast } from '../components/ui'
import { useTheme } from '../context/ThemeContext'
import './ComponentsShowcase.css'

function Section({ title, description, children }) {
  return (
    <div className="showcase__section">
      <div className="showcase__section-header">
        <h2 className="showcase__section-title">{title}</h2>
        {description && <p className="showcase__section-desc">{description}</p>}
      </div>
      <div className="showcase__demo">{children}</div>
    </div>
  )
}

function CodeChip({ code }) {
  return <code className="showcase__code">{code}</code>
}

function ComponentsShowcase() {
  const { darkMode, toggleTheme } = useTheme()
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [inputError, setInputError] = useState('')
  const [emailVal, setEmailVal] = useState('')

  const validateInput = () => {
    if (!inputVal.trim()) {
      setInputError('This field is required')
    } else if (inputVal.length < 3) {
      setInputError('Must be at least 3 characters')
    } else {
      setInputError('')
      toast.success('Input is valid! ✅')
    }
  }

  return (
    <div className="showcase page-enter">
      {/* Hero */}
      <div className="showcase__hero">
        <div className="showcase__hero-bg" />
        <div className="container showcase__hero-inner">
          <span className="section-label">🎨 Component Library</span>
          <h1 className="showcase__hero-title">UI Component Showcase</h1>
          <p className="showcase__hero-sub">
            All reusable components from <strong>src/components/ui/</strong> — live demos with interactive examples.
          </p>
        </div>
      </div>

      <div className="container showcase__body">

        {/* ── BUTTON ── */}
        <Section
          title="Button"
          description="Supports primary, secondary, and outline variants with sm / md / lg sizes."
        >
          {/* Variants */}
          <div className="showcase__row">
            <div className="showcase__item">
              <p className="showcase__item-label">Variants</p>
              <div className="showcase__flex">
                <Button variant="primary" onClick={() => toast.success('Primary clicked!')}>Primary</Button>
                <Button variant="secondary" onClick={() => toast.info('Secondary clicked!')}>Secondary</Button>
                <Button variant="outline" onClick={() => toast.info('Outline clicked!')}>Outline</Button>
              </div>
            </div>

            <div className="showcase__item">
              <p className="showcase__item-label">Sizes</p>
              <div className="showcase__flex showcase__flex--center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
          </div>

          <div className="showcase__row">
            <div className="showcase__item">
              <p className="showcase__item-label">States</p>
              <div className="showcase__flex">
                <Button variant="primary" disabled>Disabled Primary</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
                <Button variant="primary" loading>Loading</Button>
              </div>
            </div>
          </div>

          <CodeChip>{`<Button variant="primary" size="md" onClick={handler}>Click Me</Button>`}</CodeChip>
        </Section>

        {/* ── INPUT ── */}
        <Section
          title="Input"
          description="Labelled inputs with validation error messages and responsive design."
        >
          <div className="showcase__row">
            <div className="showcase__item">
              <p className="showcase__item-label">Basic Input</p>
              <Input
                label="Full Name"
                placeholder="Enter your name"
                value={inputVal}
                onChange={(e) => { setInputVal(e.target.value); setInputError('') }}
                error={inputError}
                required
              />
              <div style={{ marginTop: '12px' }}>
                <Button variant="primary" size="sm" onClick={validateInput}>Validate</Button>
              </div>
            </div>

            <div className="showcase__item">
              <p className="showcase__item-label">Email Input</p>
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
              />
            </div>

            <div className="showcase__item">
              <p className="showcase__item-label">With Error</p>
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                value=""
                onChange={() => {}}
                error="Password must be at least 6 characters"
              />
            </div>
          </div>

          <CodeChip>{`<Input label="Email" type="email" value={val} onChange={fn} error={errMsg} />`}</CodeChip>
        </Section>

        {/* ── MODAL ── */}
        <Section
          title="Modal"
          description="Accessible modal with focus trapping, Escape key close, and outside-click close."
        >
          <div className="showcase__flex">
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Button variant="outline" onClick={() => setConfirmModalOpen(true)}>Confirm Dialog</Button>
          </div>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="🌿 Welcome to StayEase">
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
              This is a fully accessible modal. Try pressing <kbd style={{ background: 'var(--color-surface-2)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.85em' }}>Esc</kbd> to close,
              or click outside the dialog. Focus is trapped inside for screen-reader accessibility.
            </p>
            <Input label="Quick Search" placeholder="Search homestays…" value="" onChange={() => {}} />
            <div className="showcase__flex" style={{ marginTop: '20px' }}>
              <Button variant="primary" onClick={() => { setModalOpen(false); toast.success('Action confirmed!') }}>Confirm</Button>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            </div>
          </Modal>

          <Modal isOpen={confirmModalOpen} onClose={() => setConfirmModalOpen(false)} title="⚠️ Confirm Action" size="sm">
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
              Are you sure you want to proceed? This action cannot be undone.
            </p>
            <div className="showcase__flex">
              <Button variant="primary" size="sm" onClick={() => { setConfirmModalOpen(false); toast.error('Item deleted!') }}>Delete</Button>
              <Button variant="secondary" size="sm" onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
            </div>
          </Modal>

          <CodeChip>{`<Modal isOpen={open} onClose={() => setOpen(false)} title="Title">Content</Modal>`}</CodeChip>
        </Section>

        {/* ── TOAST ── */}
        <Section
          title="Toast Notifications"
          description="Powered by react-hot-toast with success, error, and info variants."
        >
          <div className="showcase__flex">
            <Button variant="primary" size="sm" onClick={() => toast.success('Booking confirmed! 🎉')}>
              ✅ Success Toast
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.error('Payment failed. Please retry.')}>
              ❌ Error Toast
            </Button>
            <Button variant="secondary" size="sm" onClick={() => toast.info('New listing added to your wishlist.')}>
              ℹ️ Info Toast
            </Button>
            <Button variant="secondary" size="sm" onClick={() => {
              const id = toast.loading('Processing your booking…')
              setTimeout(() => { toast.dismiss(id); toast.success('Booking complete!') }, 2000)
            }}>
              ⏳ Loading → Done
            </Button>
          </div>

          <CodeChip>{`import { toast } from '../components/ui'\ntoast.success('Done!')\ntoast.error('Failed!')\ntoast.info('FYI!')`}</CodeChip>
        </Section>

        {/* ── LOADER ── */}
        <Section
          title="Loader"
          description="Spinner (3 sizes) and skeleton shimmer variants."
        >
          <div className="showcase__row">
            <div className="showcase__item">
              <p className="showcase__item-label">Spinner — Sizes</p>
              <div className="showcase__flex showcase__flex--center" style={{ gap: '32px', minHeight: '80px', alignItems: 'center' }}>
                <Loader variant="spinner" size="sm" />
                <Loader variant="spinner" size="md" />
                <Loader variant="spinner" size="lg" />
              </div>
            </div>

            <div className="showcase__item">
              <p className="showcase__item-label">Spinner with Text</p>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
                <Loader variant="spinner" size="md" text="Finding eco-stays…" />
              </div>
            </div>
          </div>

          <div className="showcase__item" style={{ marginTop: '24px' }}>
            <p className="showcase__item-label">Skeleton Loader</p>
            <div style={{ maxWidth: '480px' }}>
              <Loader variant="skeleton" skeletonProps={{ width: '60%', height: '24px', borderRadius: '8px', count: 1 }} />
              <Loader variant="skeleton" skeletonProps={{ width: '100%', height: '16px', borderRadius: '8px', count: 3 }} />
              <Loader variant="skeleton" skeletonProps={{ width: '100%', height: '140px', borderRadius: '14px', count: 1 }} />
            </div>
          </div>

          <CodeChip>{`<Loader variant="spinner" size="md" text="Loading…" />\n<Loader variant="skeleton" skeletonProps={{ width: '100%', height: '20px', count: 3 }} />`}</CodeChip>
        </Section>

        {/* ── THEME TOGGLE ── */}
        <Section
          title="Dark / Light Mode"
          description="Theme persisted in localStorage via ThemeContext. Toggle applies instantly across the entire app."
        >
          <div className="showcase__flex showcase__flex--center">
            <div className="showcase__theme-card">
              <div className="showcase__theme-icon">{darkMode ? '🌙' : '☀️'}</div>
              <p className="showcase__theme-label">Currently: <strong>{darkMode ? 'Dark Mode' : 'Light Mode'}</strong></p>
              <Button variant="primary" onClick={() => { toggleTheme(); toast.info(darkMode ? 'Switched to Light Mode ☀️' : 'Switched to Dark Mode 🌙') }}>
                Toggle Theme
              </Button>
            </div>
          </div>

          <CodeChip>{`const { darkMode, toggleTheme } = useTheme()\n// Theme auto-persists to localStorage`}</CodeChip>
        </Section>

      </div>
    </div>
  )
}

export default ComponentsShowcase
