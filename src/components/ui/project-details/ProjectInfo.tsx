import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Tag } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectInfo.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

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
  onFavoriteToggle: () => void;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, onFavoriteToggle }) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const [showToast, setShowToast] = useState(false);

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

  const handleFavoriteClick = () => {
    onFavoriteToggle();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
            className={`${styles.info__favorite_btn} ${project.isFavorited ? styles.info__favorite_btn_active : ''}`}
            onClick={handleFavoriteClick}
            title={project.isFavorited ? t.removeFromFavorites : t.addToFavorites}
          >
            <Heart 
              size={24} 
              fill={project.isFavorited ? '#ef4444' : 'none'} 
              color={project.isFavorited ? '#ef4444' : '#64748b'}
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