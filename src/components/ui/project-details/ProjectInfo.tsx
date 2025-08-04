import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Tag } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectInfo.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import { useAuth } from '../../../contexts/useAuth';

interface ProjectInfoProps {
  project: {
    id: string;
    name: string;
    nameAr: string;
    location: string;
    locationAr: string;
    category: string;
    categoryAr: string;
    isFavorited: boolean;
    completionDate: string;
  };
  onFavoriteToggle?: () => void; // Make optional since we'll handle internally
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, onFavoriteToggle }) => {
  const { currentLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { 
    isProjectFavorited,
    addProjectToFavorites,
    removeProjectFromFavorites
  } = useFavorites();
  
  const isArabic = currentLanguage.code === 'ar';
  const [showToast, setShowToast] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  
  // Check if project is actually favorited from favorites context
  const isFavorited = isProjectFavorited(parseInt(project.id));

  const content = {
    en: {
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      category: 'Category',
      location: 'Location',
      completionDate: 'Completion Date',
      projectInfo: 'Project Information',
      addedToFavorites: 'Added to favorites!',
      removedFromFavorites: 'Removed from favorites!'
    },
    ar: {
      addToFavorites: 'أضف للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      category: 'الفئة',
      location: 'الموقع',
      completionDate: 'تاريخ الانتهاء',
      projectInfo: 'معلومات المشروع',
      addedToFavorites: 'تم الإضافة للمفضلة!',
      removedFromFavorites: 'تم الإزالة من المفضلة!'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      // You could show a login prompt here or redirect to login
      return;
    }

    if (isTogglingFavorite) return;
    
    setIsTogglingFavorite(true);
    
    try {
      const projectId = parseInt(project.id);
      
      if (isFavorited) {
        await removeProjectFromFavorites(projectId);
      } else {
        await addProjectToFavorites(projectId);
      }
      
      // Call the optional external handler if provided
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
      
    } catch (error) {
      console.error('Error toggling project favorite:', error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isArabic 
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className={styles.info} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.info__container}>
        <div className={styles.info__header}>
          <div className={styles.info__title_section}>
            <h2 className={styles.info__title}>
              {isArabic ? project.nameAr : project.name}
            </h2>
            <p className={styles.info__subtitle}>{t.projectInfo}</p>
          </div>
          
          <button 
            className={`${styles.info__favorite_btn} ${isFavorited ? styles.info__favorite_btn_active : ''}`}
            onClick={handleFavoriteClick}
            disabled={isTogglingFavorite || !isAuthenticated}
            title={isFavorited ? t.removeFromFavorites : t.addToFavorites}
          >
            <Heart 
              size={24} 
              fill={isFavorited ? '#ef4444' : 'none'} 
              color={isFavorited ? '#ef4444' : '#64748b'}
            />
          </button>
        </div>

        <div className={styles.info__content}>
          <div className={styles.info__grid}>
            {/* Category */}
            <div className={styles.info__item}>
              <div className={styles.info__item_header}>
                <Tag size={20} className={styles.info__item_icon} />
                <h3 className={styles.info__item_title}>{t.category}</h3>
              </div>
              <p className={styles.info__item_value}>
                {isArabic ? project.categoryAr : project.category}
              </p>
            </div>

            {/* Location */}
            <div className={styles.info__item}>
              <div className={styles.info__item_header}>
                <MapPin size={20} className={styles.info__item_icon} />
                <h3 className={styles.info__item_title}>{t.location}</h3>
              </div>
              <p className={styles.info__item_value}>
                {isArabic ? project.locationAr : project.location}
              </p>
            </div>

            {/* Completion Date */}
            <div className={styles.info__item}>
              <div className={styles.info__item_header}>
                <Calendar size={20} className={styles.info__item_icon} />
                <h3 className={styles.info__item_title}>{t.completionDate}</h3>
              </div>
              <p className={styles.info__item_value}>
                {formatDate(project.completionDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className={`${styles.info__toast} ${styles.info__toast_show}`}>
            {project.isFavorited ? t.addedToFavorites : t.removedFromFavorites}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectInfo;