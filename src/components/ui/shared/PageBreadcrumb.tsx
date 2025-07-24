import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, MapPin } from 'lucide-react';
import styles from '../../../styles/components/shared/PageBreadcrumb.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PageBreadcrumbProps {
  title: string;
  titleAr: string;
  location?: string;
  locationAr?: string;
  backgroundImage?: string;
  propertyType?: string;
  propertyTypeAr?: string;
  projectName?: string;
  projectNameAr?: string;
  projectSlug?: string;
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  title,
  titleAr,
  location,
  locationAr,
  backgroundImage,
  propertyType,
  propertyTypeAr,
  projectName,
  projectNameAr,
  projectSlug
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const routeLocation = useLocation();
  
  const isProjectsPage = routeLocation.pathname === '/projects';
  const isPropertyDetailsPage = routeLocation.pathname.includes('/properties/');
  const isProjectDetailsPage = routeLocation.pathname.includes('/projects/') && !isProjectsPage;

  const content = {
    en: {
      home: 'Home',
      projects: 'Projects',
      properties: 'Properties',
      projectDetails: 'Project Details',
      propertyDetails: 'Property Details'
    },
    ar: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      properties: 'العقارات',
      projectDetails: 'تفاصيل المشروع',
      propertyDetails: 'تفاصيل العقار'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const getCurrentPageTitle = () => {
    if (isProjectsPage) return t.projects;
    if (isProjectDetailsPage) return t.projectDetails;
    if (isPropertyDetailsPage) return t.propertyDetails;
    return isArabic ? titleAr : title;
  };

  const getBreadcrumbNavigation = () => {
    const homeLink = (
      <Link to="/" className={styles.breadcrumb__link}>
        <Home size={16} />
        {t.home}
      </Link>
    );

    const separator = <ChevronRight size={16} className={styles.breadcrumb__separator} />;

    if (isProjectsPage) {
      return (
        <>
          {homeLink}
          {separator}
          <span className={styles.breadcrumb__current}>{t.projects}</span>
        </>
      );
    }

    if (isProjectDetailsPage) {
      return (
        <>
          {homeLink}
          {separator}
          <Link to="/projects" className={styles.breadcrumb__link}>
            {t.projects}
          </Link>
          {separator}
          <span className={styles.breadcrumb__current}>{t.projectDetails}</span>
        </>
      );
    }

    if (isPropertyDetailsPage) {
      if (projectName && projectSlug) {
        // Property within a project: Home / Projects / Project Name / Property Name
        return (
          <>
            {homeLink}
            {separator}
            <Link to="/projects" className={styles.breadcrumb__link}>
              {t.projects}
            </Link>
            {separator}
            <Link to={`/projects/${projectSlug}`} className={styles.breadcrumb__link}>
              {isArabic ? projectNameAr : projectName}
            </Link>
            {separator}
            <span className={styles.breadcrumb__current}>
              {isArabic ? titleAr : title}
            </span>
          </>
        );
      } else {
        // Standalone property: Home / Properties / Property Name
        return (
          <>
            {homeLink}
            {separator}
            <Link to="/properties" className={styles.breadcrumb__link}>
              {t.properties}
            </Link>
            {separator}
            <span className={styles.breadcrumb__current}>
              {isArabic ? titleAr : title}
            </span>
          </>
        );
      }
    }

    // Default breadcrumb for other pages
    return (
      <>
        {homeLink}
        {separator}
        <span className={styles.breadcrumb__current}>{getCurrentPageTitle()}</span>
      </>
    );
  };

  return (
    <section 
      className={styles.breadcrumb} 
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className={styles.breadcrumb__overlay}></div>
      <div className={styles.breadcrumb__container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb__nav}>
          {getBreadcrumbNavigation()}
        </nav>

        {/* Page Info */}
        <div className={styles.breadcrumb__content}>
          <div className={styles.breadcrumb__header}>
            {propertyType && (
              <div className={styles.breadcrumb__type}>
                {isArabic ? propertyTypeAr : propertyType}
              </div>
            )}
            <h1 className={styles.breadcrumb__title}>
              {isArabic ? titleAr : title}
            </h1>
          </div>
          {location && (
            <div className={styles.breadcrumb__location}>
              <MapPin size={20} />
              <span>{isArabic ? locationAr : location}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBreadcrumb;
