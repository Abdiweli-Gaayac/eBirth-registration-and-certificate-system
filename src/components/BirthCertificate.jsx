import { useState } from 'react'

const BirthCertificate = ({ application }) => {
  const [showCertificate, setShowCertificate] = useState(false)

  // Generate Certificate Number
  const generateCertificateNumber = (applicationId) => {
    // Use application ID as base and format as certificate number
    const baseNumber = applicationId.replace('BR-', 'BC-')
    return baseNumber
  }

  // Get Issue Date (1 minute after submission for demo, or 3 days in production)
  const getIssueDate = () => {
    const submittedDate = new Date(application.submittedAt)
    const issueDate = new Date(submittedDate)
    issueDate.setMinutes(issueDate.getMinutes() + 1) // Issue date is 1 minute after submission for demo (3 days in production)
    return issueDate
  }

  const certificateNumber = generateCertificateNumber(application.applicationId)
  const issueDate = getIssueDate()

  // Handle Print
  const handlePrint = () => {
    window.print()
  }

  // Handle Download (UI only - would need actual implementation)
  const handleDownload = () => {
    alert('Download functionality would be implemented here. Certificate would be downloaded as PDF.')
  }

  // Only show certificate if status is Approved
  if (application.status !== 'Approved') {
    return null
  }

  return (
    <div className="mt-6">
      {/* View Certificate Button */}
      {!showCertificate && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Birth Certificate Available</h3>
                <p className="text-sm text-gray-600">Your application has been approved. View your birth certificate.</p>
              </div>
            </div>
            <button
              onClick={() => setShowCertificate(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              View Certificate
            </button>
          </div>
        </div>
      )}

      {/* Certificate View */}
      {showCertificate && (
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6 certificate-print">
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mb-6 no-print">
            <button
              onClick={() => setShowCertificate(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>

          {/* Certificate Design */}
          <div className="border-4 border-blue-800 p-12 bg-gradient-to-br from-blue-50 to-white relative">
            {/* Decorative Border Top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
            
            {/* Header with Seal */}
            <div className="text-center mb-8 relative">
              
              {/* Official Seal/Emblem */}
              <div className="inline-block mb-4">
                <div className="bg-blue-800 rounded-full p-6 border-4 border-blue-600 shadow-lg">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-blue-900 mb-2 tracking-wide">
                BIRTH CERTIFICATE
              </h1>
              <div className="w-32 h-1 bg-blue-800 mx-auto mb-2"></div>
              <p className="text-lg text-gray-700 font-semibold">
                Republic of [Country Name]
              </p>
              <p className="text-sm text-gray-600 italic">
                Office of Vital Records
              </p>
            </div>

            {/* Certificate Number */}
            <div className="text-right mb-8">
              <p className="text-sm text-gray-600 mb-1">Certificate Number</p>
              <p className="text-xl font-bold text-blue-900 font-mono tracking-wider">
                {certificateNumber}
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-6 mb-8">
              {/* Introductory Text */}
              <div className="text-center mb-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  This is to certify that the following information has been recorded in the official records:
                </p>
              </div>

              {/* Child Information Section */}
              <div className="border-l-4 border-blue-800 pl-6 py-4 bg-blue-50">
                <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
                  Child Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Full Name</p>
                    <p className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1">
                      {application.childInfo.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Gender</p>
                    <p className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 capitalize">
                      {application.childInfo.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Date of Birth</p>
                    <p className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1">
                      {new Date(application.childInfo.dateOfBirth).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Place of Birth</p>
                    <p className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1">
                      {application.childInfo.placeOfBirth}
                    </p>
                  </div>
                </div>
              </div>

              {/* Parent Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father Information */}
                <div className="border-l-4 border-blue-800 pl-6 py-4 bg-blue-50">
                  <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
                    Father Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-semibold">Full Name</p>
                      <p className="text-base font-bold text-gray-900 border-b-2 border-gray-300 pb-1">
                        {application.fatherInfo.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-semibold">National ID</p>
                      <p className="text-base font-bold text-gray-900 border-b-2 border-gray-300 pb-1">
                        {application.fatherInfo.nationalId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mother Information */}
                <div className="border-l-4 border-blue-800 pl-6 py-4 bg-blue-50">
                  <h2 className="text-xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
                    Mother Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-semibold">Full Name</p>
                      <p className="text-base font-bold text-gray-900 border-b-2 border-gray-300 pb-1">
                        {application.motherInfo.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-semibold">National ID</p>
                      <p className="text-base font-bold text-gray-900 border-b-2 border-gray-300 pb-1">
                        {application.motherInfo.nationalId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Issue Date and Signature Section */}
            <div className="border-t-2 border-blue-800 pt-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Date of Issue</p>
                  <p className="text-lg font-bold text-gray-900">
                    {issueDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="mb-4">
                    <div className="border-t-2 border-gray-400 w-48 ml-auto mt-12"></div>
                    <p className="text-sm text-gray-600 mt-2">Authorized Signature</p>
                    <p className="text-xs text-gray-500">Registrar of Vital Records</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-xs text-gray-600 text-center italic">
                This is an official document issued by the Office of Vital Records. 
                This certificate is valid for all legal purposes.
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                Certificate Number: {certificateNumber} | Issue Date: {issueDate.toLocaleDateString('en-US')}
              </p>
            </div>

            {/* Decorative Border Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BirthCertificate
