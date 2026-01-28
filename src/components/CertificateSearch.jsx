import { useState } from 'react'

const CertificateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('certificateNumber') // 'certificateNumber' or 'childName'
  const [certificate, setCertificate] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Generate Certificate Number from Application ID (same logic as BirthCertificate)
  const generateCertificateNumber = (applicationId) => {
    return applicationId.replace('BR-', 'BC-')
  }

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

  // Get application status (same logic as ApplicationStatus)
  const getApplicationStatus = (application) => {
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

  // Get Issue Date
  const getIssueDate = (submittedAt) => {
    const submittedDate = new Date(submittedAt)
    const issueDate = new Date(submittedDate)
    // Issue date is 1 minute after submission for demo (in production: 3 days)
    issueDate.setMinutes(issueDate.getMinutes() + 1)
    return issueDate
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    setHasSearched(true)
    setNotFound(false)
    setCertificate(null)

    if (!searchQuery.trim()) {
      return
    }

    const applications = getApplications()
    let found = null

    if (searchType === 'certificateNumber') {
      // Search by Certificate Number
      // Convert certificate number back to application ID format for searching
      const applicationIdFormat = searchQuery.trim().replace('BC-', 'BR-')
      
      found = applications.find(
        (app) => {
          const certNumber = generateCertificateNumber(app.applicationId)
          return certNumber.toLowerCase() === searchQuery.trim().toLowerCase() ||
                 app.applicationId.toLowerCase() === applicationIdFormat.toLowerCase()
        }
      )
    } else {
      // Search by Child Name
      found = applications.find(
        (app) =>
          app.childInfo.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    }

    if (found) {
      const status = getApplicationStatus(found)
      
      // Only show certificate if status is Approved
      if (status === 'Approved') {
        const certificateData = {
          ...found,
          status: status,
          certificateNumber: generateCertificateNumber(found.applicationId),
          issueDate: getIssueDate(found.submittedAt)
        }
        setCertificate(certificateData)
        setNotFound(false)
      } else {
        // Certificate not yet issued (status not Approved)
        setCertificate(null)
        setNotFound(true)
      }
    } else {
      setCertificate(null)
      setNotFound(true)
    }
  }

  // Navigate to status page (if using routing) or scroll to certificate
  const handleViewFullCertificate = () => {
    // In a real app, this would navigate to the certificate view
    // For now, we'll just show an alert or could integrate with ApplicationStatus
    alert('Full certificate view would be shown here. You can view it from the Application Status page.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-t-lg shadow-lg border-b-4 border-blue-600 p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white rounded-full p-3 mr-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Certificate Search</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Search for birth certificates by certificate number or child name</p>
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
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value="certificateNumber"
                    checked={searchType === 'certificateNumber'}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Certificate Number</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value="childName"
                    checked={searchType === 'childName'}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Child Name</span>
                </label>
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {searchType === 'certificateNumber' ? 'Certificate Number' : 'Child Name'} <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder={searchType === 'certificateNumber' ? 'Enter Certificate Number (e.g., BC-XXXXX-XXXXX)' : 'Enter child\'s full name'}
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
            {/* Certificate Found */}
            {certificate && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  {/* Success Header */}
                  <div className="flex items-center mb-6 pb-4 border-b-2 border-green-200">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Certificate Found</h2>
                      <p className="text-gray-600 dark:text-gray-300">Birth certificate information retrieved successfully</p>
                    </div>
                  </div>

                  {/* Certificate Summary Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Certificate Number Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-600 rounded-full p-2 mr-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Certificate Number</p>
                          <p className="text-xl font-bold text-blue-900 font-mono tracking-wider">
                            {certificate.certificateNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Issue Date Card */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-600 rounded-full p-2 mr-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Issue Date</p>
                          <p className="text-lg font-bold text-green-900">
                            {certificate.issueDate.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Child Information Card */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Child Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Full Name</p>
                        <p className="text-base font-semibold text-gray-800 dark:text-gray-100">{certificate.childInfo.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">Gender</p>
                        <p className="text-base font-semibold text-gray-800 capitalize">{certificate.childInfo.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">Date of Birth</p>
                        <p className="text-base font-semibold text-gray-800">
                          {new Date(certificate.childInfo.dateOfBirth).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1 font-medium">Place of Birth</p>
                        <p className="text-base font-semibold text-gray-800">{certificate.childInfo.placeOfBirth}</p>
                      </div>
                    </div>
                  </div>

                  {/* Parent Information Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Father Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Father
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Name</p>
                          <p className="font-medium text-gray-800">{certificate.fatherInfo.fullName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">National ID</p>
                          <p className="font-medium text-gray-800">{certificate.fatherInfo.nationalId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Mother Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mother
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Name</p>
                          <p className="font-medium text-gray-800">{certificate.motherInfo.fullName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">National ID</p>
                          <p className="font-medium text-gray-800">{certificate.motherInfo.nationalId}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setHasSearched(false)
                        setCertificate(null)
                      }}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                    >
                      New Search
                    </button>
                    <button
                      onClick={handleViewFullCertificate}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                    >
                      View Full Certificate
                    </button>
                  </div>
                </div>
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Not Found</h2>
                  <p className="text-gray-600 mb-6">
                    We couldn't find a certificate matching your search criteria.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left max-w-md mx-auto mb-6">
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-800">Possible reasons:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                      <li>The certificate number or child name may be incorrect</li>
                      <li>The certificate may not have been issued yet (application still pending or under review)</li>
                      <li>The certificate may not exist in our records</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setHasSearched(false)
                      setNotFound(false)
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
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

export default CertificateSearch
