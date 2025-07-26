import type { User, LoginRequest, RegisterRequest, ChangePasswordRequest } from '../types/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: () => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  clearError: () => void;
  isAuthenticated: boolean;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (type: ToastType, message: string, duration?: number) => void;
  hideToast: (id: string) => void;
}
