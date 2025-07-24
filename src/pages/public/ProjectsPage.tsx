import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Breadcrumb, 
  ProjectFilter, 
  ProjectCard, 
  Pagination,
  type ActiveFilters,
  type Project 
} from '../../components/ui/projects';
import styles from '../../styles/pages/ProjectsPage.module.css';
import { useLanguage } from '../../contexts/useLanguage';

const ProjectsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ActiveFilters>({
    status: '',
    district: '',
    city: '',
    area: ''
  });
  
  const itemsPerPage = 6;

  const content = {
    en: {
      pageTitle: 'Our Projects',
      pageDescription: 'Discover our exceptional real estate developments across Saudi Arabia',
      sectionTitle: 'Featured Projects',
      sectionDescription: 'Explore our diverse portfolio of residential and commercial developments designed to meet your lifestyle and investment needs.',
      breadcrumbItems: [
        { label: 'Home', href: '/' },
        { label: 'Projects' }
      ]
    },
    ar: {
      pageTitle: 'مشاريعنا',
      pageDescription: 'اكتشف مشاريعنا العقارية الاستثنائية في جميع أنحاء المملكة العربية السعودية',
      sectionTitle: 'المشاريع المميزة',
      sectionDescription: 'استكشف محفظتنا المتنوعة من التطويرات السكنية والتجارية المصممة لتلبية احتياجات نمط حياتك الاستثمارية.',
      breadcrumbItems: [
        { label: 'الرئيسية', href: '/' },
        { label: 'المشاريع' }
      ]
    }
  };

  const t = isArabic ? content.ar : content.en;

  // Mock projects data
  const allProjects: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Balance Residence',
      titleAr: 'مقر بالانس',
      description: 'Luxury residential complex with modern amenities and stunning city views.',
      descriptionAr: 'مجمع سكني فاخر مع وسائل الراحة الحديثة وإطلالات خلابة على المدينة.',
      image: 'https://ideal-architects.com/data/77/2116/15721673489652.jpg',
      location: 'Olaya District, Riyadh',
      locationAr: 'حي العليا، الرياض',
      status: 'available',
      district: 'riyadh',
      city: 'north',
      area: 'olaya',
      price: 'Starting from 850,000 SAR',
      priceAr: 'يبدأ من 850,000 ريال',
      completionDate: '2025',
      units: 120,
      slug: 'balance-residence'
    },
    {
      id: 2,
      title: 'Urban Heights',
      titleAr: 'المرتفعات الحضرية',
      description: 'Contemporary commercial tower in the heart of the business district.',
      descriptionAr: 'برج تجاري معاصر في قلب الحي التجاري.',
      image: 'https://ideal-architects.com/data/77/2116/15721674722493.JPG',
      location: 'King Fahd Road, Riyadh',
      locationAr: 'طريق الملك فهد، الرياض',
      status: 'comingSoon',
      district: 'riyadh',
      city: 'east',
      area: 'sahafa',
      price: 'Starting from 1,200,000 SAR',
      priceAr: 'يبدأ من 1,200,000 ريال',
      completionDate: '2026',
      units: 80,
      slug: 'urban-heights'
    },
    {
      id: 3,
      title: 'Green Valley',
      titleAr: 'الوادي الأخضر',
      description: 'Eco-friendly residential community with parks and recreational facilities.',
      descriptionAr: 'مجتمع سكني صديق للبيئة مع حدائق ومرافق ترفيهية.',
      image: 'https://images.squarespace-cdn.com/content/v1/616c31383a6fd661d13b21df/1640311031879-NGK4HWKU8VUVF3P0ICOF/Cam_003.jpg',
      location: 'Malqa District, Riyadh',
      locationAr: 'حي الملقا، الرياض',
      status: 'available',
      district: 'riyadh',
      city: 'north',
      area: 'malqa',
      price: 'Starting from 750,000 SAR',
      priceAr: 'يبدأ من 750,000 ريال',
      completionDate: '2025',
      units: 200,
      slug: 'green-valley'
    },
    {
      id: 4,
      title: 'Coastal Pearl',
      titleAr: 'لؤلؤة الساحل',
      description: 'Luxury beachfront development with marina and resort amenities.',
      descriptionAr: 'تطوير فاخر على شاطئ البحر مع مرسى ومرافق منتجع.',
      image: 'https://newcapital-developments.com/wp-content/uploads/2023/12/apartments-For-Sale-in-Oia-New-Capital-Compound.jpg',
      location: 'Corniche, Jeddah',
      locationAr: 'الكورنيش، جدة',
      status: 'comingSoon',
      district: 'jeddah',
      city: 'west',
      area: 'corniche',
      price: 'Starting from 2,500,000 SAR',
      priceAr: 'يبدأ من 2,500,000 ريال',
      completionDate: '2027',
      units: 60,
      slug: 'coastal-pearl'
    },
    {
      id: 5,
      title: 'Business Hub',
      titleAr: 'مركز الأعمال',
      description: 'Mixed-use development combining offices, retail, and residential units.',
      descriptionAr: 'تطوير متعدد الاستخدامات يجمع بين المكاتب والتجزئة والوحدات السكنية.',
      image: 'https://mgd.com.eg/wp-content/uploads/2024/12/Dream-Heaven-Mini-Compound-arabic-1_Page_03.webp',
      location: 'Al Sulaimaniya, Riyadh',
      locationAr: 'السليمانية، الرياض',
      status: 'available',
      district: 'riyadh',
      city: 'south',
      area: 'sulaimaniya',
      price: 'Starting from 950,000 SAR',
      priceAr: 'يبدأ من 950,000 ريال',
      completionDate: '2025',
      units: 150,
      slug: 'business-hub'
    },
    {
      id: 6,
      title: 'Heritage Square',
      titleAr: 'ساحة التراث',
      description: 'Traditional architectural design with modern conveniences.',
      descriptionAr: 'تصميم معماري تقليدي مع وسائل الراحة الحديثة.',
      image: 'https://mgd.com.eg/wp-content/uploads/2024/05/WhatsApp-Image-2024-11-05-at-14.53.16.webp',
      location: 'Old Dammam, Dammam',
      locationAr: 'الدمام القديمة، الدمام',
      status: 'available',
      district: 'dammam',
      city: 'east',
      area: 'old-dammam',
      price: 'Starting from 680,000 SAR',
      priceAr: 'يبدأ من 680,000 ريال',
      completionDate: '2025',
      units: 90,
      slug: 'heritage-square'
    },
    {
      id: 7,
      title: 'Skyline Plaza',
      titleAr: 'بلازا الأفق',
      description: 'High-rise residential tower with panoramic city views.',
      descriptionAr: 'برج سكني شاهق مع إطلالات بانورامية على المدينة.',
      image: 'https://newcairo-developments.com/wp-content/uploads/2024/03/Prices-and-spaces-of-At-East-El-Mostakbal-Compound.jpg',
      location: 'Al Khobar, Eastern Province',
      locationAr: 'الخبر، المنطقة الشرقية',
      status: 'comingSoon',
      district: 'khobar',
      city: 'north',
      area: 'khobar-north',
      price: 'Starting from 1,100,000 SAR',
      priceAr: 'يبدأ من 1,100,000 ريال',
      completionDate: '2026',
      units: 100,
      slug: 'skyline-plaza'
    },
    {
      id: 8,
      title: 'Garden Oasis',
      titleAr: 'واحة الحديقة',
      description: 'Family-friendly community with extensive green spaces.',
      descriptionAr: 'مجتمع مناسب للعائلة مع مساحات خضراء واسعة.',
      image: 'https://images.adsttc.com/media/images/5eee/50f9/b357/658c/7f00/0125/large_jpg/00FI_V_COMPOUND_Cover.jpg?1592676562',
      location: 'Sahafa District, Riyadh',
      locationAr: 'حي الصحافة، الرياض',
      status: 'available',
      district: 'riyadh',
      city: 'east',
      area: 'sahafa',
      price: 'Starting from 720,000 SAR',
      priceAr: 'يبدأ من 720,000 ريال',
      completionDate: '2025',
      units: 180,
      slug: 'garden-oasis'
    },
    {
      id: 9,
      title: 'Royal Courts',
      titleAr: 'الساحات الملكية',
      description: 'Premium villas with private gardens and luxury finishes.',
      descriptionAr: 'فلل مميزة مع حدائق خاصة وتشطيبات فاخرة.',
      image: 'https://www.shutterstock.com/image-photo/cityscape-residential-area-modern-apartment-600nw-1723278520.jpg',
      location: 'Diplomatic Quarter, Riyadh',
      locationAr: 'الحي الدبلوماسي، الرياض',
      status: 'comingSoon',
      district: 'riyadh',
      city: 'west',
      area: 'diplomatic',
      price: 'Starting from 3,500,000 SAR',
      priceAr: 'يبدأ من 3,500,000 ريال',
      completionDate: '2027',
      units: 40,
      slug: 'royal-courts'
    },
    {
      id: 10,
      title: 'Waterfront Plaza',
      titleAr: 'بلازا الواجهة المائية',
      description: 'Modern waterfront development with marina views.',
      descriptionAr: 'تطوير عصري على الواجهة المائية مع إطلالات على المرسى.',
      image: 'https://normarch.com/wp-content/uploads/2018/05/thumb_X-ARCHITECTURE-aaaaa-La-Vista-Compound-north-coast-QU-N.RGB_color.0000.jpg.jpg.jpg',
      location: 'Corniche, Jeddah',
      locationAr: 'الكورنيش، جدة',
      status: 'available',
      district: 'jeddah',
      city: 'west',
      area: 'corniche',
      price: 'Starting from 1,800,000 SAR',
      priceAr: 'يبدأ من 1,800,000 ريال',
      completionDate: '2025',
      units: 75,
      slug: 'waterfront-plaza'
    },
    {
      id: 11,
      title: 'City Center',
      titleAr: 'مركز المدينة',
      description: 'Prime location mixed-use development in city center.',
      descriptionAr: 'تطوير متعدد الاستخدامات في موقع مميز في وسط المدينة.',
      image: 'https://www.omranarch.com/storage/projects/2014/1442-muhaidib-family-compound/2.jpg',
      location: 'Downtown, Riyadh',
      locationAr: 'وسط المدينة، الرياض',
      status: 'comingSoon',
      district: 'riyadh',
      city: 'central',
      area: 'downtown',
      price: 'Starting from 1,500,000 SAR',
      priceAr: 'يبدأ من 1,500,000 ريال',
      completionDate: '2026',
      units: 95,
      slug: 'city-center'
    },
    {
      id: 12,
      title: 'Desert Oasis',
      titleAr: 'واحة الصحراء',
      description: 'Luxury resort-style residential community.',
      descriptionAr: 'مجتمع سكني فاخر على طراز المنتجع.',
      image: 'https://ideal-architects.com/data/77/2116/15721674722493.JPG',
      location: 'Al Kharj Road, Riyadh',
      locationAr: 'طريق الخرج، الرياض',
      status: 'available',
      district: 'riyadh',
      city: 'south',
      area: 'kharj-road',
      price: 'Starting from 900,000 SAR',
      priceAr: 'يبدأ من 900,000 ريال',
      completionDate: '2025',
      units: 160,
      slug: 'desert-oasis'
    }
  ], []);

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      if (filters.status && project.status !== filters.status) return false;
      if (filters.district && project.district !== filters.district) return false;
      if (filters.city && project.city !== filters.city) return false;
      if (filters.area && project.area !== filters.area) return false;
      return true;
    });
  }, [filters, allProjects]);

  // Paginate filtered projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handleFilterChange = (newFilters: ActiveFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (slug: string) => {
    // Navigate to project details page using React Router
    navigate(`/projects/${slug}`);
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={t.breadcrumbItems}
        title={t.pageTitle}
        description={t.pageDescription}
        backgroundImage="https://images.adsttc.com/media/images/5eee/50f9/b357/658c/7f00/0125/large_jpg/00FI_V_COMPOUND_Cover.jpg?1592676562"
      />

      {/* Projects Section */}
      <section className={styles.projects} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={styles.projects__container}>
          {/* Section Header */}
          <div className={styles.projects__header}>
            <div className={styles.projects__subtitle}>
              {t.sectionTitle}
            </div>
            <h2 className={styles.projects__title}>
              {t.pageTitle}
            </h2>
            <p className={styles.projects__description}>
              {t.sectionDescription}
            </p>
          </div>

          {/* Filter */}
          <ProjectFilter
            onFilterChange={handleFilterChange}
            totalCount={allProjects.length}
            filteredCount={filteredProjects.length}
          />

          {/* Projects Grid */}
          {paginatedProjects.length > 0 ? (
            <div className={styles.projects__grid}>
              {paginatedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className={styles.projects__empty}>
              <p>{isArabic ? 'لم يتم العثور على مشاريع' : 'No projects found'}</p>
            </div>
          )}

          {/* Pagination */}
          {filteredProjects.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredProjects.length}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
