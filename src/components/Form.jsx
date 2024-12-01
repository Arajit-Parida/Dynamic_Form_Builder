import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import ProgressBar from './ProgressBar';

const Form = () => {
  // State variables for managing form data, selected form type, and progress.
  const [formData, setFormData] = useState({}); // Stores the current form input values.
  const [fields, setFields] = useState([]); // Stores the fields for the selected form type.
  const [selectedForm, setSelectedForm] = useState(''); // Tracks the currently selected form type.
  const [progress, setProgress] = useState(0); // Tracks the form completion progress.
  const [submittedData, setSubmittedData] = useState([]); // Stores all submitted data.
  const [errors, setErrors] = useState({}); // Tracks validation errors for form inputs.

  // Function to handle form type selection and dynamically set fields.
  const handleFormSelection = (event) => {
    const formType = event.target.value;
    setSelectedForm(formType); // Update the selected form type.
    if (formType === 'User Information') {
      setFields([
        { name: 'firstName', type: 'text', label: 'First Name', required: true },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true },
        { name: 'age', type: 'number', label: 'Age', required: false },
      ]);
    } else if (formType === 'Address Information') {
      setFields([
        { name: 'street', type: 'text', label: 'Street', required: true },
        { name: 'city', type: 'text', label: 'City', required: true },
        { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York'], required: true },
        { name: 'zipCode', type: 'text', label: 'Zip Code', required: false },
      ]);
    } else if (formType === 'Payment Information') {
      setFields([
        { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
        { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
        { name: 'cvv', type: 'password', label: 'CVV', required: true },
        { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true },
      ]);
    }
  };

  // Function to handle changes in form field inputs.
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field's value in the form data.
    }));
  };

  // Function to handle form submission and validate inputs.
  const handleSubmit = () => {
    const validationErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = `${field.label} is required`; // Add validation error for missing required fields.
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors in state.
    } else {
      // Store the submitted form data and reset the form.
      setSubmittedData((prevData) => [
        ...prevData,
        { formType: selectedForm, data: formData },
      ]);
      setFormData({}); // Clear form inputs.
      setErrors({}); // Clear errors.
      setSelectedForm(''); // Reset selected form.
      alert('Form Submitted Successfully');
    }
  };

  // Function to reset all submitted data.
  const handleReset = () => {
    setSubmittedData([]);
  };

  // Function to calculate the completion progress of the form.
  const calculateProgress = () => {
    const filledFields = Object.keys(formData).length; // Count filled fields.
    const totalFields = fields.length; // Count total fields.
    return (filledFields / totalFields) * 100; // Calculate percentage.
  };

  // useEffect to update progress whenever `formData` or `fields` changes.
  useEffect(() => {
    setProgress(calculateProgress());
  }, [formData, fields]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      {/* Main container with gradient background and centered content */}
      <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg grid md:grid-cols-2 gap-8 border-4 border-indigo-500">
        
        {/* Left Section: Form Type Selection and Form Fields */}
        <div className="flex flex-col justify-center items-center p-4 border-r-4 border-indigo-500 hover:bg-blue-100 transition-all duration-300 rounded-l-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Select a Form Type</h2>
          {/* Dropdown for selecting form type */}
          <select
            onChange={handleFormSelection}
            className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedForm}
          >
            <option value="">Select Form Type</option>
            <option value="User Information">User Information</option>
            <option value="Address Information">Address Information</option>
            <option value="Payment Information">Payment Information</option>
          </select>

          <div className="mb-4">
            <ProgressBar progress={progress} />
            {/* Displays progress bar */}
          </div>

          {/* Dynamically render form fields based on selected form type */}
          {fields.length > 0 && (
            <form className="space-y-4 w-full max-w-md">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  onChange={handleInputChange}
                  values={formData}
                  errors={errors}
                />
              ))}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Section: Display Submitted Data */}
        <div className="flex flex-col justify-center items-center p-4 hover:bg-purple-100 transition-all duration-300 rounded-r-lg">
          <h3 className="text-xl font-bold text-purple-600 mb-4">Submitted Data</h3>
          {submittedData.length > 0 ? (
            <div className="w-full mb-4">
              <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
                {/* Table to display submitted form data */}
                <thead>
                  <tr>
                    <th className="border p-2 text-blue-600">Form Type</th>
                    <th className="border p-2 text-blue-600">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((data, index) => (
                    <tr key={index}>
                      <td className="border p-2">{data.formType}</td>
                      <td className="border p-2">
                        {/* Render submitted data as key-value pairs */}
                        {Object.keys(data.data).map((key) => (
                          <div key={key}>
                            <strong>{key}:</strong> {data.data[key]}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center">
                <button
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300"
                  onClick={handleReset}
                >
                  Reset Data
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No data submitted yet.</p>
            // Placeholder message if no data is available.
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
// Exporting the Form component for use in other parts of the application.
