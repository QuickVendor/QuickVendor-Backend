import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useVendors } from '../../hooks/useVendors'
import { VENDOR_STATUSES } from '../../utils/constants'
import { formatCurrency } from '../../utils/formatters'

export const VendorStats = () => {
  const { vendors, loading } = useVendors()
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0,
    totalSpent: 0,
    totalOrders: 0,
    averageRating: 0
  })

  useEffect(() => {
    if (vendors.length > 0) {
      const newStats = {
        total: vendors.length,
        active: vendors.filter(v => v.status === VENDOR_STATUSES.ACTIVE).length,
        pending: vendors.filter(v => v.status === VENDOR_STATUSES.PENDING).length,
        inactive: vendors.filter(v => v.status === VENDOR_STATUSES.INACTIVE).length,
        totalSpent: vendors.reduce((sum, v) => sum + (v.total_spent || 0), 0),
        totalOrders: vendors.reduce((sum, v) => sum + (v.total_orders || 0), 0),
        averageRating: vendors.length > 0 
          ? vendors.reduce((sum, v) => sum + (v.rating || 0), 0) / vendors.length 
          : 0
      }
      setStats(newStats)
    }
  }, [vendors])

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statItems = [
    {
      label: 'Total Vendors',
      value: stats.total,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      label: 'Active',
      value: stats.active,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Total Spent',
      value: formatCurrency(stats.totalSpent),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    }
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Vendor Overview</h3>
        <Link 
          to="/vendors" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statItems.map((item, index) => (
          <div key={index} className={`p-4 rounded-lg ${item.bgColor}`}>
            <div className="flex items-center">
              <div className={`${item.color} mr-3`}>
                {item.icon}
              </div>
              <div>
                <div className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-sm text-gray-600">
                  {item.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/vendors"
            className="btn btn-primary text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Vendor
          </Link>
          <Link
            to="/vendors?filter=pending"
            className="btn btn-secondary text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Review Pending ({stats.pending})
          </Link>
        </div>
      </div>
    </div>
  )
}
