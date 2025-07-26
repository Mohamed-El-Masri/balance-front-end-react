import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import authService from '../services/authService';
import type { User, LoginRequest, RegisterRequest, ChangePasswordRequest } from '../types/auth';
import { useLanguage } from './useLanguage';
import { AuthContext } from './AuthContext.context';
import type { AuthContextType } from './types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        // Try to get stored user first for faster UI rendering
        const storedUser = authService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }
        
        // Then fetch the fresh user data from API
        const freshUser = await authService.getCurrentUser();
        setUser(freshUser);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      await authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(isArabic ? 'فشل تسجيل الدخول' : 'Login failed');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(isArabic ? 'فشل إنشاء الحساب' : 'Registration failed');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const changePassword = async (data: ChangePasswordRequest) => {
    setLoading(true);
    setError(null);
    try {
      await authService.changePassword(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(isArabic ? 'فشل تغيير كلمة المرور' : 'Failed to change password');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(email);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(isArabic ? 'فشل إرسال رابط إعادة تعيين كلمة المرور' : 'Failed to send password reset link');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    changePassword,
    forgotPassword,
    clearError,
    isAuthenticated: !!user && authService.isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
