// Re-export all types directly
export * from './Property'
export * from './Project'
export * from './User'
export * from './Language'
export * from './Theme'
export * from './Forms'
export * from './GoogleMaps'

// Auth types defined inline to avoid module resolution issues
export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: import('./User').User;
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
  user: import('./User').User | null;
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
  updateUser?: (userData: Partial<import('./User').User>) => Promise<void>;
  clearError: () => void;
}

// Import global declarations
import './GoogleMaps'
