import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'

// Public Routes
import HomePage from './pages/public/HomePage'
import ProjectsPage from './pages/public/ProjectsPage'
import ProjectDetailsPage from './pages/public/ProjectDetailsPage'
import PropertyDetailsPage from './pages/public/PropertyDetailsPage'
import ContactPage from './pages/public/ContactPage'
import AboutPage from './pages/public/AboutPage'

// Auth Routes
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'

// Dashboard Routes
import ProfilePage from './pages/dashboard/ProfilePage'

// Shared Layout
import PublicLayout from './layouts/PublicLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <Router>
              <div className="app">
                <Routes>
                  {/* Public Routes with Layout */}
                  <Route path="/" element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:id" element={<ProjectDetailsPage />} />
                    <Route path="properties/:id" element={<PropertyDetailsPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="about" element={<AboutPage />} />
                  </Route>
                  
                  {/* Authentication Routes (no layout, redirect if logged in) */}
                  <Route element={<ProtectedRoute requireAuth={false} />}>
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                  </Route>
                  
                  {/* Protected Dashboard Routes */}
                  <Route element={<ProtectedRoute requireAuth={true} />}>
                    <Route path="dashboard" element={<PublicLayout />}>
                      <Route index element={<ProfilePage />} />
                      <Route path="profile" element={<ProfilePage />} />
                    </Route>
                  </Route>
                  
                 
                  
                  {/* Catch all for 404 */}
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
