import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            QuickVendor
          </h1>
          <p className="text-xl text-gray-600">
            Modern Vendor Management System
          </p>
        </header>
        
        <main className="space-y-8">
          <div className="card text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to QuickVendor
            </h2>
            <p className="text-gray-600 mb-6">
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
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Vendor Registration & Management
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Real-time Dashboard
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Payment Processing
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Analytics & Reporting
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
