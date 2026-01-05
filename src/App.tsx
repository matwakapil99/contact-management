import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="app">
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </div>
  );
};

export default App;
