import React from 'react'

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  error = '',
  required = false,
  placeholder = '',
  id,
  name,
  className = '',
  disabled = false,
  ...otherProps
}) => {
  // Generate unique ID if not provided
  const inputId = id || name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Field */}
      <input
        type={type}
        id={inputId}
        name={name || inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-lg 
          focus:ring-2 focus:outline-none transition
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
          ${disabled
            ? 'bg-gray-100 cursor-not-allowed opacity-60'
            : 'bg-white'
          }
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...otherProps}
      />

      {/* Error Message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default InputField
