import React, { useState } from 'react';
import { User, Heart, Eye, Lock, Edit3, Save, X } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import Toast from '../../components/ui/Toast';
import styles from '../../styles/components/dashboard/Profile.module.css';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate: string;
  isThirdPartyAuth: boolean; // Google/Facebook login
}

interface Property {
  id: string;
  title: string;
  titleAr: string;
  price: number;
  location: string;
  locationAr: string;
  image: string;
  type: 'apartment' | 'villa' | 'office' | 'land';
  area: number;
}

interface ContentType {
  profile: string;
  favorites: string;
  interests: string;
  changePassword: string;
  editProfile: string;
  saveChanges: string;
  cancel: string;
  personalInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  memberSince: string;
  myFavorites: string;
  myInterests: string;
  noFavorites: string;
  noInterests: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  updatePassword: string;
  placeholders: {
    firstName: string;
    lastName: string;
    phone: string;
    bio: string;
    location: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  validation: {
    profileUpdated: string;
    passwordUpdated: string;
    updateError: string;
    passwordMismatch: string;
    passwordRequired: string;
    passwordTooShort: string;
  };
  currency: string;
  sqm: string;
}

const ProfilePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  // Mock user data
  const [userData, setUserData] = useState<UserData>({
    id: '1',
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed.mohamed@example.com',
    phone: '+966123456789',
    bio: 'مهتم بالاستثمار العقاري في المملكة العربية السعودية',
    location: 'الرياض، المملكة العربية السعودية',
    joinDate: '2024-01-15',
    isThirdPartyAuth: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>(userData);
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'interests' | 'password'>('profile');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  // Mock favorites and interests
  const [favorites] = useState<Property[]>([
    {
      id: '1',
      title: 'Luxury Villa in Riyadh',
      titleAr: 'فيلا فاخرة في الرياض',
      price: 2500000,
      location: 'Al Malqa, Riyadh',
      locationAr: 'الملقا، الرياض',
      image: '/images/properties/villa-1.jpg',
      type: 'villa',
      area: 500
    },
    {
      id: '2',
      title: 'Modern Apartment Downtown',
      titleAr: 'شقة حديثة وسط المدينة',
      price: 850000,
      location: 'Downtown, Riyadh',
      locationAr: 'وسط المدينة، الرياض',
      image: '/images/properties/apartment-1.jpg',
      type: 'apartment',
      area: 120
    }
  ]);

  const [interests] = useState<Property[]>([
    {
      id: '3',
      title: 'Commercial Office Space',
      titleAr: 'مساحة مكتبية تجارية',
      price: 1200000,
      location: 'King Fahd Road, Riyadh',
      locationAr: 'طريق الملك فهد، الرياض',
      image: '/images/properties/office-1.jpg',
      type: 'office',
      area: 200
    }
  ]);

  const content = {
    en: {
      profile: 'Profile',
      favorites: 'Favorites',
      interests: 'Interests', 
      changePassword: 'Change Password',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      bio: 'Bio',
      location: 'Location',
      memberSince: 'Member Since',
      myFavorites: 'My Favorites',
      myInterests: 'My Interests',
      noFavorites: 'No favorites yet',
      noInterests: 'No interests yet',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      updatePassword: 'Update Password',
      placeholders: {
        firstName: 'Enter your first name',
        lastName: 'Enter your last name',
        phone: 'Enter your phone number',
        bio: 'Tell us about yourself',
        location: 'Enter your location',
        currentPassword: 'Enter current password',
        newPassword: 'Enter new password',
        confirmPassword: 'Confirm new password'
      },
      validation: {
        profileUpdated: 'Profile updated successfully',
        passwordUpdated: 'Password updated successfully',
        updateError: 'Failed to update. Please try again.',
        passwordMismatch: 'Passwords do not match',
        passwordRequired: 'All password fields are required',
        passwordTooShort: 'Password must be at least 8 characters'
      },
      currency: 'SAR',
      sqm: 'sqm'
    },
    ar: {
      profile: 'الملف الشخصي',
      favorites: 'المفضلة',
      interests: 'الاهتمامات',
      changePassword: 'تغيير كلمة المرور',
      editProfile: 'تعديل الملف الشخصي',
      saveChanges: 'حفظ التغييرات',
      cancel: 'إلغاء',
      personalInfo: 'المعلومات الشخصية',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      bio: 'نبذة شخصية',
      location: 'الموقع',
      memberSince: 'عضو منذ',
      myFavorites: 'مفضلاتي',
      myInterests: 'اهتماماتي',
      noFavorites: 'لا توجد مفضلات بعد',
      noInterests: 'لا توجد اهتمامات بعد',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور الجديدة',
      updatePassword: 'تحديث كلمة المرور',
      placeholders: {
        firstName: 'أدخل اسمك الأول',
        lastName: 'أدخل اسم العائلة',
        phone: 'أدخل رقم هاتفك',
        bio: 'أخبرنا عن نفسك',
        location: 'أدخل موقعك',
        currentPassword: 'أدخل كلمة المرور الحالية',
        newPassword: 'أدخل كلمة المرور الجديدة',
        confirmPassword: 'أكد كلمة المرور الجديدة'
      },
      validation: {
        profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
        passwordUpdated: 'تم تحديث كلمة المرور بنجاح',
        updateError: 'فشل في التحديث. يرجى المحاولة مرة أخرى.',
        passwordMismatch: 'كلمات المرور غير متطابقة',
        passwordRequired: 'جميع حقول كلمة المرور مطلوبة',
        passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
      },
      currency: 'ريال',
      sqm: 'م²'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserData(editData);
      setIsEditing(false);
      showToast(t.validation.profileUpdated, 'success');
    } catch {
      showToast(t.validation.updateError, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isArabic 
      ? date.toLocaleDateString('ar-SA')
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatPrice = (price: number) => {
    return isArabic 
      ? `${price.toLocaleString('ar-SA')} ${t.currency}`
      : `${price.toLocaleString('en-US')} ${t.currency}`;
  };

  const renderPropertyCard = (property: Property) => (
    <div key={property.id} className={styles.profile__property_card}>
      <div className={styles.profile__property_image}>
        <img 
          src={property.image} 
          alt={isArabic ? property.titleAr : property.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-property.jpg';
          }}
        />
      </div>
      <div className={styles.profile__property_info}>
        <h3 className={styles.profile__property_title}>
          {isArabic ? property.titleAr : property.title}
        </h3>
        <p className={styles.profile__property_location}>
          {isArabic ? property.locationAr : property.location}
        </p>
        <div className={styles.profile__property_details}>
          <span className={styles.profile__property_price}>
            {formatPrice(property.price)}
          </span>
          <span className={styles.profile__property_area}>
            {property.area} {t.sqm}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.profile} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.profile__container}>
        {/* Header */}
        <div className={styles.profile__header}>
          <div className={styles.profile__avatar}>
            {userData.avatar ? (
              <img src={userData.avatar} alt="Profile" />
            ) : (
              <User size={40} />
            )}
          </div>
          <div className={styles.profile__user_info}>
            <h1 className={styles.profile__name}>
              {userData.firstName} {userData.lastName}
            </h1>
            <p className={styles.profile__email}>{userData.email}</p>
            <p className={styles.profile__member_since}>
              {t.memberSince}: {formatDate(userData.joinDate)}
            </p>
          </div>
          {activeTab === 'profile' && (
            <div className={styles.profile__actions}>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.profile__edit_btn}
                >
                  <Edit3 size={16} />
                  {t.editProfile}
                </button>
              ) : (
                <div className={styles.profile__edit_actions}>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className={styles.profile__save_btn}
                  >
                    <Save size={16} />
                    {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : t.saveChanges}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className={styles.profile__cancel_btn}
                  >
                    <X size={16} />
                    {t.cancel}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className={styles.profile__nav}>
          <button
            onClick={() => setActiveTab('profile')}
            className={`${styles.profile__nav_btn} ${activeTab === 'profile' ? styles.active : ''}`}
          >
            <User size={16} />
            {t.profile}
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`${styles.profile__nav_btn} ${activeTab === 'favorites' ? styles.active : ''}`}
          >
            <Heart size={16} />
            {t.favorites}
          </button>
          <button
            onClick={() => setActiveTab('interests')}
            className={`${styles.profile__nav_btn} ${activeTab === 'interests' ? styles.active : ''}`}
          >
            <Eye size={16} />
            {t.interests}
          </button>
          {!userData.isThirdPartyAuth && (
            <button
              onClick={() => setActiveTab('password')}
              className={`${styles.profile__nav_btn} ${activeTab === 'password' ? styles.active : ''}`}
            >
              <Lock size={16} />
              {t.changePassword}
            </button>
          )}
        </div>

        {/* Content */}
        <div className={styles.profile__content}>
          {activeTab === 'profile' && (
            <ProfileTab 
              userData={userData}
              editData={editData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              t={t}
              isArabic={isArabic}
            />
          )}

          {activeTab === 'favorites' && (
            <div className={styles.profile__tab_content}>
              <h2 className={styles.profile__section_title}>{t.myFavorites}</h2>
              {favorites.length > 0 ? (
                <div className={styles.profile__properties_grid}>
                  {favorites.map(renderPropertyCard)}
                </div>
              ) : (
                <div className={styles.profile__empty_state}>
                  <Heart size={48} />
                  <p>{t.noFavorites}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'interests' && (
            <div className={styles.profile__tab_content}>
              <h2 className={styles.profile__section_title}>{t.myInterests}</h2>
              {interests.length > 0 ? (
                <div className={styles.profile__properties_grid}>
                  {interests.map(renderPropertyCard)}
                </div>
              ) : (
                <div className={styles.profile__empty_state}>
                  <Eye size={48} />
                  <p>{t.noInterests}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'password' && !userData.isThirdPartyAuth && (
            <PasswordTab 
              t={t}
              showToast={showToast}
              isArabic={isArabic}
            />
          )}
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

// Profile Tab Component
interface ProfileTabProps {
  userData: UserData;
  editData: UserData;
  isEditing: boolean;
  onInputChange: (field: keyof UserData, value: string) => void;
  t: ContentType;
  isArabic: boolean;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ 
  userData, 
  editData, 
  isEditing, 
  onInputChange, 
  t,
  isArabic 
}) => (
  <div className={styles.profile__tab_content}>
    <h2 className={styles.profile__section_title}>{t.personalInfo}</h2>
    <div className={styles.profile__form}>
      <div className={styles.profile__form_row}>
        <div className={styles.profile__form_group}>
          <label className={styles.profile__label}>{t.firstName}</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              placeholder={t.placeholders.firstName}
              className={styles.profile__input}
            />
          ) : (
            <p className={styles.profile__value}>{userData.firstName}</p>
          )}
        </div>
        <div className={styles.profile__form_group}>
          <label className={styles.profile__label}>{t.lastName}</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              placeholder={t.placeholders.lastName}
              className={styles.profile__input}
            />
          ) : (
            <p className={styles.profile__value}>{userData.lastName}</p>
          )}
        </div>
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.email}</label>
        <p className={styles.profile__value}>{userData.email}</p>
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.phone}</label>
        {isEditing ? (
          <input
            type="tel"
            value={editData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder={t.placeholders.phone}
            className={styles.profile__input}
          />
        ) : (
          <p className={styles.profile__value}>{userData.phone}</p>
        )}
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.bio}</label>
        {isEditing ? (
          <textarea
            value={editData.bio || ''}
            onChange={(e) => onInputChange('bio', e.target.value)}
            placeholder={t.placeholders.bio}
            className={styles.profile__textarea}
            rows={3}
          />
        ) : (
          <p className={styles.profile__value}>{userData.bio || (isArabic ? 'غير محدد' : 'Not specified')}</p>
        )}
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.location}</label>
        {isEditing ? (
          <input
            type="text"
            value={editData.location || ''}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder={t.placeholders.location}
            className={styles.profile__input}
          />
        ) : (
          <p className={styles.profile__value}>{userData.location || (isArabic ? 'غير محدد' : 'Not specified')}</p>
        )}
      </div>
    </div>
  </div>
);

// Password Tab Component
interface PasswordTabProps {
  t: ContentType;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  isArabic: boolean;
}

const PasswordTab: React.FC<PasswordTabProps> = ({ t, showToast, isArabic }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const validatePassword = (): boolean => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showToast(t.validation.passwordRequired, 'error');
      return false;
    }

    if (passwordData.newPassword.length < 8) {
      showToast(t.validation.passwordTooShort, 'error');
      return false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast(t.validation.passwordMismatch, 'error');
      return false;
    }

    return true;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast(t.validation.passwordUpdated, 'success');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch {
      showToast(t.validation.updateError, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profile__tab_content}>
      <h2 className={styles.profile__section_title}>{t.changePassword}</h2>
      <form className={styles.profile__password_form} onSubmit={handleUpdatePassword}>
        <div className={styles.profile__form_group}>
          <label className={styles.profile__label}>{t.currentPassword}</label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            placeholder={t.placeholders.currentPassword}
            className={styles.profile__input}
            disabled={loading}
          />
        </div>

        <div className={styles.profile__form_group}>
          <label className={styles.profile__label}>{t.newPassword}</label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            placeholder={t.placeholders.newPassword}
            className={styles.profile__input}
            disabled={loading}
          />
        </div>

        <div className={styles.profile__form_group}>
          <label className={styles.profile__label}>{t.confirmPassword}</label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder={t.placeholders.confirmPassword}
            className={styles.profile__input}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={styles.profile__update_password_btn}
          disabled={loading}
        >
          {loading ? (
            <div className={styles.profile__loading}>
              <div className={styles.profile__spinner}></div>
              {isArabic ? 'جاري التحديث...' : 'Updating...'}
            </div>
          ) : (
            <>
              <Lock size={16} />
              {t.updatePassword}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
