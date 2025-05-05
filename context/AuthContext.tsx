'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'speaker' | 'admin';
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'organizer' | 'speaker') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // Mock login logic for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user
      const mockUser = {
        id: 'user-1',
        name: 'John Doe',
        email,
        role: 'organizer' as const,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'organizer' | 'speaker'
  ) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // Mock registration logic for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user
      const mockUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};