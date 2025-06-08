import React, { createContext, useContext } from 'react'
import { useAuth } from '../hooks/useAuth'

// Create the authentication context
const AuthContext = createContext({})

/**
 * Authentication Context Provider
 * Wraps the app and provides authentication state and functions
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use the authentication context
 * Must be used within an AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  
  return context
}

/**
 * Higher-order component for protecting routes
 * Redirects to login if user is not authenticated
 */
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, loading } = useAuthContext()

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="card text-center max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access this page.
            </p>
            <button className="btn btn-primary">
              Sign In
            </button>
          </div>
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }
}
