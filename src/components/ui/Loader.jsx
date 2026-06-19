import './Loader.css'

/**
 * Loader Component
 * @param {string} variant - 'spinner' | 'skeleton'
 * @param {string} size - 'sm' | 'md' | 'lg' (spinner only)
 * @param {string} text - optional text below spinner
 * @param {object} skeletonProps - { width, height, borderRadius, count } (skeleton only)
 */
function Loader({ variant = 'spinner', size = 'md', text, skeletonProps = {} }) {
  if (variant === 'skeleton') {
    const {
      width = '100%',
      height = '20px',
      borderRadius = '8px',
      count = 1,
    } = skeletonProps

    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="ui-skeleton"
            style={{ width, height, borderRadius }}
            aria-hidden="true"
          />
        ))}
      </>
    )
  }

  return (
    <div className={`ui-spinner-wrap ui-spinner-wrap--${size}`} role="status">
      <div className={`ui-spinner ui-spinner--${size}`}>
        <div className="ui-spinner__ring" />
        <div className="ui-spinner__ring ui-spinner__ring--2" />
        <div className="ui-spinner__dot" />
      </div>
      {text && <p className="ui-spinner__text">{text}</p>}
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default Loader
