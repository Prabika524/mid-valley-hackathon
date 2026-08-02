import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, OperatorApplication } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<User>;
  register: (userData: { name: string; email: string; password: string; role?: string; companyName?: string; licenseNumber?: string; phone?: string }) => Promise<User>;
  applyOperator: (appData: {
    companyName: string;
    licenseNumber: string;
    contactPerson: string;
    email: string;
    phone: string;
    officeAddress: string;
    documentName?: string;
  }) => Promise<OperatorApplication>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('nh_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const currentUser = await api.getCurrentUser();
          setUser(currentUser);
        } catch {
          localStorage.removeItem('nh_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [token]);

  const login = async (email: string, pass: string): Promise<User> => {
    const res = await api.login(email, pass);
    localStorage.setItem('nh_token', res.token);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const register = async (userData: { name: string; email: string; password: string; role?: string; companyName?: string; licenseNumber?: string; phone?: string }): Promise<User> => {
    const res = await api.register(userData);
    localStorage.setItem('nh_token', res.token);
    setToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const applyOperator = async (appData: {
    companyName: string;
    licenseNumber: string;
    contactPerson: string;
    email: string;
    phone: string;
    officeAddress: string;
    documentName?: string;
  }): Promise<OperatorApplication> => {
    const res = await api.applyOperator(appData);
    return res.application;
  };

  const logout = () => {
    localStorage.removeItem('nh_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, applyOperator, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
