import React from 'react';
const FormField = ({ field, onChange, values, errors }) => {
  // Destructure field properties for easier usage.
  const { name, label, type, options, required } = field;

  // Check if there's an error for the current field.
  const isError = errors && errors[name];

  // Handle change events and pass the new value to the parent component.
  const handleChange = (event) => {
    onChange(name, event.target.value);
  };

  return (
    <div className="mb-4">
      {/* Display the label for the field */}
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
        {/* Add an asterisk for required fields */}
      </label>

      {/* Conditionally render a dropdown or input field based on the type */}
      {type === 'dropdown' ? (
        <select
          name={name}
          value={values[name] || ''} // Set the value from props (controlled component).
          onChange={handleChange} // Update the value on selection.
          className={`p-2 border ${isError ? 'border-red-500' : 'border-gray-300'} rounded`}
        >
          {/* Default option prompting the user to select */}
          <option value="">Select {label}</option>
          {/* Dynamically generate dropdown options */}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        // Render input field for other types like text, number, password, etc.
        <input
          type={type}
          name={name}
          value={values[name] || ''} // Set the current value from props.
          onChange={handleChange} // Update the value on user input.
          className={`p-2 border ${isError ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
      )}

      {/* Display an error message if there's a validation error */}
      {isError && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );
};

export default FormField;
