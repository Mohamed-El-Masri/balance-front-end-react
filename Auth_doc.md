# 🔐 **Balance Real Estate API - Authentication Documentation**

## **📋 Base Information**
- **API Base URL:** `https://balancerealestate.runasp.net`
- **API Version:** v1
- **Authentication Type:** JWT Bearer Token
- **Content-Type:** `application/json`

---


### **. Environment Setup**
Create `.env` file in your project root:
```env
VITE_API_BASE_URL=https://balancerealestate.runasp.net
VITE_API_VERSION=v1
```

---

## **🔧 API Endpoints**

### **Base URL:** `https://balancerealestate.runasp.net/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/login` | ❌ | User login |
| `POST` | `/register` | ❌ | User registration |
| `GET` | `/me` | ✅ | Get current user info |
| `POST` | `/change-password` | ✅ | Change password |
| `POST` | `/logout` | ✅ | Logout user |
| `POST` | `/forgot-password` | ❌ | Request password reset |
| `POST` | `/reset-password` | ❌ | Reset password |
| `POST` | `/google-login` | ❌ | Google OAuth login |
| `POST` | `/assign-role` | ✅ (Admin) | Assign role to user |

---

## **📝 API Reference**

### **1. Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2025-07-26T12:00:00Z",
  "user": {
    "id": "12345",
    "userName": "username",
    "email": "user@example.com",
    "phoneNumber": "+1234567890",
    "firstName": "Ahmed",
    "lastName": "Mohamed",
    "profilePictureUrl": null,
    "isActive": true,
    "lastLoginAt": "2025-07-26T08:00:00Z",
    "phones": [],
    "favorites": [],
    "roleNames": ["User"]
  }
}
```

### **2. Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "userName": "newuser",
  "email": "newuser@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!",
  "firstName": "Ahmed",
  "lastName": "Ali",
  "phoneNumber": "+1234567890"
}
```

### **3. Get Current User**
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### **4. Change Password**
```http
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com",
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456!",
  "confirmNewPassword": "newPassword456!"
}
```

### **5. Google Login**
```http
POST /api/auth/google-login
Content-Type: application/json

{
  "idToken": "google_id_token_here",
  "roleName": "User"
}
```

---

## **⚡ React TypeScript Implementation**

### **1. Types Definition**
```typescript
// types/auth.ts
export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  isActive: boolean;
  lastLoginAt?: string;
  phones: any[];
  favorites: any[];
  roleNames: string[];
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface ChangePasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ApiError {
  title: string;
  detail: string;
  status: number;
}
```

### **2. API Service**
```typescript
// services/authService.ts
import axios, { AxiosError } from 'axios';
import type { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ChangePasswordRequest,
  ApiError 
} from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://balancerealestate.runasp.net';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class AuthService {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);
      const { token, user } = response.data;
      
      // Store token and user
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Register
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/register', userData);
      const { token, user } = response.data;
      
      // Store token and user
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/me');
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      await api.post('/change-password', data);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/forgot-password', { email });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Reset password
  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    try {
      await api.post('/reset-password', { email, token, newPassword });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Google login
  async googleLogin(idToken: string, roleName = 'User'): Promise<{ token: string }> {
    try {
      const response = await api.post<{ token: string }>('/google-login', {
        idToken,
        roleName,
      });
      
      // Store token
      localStorage.setItem('authToken', response.data.token);
      
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Get stored user
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Handle API errors
  private handleError(error: AxiosError): Error {
    if (error.response?.data) {
      const apiError = error.response.data as ApiError;
      return new Error(apiError.title || apiError.detail || 'حدث خطأ غير متوقع');
    }
    
    if (error.code === 'NETWORK_ERROR') {
      return new Error('خطأ في الاتصال بالشبكة');
    }
    
    return new Error(error.message || 'حدث خطأ غير متوقع');
  }
}

export default new AuthService();
```

### **3. Auth Context**
```typescript
// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import authService from '../services/authService';
import type { User, LoginRequest, RegisterRequest } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
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
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user && authService.isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **4. Login Component**
```typescript
// components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل الدخول
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              ليس لديك حساب؟ أنشئ حساباً جديداً
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

### **5. Protected Route Component**
```typescript
// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.some(role => 
      user.roleNames.includes(role)
    );
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

### **6. App Setup**
```typescript
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRoles={['Admin', 'SuperAdmin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
```


### **2. Test Login**
```bash
curl -X POST https://balancerealestate.runasp.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```


## **⚠️ Important Notes**

1. **CORS is enabled** for all origins on the API
2. **Base URL** is `https://balancerealestate.runasp.net`
3. **JWT tokens** are stored in localStorage
4. **Token expiration** is handled automatically
5. **Error handling** is implemented for common scenarios

---
