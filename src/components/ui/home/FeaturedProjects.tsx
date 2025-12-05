import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building, Calendar, Heart } from 'lucide-react';
import styles from '../../../styles/components/home/FeaturedProjects.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import Toast from '../common/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { getProjectsAPi, Project } from '../../../store/slices/ProjectSlice';
import ProjectCardSkeleton from '../shared/ProjectCardSkeleton';
import { useAuth } from '../../../contexts';

const FeaturedProjects: React.FC = () => {
  //#region Code
  const { currentLanguage } = useLanguage();
  const {
    isProjectFavorited,
    addProjectToFavorites,
    removeProjectFromFavorites,
    favoriteUnits,
    favoriteProjects,
    isLoading: favoriteProjectsLoading
  } = useFavorites();
  const { user, isAuthenticated } = useAuth();

  const isArabic = currentLanguage.code === 'ar';
  const navigate = useNavigate();
  const [toast, setToast] = React.useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });



  const content = {
    en: {
      subtitle: 'Our Portfolio',
      title: 'Featured Projects',
      description: 'Explore our exceptional development projects that set new standards in luxury and innovation.',
      units: 'Units',
      viewDetails: 'View Details',
      exploreProjects: 'Explore Our Projects',
      favoriteAdded: 'Project added to favorites!',
      favoriteRemoved: 'Project removed from favorites!',
      noProjects: "No Projects Added Yet",
      errorFetch: "Something Went Bad! Try Again Later",
    },
    ar: {
      subtitle: 'أعمالنا',
      title: 'المشاريع المميزة',
      description: 'اكتشف مشاريعنا التطويرية الاستثنائية التي تضع معايير جديدة في الفخامة والابتكار.',
      units: 'وحدة',
      viewDetails: 'عرض التفاصيل',
      exploreProjects: 'استكشف مشاريعنا',
      favoriteAdded: 'تم إضافة المشروع للمفضلة!',
      favoriteRemoved: 'تم إزالة المشروع من المفضلة!',
      noProjects: "لم يتم اضافة مشاريع جديدة بعد",
      errorFetch: "حدث خطاء اثناء جلب البيانات , حاول مجددا لاجقا ",


    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleProjectClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const handleExploreClick = () => {
    navigate('/projects');
  };

  const handleFavoriteToggle = async (projectId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const isCurrentlyFavorited = isProjectFavorited(projectId);

    try {
      if (isCurrentlyFavorited) {
        await removeProjectFromFavorites(projectId);
      } else {
        await addProjectToFavorites(projectId);
      }
    } catch (error) {
      // Error is already handled by the context and toast is shown
      console.error('Error toggling favorite:', error);
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };
  //#endregion Code

  // #region Api Fetch Data

  const { projects: {
    data, loading, error
  } } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();



  const AuthAndFetchData = () => {
    // if the user is auth , if the fave apis loading is false , then dispatch project , 
    // if user is not auth , dispatch project direct 
    if (isAuthenticated) {
      !favoriteProjectsLoading && dispatch(getProjectsAPi({
        IsActive: true,
        IsFeatured: true
      }));
    } else {
      dispatch(getProjectsAPi({
          IsActive: true,
          IsFeatured: true
      }));
  }
}


useEffect(() => {
  AuthAndFetchData()
}, [isAuthenticated]);



useEffect(() => {
  !loading && data?.items?.length !== 0 && console.log("Fetch Data ", data);
  console.log(error);

}, [data]);





// #endregion Api Fetch Data 


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

      {loading ? <>
        <div className={styles.featured__grid}>
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </> : error !== null ? <>
        <p style={{ textAlign: "center", fontSize: "2rem" }}>{t.errorFetch} </p>
      </> :
        data && data?.items && data?.items?.length !== 0 ?
          <>
            <div className={styles.featured__grid}>
              {data.items.map((project: Project) => (
                <HomeProjectCard
                  handleFavoriteToggle={handleFavoriteToggle}
                  handleProjectClick={handleProjectClick}
                  isProjectFavorited={isProjectFavorited}
                  project={project}
                  key={project.id}
                  t={t}
                  language={isArabic ? "AR" : "EN"}
                />
              ))}
            </div>
            < div className={styles.featured__cta}>
              <button
                className={styles.featured__explore_btn}
                onClick={handleExploreClick}
              >
                {t.exploreProjects}
              </button>
            </div>
          </>
          : <>
            <p style={{ textAlign: "center", fontSize: "2rem" }}>{t.noProjects} </p>
          </>
      }
    </div>
  </section >
);
};


interface contentInterface {
  subtitle: string,
  title: string,
  description: string,
  units: string,
  viewDetails: string,
  exploreProjects: string,
  favoriteAdded: string,
  favoriteRemoved: string

}


interface HomeProjectCardProps {
  project: Project,
  language: string,
  t: contentInterface,
  isProjectFavorited: (projectId: number) => boolean,
  handleProjectClick: (slug: string) => void,
  handleFavoriteToggle: (projectId: number, event: React.MouseEvent) => void
}


const HomeProjectCard: React.FC<HomeProjectCardProps> = ({ project, t, language, isProjectFavorited, handleFavoriteToggle, handleProjectClick }) => {
  return <>
    <div
      className={styles.featured__card}
      onClick={() => handleProjectClick(`${project.id}`)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div className={styles["featured__card-image"]}>
        <img
          src={project.mainImageUrl}
          alt={project.nameEn}
        />

        {/* Status Badge */}
        <div className={styles["featured__card-status"]}>
          {language === "AR" ? project.statusName : project.statusNameEn}

        </div>

        {/* Favorite Button */}
        <button
          className={`${styles["featured__card-favorite"]} ${isProjectFavorited(project.id) ? styles["featured__card-favorite_active"] : ''}`}
          onClick={(e) => handleFavoriteToggle(project.id, e)}
          title={isProjectFavorited(project.id) ? t.favoriteRemoved : t.favoriteAdded}
        >
          <Heart
            size={20}
            fill={isProjectFavorited(project.id) ? '#FBBF24' : 'none'}
          />
        </button>
      </div>

      {/* Content */}
      <div className={styles["featured__card-content"]}>
        {/* Title - محدود بـ 2 سطر */}
        <h3 className={styles["featured__card-title"]}>
          {language === "AR" ? project.nameAr : project.nameEn}
        </h3>

        {/* Location */}
        <div className={styles["featured__card-location"]}>
          <MapPin size={16} />
          <span>{language === "AR" ? project.locationAr : project.locationEn}</span>
        </div>

        {/* Info Row */}
        <div className={styles["featured__card-info"]}>
          <div className={styles["featured__card-detail"]}>
            <Building size={14} />
            <span>{project.countOfUnits} {t.units}</span>
          </div>
          <div className={styles["featured__card-detail"]}>
            <Calendar size={14} />
            <span>{project.estimatedCompletionDate}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className={styles["featured__card-button"]}>
          {t.viewDetails}
        </button>
      </div>
    </div>

  </>
}




export default FeaturedProjects;
