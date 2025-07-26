import React, { useState, useEffect } from 'react';
import { User, Heart, Eye, Lock, Edit3, Save, X } from 'lucide-react';
import { useLanguage, useAuth, useToast } from '../../contexts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import styles from '../../styles/components/dashboard/Profile.module.css';

interface EditUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
}

interface ProfileProperty {
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
  const { user, updateUser, changePassword, loading } = useAuth();
  const { showToast } = useToast();
  const isArabic = currentLanguage.code === 'ar';

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditUserData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    bio: '',
    location: ''
  });
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'interests' | 'password'>('profile');
  const [favoritesFilter, setFavoritesFilter] = useState<'all' | 'projects' | 'properties'>('all');
  const [interestsFilter, setInterestsFilter] = useState<'all' | 'projects' | 'properties'>('all');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock favorites and interests
  const [favorites] = useState<ProfileProperty[]>([
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

  const [interests] = useState<ProfileProperty[]>([
    {
      id: '3',
      title: 'Balance Residence Project',
      titleAr: 'مشروع بالانس ريزيدنس',
      price: 1200000,
      location: 'King Fahd Road, Riyadh',
      locationAr: 'طريق الملك فهد، الرياض',
      image: '/images/properties/project-1.jpg',
      type: 'villa',
      area: 200
    }
  ]);

  // Sync edit data with user data when user changes
  useEffect(() => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        bio: '',
        location: ''
      });
    }
  }, [user]);

  const content = {
    en: {
      profile: 'Profile',
      favorites: 'Favorites',
      interests: 'Interests', 
      changePassword: 'Change Password',
      all: 'All',
      projects: 'Projects',
      properties: 'Properties',
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
      all: 'الكل',
      projects: 'المشاريع',
      properties: 'العقارات',
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

  const handleInputChange = (field: keyof EditUserData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // Update user profile with the edit data
      if (updateUser) {
        await updateUser({
          firstName: editData.firstName,
          lastName: editData.lastName,
          phoneNumber: editData.phone
        });
      }
      setIsEditing(false);
      showToast('success', t.validation.profileUpdated);
    } catch {
      showToast('error', t.validation.updateError);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('error', t.validation.passwordMismatch);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showToast('error', t.validation.passwordTooShort);
      return;
    }

    try {
      await changePassword({
        email: user?.email || '',
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmPassword
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      showToast('success', t.validation.passwordUpdated);
    } catch {
      showToast('error', t.validation.updateError);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        bio: '',
        location: ''
      });
    }
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

  const getFilteredItems = (items: ProfileProperty[], filter: string) => {
    if (filter === 'all') return items;
    if (filter === 'projects') return items.filter(item => item.type === 'villa');
    if (filter === 'properties') return items.filter(item => item.type !== 'villa');
    return items;
  };
  const renderPropertyCard = (property: ProfileProperty) => (
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
            {user?.profilePictureUrl ? (
              <img src={user.profilePictureUrl} alt="Profile" />
            ) : (
              <User size={40} />
            )}
          </div>
          <div className={styles.profile__user_info}>
            <h1 className={styles.profile__name}>
              {user?.firstName} {user?.lastName}
            </h1>
            <p className={styles.profile__email}>{user?.email}</p>
            <p className={styles.profile__member_since}>
              {t.memberSince}: {user?.lastLoginAt ? formatDate(user.lastLoginAt) : 'N/A'}
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
          {user && !('isThirdPartyAuth' in user && user.isThirdPartyAuth) && (
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
              user={user}
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
              
              {/* Filter Tabs */}
              <div className={styles.profile__filter_tabs}>
                <button
                  className={`${styles.profile__filter_tab} ${favoritesFilter === 'all' ? styles.active : ''}`}
                  onClick={() => setFavoritesFilter('all')}
                >
                  {t.all}
                </button>
                <button
                  className={`${styles.profile__filter_tab} ${favoritesFilter === 'projects' ? styles.active : ''}`}
                  onClick={() => setFavoritesFilter('projects')}
                >
                  {t.projects}
                </button>
                <button
                  className={`${styles.profile__filter_tab} ${favoritesFilter === 'properties' ? styles.active : ''}`}
                  onClick={() => setFavoritesFilter('properties')}
                >
                  {t.properties}
                </button>
              </div>
              
              {getFilteredItems(favorites, favoritesFilter).length > 0 ? (
                <div className={styles.profile__properties_grid}>
                  {getFilteredItems(favorites, favoritesFilter).map(renderPropertyCard)}
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
              
              {/* Filter Tabs */}
              <div className={styles.profile__filter_tabs}>
                <button
                  className={`${styles.profile__filter_tab} ${interestsFilter === 'all' ? styles.active : ''}`}
                  onClick={() => setInterestsFilter('all')}
                >
                  {t.all}
                </button>
                <button
                  className={`${styles.profile__filter_tab} ${interestsFilter === 'projects' ? styles.active : ''}`}
                  onClick={() => setInterestsFilter('projects')}
                >
                  {t.projects}
                </button>
                <button
                  className={`${styles.profile__filter_tab} ${interestsFilter === 'properties' ? styles.active : ''}`}
                  onClick={() => setInterestsFilter('properties')}
                >
                  {t.properties}
                </button>
              </div>
              
              {getFilteredItems(interests, interestsFilter).length > 0 ? (
                <div className={styles.profile__properties_grid}>
                  {getFilteredItems(interests, interestsFilter).map(renderPropertyCard)}
                </div>
              ) : (
                <div className={styles.profile__empty_state}>
                  <Eye size={48} />
                  <p>{t.noInterests}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'password' && (
            <div className={styles.profile__tab_content}>
              <h2 className={styles.profile__section_title}>{t.changePassword}</h2>
              <div className={styles.profile__form}>
                <div className={styles.profile__form_group}>
                  <label className={styles.profile__label}>{t.currentPassword}</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder={t.placeholders.currentPassword}
                    className={styles.profile__input}
                  />
                </div>
                
                <div className={styles.profile__form_group}>
                  <label className={styles.profile__label}>{t.newPassword}</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder={t.placeholders.newPassword}
                    className={styles.profile__input}
                  />
                </div>
                
                <div className={styles.profile__form_group}>
                  <label className={styles.profile__label}>{t.confirmPassword}</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder={t.placeholders.confirmPassword}
                    className={styles.profile__input}
                  />
                </div>
                
                <button
                  onClick={handleChangePassword}
                  disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  className={styles.profile__save_btn}
                >
                  <Lock size={16} />
                  {t.updatePassword}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Loading Overlay */}
      {loading && <LoadingSpinner fullScreen />}
    </div>
  );
};

// Profile Tab Component
interface ProfileTabProps {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    isThirdPartyAuth?: boolean;
  } | null;
  editData: EditUserData;
  isEditing: boolean;
  onInputChange: (field: keyof EditUserData, value: string) => void;
  t: ContentType;
  isArabic: boolean;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ 
  user, 
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
            <p className={styles.profile__value}>{user?.firstName}</p>
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
            <p className={styles.profile__value}>{user?.lastName}</p>
          )}
        </div>
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.email}</label>
        <p className={styles.profile__value}>{user?.email}</p>
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
          <p className={styles.profile__value}>{user?.phoneNumber}</p>
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
          <p className={styles.profile__value}>{editData.bio || (isArabic ? 'غير محدد' : 'Not specified')}</p>
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
          <p className={styles.profile__value}>{editData.location || (isArabic ? 'غير محدد' : 'Not specified')}</p>
        )}
      </div>
    </div>
  </div>
);

export default ProfilePage;
