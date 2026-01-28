import React from 'react'

const StatusBadge = ({ status, size = 'default', showDot = true, className = '' }) => {
  // Status configuration with colors and styles
  const statusConfig = {
    Pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      dot: 'bg-yellow-500',
      label: 'Pending'
    },
    'Under Review': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
      dot: 'bg-blue-500',
      label: 'Under Review'
    },
    Approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      dot: 'bg-green-500',
      label: 'Approved'
    }
  }

  // Get configuration for current status or default
  const config = statusConfig[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
    dot: 'bg-gray-500',
    label: status || 'Unknown'
  }

  // Size variants
  const sizeClasses = {
    small: {
      container: 'px-2 py-1 text-xs',
      dot: 'w-2 h-2',
      text: 'text-xs'
    },
    default: {
      container: 'px-4 py-2 text-sm',
      dot: 'w-3 h-3',
      text: 'text-sm'
    },
    large: {
      container: 'px-6 py-3 text-base',
      dot: 'w-4 h-4',
      text: 'text-base'
    }
  }

  const sizeConfig = sizeClasses[size] || sizeClasses.default

  return (
    <div
      className={`
        inline-flex items-center rounded-full border-2
        ${config.bg} ${config.text} ${config.border}
        ${sizeConfig.container} ${sizeConfig.text}
        font-semibold transition-all duration-200
        ${className}
      `}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {/* Status Dot */}
      {showDot && (
        <span
          className={`
            ${config.dot} rounded-full mr-2
            ${sizeConfig.dot}
          `}
          aria-hidden="true"
        />
      )}
      
      {/* Status Text */}
      <span className={sizeConfig.text}>
        {config.label}
      </span>
    </div>
  )
}

export default StatusBadge
