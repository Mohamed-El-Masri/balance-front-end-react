import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'

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

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* All Routes with PublicLayout */}
              <Route path="/" element={<PublicLayout />}>
                {/* Public Routes */}
                <Route index element={<HomePage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:id" element={<ProjectDetailsPage />} />
                <Route path="properties/:id" element={<PropertyDetailsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="about" element={<AboutPage />} />
                
                {/* Authentication Routes */}
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Dashboard Routes */}
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
