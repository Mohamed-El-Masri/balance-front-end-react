import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import Toast from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';
import TermsOfServiceContent from '../../components/ui/TermsOfServiceContent';
import PrivacyPolicyContent from '../../components/ui/PrivacyPolicyContent';
import styles from '../../styles/components/auth/SignUp.module.css';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeToNewsletter: boolean;
}

const SignUpPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeToNewsletter: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const content = {
    en: {
      title: 'Create Your Account',
      subtitle: 'Join Balance Real Estate to discover amazing properties',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      agreeToTerms: 'I agree to the Terms of Service and Privacy Policy',
      subscribeToNewsletter: 'Subscribe to our newsletter for property updates',
      signUp: 'Create Account',
      haveAccount: 'Already have an account?',
      signIn: 'Sign In',
      or: 'Or',
      signUpWithGoogle: 'Sign up with Google',
      signUpWithFacebook: 'Sign up with Facebook',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      placeholders: {
        firstName: 'Enter your first name',
        lastName: 'Enter your last name',
        email: 'Enter your email address',
        phone: 'Enter your phone number',
        password: 'Create a password',
        confirmPassword: 'Confirm your password'
      },
      validation: {
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
        passwordMatch: 'Passwords do not match',
        termsRequired: 'You must agree to the terms and conditions',
        signUpError: 'Something went wrong. Please try again.',
        emailExists: 'An account with this email already exists.',
        signUpSuccess: 'Account created successfully! Please check your email to verify your account.'
      }
    },
    ar: {
      title: 'إنشاء حسابك',
      subtitle: 'انضم إلى بالانس العقارية لاكتشاف عقارات مذهلة',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      agreeToTerms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
      subscribeToNewsletter: 'اشترك في نشرتنا الإخبارية لتحديثات العقارات',
      signUp: 'إنشاء حساب',
      haveAccount: 'لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      or: 'أو',
      signUpWithGoogle: 'إنشاء حساب بجوجل',
      signUpWithFacebook: 'إنشاء حساب بفيسبوك',
      termsOfService: 'شروط الخدمة',
      privacyPolicy: 'سياسة الخصوصية',
      placeholders: {
        firstName: 'أدخل اسمك الأول',
        lastName: 'أدخل اسم العائلة',
        email: 'أدخل بريدك الإلكتروني',
        phone: 'أدخل رقم هاتفك',
        password: 'أنشئ كلمة مرور',
        confirmPassword: 'أكد كلمة المرور'
      },
      validation: {
        firstNameRequired: 'الاسم الأول مطلوب',
        lastNameRequired: 'اسم العائلة مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        phoneRequired: 'رقم الهاتف مطلوب',
        phoneInvalid: 'يرجى إدخال رقم هاتف صحيح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordMinLength: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
        passwordMatch: 'كلمات المرور غير متطابقة',
        termsRequired: 'يجب الموافقة على الشروط والأحكام',
        signUpError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        emailExists: 'يوجد حساب بهذا البريد الإلكتروني بالفعل.',
        signUpSuccess: 'تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك.'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      showToast(t.validation.firstNameRequired, 'error');
      return false;
    }

    if (!formData.lastName.trim()) {
      showToast(t.validation.lastNameRequired, 'error');
      return false;
    }

    if (!formData.email) {
      showToast(t.validation.emailRequired, 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast(t.validation.emailInvalid, 'error');
      return false;
    }

    if (!formData.phone) {
      showToast(t.validation.phoneRequired, 'error');
      return false;
    }

    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      showToast(t.validation.phoneInvalid, 'error');
      return false;
    }

    if (!formData.password) {
      showToast(t.validation.passwordRequired, 'error');
      return false;
    }

    if (formData.password.length < 8) {
      showToast(t.validation.passwordMinLength, 'error');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast(t.validation.passwordMatch, 'error');
      return false;
    }

    if (!formData.agreeToTerms) {
      showToast(t.validation.termsRequired, 'error');
      return false;
    }

    return true;
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
  };

  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const openPrivacyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful signup
      showToast(t.validation.signUpSuccess, 'success');
      
      // Clear form after successful signup
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
          subscribeToNewsletter: false
        });
      }, 2000);

    } catch {
      showToast(t.validation.signUpError, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = (provider: 'google' | 'facebook') => {
    console.log(`Signing up with ${provider}`);
    // Implement social signup logic here
  };

  return (
    <div className={styles.signup} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.signup__container}>
        <div className={styles.signup__form_section}>
          <div className={styles.signup__header}>
            <h1 className={styles.signup__title}>{t.title}</h1>
            <p className={styles.signup__subtitle}>{t.subtitle}</p>
          </div>

          <form className={styles.signup__form} onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className={styles.signup__form_row}>
              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.firstName}</label>
                <div className={styles.signup__input_wrapper}>
                  <User className={styles.signup__input_icon} size={20} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.firstName}
                    className={styles.signup__input}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.lastName}</label>
                <div className={styles.signup__input_wrapper}>
                  <User className={styles.signup__input_icon} size={20} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.lastName}
                    className={styles.signup__input}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className={styles.signup__form_group}>
              <label className={styles.signup__label}>{t.email}</label>
              <div className={styles.signup__input_wrapper}>
                <Mail className={styles.signup__input_icon} size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.email}
                  className={styles.signup__input}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className={styles.signup__form_group}>
              <label className={styles.signup__label}>{t.phone}</label>
              <div className={styles.signup__input_wrapper}>
                <Phone className={styles.signup__input_icon} size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.phone}
                  className={styles.signup__input}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className={styles.signup__form_row}>
              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.password}</label>
                <div className={styles.signup__input_wrapper}>
                  <Lock className={styles.signup__input_icon} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.password}
                    className={styles.signup__input}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.signup__password_toggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.confirmPassword}</label>
                <div className={styles.signup__input_wrapper}>
                  <Lock className={styles.signup__input_icon} size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.confirmPassword}
                    className={styles.signup__input}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.signup__password_toggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className={styles.signup__checkboxes}>
              <label className={styles.signup__checkbox}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span className={styles.signup__checkbox_text}>
                  {t.agreeToTerms.split(' ').slice(0, -4).join(' ')}{' '}
                  <button 
                    type="button"
                    onClick={openTermsModal}
                    className={styles.signup__link}
                  >
                    {t.termsOfService}
                  </button>
                  {' '}{isArabic ? 'و' : 'and'}{' '}
                  <button 
                    type="button"
                    onClick={openPrivacyModal}
                    className={styles.signup__link}
                  >
                    {t.privacyPolicy}
                  </button>
                </span>
              </label>

              <label className={styles.signup__checkbox}>
                <input
                  type="checkbox"
                  name="subscribeToNewsletter"
                  checked={formData.subscribeToNewsletter}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span className={styles.signup__checkbox_text}>{t.subscribeToNewsletter}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.signup__submit_btn}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.signup__loading}>
                  <div className={styles.signup__spinner}></div>
                  {isArabic ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                </div>
              ) : (
                t.signUp
              )}
            </button>

            {/* Divider */}
            <div className={styles.signup__divider}>
              <span>{t.or}</span>
            </div>

            {/* Social Signup */}
            <div className={styles.signup__social}>
              <button
                type="button"
                className={`${styles.signup__social_btn} ${styles.signup__google_btn}`}
                onClick={() => handleSocialSignUp('google')}
                disabled={loading}
              >
                <img src="/images/google-icon.svg" alt="Google" />
                {t.signUpWithGoogle}
              </button>
              <button
                type="button"
                className={`${styles.signup__social_btn} ${styles.signup__facebook_btn}`}
                onClick={() => handleSocialSignUp('facebook')}
                disabled={loading}
              >
                <img src="/images/facebook-icon.svg" alt="Facebook" />
                {t.signUpWithFacebook}
              </button>
            </div>

            {/* Sign In Link */}
            <div className={styles.signup__signin_link}>
              <span>{t.haveAccount}</span>
              <Link to="/signin" className={styles.signup__link}>
                {t.signIn}
              </Link>
            </div>
          </form>
        </div>

        {/* Background Image Section */}
        <div className={styles.signup__image_section}>
          <div className={styles.signup__image_content}>
            <img src="/public/assets/signup/signupimage.jpg" alt="Balance Real Estate" />
            <div className={styles.signup__image_overlay}>
              <h2>{isArabic ? 'ابدأ رحلتك العقارية معنا' : 'Start Your Real Estate Journey'}</h2>
              <p>{isArabic ? 'انضم إلى آلاف العملاء الراضين عن خدماتنا' : 'Join thousands of satisfied customers'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={closeTermsModal}
        title={t.termsOfService}
        maxWidth="800px"
        isArabic={isArabic}
      >
        <TermsOfServiceContent isArabic={isArabic} />
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={showPrivacyModal}
        onClose={closePrivacyModal}
        title={t.privacyPolicy}
        maxWidth="800px"
        isArabic={isArabic}
      >
        <PrivacyPolicyContent isArabic={isArabic} />
      </Modal>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default SignUpPage;
