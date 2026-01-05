import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteEmployee } from '../store/employeesSlice';
import { Employee, FiltersState } from '../types';
import Header from './Header';
import DashboardSummary from './DashboardSummary';
import SearchFilterBar from './SearchFilterBar';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import ConfirmDialog from './ConfirmDialog';

const Dashboard: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.items);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);

  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    gender: 'all',
    status: 'all',
  });

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Search filter
      const searchMatch =
        filters.search === '' ||
        employee.fullName.toLowerCase().includes(filters.search.toLowerCase());

      // Gender filter
      const genderMatch = filters.gender === 'all' || employee.gender === filters.gender;

      // Status filter
      const statusMatch =
        filters.status === 'all' ||
        (filters.status === 'active' && employee.isActive) ||
        (filters.status === 'inactive' && !employee.isActive);

      return searchMatch && genderMatch && statusMatch;
    });
  }, [employees, filters]);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (employee: Employee) => {
    setDeletingEmployee(employee);
  };

  const confirmDelete = () => {
    if (deletingEmployee) {
      dispatch(deleteEmployee(deletingEmployee.id));
      setDeletingEmployee(null);
    }
  };

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #333; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px 8px; text-align: left; }
            th { background-color: #4f46e5; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .status-active { color: #10b981; font-weight: bold; }
            .status-inactive { color: #ef4444; font-weight: bold; }
            .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Employee List</h1>
          <p>Total: ${filteredEmployees.length} employees</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
                .map(
                  (emp, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${emp.fullName}</td>
                  <td>${emp.gender.charAt(0).toUpperCase() + emp.gender.slice(1)}</td>
                  <td>${new Date(emp.dateOfBirth).toLocaleDateString('en-IN')}</td>
                  <td>${emp.state}</td>
                  <td class="${emp.isActive ? 'status-active' : 'status-inactive'}">
                    ${emp.isActive ? 'Active' : 'Inactive'}
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
          <div class="footer">
            Printed on ${new Date().toLocaleString()}
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="dashboard">
      <Header
        onAddEmployee={() => {
          setEditingEmployee(null);
          setShowForm(true);
        }}
      />

      <main className="dashboard-content">
        <DashboardSummary />

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Employee Directory</h2>
            <span className="card-count">{filteredEmployees.length} employees</span>
          </div>

          <SearchFilterBar filters={filters} onFiltersChange={setFilters} onPrint={handlePrint} />

          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {showForm && <EmployeeForm employee={editingEmployee} onClose={handleCloseForm} />}

      {deletingEmployee && (
        <ConfirmDialog
          title="Delete Employee"
          message={`Are you sure you want to delete "${deletingEmployee.fullName}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingEmployee(null)}
          confirmText="Delete"
          variant="danger"
        />
      )}
    </div>
  );
};

export default Dashboard;
