import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building, Calendar, Heart } from 'lucide-react';
import styles from '../../../styles/components/home/FeaturedProjects.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import Toast from '../common/Toast';

const FeaturedProjects: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const navigate = useNavigate();
  const [favoriteProjects, setFavoriteProjects] = React.useState<Set<number>>(new Set());
  const [toast, setToast] = React.useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  // بيانات المشاريع - 6 مشاريع ثابتة
  const projects = [
    {
      id: 1,
      slug: 'yasmin-residential-complex',
      title: isArabic ? 'مجمع الياسمين السكني' : 'Yasmin Residential Complex',
      location: isArabic ? 'شمال الرياض' : 'North Riyadh',
      status: isArabic ? 'قيد الإنشاء' : 'Under Construction',
      completion: isArabic ? '2025' : '2025',
      units: 120,
      image: 'https://images.adsttc.com/media/images/5eee/50f9/b357/658c/7f00/0125/large_jpg/00FI_V_COMPOUND_Cover.jpg?1592676562'
    },
    {
      id: 2,
      slug: 'palm-tower-commercial',
      title: isArabic ? 'برج النخيل التجاري' : 'Palm Tower Commercial',
      location: isArabic ? 'وسط جدة' : 'Central Jeddah',
      status: isArabic ? 'مكتمل' : 'Completed',
      completion: isArabic ? '2024' : '2024',
      units: 80,
      image: 'https://www.shutterstock.com/image-photo/cityscape-residential-area-modern-apartment-600nw-1723278520.jpg'
    },
    {
      id: 3,
      slug: 'smart-business-city',
      title: isArabic ? 'مدينة الأعمال الذكية' : 'Smart Business City',
      location: isArabic ? 'شرق الدمام' : 'East Dammam',
      status: isArabic ? 'قيد التخطيط' : 'Planning Phase',
      completion: isArabic ? '2026' : '2026',
      units: 200,
      image: 'https://normarch.com/wp-content/uploads/2018/05/thumb_X-ARCHITECTURE-aaaaa-La-Vista-Compound-north-coast-QU-N.RGB_color.0000.jpg.jpg.jpg'
    },
    {
      id: 4,
      slug: 'rose-family-village',
      title: isArabic ? 'قرية الورود العائلية' : 'Rose Family Village',
      location: isArabic ? 'غرب الرياض' : 'West Riyadh',
      status: isArabic ? 'قيد الإنشاء' : 'Under Construction',
      completion: isArabic ? '2025' : '2025',
      units: 150,
      image: 'https://www.omranarch.com/storage/projects/2014/1442-muhaidib-family-compound/2.jpg'
    },
    {
      id: 5,
      slug: 'diamond-commercial-center',
      title: isArabic ? 'مركز الماس التجاري' : 'Diamond Commercial Center',
      location: isArabic ? 'شمال جدة' : 'North Jeddah',
      status: isArabic ? 'متاح للبيع' : 'Available for Sale',
      completion: isArabic ? '2024' : '2024',
      units: 60,
      image: 'https://ideal-architects.com/data/77/2116/15721673489652.jpg'
    },
    {
      id: 6,
      slug: 'andalus-luxury-complex',
      title: isArabic ? 'مجمع الأندلس الفاخر' : 'Andalus Luxury Complex',
      location: isArabic ? 'جنوب الرياض' : 'South Riyadh',
      status: isArabic ? 'قيد الإنشاء' : 'Under Construction',
      completion: isArabic ? '2026' : '2026',
      units: 90,
      image: 'https://ideal-architects.com/data/77/2116/15721674722493.JPG'
    }
  ];

  const content = {
    en: {
      subtitle: 'Our Portfolio',
      title: 'Featured Projects',
      description: 'Explore our exceptional development projects that set new standards in luxury and innovation.',
      units: 'Units',
      viewDetails: 'View Details',
      exploreProjects: 'Explore Our Projects',
      favoriteAdded: 'Project added to favorites!',
      favoriteRemoved: 'Project removed from favorites!'
    },
    ar: {
      subtitle: 'أعمالنا',
      title: 'المشاريع المميزة',
      description: 'اكتشف مشاريعنا التطويرية الاستثنائية التي تضع معايير جديدة في الفخامة والابتكار.',
      units: 'وحدة',
      viewDetails: 'عرض التفاصيل',
      exploreProjects: 'استكشف مشاريعنا',
      favoriteAdded: 'تم إضافة المشروع للمفضلة!',
      favoriteRemoved: 'تم إزالة المشروع من المفضلة!'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleProjectClick = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  const handleExploreClick = () => {
    navigate('/projects');
  };

  const handleFavoriteToggle = (projectId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFavorites = new Set(favoriteProjects);
    const isCurrentlyFavorited = favoriteProjects.has(projectId);
    
    if (isCurrentlyFavorited) {
      newFavorites.delete(projectId);
    } else {
      newFavorites.add(projectId);
    }
    
    setFavoriteProjects(newFavorites);
    
    // Show toast notification
    setToast({
      show: true,
      message: isCurrentlyFavorited ? t.favoriteRemoved : t.favoriteAdded,
      type: 'success'
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };
  return (
    <section className={styles.featured} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Toast Notification */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={closeToast}
      />
      
      <div className={styles.featured__container}>
        {/* Section Header */}
        <div className={styles.featured__header}>
          <div className={styles.featured__subtitle}>
            {t.subtitle}
          </div>
          <h2 className={styles.featured__title}>
            {t.title}
          </h2>
          <p className={styles.featured__description}>
            {t.description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className={styles.featured__grid}>
          {projects.map((project) => (
            <div 
              key={project.id}
              className={styles.featured__card}
              onClick={() => handleProjectClick(project.slug)}
              style={{ cursor: 'pointer' }}
            >
              {/* Image */}
              <div className={styles["featured__card-image"]}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                />
                
                {/* Status Badge */}
                <div className={styles["featured__card-status"]}>
                  {project.status}
                </div>
                
                {/* Favorite Button */}
                <button 
                  className={`${styles["featured__card-favorite"]} ${favoriteProjects.has(project.id) ? styles["featured__card-favorite_active"] : ''}`}
                  onClick={(e) => handleFavoriteToggle(project.id, e)}
                  title={favoriteProjects.has(project.id) ? t.favoriteRemoved : t.favoriteAdded}
                >
                  <Heart 
                    size={20} 
                    fill={favoriteProjects.has(project.id) ? '#FBBF24' : 'none'} 
                  />
                </button>
              </div>

              {/* Content */}
              <div className={styles["featured__card-content"]}>
                {/* Title - محدود بـ 2 سطر */}
                <h3 className={styles["featured__card-title"]}>
                  {project.title}
                </h3>

                {/* Location */}
                <div className={styles["featured__card-location"]}>
                  <MapPin size={16} />
                  <span>{project.location}</span>
                </div>

                {/* Info Row */}
                <div className={styles["featured__card-info"]}>
                  <div className={styles["featured__card-detail"]}>
                    <Building size={14} />
                    <span>{project.units} {t.units}</span>
                  </div>
                  <div className={styles["featured__card-detail"]}>
                    <Calendar size={14} />
                    <span>{project.completion}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className={styles["featured__card-button"]}>
                  {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Projects Button */}
        <div className={styles.featured__cta}>
          <button 
            className={styles.featured__explore_btn}
            onClick={handleExploreClick}
          >
            {t.exploreProjects}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
