export interface Employee {
  id: string;
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  profileImage: string;
  state: string;
  isActive: boolean;
}

export interface EmployeesState {
  items: Employee[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
}

export interface FiltersState {
  search: string;
  gender: 'all' | 'male' | 'female' | 'other';
  status: 'all' | 'active' | 'inactive';
}
