import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useLanguage, useAuth, useToast } from '../../contexts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const { register, loading, error, clearError } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

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
        email: 'example@domain.com',
        phone: '+201001234567',
        password: 'Create a strong password',
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
        email: 'example@domain.com',
        phone: '+201001234567',
        password: 'أنشئ كلمة مرور قوية',
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
  
  // Handle errors from AuthContext
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
    if (!formData.firstName.trim()) {
      showToast('error', t.validation.firstNameRequired);
      return false;
    }

    if (!formData.lastName.trim()) {
      showToast('error', t.validation.lastNameRequired);
      return false;
    }

    if (!formData.email) {
      showToast('error', t.validation.emailRequired);
      return false;
    }

    // More strict email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      showToast('error', 'تنسيق البريد الإلكتروني غير صحيح');
      return false;
    }

    if (!formData.phone) {
      showToast('error', t.validation.phoneRequired);
      return false;
    }

    // Validate international phone format (+20xxxxxxxxx)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      showToast('error', 'من فضلك أدخل رقم الهاتف بالتنسيق الدولي، مثال: +201001234567');
      return false;
    }

    if (!formData.password) {
      showToast('error', t.validation.passwordRequired);
      return false;
    }

    if (formData.password.length < 8) {
      showToast('error', t.validation.passwordMinLength);
      return false;
    }

    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumbers = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      showToast('error', 'كلمة المرور يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام ورموز خاصة');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('error', t.validation.passwordMatch);
      return false;
    }

    if (!formData.agreeToTerms) {
      showToast('error', t.validation.termsRequired);
      return false;
    }

    return true;
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

    try {
      await register({
        userName: `${formData.firstName}${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone
      });
      
      showToast('success', t.validation.signUpSuccess);
      
      // Redirect to signin page after successful registration
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
      // Redirect to signin page after successful registration
      setTimeout(() => {
        navigate('/signin');
      }, 2000);

    } catch {
      // Error is handled by the AuthContext and displayed through the useEffect
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
              <div className={styles.signup__helper_text}>
                {isArabic ? 'مثال: example@domain.com' : 'Example: example@domain.com'}
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
              <div className={styles.signup__helper_text}>
                {isArabic ? 'يجب أن يبدأ الرقم بـ + ورمز البلد (مثال: +201001234567)' : 'Must start with + and country code (e.g., +201001234567)'}
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
                <div className={styles.signup__helper_text}>
                  {isArabic ? 'يجب أن تحتوي كلمة المرور على حروف كبيرة وصغيرة وأرقام ورموز خاصة' : 'Password must contain uppercase, lowercase, numbers and special characters'}
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
            <img src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753359141/signupimage_1_snu6qx.jpg" alt="Balance Real Estate" />
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
      
      {/* Loading Overlay */}
      {loading && <LoadingSpinner fullScreen />}
    </div>
  );
};

export default SignUpPage;
