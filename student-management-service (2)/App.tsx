import React, { useEffect, useState } from 'react';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { User, UserRole } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Example: fetch students once on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/students`);
        const data = await res.json();
        console.log('Students from backend:', data);
        // later you can store this in state if needed
      } catch (err) {
        console.error('Failed to fetch students', err);
      }
    };

    loadStudents();
  }, []);

  const handleLogin = (role: UserRole, username: string) => {
    // Simulate API login with specific data to demonstrate filtering
    let mockUser: User = {
      username: username,
      role: role,
      name: 'User',
      email: `${username}@school.in`,
    };

    if (role === UserRole.ADMIN) {
      mockUser.name = 'Administrator';
    } else if (role === UserRole.TEACHER) {
      // Using a name from constants.ts to match course data
      mockUser.name = 'Mrs. Sunita Rao';
    } else if (role === UserRole.STUDENT) {
      // Using a name and class from constants.ts to match student data
      mockUser.name = 'Aarav Patel';
      mockUser.class = 'X-A';
    }

    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <>
      {isAuthenticated && user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
