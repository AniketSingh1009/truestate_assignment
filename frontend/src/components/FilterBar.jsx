import React, { useState, useRef, useEffect } from 'react';
import SortDropdown from './SortDropdown';

const MultiSelectDropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value) => {
    // Multi-select: toggle value in array
    const newSelected = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    onChange(newSelected);
    // Keep dropdown open for multi-select
  };

  const displayText = selected.length > 0 
    ? `${label} (${selected.length})` 
    : label;

  return (
    <div className="multi-select-wrapper" ref={dropdownRef}>
      <button 
        className="filter-select-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {displayText}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="multi-select-dropdown">
          {options?.map(option => (
            <div
              key={option}
              className={`multi-select-item ${selected.includes(option) ? 'selected' : ''}`}
              onClick={() => handleToggle(option)}
            >
              {option}
              {selected.includes(option) && <span className="check-mark">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterBar = ({ filters, filterOptions, onChange, onRefresh, sortBy, sortOrder, onSortChange }) => {
  const handleMultiSelectChange = (field, values) => {
    onChange(field, values.join(','));
  };

  const getSelectedArray = (value) => {
    return value ? value.split(',') : [];
  };

  return (
    <div className="filter-bar">
      <MultiSelectDropdown
        label="Customer Region"
        options={filterOptions.regions}
        selected={getSelectedArray(filters.regions)}
        onChange={(values) => handleMultiSelectChange('regions', values)}
      />

      <MultiSelectDropdown
        label="Gender"
        options={filterOptions.genders}
        selected={getSelectedArray(filters.genders)}
        onChange={(values) => handleMultiSelectChange('genders', values)}
      />

      <div className="filter-dropdown">
        <select 
          value={filters.ageMin ? `${filters.ageMin}-${filters.ageMax || '100'}` : ''} 
          onChange={(e) => {
            if (e.target.value) {
              const [min, max] = e.target.value.split('-');
              onChange('ageMin', min);
              onChange('ageMax', max);
            } else {
              onChange('ageMin', '');
              onChange('ageMax', '');
            }
          }}
        >
          <option value="">Age Range</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-60">46-60</option>
          <option value="61-100">60+</option>
        </select>
      </div>

      <MultiSelectDropdown
        label="Product Category"
        options={filterOptions.categories}
        selected={getSelectedArray(filters.categories)}
        onChange={(values) => handleMultiSelectChange('categories', values)}
      />

      <MultiSelectDropdown
        label="Tags"
        options={filterOptions.tags}
        selected={getSelectedArray(filters.tags)}
        onChange={(values) => handleMultiSelectChange('tags', values)}
      />

      <MultiSelectDropdown
        label="Payment Method"
        options={filterOptions.paymentMethods}
        selected={getSelectedArray(filters.paymentMethods)}
        onChange={(values) => handleMultiSelectChange('paymentMethods', values)}
      />

      <div className="filter-dropdown">
        <select 
          value={filters.dateFrom ? `${filters.dateFrom}|${filters.dateTo}` : ''} 
          onChange={(e) => {
            if (e.target.value) {
              const [from, to] = e.target.value.split('|');
              onChange('dateFrom', from);
              onChange('dateTo', to);
            } else {
              onChange('dateFrom', '');
              onChange('dateTo', '');
            }
          }}
        >
          <option value="">Date Range</option>
          <option value="2023-01-01|2023-03-31">Q1 2023</option>
          <option value="2023-04-01|2023-06-30">Q2 2023</option>
          <option value="2023-07-01|2023-09-30">Q3 2023</option>
          <option value="2023-10-01|2023-12-31">Q4 2023</option>
          <option value="2024-01-01|2024-03-31">Q1 2024</option>
          <option value="2024-04-01|2024-06-30">Q2 2024</option>
          <option value="2024-07-01|2024-09-30">Q3 2024</option>
          <option value="2024-10-01|2024-12-31">Q4 2024</option>
          <option value="2022-01-01|2022-12-31">All 2022</option>
          <option value="2023-01-01|2023-12-31">All 2023</option>
          <option value="2024-01-01|2024-12-31">All 2024</option>
        </select>
      </div>

      <button className="refresh-btn" onClick={onRefresh} title="Refresh">
        ↻
      </button>

      <SortDropdown 
        sortBy={sortBy} 
        sortOrder={sortOrder} 
        onChange={onSortChange} 
      />
    </div>
  );
};

export default FilterBar;
