import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider, ThemeProvider, ToastProvider, AuthProvider } from './contexts'
import ToastContainer from './components/ui/ToastContainer'


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

// Dashboard Routes
import ProfilePage from './pages/dashboard/ProfilePage'

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
                  {/* Public Routes with Layout */}
                  <Route path="/" element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:id" element={<ProjectDetailsPage />} />
                    <Route path="properties/:id" element={<PropertyDetailsPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="about" element={<AboutPage />} />
                    
                    {/* Authentication Routes (now with layout) */}
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    
                    {/* User Profile Route */}
                    <Route path="profile" element={<ProfilePage />} />
                    
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
