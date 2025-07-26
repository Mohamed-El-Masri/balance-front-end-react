import type { User } from './User';

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

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface GoogleLoginRequest {
  idToken: string;
  roleName: string;
}

export interface ApiError {
  title: string;
  detail: string;
  status: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // alias for compatibility
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: (googleData: GoogleLoginRequest) => Promise<void>;
  changePassword: (passwordData: ChangePasswordRequest) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (resetData: ResetPasswordRequest) => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUser?: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}
