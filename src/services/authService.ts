import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ChangePasswordRequest,
  ResetPasswordRequest,
  ApiError 
} from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://balancerealestate.runasp.net';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/Auth`,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
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
      // Only redirect if not already on login page to avoid redirect loops
      if (!window.location.pathname.includes('/signin')) {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

class AuthService {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🚀 Logging in user with email:', credentials.email);
      console.log('📡 API URL:', `${API_BASE_URL}/api/Auth/login`);
      
      const response = await api.post<AuthResponse>('/login', credentials);
      console.log('✅ Login successful:', response.data);
      
      const { token, user } = response.data;
      
      // Store token and user
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      if (error instanceof AxiosError) {
        console.error('📊 Error response:', error.response?.data);
        console.error('📊 Error status:', error.response?.status);
        console.error('📊 Error message:', error.message);
      }
      throw this.handleError(error as AxiosError);
    }
  }

  // Register
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      console.log('🚀 Registering user with data:', {
        ...userData,
        password: '***hidden***',
        confirmPassword: '***hidden***'
      });
      console.log('📡 API URL:', `${API_BASE_URL}/api/Auth/register`);
      
      const response = await api.post<AuthResponse>('/register', userData);
      console.log('✅ Registration successful:', response.data);
      
      const { token, user } = response.data;
      
      // Store token and user
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      if (error instanceof AxiosError) {
        console.error('📊 Error response:', error.response?.data);
        console.error('📊 Error status:', error.response?.status);
        console.error('📊 Error message:', error.message);
      }
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
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      await api.post('/reset-password', data);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Google login
  async googleLogin(idToken: string, roleName = 'User'): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/google-login', {
        idToken,
        roleName,
      });
      
      const { token, user } = response.data;
      
      // Store token and user
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
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
    console.error('🔍 Handling error:', error);
    
    if (error.response?.data) {
      const errorData = error.response.data as Record<string, unknown>;
      console.error('📊 API Error details:', errorData);
      
      // Handle validation errors (400 status with errors object)
      if (error.response.status === 400 && errorData.errors) {
        const validationErrors = errorData.errors as Record<string, string[]>;
        const errorMessages: string[] = [];
        
        // Extract all validation error messages
        Object.keys(validationErrors).forEach(field => {
          if (Array.isArray(validationErrors[field])) {
            errorMessages.push(...validationErrors[field]);
          }
        });
        
        if (errorMessages.length > 0) {
          return new Error(errorMessages.join('\n'));
        }
      }
      
      const apiError = errorData as unknown as ApiError;
      
      // Handle specific HTTP status codes
      switch (error.response.status) {
        case 404:
          return new Error('الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً.');
        case 400:
          return new Error(apiError.title || apiError.detail || 'بيانات غير صحيحة');
        case 401:
          return new Error('بيانات تسجيل الدخول غير صحيحة');
        case 403:
          return new Error('ليس لديك صلاحية للوصول لهذه الخدمة');
        case 500:
          return new Error('خطأ في الخادم. يرجى المحاولة لاحقاً.');
        default:
          return new Error(apiError.title || apiError.detail || 'حدث خطأ غير متوقع');
      }
    }
    
    if (error.code === 'ERR_NETWORK') {
      return new Error('خطأ في الاتصال بالشبكة. تأكد من اتصالك بالإنترنت.');
    }
    
    if (error.code === 'ECONNABORTED') {
      return new Error('انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.');
    }
    
    return new Error(error.message || 'حدث خطأ غير متوقع');
  }
}

export default new AuthService();
