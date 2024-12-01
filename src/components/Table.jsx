import React from 'react';

/**
 * A reusable table component for displaying data with edit and delete actions.
 *
 * Props:
 * - data: Array of objects, each containing `name` and `value` properties to be displayed in the table.
 * - onEdit: Function to handle the edit action for a specific row, identified by its index.
 * - onDelete: Function to handle the delete action for a specific row, identified by its index.
 */
const Table = ({ data, onEdit, onDelete }) => {
  return (
    // Wrapper div to enable horizontal scrolling for tables that overflow the container.
    <div className="overflow-x-auto mt-8">
      {/* Table with minimal styling */}
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        {/* Table header */}
        <thead>
          <tr>
            {/* Column headers for Name, Value, and Actions */}
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Value</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        
        {/* Table body */}
        <tbody>
          {/* Dynamically render rows based on the `data` prop */}
          {data.map((row, index) => (
            <tr key={index}>
              {/* Display the 'name' property of the current row */}
              <td className="px-4 py-2 border-b">{row.name}</td>
              {/* Display the 'value' property of the current row */}
              <td className="px-4 py-2 border-b">{row.value}</td>
              {/* Action buttons for editing and deleting */}
              <td className="px-4 py-2 border-b">
                {/* Edit button triggers the `onEdit` function with the row index */}
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => onEdit(index)}
                >
                  Edit
                </button>
                {/* Delete button triggers the `onDelete` function with the row index */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
