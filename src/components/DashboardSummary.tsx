import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const DashboardSummary: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.items);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.isActive).length;
  const inactiveEmployees = employees.filter((e) => !e.isActive).length;

  return (
    <div className="dashboard-summary">
      <div className="summary-card total">
        <div className="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="summary-content">
          <h3>Total Employees</h3>
          <p className="summary-number">{totalEmployees}</p>
        </div>
      </div>

      <div className="summary-card active">
        <div className="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="summary-content">
          <h3>Active</h3>
          <p className="summary-number">{activeEmployees}</p>
        </div>
      </div>

      <div className="summary-card inactive">
        <div className="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
        <div className="summary-content">
          <h3>Inactive</h3>
          <p className="summary-number">{inactiveEmployees}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
