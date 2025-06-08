import { Link } from 'react-router-dom'
import { 
  formatCurrency, 
  formatPhone, 
  formatInitials,
  formatAddress 
} from '../../utils/formatters'
import { 
  VENDOR_STATUS_LABELS, 
  VENDOR_STATUS_COLORS 
} from '../../utils/constants'

export const VendorCard = ({ vendor, onEdit, onDelete, onView }) => {
  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit?.(vendor)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete?.(vendor)
  }

  const handleView = () => {
    onView?.(vendor)
  }

  const statusColor = VENDOR_STATUS_COLORS[vendor.status] || 'bg-gray-100 text-gray-800'

  return (
    <div 
      className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleView}
    >
      {/* Header with vendor info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Vendor Avatar */}
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {formatInitials(vendor.name)}
            </span>
          </div>
          
          {/* Vendor Name and Category */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {vendor.name}
            </h3>
            {vendor.category && (
              <p className="text-sm text-gray-500">{vendor.category}</p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {VENDOR_STATUS_LABELS[vendor.status]}
        </span>
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mb-4">
        {vendor.email && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a 
              href={`mailto:${vendor.email}`} 
              className="hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {vendor.email}
            </a>
          </div>
        )}
        
        {vendor.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a 
              href={`tel:${vendor.phone}`} 
              className="hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {formatPhone(vendor.phone)}
            </a>
          </div>
        )}
        
        {(vendor.address || vendor.city || vendor.state) && (
          <div className="flex items-start text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{formatAddress(vendor)}</span>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">
            {vendor.total_orders || 0}
          </p>
          <p className="text-xs text-gray-500">Orders</p>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">
            {formatCurrency(vendor.total_spent || 0)}
          </p>
          <p className="text-xs text-gray-500">Total Spent</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-800">
              {(vendor.rating || 0).toFixed(1)}
            </span>
            <svg className="w-4 h-4 ml-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={handleView}
          className="flex-1 btn btn-secondary text-xs py-2"
        >
          View Details
        </button>
        
        {onEdit && (
          <button
            onClick={handleEdit}
            className="px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
            title="Edit Vendor"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        
        {onDelete && (
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
            title="Delete Vendor"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
