import { useState } from 'react'
import BirthCertificate from './BirthCertificate'

const ApplicationStatus = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('applicationId') // 'applicationId' or 'childName'
  const [application, setApplication] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Get all applications from localStorage
  const getApplications = () => {
    try {
      const stored = localStorage.getItem('birthRegistrations')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  }

  // Generate status for an application (simulated - in real app this would come from backend)
  const getApplicationStatus = (application) => {
    // Simulate status based on submission date
    const submittedDate = new Date(application.submittedAt)
    const minutesSinceSubmission = (new Date() - submittedDate) / (1000 * 60)
    
    // Updated timing for testing/demo purposes (using minutes instead of days)
    // In production, this would be days: < 1 day = Pending, 1-3 days = Under Review, 3+ days = Approved
    if (minutesSinceSubmission < 0.5) {
      // Less than 30 seconds = Pending
      return 'Pending'
    } else if (minutesSinceSubmission < 1) {
      // 30 seconds to 1 minute = Under Review
      return 'Under Review'
    } else {
      // 1+ minutes = Approved
      return 'Approved'
    }
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    setHasSearched(true)
    setNotFound(false)
    setApplication(null)

    if (!searchQuery.trim()) {
      return
    }

    const applications = getApplications()
    let found = null

    if (searchType === 'applicationId') {
      // Search by Application ID
      found = applications.find(
        (app) => app.applicationId.toLowerCase() === searchQuery.trim().toLowerCase()
      )
    } else {
      // Search by Child Name
      found = applications.find(
        (app) =>
          app.childInfo.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    }

    if (found) {
      // Add status to the application
      const applicationWithStatus = {
        ...found,
        status: getApplicationStatus(found)
      }
      setApplication(applicationWithStatus)
      setNotFound(false)
    } else {
      setApplication(null)
      setNotFound(true)
    }
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-300',
          dot: 'bg-yellow-500'
        }
      case 'Under Review':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-300',
          dot: 'bg-blue-500'
        }
      case 'Approved':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          dot: 'bg-green-500'
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-300',
          dot: 'bg-gray-500'
        }
    }
  }

  // Get progress steps
  const getProgressSteps = (status) => {
    const steps = [
      { label: 'Submitted', status: 'completed' },
      { label: 'Under Review', status: status === 'Pending' ? 'pending' : status === 'Under Review' ? 'active' : 'completed' },
      { label: 'Approved', status: status === 'Approved' ? 'completed' : 'pending' }
    ]
    return steps
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-t-lg shadow-lg border-b-4 border-blue-600 p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white rounded-full p-3 mr-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Application Status</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Check your birth registration application status</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mb-6">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                Search By
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="searchType"
                    value="applicationId"
                    checked={searchType === 'applicationId'}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Application ID</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="searchType"
                    value="childName"
                    checked={searchType === 'childName'}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Child Name</span>
                </label>
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {searchType === 'applicationId' ? 'Application ID' : 'Child Name'} <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder={searchType === 'applicationId' ? 'Enter Application ID (e.g., BR-XXXXX-XXXXX)' : 'Enter child\'s full name'}
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <>
            {/* Application Found */}
            {application && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Application Details</h2>
                  
                  {/* Status Badge */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${getStatusBadge(application.status).bg} ${getStatusBadge(application.status).text} ${getStatusBadge(application.status).border}`}>
                      <span className={`w-3 h-3 rounded-full mr-2 ${getStatusBadge(application.status).dot}`}></span>
                      <span className="font-semibold text-lg">{application.status}</span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      {getProgressSteps(application.status).map((step, index) => (
                        <div key={index} className="flex-1 flex items-center">
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              step.status === 'completed' 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : step.status === 'active'
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-gray-200 border-gray-300 text-gray-500'
                            }`}>
                              {step.status === 'completed' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="font-semibold">{index + 1}</span>
                              )}
                            </div>
                            <span className={`mt-2 text-sm font-medium ${
                              step.status === 'completed' || step.status === 'active'
                                ? 'text-gray-800'
                                : 'text-gray-500'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                          {index < getProgressSteps(application.status).length - 1 && (
                            <div className={`flex-1 h-1 mx-2 ${
                              step.status === 'completed'
                                ? 'bg-green-500'
                                : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Application ID</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-100 font-mono">{application.applicationId}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Submitted Date</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {new Date(application.submittedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Child Information */}
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Child Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Full Name</p>
                        <p className="font-medium text-gray-800">{application.childInfo.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Gender</p>
                        <p className="font-medium text-gray-800 capitalize">{application.childInfo.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                        <p className="font-medium text-gray-800">
                          {new Date(application.childInfo.dateOfBirth).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Place of Birth</p>
                        <p className="font-medium text-gray-800">{application.childInfo.placeOfBirth}</p>
                      </div>
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Father Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Full Name</p>
                          <p className="font-medium text-gray-800">{application.fatherInfo.fullName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                          <p className="font-medium text-gray-800">{application.fatherInfo.phoneNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">National ID</p>
                          <p className="font-medium text-gray-800">{application.fatherInfo.nationalId}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mother Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Full Name</p>
                          <p className="font-medium text-gray-800">{application.motherInfo.fullName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                          <p className="font-medium text-gray-800">{application.motherInfo.phoneNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">National ID</p>
                          <p className="font-medium text-gray-800">{application.motherInfo.nationalId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Birth Certificate - Only shown if Approved */}
                <BirthCertificate application={application} />
              </div>
            )}

            {/* Not Found Message */}
            {notFound && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                    <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Not Found</h2>
                  <p className="text-gray-600 mb-6">
                    We couldn't find an application matching your search criteria.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left max-w-md mx-auto">
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-800">Please check:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                      <li>Ensure the Application ID or Child Name is spelled correctly</li>
                      <li>Verify that the application was submitted successfully</li>
                      <li>Contact support if you continue to have issues</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setHasSearched(false)
                      setNotFound(false)
                    }}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 Online Birth Registration & Certificate System. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default ApplicationStatus
