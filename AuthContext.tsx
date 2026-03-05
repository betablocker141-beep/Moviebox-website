import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/Movie';
import { getCurrentUser, login as dbLogin, logout as dbLogout } from '../services/database';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const loggedInUser = dbLogin(email, password);
    if (loggedInUser) {
      const { password: _, ...safeUser } = loggedInUser;
      setUser(safeUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    dbLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
