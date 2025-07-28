import React from 'react';
import { Building, Square, Car, ArrowUp, CheckCircle } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectOverview.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface ProjectOverviewProps {
  overview: {
    totalUnits: number;
    totalArea: string;
    parkingSpaces: number;
    elevators: number;
    features: string[];
    featuresAr: string[];
  };
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ overview }) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      title: 'Project Overview',
      totalUnits: 'Total Units',
      totalArea: 'Total Area',
      parkingSpaces: 'Parking Spaces',
      elevators: 'Elevators',
      features: 'Features & Amenities',
      sqm: 'sqm'
    },
    ar: {
      title: 'نظرة عامة على المشروع',
      totalUnits: 'إجمالي الوحدات',
      totalArea: 'إجمالي المساحة',
      parkingSpaces: 'مواقف السيارات',
      elevators: 'المصاعد',
      features: 'المزايا والخدمات',
      sqm: 'م²'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentFeatures = isArabic ? overview.featuresAr : overview.features;

  const stats = [
    {
      icon: Building,
      label: t.totalUnits,
      value: overview.totalUnits.toLocaleString(isArabic ? 'ar-SA' : 'en-US'),
      color: '#3b82f6'
    },
    {
      icon: Square,
      label: t.totalArea,
      value: `${parseInt(overview.totalArea).toLocaleString(isArabic ? 'ar-SA' : 'en-US')} ${t.sqm}`,
      color: '#10b981'
    },
    {
      icon: Car,
      label: t.parkingSpaces,
      value: overview.parkingSpaces.toLocaleString(isArabic ? 'ar-SA' : 'en-US'),
      color: '#f59e0b'
    },
    {
      icon: ArrowUp,
      label: t.elevators,
      value: overview.elevators.toLocaleString(isArabic ? 'ar-SA' : 'en-US'),
      color: '#ef4444'
    }
  ];

  return (
    <section className={styles.overview} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.overview__container}>
        <h2 className={styles.overview__title}>{t.title}</h2>
        
        {/* Statistics Grid */}
        <div className={styles.overview__stats}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={styles.overview__stat_card}
              style={{ '--stat-color': stat.color } as React.CSSProperties}
            >
              <div className={styles.overview__stat_icon}>
                <stat.icon size={32} />
              </div>
              <div className={styles.overview__stat_content}>
                <h3 className={styles.overview__stat_value}>{stat.value}</h3>
                <p className={styles.overview__stat_label}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className={styles.overview__features_section}>
          <h3 className={styles.overview__features_title}>{t.features}</h3>
          <div className={styles.overview__features_grid}>
            {currentFeatures.map((feature, index) => (
              <div key={index} className={styles.overview__feature_item}>
                <CheckCircle size={20} className={styles.overview__feature_icon} />
                <span className={styles.overview__feature_text}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;