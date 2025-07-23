import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import Toast from '../../components/ui/Toast';
import styles from '../../styles/components/auth/ForgotPassword.module.css';

const ForgotPasswordPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const content = {
    en: {
      title: 'Forgot Password?',
      subtitle: 'Enter your email address and we\'ll send you a link to reset your password',
      email: 'Email Address',
      sendLink: 'Send Reset Link',
      backToSignIn: 'Back to Sign In',
      emailSentTitle: 'Check Your Email',
      emailSentMessage: 'We\'ve sent a password reset link to your email address',
      resendLink: 'Resend Link',
      placeholders: {
        email: 'Enter your email address'
      },
      validation: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        emailNotFound: 'No account found with this email address',
        linkSent: 'Password reset link sent successfully',
        sendError: 'Failed to send reset link. Please try again.'
      }
    },
    ar: {
      title: 'نسيت كلمة المرور؟',
      subtitle: 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور',
      email: 'البريد الإلكتروني',
      sendLink: 'إرسال رابط إعادة التعيين',
      backToSignIn: 'العودة لتسجيل الدخول',
      emailSentTitle: 'تحقق من بريدك الإلكتروني',
      emailSentMessage: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
      resendLink: 'إعادة إرسال الرابط',
      placeholders: {
        email: 'أدخل بريدك الإلكتروني'
      },
      validation: {
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        emailNotFound: 'لا يوجد حساب بهذا البريد الإلكتروني',
        linkSent: 'تم إرسال رابط إعادة تعيين كلمة المرور بنجاح',
        sendError: 'فشل في إرسال رابط إعادة التعيين. يرجى المحاولة مرة أخرى.'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const validateForm = (): boolean => {
    if (!email) {
      showToast(t.validation.emailRequired, 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast(t.validation.emailInvalid, 'error');
      return false;
    }

    return true;
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful email send
      showToast(t.validation.linkSent, 'success');
      setEmailSent(true);

    } catch {
      showToast(t.validation.sendError, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast(t.validation.linkSent, 'success');
    } catch {
      showToast(t.validation.sendError, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className={styles.forgot_password} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={styles.forgot_password__container}>
          <div className={styles.forgot_password__success}>
            <div className={styles.forgot_password__success_icon}>
              <CheckCircle size={64} />
            </div>
            <h1 className={styles.forgot_password__title}>{t.emailSentTitle}</h1>
            <p className={styles.forgot_password__subtitle}>
              {t.emailSentMessage}
            </p>
            <div className={styles.forgot_password__email}>
              <strong>{email}</strong>
            </div>
            <div className={styles.forgot_password__actions}>
              <button
                onClick={handleResend}
                className={styles.forgot_password__resend_btn}
                disabled={loading}
              >
                {loading ? (isArabic ? 'جاري الإرسال...' : 'Sending...') : t.resendLink}
              </button>
              <Link to="/signin" className={styles.forgot_password__back_link}>
                <ArrowLeft size={16} />
                {t.backToSignIn}
              </Link>
            </div>
          </div>
        </div>

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
  }

  return (
    <div className={styles.forgot_password} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.forgot_password__container}>
        <div className={styles.forgot_password__form_section}>
          <div className={styles.forgot_password__header}>
            <h1 className={styles.forgot_password__title}>{t.title}</h1>
            <p className={styles.forgot_password__subtitle}>{t.subtitle}</p>
          </div>

          <form className={styles.forgot_password__form} onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className={styles.forgot_password__form_group}>
              <label className={styles.forgot_password__label}>{t.email}</label>
              <div className={styles.forgot_password__input_wrapper}>
                <Mail className={styles.forgot_password__input_icon} size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholders.email}
                  className={styles.forgot_password__input}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.forgot_password__submit_btn}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.forgot_password__loading}>
                  <div className={styles.forgot_password__spinner}></div>
                  {isArabic ? 'جاري الإرسال...' : 'Sending...'}
                </div>
              ) : (
                t.sendLink
              )}
            </button>

            {/* Back to Sign In */}
            <Link to="/signin" className={styles.forgot_password__back_link}>
              <ArrowLeft size={16} />
              {t.backToSignIn}
            </Link>
          </form>
        </div>
      </div>

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

export default ForgotPasswordPage;
