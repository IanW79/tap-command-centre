import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    console.log('AuthProvider: Initializing auth state');
    
    try {
      const savedUser = localStorage.getItem('currentUser');
      const savedSession = localStorage.getItem('userSession');
      
      if (savedUser && savedSession) {
        const userData = JSON.parse(savedUser);
        console.log('AuthProvider: Found saved user:', userData);
        setUser(userData);
      } else {
        console.log('AuthProvider: No saved session found');
      }
    } catch (error) {
      console.error('AuthProvider: Error loading saved session:', error);
    }
    
    setLoading(false);
    console.log('AuthProvider: Initial session:', !!user);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // For now, create a mock user - replace with real auth later
      const userData: User = {
        id: `user_${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        firstName: email.split('@')[0],
        lastName: 'User'
      };

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('userSession', 'active');
      localStorage.setItem('userEmail', email);
      
      setUser(userData);
      console.log('✅ User logged in:', userData);
      
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, userData?: any) => {
    setLoading(true);
    
    try {
      // Create user account
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: email,
        name: userData?.name || email.split('@')[0],
        firstName: userData?.firstName || email.split('@')[0],
        lastName: userData?.lastName || 'User'
      };

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('userSession', 'active');
      localStorage.setItem('userEmail', email);
      
      setUser(newUser);
      console.log('✅ User signed up:', newUser);
      
    } catch (error) {
      console.error('❌ Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userSession');
    localStorage.removeItem('userEmail');
    setUser(null);
    console.log('✅ User logged out');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
