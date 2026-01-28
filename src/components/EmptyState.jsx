import React from 'react'

const EmptyState = ({
  type = 'default',
  title,
  message,
  icon,
  actionLabel,
  onAction,
  className = ''
}) => {
  // Predefined configurations for common empty states
  const emptyStateConfigs = {
    'certificate-not-found': {
      title: 'Certificate Not Found',
      message: 'We couldn\'t find a certificate matching your search criteria.',
      icon: (
        <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      suggestions: [
        'Ensure the certificate number or child name is spelled correctly',
        'Verify that the certificate was issued successfully',
        'Contact support if you continue to have issues'
      ]
    },
    'application-not-approved': {
      title: 'Application Not Approved Yet',
      message: 'Your application is still being processed. The certificate will be available once your application is approved.',
      icon: (
        <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      suggestions: [
        'Your application is currently under review',
        'Certificates are only issued for approved applications',
        'You can check your application status anytime'
      ]
    },
    'no-results': {
      title: 'No Results Found',
      message: 'We couldn\'t find any results matching your search criteria.',
      icon: (
        <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      suggestions: [
        'Try adjusting your search criteria',
        'Check for spelling errors',
        'Use different keywords'
      ]
    },
    default: {
      title: 'No Data Available',
      message: 'There is no data to display at this time.',
      icon: (
        <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      suggestions: []
    }
  }

  // Get configuration based on type or use custom props
  const config = emptyStateConfigs[type] || emptyStateConfigs.default
  const displayTitle = title || config.title
  const displayMessage = message || config.message
  const displayIcon = icon || config.icon
  const suggestions = config.suggestions || []

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {/* Icon */}
      <div className="mb-6">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gray-100">
          {displayIcon}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        {displayTitle}
      </h2>

      {/* Message */}
      <p className="text-gray-600 mb-6 text-center max-w-md">
        {displayMessage}
      </p>

      {/* Suggestions List (if available) */}
      {suggestions.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong className="text-blue-800">Please note:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Button (if provided) */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
