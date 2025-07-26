export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string | null;
  isActive: boolean;
  lastLoginAt?: string;
  phones: Phone[];
  favorites: Favorite[];
  roleNames: string[];
}

export interface Phone {
  id: string;
  number: string;
  type: string;
}

export interface Favorite {
  id: string;
  propertyId: string;
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

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  newPassword: string;
  confirmNewPassword: string;
}

export interface GoogleLoginRequest {
  idToken: string;
  roleName?: string;
}

export interface ApiError {
  title: string;
  detail: string;
  status: number;
}
