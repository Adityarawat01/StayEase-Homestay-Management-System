import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ marginBottom: '1rem', color: '#1e293b' }}>Oops! Something went wrong.</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '500px' }}>
            We're sorry, but an unexpected error occurred. This could be due to a network issue, server unavailability, or a bug.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '0.75rem 1.5rem',
              background: '#2d7a4f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '1rem'
            }}
          >
            Refresh Page
          </button>
          <a href="/" style={{ color: '#2d7a4f', textDecoration: 'underline' }}>Return to Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
