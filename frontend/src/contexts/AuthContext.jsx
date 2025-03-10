import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';
import { LoadingSpinner } from '../components/LoadingSpinner/index';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario almacenado al cargar la aplicación
    const initAuth = () => {
      const storedUser = authService.getCurrentUser();
      const token = authService.getToken();
      
      console.log('Stored user:', storedUser); // Debug
      console.log('Stored token:', token); // Debug

      if (storedUser && token) {
        setUser(storedUser);
      } else {
        // Si hay inconsistencia entre user y token, limpiar todo
        authService.logout();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={value}>
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