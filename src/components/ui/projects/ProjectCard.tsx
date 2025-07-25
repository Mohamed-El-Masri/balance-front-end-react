import React from 'react';
import { MapPin, Calendar, Eye, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import styles from '../../../styles/components/projects/ProjectCard.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

export interface Project {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  location: string;
  locationAr: string;
  status: 'available' | 'comingSoon';
  district: string;
  city: string;
  area: string;
  price?: string;
  priceAr?: string;
  completionDate: string;
  units?: number;
  slug: string;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (slug: string) => void;
  onFavoriteToggle?: (projectId: number) => void;
  isFavorited?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onViewDetails, 
  onFavoriteToggle,
  isFavorited = false 
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      viewDetails: 'View Details',
      available: 'Available',
      comingSoon: 'Coming Soon',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      units: 'units',
      completionDate: 'Completion'
    },
    ar: {
      viewDetails: 'عرض التفاصيل',
      available: 'متاح',
      comingSoon: 'قريباً',
      addToFavorites: 'أضف للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      units: 'وحدة',
      completionDate: 'تاريخ الإنجاز'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const projectData = {
    title: isArabic ? project.titleAr : project.title,
    description: isArabic ? project.descriptionAr : project.description,
    location: isArabic ? project.locationAr : project.location,
    price: isArabic ? project.priceAr : project.price
  };

  const getStatusText = (status: string) => {
    return status === 'available' ? t.available : t.comingSoon;
  };

  const getStatusClass = (status: string) => {
    return status === 'available' 
      ? styles.project_card__status_available 
      : styles.project_card__status_coming;
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(project.id);
    }
  };
  return (
    <div className={styles.project_card} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Image */}
      <div className={styles.project_card__image_container}>
        <img 
          src={project.image} 
          alt={projectData.title}
          className={styles.project_card__image}
        />
        
        {/* Status Badge */}
        <div className={`${styles.project_card__status} ${getStatusClass(project.status)}`}>
          {getStatusText(project.status)}
        </div>

        {/* Favorite Button */}
        {onFavoriteToggle && (
          <button 
            className={`${styles.project_card__favorite} ${isFavorited ? styles.project_card__favorite_active : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorited ? t.removeFromFavorites : t.addToFavorites}
          >
            <Heart 
              size={20} 
              fill={isFavorited ? '#FBBF24' : 'none'} 
            />
          </button>
        )}

        {/* View Overlay */}
        <div className={styles.project_card__overlay}>
          <button 
            className={styles.project_card__view_btn}
            onClick={() => onViewDetails(project.slug)}
          >
            <Eye size={20} />
            <span>{t.viewDetails}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.project_card__content}>
        {/* Header */}
        <div className={styles.project_card__header}>
          <h3 className={styles.project_card__title}>
            {projectData.title}
          </h3>
          {projectData.price && (
            <div className={styles.project_card__price}>
              {projectData.price}
            </div>
          )}
        </div>

        {/* Description */}
        <p className={styles.project_card__description}>
          {projectData.description}
        </p>

        {/* Meta Info */}
        <div className={styles.project_card__meta}>
          <div className={styles.project_card__meta_item}>
            <MapPin size={16} />
            <span>{projectData.location}</span>
          </div>
          
          <div className={styles.project_card__meta_item}>
            <Calendar size={16} />
            <span>{t.completionDate}: {project.completionDate}</span>
          </div>
          
          {project.units && (
            <div className={styles.project_card__meta_item}>
              <span>{project.units} {t.units}</span>
            </div>
          )}
        </div>

        {/* Action */}
        <button 
          className={styles.project_card__action}
          onClick={() => onViewDetails(project.slug)}
        >
          <span>{t.viewDetails}</span>
          {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
