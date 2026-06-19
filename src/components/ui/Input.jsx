import './Input.css'

/**
 * Reusable Input Component
 * @param {string} label
 * @param {string} placeholder
 * @param {string} type
 * @param {string} value
 * @param {function} onChange
 * @param {string} error - validation error message
 * @param {string} id
 * @param {boolean} required
 */
function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  id,
  required = false,
  className = '',
  ...rest
}) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={`ui-input-group ${error ? 'ui-input-group--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="ui-input-label">
          {label}
          {required && <span className="ui-input-required" aria-hidden="true"> *</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className="ui-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        required={required}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="ui-input-error" role="alert">
          ⚠ {error}
        </p>
      )}
    </div>
  )
}

export default Input
