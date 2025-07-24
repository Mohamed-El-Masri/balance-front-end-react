import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/common/LoadingSpinner';
import Toast from '../../components/ui/common/Toast';
import ProjectBreadcrumb from '../../components/ui/project-details/ProjectBreadcrumb';
import ProjectGallery from '../../components/ui/project-details/ProjectGallery';
import ProjectInfo from '../../components/ui/project-details/ProjectInfo';
import ProjectDescription from '../../components/ui/project-details/ProjectDescription';
import ProjectOverview from '../../components/ui/project-details/ProjectOverview';
import ProjectVideo from '../../components/ui/project-details/ProjectVideo';
import ProjectLocationMap from '../../components/ui/project-details/ProjectLocationMap';
import ProjectProperties from '../../components/ui/project-details/ProjectProperties';
import RegisterInterest from '../../components/ui/project-details/RegisterInterest';
import { useLanguage } from '../../contexts/useLanguage';
import type { Property } from '../../components/ui/project-details/index';

interface InterestFormData {
  fullName: string;
  email: string;
  phone: string;
  interestedIn: string;
  preferredContact: string;
  visitDate: string;
  numberOfPeople: number;
  message: string;
}

// Mock data - في التطبيق الحقيقي سيأتي من API
const mockProjectData = {
  id: '1',
  name: 'Balance Residence',
  nameAr: 'مشروع بالانس ريزيدنس',
  location: 'Riyadh, King Fahd District',
  locationAr: 'الرياض، حي الملك فهد',
  images: [
    'https://images.adsttc.com/media/images/5eee/50f9/b357/658c/7f00/0125/large_jpg/00FI_V_COMPOUND_Cover.jpg?1592676562',
    'https://www.shutterstock.com/image-photo/cityscape-residential-area-modern-apartment-600nw-1723278520.jpg',
    'https://normarch.com/wp-content/uploads/2018/05/thumb_X-ARCHITECTURE-aaaaa-La-Vista-Compound-north-coast-QU-N.RGB_color.0000.jpg.jpg.jpg',
    'https://www.omranarch.com/storage/projects/2014/1442-muhaidib-family-compound/2.jpg',
    'https://ideal-architects.com/data/77/2116/15721673489652.jpg'
  ],
  category: 'Residential',
  categoryAr: 'سكني',
  isFavorited: false,
  rating: 4.8,
  completionDate: '2025-12-31',
  description: 'Balance Residence offers luxurious living spaces with modern amenities in the heart of Riyadh. The project features contemporary architecture, premium finishes, and a prime location with easy access to major attractions and business districts.',
  descriptionAr: 'يقدم مشروع بالانس ريزيدنس مساحات معيشية فاخرة مع وسائل الراحة الحديثة في قلب الرياض. يتميز المشروع بالهندسة المعمارية المعاصرة واللمسات الأخيرة المتميزة وموقع رئيسي مع سهولة الوصول إلى المعالم الرئيسية والمناطق التجارية.',
  overview: {
    totalUnits: 200,
    totalArea: '50000',
    parkingSpaces: 250,
    elevators: 8,
    features: [
      'Swimming Pool',
      'Gym & Fitness Center',
      'Children Playground',
      'Garden & Landscaping',
      '24/7 Security',
      'Smart Home System'
    ],
    featuresAr: [
      'مسبح',
      'صالة رياضية ومركز لياقة',
      'ملعب أطفال',
      'حديقة وتنسيق',
      'أمن 24/7',
      'نظام منزل ذكي'
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  coordinates: {
    lat: 24.7136,
    lng: 46.6753
  },
  address: 'King Fahd District, Riyadh 12271, Saudi Arabia',
  addressAr: 'حي الملك فهد، الرياض 12271، المملكة العربية السعودية',
  properties: [
    {
      id: 'prop1',
      name: 'Luxury Apartment A1',
      nameAr: 'شقة فاخرة أ1',
      type: '2 Bedroom Apartment',
      typeAr: 'شقة بغرفتين نوم',
      price: 850000,
      area: 120,
      bedrooms: 2,
      bathrooms: 2,
      floor: 5,
      building: 'Building A',
      buildingAr: 'المبنى أ',
      features: ['Balcony', 'City View', 'Parking'],
      featuresAr: ['شرفة', 'إطلالة على المدينة', 'موقف سيارة'],
      images: ['https://ideal-architects.com/data/77/2116/15721674722493.JPG', 'https://images.squarespace-cdn.com/content/v1/616c31383a6fd661d13b21df/1640311031879-NGK4HWKU8VUVF3P0ICOF/Cam_003.jpg'],
      status: 'available' as const,
      isFavorited: false
    },
    {
      id: 'prop2',
      name: 'Deluxe Suite B2',
      nameAr: 'جناح فاخر ب2',
      type: '3 Bedroom Apartment',
      typeAr: 'شقة بثلاث غرف نوم',
      price: 1200000,
      area: 180,
      bedrooms: 3,
      bathrooms: 3,
      floor: 8,
      building: 'Building B',
      buildingAr: 'المبنى ب',
      features: ['Garden View', 'Storage Room', 'Maid Room'],
      featuresAr: ['إطلالة على الحديقة', 'غرفة تخزين', 'غرفة خادمة'],
      images: ['https://newcapital-developments.com/wp-content/uploads/2023/12/apartments-For-Sale-in-Oia-New-Capital-Compound.jpg', 'https://mgd.com.eg/wp-content/uploads/2024/12/Dream-Heaven-Mini-Compound-arabic-1_Page_03.webp'],
      status: 'reserved' as const,
      isFavorited: true
    },
    {
      id: 'prop3',
      name: 'Penthouse C1',
      nameAr: 'بنتهاوس ج1',
      type: '4 Bedroom Penthouse',
      typeAr: 'بنتهاوس بأربع غرف نوم',
      price: 2500000,
      area: 300,
      bedrooms: 4,
      bathrooms: 4,
      floor: 15,
      building: 'Building C',
      buildingAr: 'المبنى ج',
      features: ['Roof Terrace', 'Private Elevator', 'Jacuzzi'],
      featuresAr: ['تراس علوي', 'مصعد خاص', 'جاكوزي'],
      images: ['https://mgd.com.eg/wp-content/uploads/2024/05/WhatsApp-Image-2024-11-05-at-14.53.16.webp', 'https://newcairo-developments.com/wp-content/uploads/2024/03/Prices-and-spaces-of-At-East-El-Mostakbal-Compound.jpg'],
      status: 'sold' as const,
      isFavorited: false
    }
  ]
};

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  
  const [projectData, setProjectData] = useState(mockProjectData);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const content = {
    en: {
      loadingProject: 'Loading Project Details...',
      favoriteAdded: 'Property added to favorites!',
      favoriteRemoved: 'Property removed from favorites!'
    },
    ar: {
      loadingProject: 'جاري تحميل تفاصيل المشروع...',
      favoriteAdded: 'تم إضافة العقار للمفضلة!',
      favoriteRemoved: 'تم إزالة العقار من المفضلة!'
    }
  };

  const t = isArabic ? content.ar : content.en;

  useEffect(() => {
    // محاكاة تحميل البيانات من API باستخدام slug/id
    const fetchProjectData = async () => {
      setLoading(true);
      
      // Scroll to top when loading starts
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      try {
        // في التطبيق الحقيقي:
        // const response = await api.getProjectBySlug(id);
        // setProjectData(response.data);
        
        // محاكاة وقت التحميل
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // في الوقت الحالي نستخدم نفس البيانات، لكن يمكن تخصيصها حسب الـ slug
        setProjectData({
          ...mockProjectData,
          id: id || '1', // استخدام id من URL
        });
        
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleFavoriteToggle = () => {
    setProjectData(prev => ({
      ...prev,
      isFavorited: !prev.isFavorited
    }));
  };

  const handlePropertyFavoriteToggle = (propertyId: string) => {
    let isAdded = false;
    
    setProjectData(prev => {
      const updatedProperties = prev.properties.map(property => {
        if (property.id === propertyId) {
          isAdded = !property.isFavorited;
          return { ...property, isFavorited: !property.isFavorited };
        }
        return property;
      });
      
      return {
        ...prev,
        properties: updatedProperties
      };
    });
    
    // Show toast notification
    setToast({
      show: true,
      message: isAdded ? t.favoriteAdded : t.favoriteRemoved,
      type: 'success'
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const handlePropertyClick = (property: Property) => {
    console.log('Property clicked:', property);
    // يمكن إضافة navigation إلى صفحة تفاصيل العقار
  };

  const handleInterestSubmit = (data: InterestFormData) => {
    console.log('Interest submitted:', data);
    // يمكن إضافة API call لحفظ البيانات
  };

  if (loading) {
    return (
      <LoadingSpinner 
        text={t.loadingProject}
        size="large"
        overlay={true}
      />
    );
  }

  return (
    <div className="project-details-page">
      {/* Toast Notification */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={closeToast}
      />

      {/* Breadcrumb with Hero Background */}
      <ProjectBreadcrumb 
        projectName={projectData.name}
        projectNameAr={projectData.nameAr}
        location={projectData.location}
        locationAr={projectData.locationAr}
        backgroundImage={projectData.images[0]}
      />

      {/* Project Gallery */}
      <ProjectGallery images={projectData.images} />

      {/* Project Info */}
      <ProjectInfo 
        project={{
          id: projectData.id,
          name: projectData.name,
          nameAr: projectData.nameAr,
          location: projectData.location,
          locationAr: projectData.locationAr,
          category: projectData.category,
          categoryAr: projectData.categoryAr,
          isFavorited: projectData.isFavorited,
          completionDate: projectData.completionDate
        }}
        onFavoriteToggle={handleFavoriteToggle}
      />

      {/* Project Description */}
      <ProjectDescription 
        description={projectData.description}
        descriptionAr={projectData.descriptionAr}
      />

      {/* Project Overview */}
      <ProjectOverview overview={projectData.overview} />

      {/* Project Video */}
      <ProjectVideo videoUrl={projectData.videoUrl} />

      {/* Project Location Map */}
      <ProjectLocationMap 
        coordinates={projectData.coordinates}
        address={projectData.address}
        addressAr={projectData.addressAr}
        projectName={projectData.name}
        projectNameAr={projectData.nameAr}
      />

      {/* Available Properties */}
      <ProjectProperties 
        properties={projectData.properties}
        onPropertyClick={handlePropertyClick}
        onFavoriteToggle={handlePropertyFavoriteToggle}
      />

      {/* Register Interest */}
      <RegisterInterest 
        projectName={projectData.name}
        projectNameAr={projectData.nameAr}
        onSubmit={handleInterestSubmit}
      />
    </div>
  );
};

export default ProjectDetailsPage;