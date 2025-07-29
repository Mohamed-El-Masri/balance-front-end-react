import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider, ThemeProvider, ToastProvider, AuthProvider } from './contexts'
import ToastContainer from './components/ui/ToastContainer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import GoogleAuthCallback from './components/auth/GoogleAuthCallback'


// Public Routes
import HomePage from './pages/public/HomePage'
import ProjectsPage from './pages/public/ProjectsPage'
import ProjectDetailsPage from './pages/public/ProjectDetailsPage'
import PropertyDetailsPage from './pages/public/PropertyDetailsPage'
import ContactPage from './pages/public/ContactPage'
import AboutPage from './pages/public/AboutPage'
import NotFoundPage from './pages/public/NotFoundPage'

// Auth Routes
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'

// Dashboard Routes
import ProfilePage from './pages/dashboard/ProfilePage'

// Test Routes
import GoogleOAuthTest from './pages/test/GoogleOAuthTest'

// Shared Layout
import PublicLayout from './layouts/PublicLayout'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <Router>
              <div className="app">
                <Routes>
                  {/* Google OAuth Callback Route (no layout needed) */}
                  <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
                  
                  {/* Test Routes (development only) */}
                  <Route path="/test/google-oauth" element={<GoogleOAuthTest />} />
                  
                  {/* Public Routes with Layout */}
                  <Route path="/" element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:id" element={<ProjectDetailsPage />} />
                    <Route path="properties/:id" element={<PropertyDetailsPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="about" element={<AboutPage />} />
                    
                    {/* Authentication Routes (protected - require NOT being logged in) */}
                    <Route path="signin" element={
                      <ProtectedRoute requireAuth={false}>
                        <SignInPage />
                      </ProtectedRoute>
                    } />
                    <Route path="signup" element={
                      <ProtectedRoute requireAuth={false}>
                        <SignUpPage />
                      </ProtectedRoute>
                    } />
                    <Route path="forgot-password" element={
                      <ProtectedRoute requireAuth={false}>
                        <ForgotPasswordPage />
                      </ProtectedRoute>
                    } />
                    <Route path="reset-password" element={
                      <ProtectedRoute requireAuth={false}>
                        <ResetPasswordPage />
                      </ProtectedRoute>
                    } />
                    
                    {/* User Profile Route (protected - requires login) */}
                    <Route path="profile" element={
                      <ProtectedRoute requireAuth={true}>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    
                    {/* 404 Not Found Page */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
                <ToastContainer />
              </div>
            </Router>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
