import { useState } from 'react'

const BirthRegistrationForm = () => {
  // Child Information State
  const [childInfo, setChildInfo] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    placeOfBirth: ''
  })

  // Father Information State
  const [fatherInfo, setFatherInfo] = useState({
    fullName: '',
    phoneNumber: '',
    nationalId: ''
  })

  // Mother Information State
  const [motherInfo, setMotherInfo] = useState({
    fullName: '',
    phoneNumber: '',
    nationalId: ''
  })

  // Validation Errors State
  const [errors, setErrors] = useState({
    childFullName: '',
    childGender: '',
    childDateOfBirth: '',
    childPlaceOfBirth: '',
    fatherFullName: '',
    fatherPhoneNumber: '',
    fatherNationalId: '',
    motherFullName: '',
    motherPhoneNumber: '',
    motherNationalId: ''
  })

  // Success State
  const [showSuccess, setShowSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState('')

  // Validation Functions
  const validateRequired = (value) => {
    return value.trim() !== ''
  }

  const validateDateOfBirth = (date) => {
    if (!date) return false
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate <= today
  }

  const validatePhoneNumber = (phone) => {
    if (!phone) return false
    // Remove spaces, dashes, and parentheses for validation
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '')
    return /^\d+$/.test(cleanedPhone) && cleanedPhone.length > 0
  }

  // Validate Child Information
  const validateChildField = (name, value) => {
    let error = ''
    let errorKey = ''
    
    switch (name) {
      case 'fullName':
        errorKey = 'childFullName'
        if (!validateRequired(value)) {
          error = 'Full name is required'
        }
        break
      case 'gender':
        errorKey = 'childGender'
        if (!validateRequired(value)) {
          error = 'Gender is required'
        }
        break
      case 'dateOfBirth':
        errorKey = 'childDateOfBirth'
        if (!validateRequired(value)) {
          error = 'Date of birth is required'
        } else if (!validateDateOfBirth(value)) {
          error = 'Date of birth cannot be in the future'
        }
        break
      case 'placeOfBirth':
        errorKey = 'childPlaceOfBirth'
        if (!validateRequired(value)) {
          error = 'Place of birth is required'
        }
        break
      default:
        break
    }
    
    if (errorKey) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: error
      }))
    }
  }

  // Validate Father Information
  const validateFatherField = (name, value) => {
    let error = ''
    let errorKey = ''
    
    switch (name) {
      case 'fullName':
        errorKey = 'fatherFullName'
        if (!validateRequired(value)) {
          error = 'Full name is required'
        }
        break
      case 'phoneNumber':
        errorKey = 'fatherPhoneNumber'
        if (!validateRequired(value)) {
          error = 'Phone number is required'
        } else if (!validatePhoneNumber(value)) {
          error = 'Phone number must be numeric'
        }
        break
      case 'nationalId':
        errorKey = 'fatherNationalId'
        if (!validateRequired(value)) {
          error = 'National ID is required'
        }
        break
      default:
        break
    }
    
    if (errorKey) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: error
      }))
    }
  }

  // Validate Mother Information
  const validateMotherField = (name, value) => {
    let error = ''
    let errorKey = ''
    
    switch (name) {
      case 'fullName':
        errorKey = 'motherFullName'
        if (!validateRequired(value)) {
          error = 'Full name is required'
        }
        break
      case 'phoneNumber':
        errorKey = 'motherPhoneNumber'
        if (!validateRequired(value)) {
          error = 'Phone number is required'
        } else if (!validatePhoneNumber(value)) {
          error = 'Phone number must be numeric'
        }
        break
      case 'nationalId':
        errorKey = 'motherNationalId'
        if (!validateRequired(value)) {
          error = 'National ID is required'
        }
        break
      default:
        break
    }
    
    if (errorKey) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: error
      }))
    }
  }

  // Generate Unique Application ID
  const generateApplicationId = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `BR-${timestamp}-${randomStr}`
  }

  // Save to localStorage
  const saveToLocalStorage = (appId, formData) => {
    const applicationData = {
      applicationId: appId,
      ...formData,
      submittedAt: new Date().toISOString()
    }
    
    // Get existing applications or initialize empty array
    const existingApplications = JSON.parse(localStorage.getItem('birthRegistrations') || '[]')
    
    // Add new application
    existingApplications.push(applicationData)
    
    // Save back to localStorage
    localStorage.setItem('birthRegistrations', JSON.stringify(existingApplications))
  }

  // Check if form is valid
  const isFormValid = () => {
    return (
      validateRequired(childInfo.fullName) &&
      validateRequired(childInfo.gender) &&
      validateRequired(childInfo.dateOfBirth) &&
      validateDateOfBirth(childInfo.dateOfBirth) &&
      validateRequired(childInfo.placeOfBirth) &&
      validateRequired(fatherInfo.fullName) &&
      validateRequired(fatherInfo.phoneNumber) &&
      validatePhoneNumber(fatherInfo.phoneNumber) &&
      validateRequired(fatherInfo.nationalId) &&
      validateRequired(motherInfo.fullName) &&
      validateRequired(motherInfo.phoneNumber) &&
      validatePhoneNumber(motherInfo.phoneNumber) &&
      validateRequired(motherInfo.nationalId)
    )
  }

  // Handle Child Information Changes
  const handleChildInfoChange = (e) => {
    const { name, value } = e.target
    setChildInfo(prev => ({
      ...prev,
      [name]: value
    }))
    // Validate on change
    validateChildField(name, value)
  }

  // Handle Father Information Changes
  const handleFatherInfoChange = (e) => {
    const { name, value } = e.target
    setFatherInfo(prev => ({
      ...prev,
      [name]: value
    }))
    // Validate on change
    validateFatherField(name, value)
  }

  // Handle Mother Information Changes
  const handleMotherInfoChange = (e) => {
    const { name, value } = e.target
    setMotherInfo(prev => ({
      ...prev,
      [name]: value
    }))
    // Validate on change
    validateMotherField(name, value)
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields before submission
    validateChildField('fullName', childInfo.fullName)
    validateChildField('gender', childInfo.gender)
    validateChildField('dateOfBirth', childInfo.dateOfBirth)
    validateChildField('placeOfBirth', childInfo.placeOfBirth)
    validateFatherField('fullName', fatherInfo.fullName)
    validateFatherField('phoneNumber', fatherInfo.phoneNumber)
    validateFatherField('nationalId', fatherInfo.nationalId)
    validateMotherField('fullName', motherInfo.fullName)
    validateMotherField('phoneNumber', motherInfo.phoneNumber)
    validateMotherField('nationalId', motherInfo.nationalId)
    
    // Check if form is valid
    if (!isFormValid()) {
      return
    }
    
    // Generate unique Application ID
    const appId = generateApplicationId()
    
    // Prepare form data
    const formData = {
      childInfo,
      fatherInfo,
      motherInfo
    }
    
    // Save to localStorage
    saveToLocalStorage(appId, formData)
    
    // Set success state
    setApplicationId(appId)
    setShowSuccess(true)
    
    // Reset form after successful submission
    handleReset()
  }

  // Handle Form Reset
  const handleReset = () => {
    setChildInfo({ fullName: '', gender: '', dateOfBirth: '', placeOfBirth: '' })
    setFatherInfo({ fullName: '', phoneNumber: '', nationalId: '' })
    setMotherInfo({ fullName: '', phoneNumber: '', nationalId: '' })
    setErrors({
      childFullName: '',
      childGender: '',
      childDateOfBirth: '',
      childPlaceOfBirth: '',
      fatherFullName: '',
      fatherPhoneNumber: '',
      fatherNationalId: '',
      motherFullName: '',
      motherPhoneNumber: '',
      motherNationalId: ''
    })
  }

  // Close Success Message
  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setApplicationId('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-fade-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">Your birth registration has been submitted successfully.</p>
              
              {/* Application ID */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Your Application ID:</p>
                <p className="text-2xl font-bold text-blue-600 font-mono tracking-wider">{applicationId}</p>
              </div>
              
              {/* Important Note */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
                <p className="text-sm text-gray-700">
                  <strong className="text-yellow-800">Important:</strong> Please save this Application ID for future reference. You will need it to track your application status.
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={handleCloseSuccess}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-lg border-b-4 border-blue-600 p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 text-white rounded-full p-3 mr-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Birth Registration Form</h1>
              <p className="text-gray-600 mt-1">Online Birth Registration & Certificate System</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Child Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6 pb-3 border-b-2 border-blue-600">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 font-bold">
                1
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Child Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label htmlFor="childFullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="childFullName"
                  name="fullName"
                  value={childInfo.fullName}
                  onChange={handleChildInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.childFullName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter child's full name"
                />
                {errors.childFullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.childFullName}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="childGender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="childGender"
                  name="gender"
                  value={childInfo.gender}
                  onChange={handleChildInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.childGender 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.childGender && (
                  <p className="mt-1 text-sm text-red-600">{errors.childGender}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="childDateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="childDateOfBirth"
                  name="dateOfBirth"
                  value={childInfo.dateOfBirth}
                  onChange={handleChildInfoChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.childDateOfBirth 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {errors.childDateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.childDateOfBirth}</p>
                )}
              </div>

              {/* Place of Birth */}
              <div className="md:col-span-2">
                <label htmlFor="childPlaceOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="childPlaceOfBirth"
                  name="placeOfBirth"
                  value={childInfo.placeOfBirth}
                  onChange={handleChildInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.childPlaceOfBirth 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter place of birth (e.g., Hospital name, City)"
                />
                {errors.childPlaceOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.childPlaceOfBirth}</p>
                )}
              </div>
            </div>
          </div>

          {/* Father Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6 pb-3 border-b-2 border-blue-600">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 font-bold">
                2
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Father Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label htmlFor="fatherFullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fatherFullName"
                  name="fullName"
                  value={fatherInfo.fullName}
                  onChange={handleFatherInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.fatherFullName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter father's full name"
                />
                {errors.fatherFullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fatherFullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="fatherPhoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="fatherPhoneNumber"
                  name="phoneNumber"
                  value={fatherInfo.phoneNumber}
                  onChange={handleFatherInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.fatherPhoneNumber 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.fatherPhoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.fatherPhoneNumber}</p>
                )}
              </div>

              {/* National ID */}
              <div>
                <label htmlFor="fatherNationalId" className="block text-sm font-medium text-gray-700 mb-2">
                  National ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fatherNationalId"
                  name="nationalId"
                  value={fatherInfo.nationalId}
                  onChange={handleFatherInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.fatherNationalId 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter national ID number"
                />
                {errors.fatherNationalId && (
                  <p className="mt-1 text-sm text-red-600">{errors.fatherNationalId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Mother Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6 pb-3 border-b-2 border-blue-600">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 font-bold">
                3
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Mother Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label htmlFor="motherFullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="motherFullName"
                  name="fullName"
                  value={motherInfo.fullName}
                  onChange={handleMotherInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.motherFullName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter mother's full name"
                />
                {errors.motherFullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.motherFullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="motherPhoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="motherPhoneNumber"
                  name="phoneNumber"
                  value={motherInfo.phoneNumber}
                  onChange={handleMotherInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.motherPhoneNumber 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.motherPhoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.motherPhoneNumber}</p>
                )}
              </div>

              {/* National ID */}
              <div>
                <label htmlFor="motherNationalId" className="block text-sm font-medium text-gray-700 mb-2">
                  National ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="motherNationalId"
                  name="nationalId"
                  value={motherInfo.nationalId}
                  onChange={handleMotherInfoChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                    errors.motherNationalId 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter national ID number"
                />
                {errors.motherNationalId && (
                  <p className="mt-1 text-sm text-red-600">{errors.motherNationalId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-8 py-3 rounded-lg font-semibold transition duration-200 shadow-md ${
                isFormValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Registration
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>© 2025 Online Birth Registration & Certificate System. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default BirthRegistrationForm
