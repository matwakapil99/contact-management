import React from 'react';
import { Employee } from '../types';
import { useDispatch } from 'react-redux';
import { toggleEmployeeStatus } from '../store/employeesSlice';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete }) => {
  const dispatch = useDispatch();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <h3>No employees found</h3>
        <p>Try adjusting your search or filters, or add a new employee.</p>
      </div>
    );
  }

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td className="employee-id">#{String(index + 1).padStart(3, '0')}</td>
              <td>
                <div className="employee-avatar">
                  {employee.profileImage ? (
                    <img src={employee.profileImage} alt={employee.fullName} />
                  ) : (
                    <span className="avatar-initials">{getInitials(employee.fullName)}</span>
                  )}
                </div>
              </td>
              <td className="employee-name">{employee.fullName}</td>
              <td className="employee-gender">
                <span className={`gender-badge ${employee.gender}`}>
                  {employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1)}
                </span>
              </td>
              <td className="employee-dob">{formatDate(employee.dateOfBirth)}</td>
              <td className="employee-state">{employee.state}</td>
              <td>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={employee.isActive}
                    onChange={() => dispatch(toggleEmployeeStatus(employee.id))}
                  />
                  <span className="toggle-slider"></span>
                  <span className={`toggle-label ${employee.isActive ? 'active' : 'inactive'}`}>
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </label>
              </td>
              <td>
                <div className="actions">
                  <button className="icon-btn edit" onClick={() => onEdit(employee)} title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button className="icon-btn delete" onClick={() => onDelete(employee)} title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                  <button
                    className="icon-btn print"
                    onClick={() => {
                      const printContent = `
                        <html>
                          <head>
                            <title>Employee - ${employee.fullName}</title>
                            <style>
                              body { font-family: Arial, sans-serif; padding: 40px; }
                              .header { text-align: center; margin-bottom: 30px; }
                              .info { margin: 10px 0; }
                              .label { font-weight: bold; }
                            </style>
                          </head>
                          <body>
                            <div class="header">
                              <h1>Employee Details</h1>
                            </div>
                            <div class="info"><span class="label">Name:</span> ${employee.fullName}</div>
                            <div class="info"><span class="label">Gender:</span> ${employee.gender}</div>
                            <div class="info"><span class="label">Date of Birth:</span> ${formatDate(employee.dateOfBirth)}</div>
                            <div class="info"><span class="label">State:</span> ${employee.state}</div>
                            <div class="info"><span class="label">Status:</span> ${employee.isActive ? 'Active' : 'Inactive'}</div>
                          </body>
                        </html>
                      `;
                      const printWindow = window.open('', '_blank');
                      if (printWindow) {
                        printWindow.document.write(printContent);
                        printWindow.document.close();
                        printWindow.print();
                      }
                    }}
                    title="Print"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <rect x="6" y="14" width="12" height="8" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
