import React from 'react';
import { FiltersState } from '../types';

interface SearchFilterBarProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  onPrint: () => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ filters, onFiltersChange, onPrint }) => {
  return (
    <div className="search-filter-bar">
      <div className="search-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search employees by name..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
        {filters.search && (
          <button
            className="search-clear"
            onClick={() => onFiltersChange({ ...filters, search: '' })}
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-group">
        <label>Gender:</label>
        <select
          value={filters.gender}
          onChange={(e) => onFiltersChange({ ...filters, gender: e.target.value as FiltersState['gender'] })}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Status:</label>
        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as FiltersState['status'] })}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button className="btn print-btn" onClick={onPrint}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Print List
      </button>
    </div>
  );
};

export default SearchFilterBar;
