/**
 * Toast Component — wrapper around react-hot-toast
 * Provides pre-configured toast helpers: toast.success, toast.error, toast.info
 * Place <Toaster /> in App.jsx (already done).
 * Import and use the helpers anywhere in the app.
 */
import { toast as hotToast } from 'react-hot-toast'

const toastBase = {
  style: {
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 500,
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-lg)',
    padding: '12px 18px',
  },
}

export const toast = {
  success: (msg, opts = {}) =>
    hotToast.success(msg, {
      ...toastBase,
      iconTheme: { primary: '#2d7a4f', secondary: '#fff' },
      ...opts,
    }),
  error: (msg, opts = {}) =>
    hotToast.error(msg, {
      ...toastBase,
      iconTheme: { primary: '#dc2626', secondary: '#fff' },
      ...opts,
    }),
  info: (msg, opts = {}) =>
    hotToast(msg, {
      ...toastBase,
      icon: 'ℹ️',
      ...opts,
    }),
  loading: (msg, opts = {}) =>
    hotToast.loading(msg, {
      ...toastBase,
      ...opts,
    }),
  dismiss: hotToast.dismiss,
}

export default toast
