import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuthContext } from './AuthProvider'

export const Layout = () => {
  const { user, isAuthenticated, signOut } = useAuthContext()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">QV</span>
              </div>
              <span className="text-xl font-bold text-gray-800">QuickVendor</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard') 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/vendors"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/vendors') 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    Vendors
                  </Link>

                  {/* User Menu */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {user?.email}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-secondary text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 QuickVendor. Built with React + Vite + Supabase.
            </div>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
