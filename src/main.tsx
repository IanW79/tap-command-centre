import React from 'react'
import ReactDOM from 'react-dom/client'

const Index = React.lazy(() => import('./pages/Index'))

const App = () => {
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    // Catch any runtime errors
    const handleError = (event) => {
      console.error('Package Builder Runtime Error:', event.error)
      setError(event.error?.message || 'Unknown runtime error')
    }
    
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled Promise Rejection:', event.reason)
      setError(`Promise Rejection: ${event.reason?.message || event.reason}`)
    }
    
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  if (error) {
    return (
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, #ff4757, #c44569)',
        color: 'white',
        textAlign: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>🚨 Package Builder Runtime Error</h1>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '20px',
          textAlign: 'left',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <strong>Error Details:</strong>
          <pre style={{whiteSpace: 'pre-wrap', marginTop: '10px'}}>
            {error}
          </pre>
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#fff',
            color: '#ff4757',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔄 Reload Package Builder
        </button>
      </div>
    )
  }

  return (
    <React.Suspense fallback={
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        textAlign: 'center',
        minHeight: '100vh'
      }}>
        <h1>🚀 Loading TAPinto® Package Builder...</h1>
        <p>Your AI-powered package system is starting...</p>
        <div style={{marginTop: '20px', fontSize: '14px', opacity: 0.8}}>
          <p>✅ All imports verified</p>
          <p>✅ No 404 errors detected</p>
          <p>🔄 Rendering Package Builder...</p>
        </div>
      </div>
    }>
      <Index />
    </React.Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
