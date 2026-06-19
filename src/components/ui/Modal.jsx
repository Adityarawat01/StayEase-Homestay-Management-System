import { useEffect, useRef, useCallback } from 'react'
import './Modal.css'

/**
 * Accessible Modal Component
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {string} title
 * @param {ReactNode} children
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Store the element that triggered the modal so we can return focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      // Focus trapping
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) { e.preventDefault(); return }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus first focusable element when modal opens; restore focus on close
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusable = modalRef.current.querySelector(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable) setTimeout(() => focusable.focus(), 50)
    } else if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleOverlayClick = useCallback((e) => {
    if (e.target === overlayRef.current) onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`modal-box modal-box--${size}`} ref={modalRef}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
