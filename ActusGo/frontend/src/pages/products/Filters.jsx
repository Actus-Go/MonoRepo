import React from 'react';

const Filters = ({ filters, handleFilterChange }) => {
  return (
    <div className="flex gap-4 mb-4 p-2 bg-[#222222] shadow-md rounded-lg">
      <input
        type="number"
        name="price"
        placeholder="Max Price"
        value={filters.price}
        onChange={handleFilterChange}
        className="border rounded p-2 focus:outline-none focus:ring-2 bg-[#222222] focus:ring-blue-800"
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
        className="border rounded p-2 focus:outline-none focus:ring-2 bg-[#222222] focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Accessories">Accessories</option>
      </select>
      <input
        type="number"
        name="deliveryFee"
        placeholder="Max Delivery Fee"
        value={filters.deliveryFee}
        onChange={handleFilterChange}
        className="border rounded p-2 focus:outline-none focus:ring-2 bg-[#222222] focus:ring-blue-500"
      />
    </div>
  );
};

export default Filters;
