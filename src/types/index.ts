// Import all types explicitly
import type { Property } from './Property'
import type { Project } from './Project'
import type { User, AppUser } from './User'
import type { Language } from './Language'
import type { Theme } from './Theme'
import type { ContactForm, InterestFormData } from './Forms'
import type { GoogleMapsLocation } from './GoogleMaps'
import type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  GoogleLoginRequest,
  ApiError,
  AuthContextType 
} from './Auth.ts'

// Re-export all types
export type { Property }
export type { Project }
export type { User, AppUser }
export type { Language }
export type { Theme }
export type { ContactForm, InterestFormData }
export type { GoogleMapsLocation }
export type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  GoogleLoginRequest,
  ApiError,
  AuthContextType 
}

// Re-export global declarations
import './GoogleMaps'
