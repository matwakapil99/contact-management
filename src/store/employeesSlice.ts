import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeesState } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock initial data
const mockEmployees: Employee[] = [
  {
    id: uuidv4(),
    fullName: 'John Smith',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    profileImage: '',
    state: 'Maharashtra',
    isActive: true,
  },
  {
    id: uuidv4(),
    fullName: 'Sarah Johnson',
    gender: 'female',
    dateOfBirth: '1985-08-22',
    profileImage: '',
    state: 'Karnataka',
    isActive: true,
  },
  {
    id: uuidv4(),
    fullName: 'Mike Davis',
    gender: 'male',
    dateOfBirth: '1992-03-10',
    profileImage: '',
    state: 'Tamil Nadu',
    isActive: false,
  },
  {
    id: uuidv4(),
    fullName: 'Emily Brown',
    gender: 'female',
    dateOfBirth: '1988-11-30',
    profileImage: '',
    state: 'Gujarat',
    isActive: true,
  },
  {
    id: uuidv4(),
    fullName: 'Chris Wilson',
    gender: 'male',
    dateOfBirth: '1995-07-18',
    profileImage: '',
    state: 'Delhi',
    isActive: false,
  },
];

const storedEmployees = localStorage.getItem('employees');
const initialState: EmployeesState = {
  items: storedEmployees ? JSON.parse(storedEmployees) : mockEmployees,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const newEmployee = { ...action.payload, id: uuidv4() };
      state.items.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(state.items));
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.items.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('employees', JSON.stringify(state.items));
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((e) => e.id !== action.payload);
      localStorage.setItem('employees', JSON.stringify(state.items));
    },
    toggleEmployeeStatus: (state, action: PayloadAction<string>) => {
      const employee = state.items.find((e) => e.id === action.payload);
      if (employee) {
        employee.isActive = !employee.isActive;
        localStorage.setItem('employees', JSON.stringify(state.items));
      }
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, toggleEmployeeStatus } = employeesSlice.actions;
export default employeesSlice.reducer;
