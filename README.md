# Employee Management System

A modern Employee Management Dashboard built with React and TypeScript, featuring authentication, CRUD operations, and advanced filtering capabilities.

## Project Overview

This application provides a complete employee management solution with:
- **Authentication**: Secure login system to protect dashboard access
- **Dashboard Summary**: Visual overview of total, active, and inactive employees
- **Employee Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Search & Filter**: Search by name, filter by gender and status
- **Print Functionality**: Print employee list or individual employee details
- **Image Upload**: Profile image upload with preview

## Features

### Authentication
- Login page with mock authentication
- Protected dashboard (requires login)
- Session persistence using localStorage
- Logout functionality

### Dashboard
- Summary cards showing Total, Active, and Inactive employee counts
- Employee directory with table view
- Real-time statistics

### Employee Management
- **Add Employee**: Create new employee with full details
- **Edit Employee**: Modify existing employee information
- **Delete Employee**: Remove employees with confirmation dialog
- **Toggle Status**: Quick active/inactive toggle
- **Print**: Print individual employee or full list

### Employee Form Fields
- Full Name (required, min 2 characters)
- Gender (Male/Female/Other)
- Date of Birth (must be 18+ years old)
- Profile Image (upload with preview, max 5MB)
- State (dropdown with Indian states)
- Active/Inactive status

### Search & Filters
- Search employees by name
- Filter by gender (All/Male/Female/Other)
- Filter by status (All/Active/Inactive)
- Combined filters work together

## Tech Stack

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Custom CSS** with modern UI/UX
- **localStorage** for data persistence
- **UUID** for unique ID generation

## Running the Project

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/matwakapil99/contact-management.git
cd contact-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

### Demo Credentials
- **Username**: Any username
- **Password**: `password123`

## Project Structure

```
src/
├── components/
│   ├── LoginPage.tsx        # Authentication page
│   ├── Dashboard.tsx        # Main dashboard container
│   ├── Header.tsx           # Navigation header with logout
│   ├── DashboardSummary.tsx # Statistics cards
│   ├── SearchFilterBar.tsx  # Search and filter controls
│   ├── EmployeeList.tsx     # Employee table/list
│   ├── EmployeeForm.tsx     # Add/Edit employee modal
│   └── ConfirmDialog.tsx    # Confirmation dialog
├── store/
│   ├── store.ts             # Redux store configuration
│   ├── authSlice.ts         # Authentication state
│   └── employeesSlice.ts    # Employee data state
├── types.ts                 # TypeScript interfaces
├── styles.css               # Global styles
├── App.tsx                  # Root component
└── index.tsx                # Entry point
```

## Design Decisions

1. **Mock Authentication**: Used simple mock auth for demo purposes. In production, this would connect to a real authentication service.

2. **localStorage**: Chose localStorage for data persistence to make the app work without a backend. Data persists across sessions.

3. **Redux Toolkit**: Used for centralized state management, making it easy to manage employees and auth state across components.

4. **Custom CSS**: Implemented custom styling for complete design control and modern UI/UX without external dependencies.

5. **Form Validation**: Client-side validation ensures data integrity (age check, required fields, image size limit).

## Assumptions

- Users are at least 18 years old (employees)
- Indian states dropdown (can be extended for other regions)
- Profile images are stored as base64 in localStorage (for demo purposes)
- Single user session (no multi-user support)

## Future Improvements

- Backend API integration
- Role-based access control
- Pagination for large datasets
- Export to CSV/Excel
- Advanced reporting
- Multi-language support
