import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useLanguage, useAuth, useToast } from '../../contexts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import styles from '../../styles/components/auth/SignIn.module.css';

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your Balance Real Estate account',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      or: 'Or',
      signInWithGoogle: 'Sign in with Google',
      signInWithFacebook: 'Sign in with Facebook',
      placeholders: {
        email: 'Enter your email address',
        password: 'Enter your password'
      },
      validation: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 6 characters',
        signInError: 'Invalid email or password. Please try again.',
        signInSuccess: 'Welcome back! Signing you in...'
      }
    },
    ar: {
      title: 'أهلاً بعودتك',
      subtitle: 'سجل دخولك إلى حساب بالانس العقارية',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      signIn: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب',
      or: 'أو',
      signInWithGoogle: 'تسجيل الدخول بجوجل',
      signInWithFacebook: 'تسجيل الدخول بفيسبوك',
      placeholders: {
        email: 'أدخل بريدك الإلكتروني',
        password: 'أدخل كلمة المرور'
      },
      validation: {
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordMinLength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
        signInError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.',
        signInSuccess: 'أهلاً بعودتك! جاري تسجيل الدخول...'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;
  
  // Handle redirect after login
  useEffect(() => {
    if (error) {
      showToast('error', error);
      clearError();
    }
  }, [error, showToast, clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      showToast('error', t.validation.emailRequired);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('error', t.validation.emailInvalid);
      return false;
    }

    if (!formData.password) {
      showToast('error', t.validation.passwordRequired);
      return false;
    }

    if (formData.password.length < 6) {
      showToast('error', t.validation.passwordMinLength);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await login({ 
        email: formData.email, 
        password: formData.password 
      });
      
      showToast('success', t.validation.signInSuccess);
      
      // Get redirect path from location state or default to dashboard
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });

    } catch {
      showToast('error', t.validation.signInError);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className={styles.signin} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.signin__container}>
        <div className={styles.signin__form_section}>
          <div className={styles.signin__header}>
            <h1 className={styles.signin__title}>{t.title}</h1>
            <p className={styles.signin__subtitle}>{t.subtitle}</p>
          </div>

          <form className={styles.signin__form} onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className={styles.signin__form_group}>
              <label className={styles.signin__label}>{t.email}</label>
              <div className={styles.signin__input_wrapper}>
                <Mail className={styles.signin__input_icon} size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.email}
                  className={styles.signin__input}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.signin__form_group}>
              <label className={styles.signin__label}>{t.password}</label>
              <div className={styles.signin__input_wrapper}>
                <Lock className={styles.signin__input_icon} size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.password}
                  className={styles.signin__input}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.signin__password_toggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={styles.signin__form_options}>
              <label className={styles.signin__checkbox}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span className={styles.signin__checkbox_text}>{t.rememberMe}</span>
              </label>
              <Link to="/forgot-password" className={styles.signin__forgot_link}>
                {t.forgotPassword}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.signin__submit_btn}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.signin__loading}>
                  <div className={styles.signin__spinner}></div>
                  {isArabic ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                </div>
              ) : (
                t.signIn
              )}
            </button>

            {/* Divider */}
            <div className={styles.signin__divider}>
              <span>{t.or}</span>
            </div>

            {/* Social Login */}
            <div className={styles.signin__social}>
              <button
                type="button"
                className={`${styles.signin__social_btn} ${styles.signin__google_btn}`}
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
              >
                <img src="/images/google-icon.svg" alt="Google" />
                {t.signInWithGoogle}
              </button>
              <button
                type="button"
                className={`${styles.signin__social_btn} ${styles.signin__facebook_btn}`}
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
              >
                <img src="/images/facebook-icon.svg" alt="Facebook" />
                {t.signInWithFacebook}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className={styles.signin__signup_link}>
              <span>{t.noAccount}</span>
              <Link to="/signup" className={styles.signin__link}>
                {t.signUp}
              </Link>
            </div>
          </form>
        </div>

        {/* Background Image Section */}
        <div className={styles.signin__image_section}>
          <div className={styles.signin__image_content}>
            <img src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350813/4963_txeqoe.jpg" alt="Balance Real Estate" />
            <div className={styles.signin__image_overlay}>
              <h2>{isArabic ? 'اكتشف عقارك المثالي' : 'Discover Your Perfect Property'}</h2>
              <p>{isArabic ? 'مع بالانس العقارية، ابحث عن منزل أحلامك' : 'With Balance Real Estate, find your dream home'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {loading && <LoadingSpinner fullScreen />}
    </div>
  );
};

export default SignInPage;
