import { useState } from 'react'
import './styles/global.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <header style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
          QuickVendor
        </h1>
        <p style={{ color: 'var(--secondary-color)' }}>
          Modern Vendor Management System
        </p>
      </header>
      
      <main>
        <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Welcome to QuickVendor</h2>
          <p style={{ margin: '1rem 0', color: 'var(--secondary-color)' }}>
            Your comprehensive solution for vendor management
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setCount((count) => count + 1)}
          >
            Get Started (clicked {count} times)
          </button>
        </div>
        
        <div className="card">
          <h3>Features</h3>
          <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
            <li>Vendor Registration & Management</li>
            <li>Real-time Dashboard</li>
            <li>Payment Processing</li>
            <li>Analytics & Reporting</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
