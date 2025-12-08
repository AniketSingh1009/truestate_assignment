import React from 'react';

const SortDropdown = ({ sortBy, sortOrder, onChange }) => {
  const handleChange = (e) => {
    const [field, order] = e.target.value.split('-');
    onChange(field, order);
  };

  const currentValue = `${sortBy}-${sortOrder}`;

  return (
    <div className="sort-dropdown">
      <select value={currentValue} onChange={handleChange}>
        <option value="customerName-asc">Sort by: Customer Name (A-Z)</option>
        <option value="customerName-desc">Sort by: Customer Name (Z-A)</option>
        <option value="date-desc">Sort by: Date (Newest First)</option>
        <option value="date-asc">Sort by: Date (Oldest First)</option>
        <option value="quantity-desc">Sort by: Quantity (High to Low)</option>
        <option value="quantity-asc">Sort by: Quantity (Low to High)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
