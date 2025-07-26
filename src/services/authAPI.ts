import type {
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  GoogleLoginRequest,
  AuthResponse,
  User,
  ApiError
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AuthAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = `${API_BASE_URL}/api/auth`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.detail || errorData.title || 'An error occurred');
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/me', {
      method: 'GET',
    });
  }

  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    return this.request<void>('/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>('/logout', {
      method: 'POST',
    });
  }

  async forgotPassword(email: string): Promise<void> {
    return this.request<void>('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(resetData: ResetPasswordRequest): Promise<void> {
    return this.request<void>('/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
  }

  async googleLogin(googleData: GoogleLoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/google-login', {
      method: 'POST',
      body: JSON.stringify(googleData),
    });
  }
}

export const authAPI = new AuthAPI();
