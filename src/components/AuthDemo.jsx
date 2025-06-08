import React, { useState } from 'react'
import { useAuthContext } from './AuthProvider'
import { isSupabaseReady } from '../utils/supabase'

/**
 * Demo component showing Supabase authentication in action
 */
export const AuthDemo = () => {
  const {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated
  } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  // Show configuration message if Supabase is not ready
  if (!isSupabaseReady) {
    return (
      <div className="card max-w-2xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded mb-4">
          <h4 className="font-semibold mb-2">⚙️ Supabase Configuration Required</h4>
          <p className="text-sm mb-2">
            To test authentication, you need to add your Supabase credentials to the <code className="bg-amber-100 px-1 rounded">.env</code> file:
          </p>
          <div className="bg-amber-100 p-3 rounded text-xs font-mono">
            <div>VITE_SUPABASE_URL=https://your-project-ref.supabase.co</div>
            <div>VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here</div>
          </div>
          <p className="text-sm mt-2">
            Get these from your <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">Supabase dashboard</a> → Settings → API
          </p>
        </div>
        <div className="text-gray-600">
          <h4 className="font-semibold mb-2">📋 Steps to configure:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Create a new project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">supabase.com</a></li>
            <li>Go to Settings → API in your project dashboard</li>
            <li>Copy the Project URL and anon key</li>
            <li>Replace the placeholder values in your <code className="bg-gray-100 px-1 rounded">.env</code> file</li>
            <li>Restart the development server</li>
          </ol>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isSignUp) {
      await signUp(email, password)
    } else {
      await signIn(email, password)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome back!
        </h3>
        <div className="space-y-2 text-gray-600 mb-6">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
        <button 
          onClick={signOut}
          className="btn btn-secondary"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="card max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn btn-primary disabled:opacity-50"
        >
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {isSignUp 
            ? 'Already have an account? Sign in' 
            : "Don't have an account? Sign up"
          }
        </button>
      </div>
    </div>
  )
}
