import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Navbar from './components/Navbar'
import BirthRegistrationForm from './components/BirthRegistrationForm'
import ApplicationStatus from './components/ApplicationStatus'
import CertificateSearch from './components/CertificateSearch'
import { THEME_STORAGE_KEY } from './store'

function App() {
  const theme = useSelector((state) => state.ui.theme)
  const location = useLocation()

  // Apply light/dark theme class to <html> element
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Persist theme in localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  // Home page component (enhanced landing page)
  const HomePage = () => {
    const [stats, setStats] = useState(null)

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const response = await axios.get('/mock-stats.json')
          setStats(response.data)
        } catch (error) {
          console.error('Failed to load stats from mock API', error)
        }
      }

      fetchStats()
    }, [])

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-900 dark:via-gray-900 dark:to-black text-white py-20 px-4">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <div className="inline-block bg-white bg-opacity-20 rounded-full p-4 mb-6 backdrop-blur-sm">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Online Birth Registration & Certificate System
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Streamline your birth registration process with our secure, efficient, and user-friendly platform. 
                Register births, track applications, and access certificates all in one place.
              </p>
              {/* Primary actions are handled via Navbar/Routes; buttons kept for visual only */}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Why Choose Our System?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience a modern, secure, and efficient birth registration process designed for your convenience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Easy Registration</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Complete your birth registration in minutes with our intuitive, step-by-step form. 
                  All information is securely stored and validated in real-time.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-500">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Real-Time Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Monitor your application status in real-time. Get instant updates on whether your 
                  application is pending, under review, or approved.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-purple-500">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your data is protected with industry-standard security measures. All information 
                  is encrypted and stored securely, ensuring your privacy and confidentiality.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Get Started Today</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Choose an option below to begin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Register Birth Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-850 rounded-xl shadow-lg p-8 border-2 border-blue-200 dark:border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-blue-600 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Register Birth</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Submit a new birth registration application online. Fill out the form with child and parent 
                    information, and receive your unique Application ID instantly.
                  </p>
                  <ul className="text-left text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Quick and easy form
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Instant Application ID
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Real-time validation
                    </li>
                  </ul>
                  {/* Button navigations handled via Navbar routing */}
                </div>
              </div>

              {/* Check Status Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-850 rounded-xl shadow-lg p-8 border-2 border-green-200 dark:border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-green-600 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Check Status</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Track your application progress anytime. Search by Application ID or Child Name to view 
                    current status, progress indicators, and application details.
                  </p>
                  <ul className="text-left text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Search by ID or Name
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Visual progress tracking
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      View full details
                    </li>
                  </ul>
                  {/* Button navigations handled via Navbar routing */}
                </div>
              </div>

              {/* Search Certificate Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-850 rounded-xl shadow-lg p-8 border-2 border-purple-200 dark:border-gray-700 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-purple-600 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Search Certificate</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Find and view birth certificates instantly. Search by Certificate Number or Child Name 
                    to access certificate information and download official documents.
                  </p>
                  <ul className="text-left text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Quick certificate lookup
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      View certificate details
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Print & download options
                    </li>
                  </ul>
                  {/* Button navigations handled via Navbar routing */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Simple steps to complete your birth registration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Fill the Form</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete the birth registration form with child and parent information. 
                  All fields are validated in real-time.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Submit Application</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Review your information and submit. You'll receive a unique Application ID 
                  for tracking purposes.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Track Status</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor your application progress. Status updates automatically as your 
                  application moves through the review process.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Get Certificate</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Once approved, access your official birth certificate. View, print, 
                  or download as needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics/Info Section (uses Axios-loaded mock data if available) */}
        <div className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {stats ? stats.totalRegistrations : '—'}
                </div>
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Total Registrations</div>
                <p className="text-gray-600 dark:text-gray-300">Birth records handled through this system</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {stats ? stats.approvedToday : '—'}
                </div>
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Approved Today</div>
                <p className="text-gray-600 dark:text-gray-300">Certificates issued in the last 24 hours</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  {stats ? stats.pendingApplications : '—'}
                </div>
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Pending Applications</div>
                <p className="text-gray-600 dark:text-gray-300">Currently under review in the system</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100 dark:text-gray-300">
              Join thousands of families who have successfully registered births through our system. 
              Start your registration today!
            </p>
            {/* Button navigation handled via Navbar routing */}
          </div>
        </div>

        {/* Footer Info */}
        <div className="py-8 px-4 bg-gray-800 text-gray-300">
          <div className="max-w-7xl mx-auto text-center">
            <p className="mb-2">© 2025 Online Birth Registration & Certificate System. All rights reserved.</p>
            <p className="text-sm">Government-Authorized Birth Registration Platform</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Page Content via React Router */}
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/registration" element={<BirthRegistrationForm />} />
        <Route path="/status" element={<ApplicationStatus />} />
        <Route path="/certificate-search" element={<CertificateSearch />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
