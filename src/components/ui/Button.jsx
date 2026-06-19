import './Button.css'

/**
 * Reusable Button Component
 * @param {string} variant - 'primary' | 'secondary' | 'outline'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} disabled
 * @param {boolean} loading
 * @param {function} onClick
 * @param {string} type
 * @param {ReactNode} children
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`ui-btn ui-btn--${variant} ui-btn--${size} ${loading ? 'ui-btn--loading' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className="ui-btn__spinner" aria-hidden="true" />}
      <span className={loading ? 'ui-btn__label--hidden' : ''}>{children}</span>
      {loading && <span className="ui-btn__loading-text">Loading…</span>}
    </button>
  )
}

export default Button
