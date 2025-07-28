import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/common/LoadingSpinner';
import Toast from '../../components/ui/common/Toast';
import PageBreadcrumb from '../../components/ui/shared/PageBreadcrumb';
import PropertyGallery from '../../components/ui/property-details/PropertyGallery';
import PropertyInfo from '../../components/ui/property-details/PropertyInfo';
import PropertyDescription from '../../components/ui/property-details/PropertyDescription';
import PropertyOverview from '../../components/ui/property-details/PropertyOverview';
import PropertyVideo from '../../components/ui/property-details/PropertyVideo';
import PropertyLocationMap from '../../components/ui/property-details/PropertyLocationMap';
import PropertyContact from '../../components/ui/property-details/PropertyContact';
import { useLanguage } from '../../contexts/useLanguage';
import styles from '../../styles/components/property-details/PropertyDetailsPage.module.css';

// Mock data - في التطبيق الحقيقي سيأتي من API
const mockPropertyData = {
  id: '1',
  name: 'Luxury Apartment in King Fahd District',
  nameAr: 'شقة فاخرة في حي الملك فهد',
  type: 'Apartment',
  typeAr: 'شقة',
  location: 'Riyadh, King Fahd District',
  locationAr: 'الرياض، حي الملك فهد',
  address: 'King Fahd Road, Building 123, Floor 5',
  addressAr: 'طريق الملك فهد، مبنى 123، الطابق 5',
  // Project information for breadcrumb
  projectName: 'Balance Residential Complex',
  projectNameAr: 'مجمع بالانس السكني',
  projectSlug: 'balance-residential-complex',
  images: [
    'https://images.adsttc.com/media/images/5eee/50f9/b357/658c/7f00/0125/large_jpg/00FI_V_COMPOUND_Cover.jpg?1592676562',
    'https://www.shutterstock.com/image-photo/cityscape-residential-area-modern-apartment-600nw-1723278520.jpg',
    'https://normarch.com/wp-content/uploads/2018/05/thumb_X-ARCHITECTURE-aaaaa-La-Vista-Compound-north-coast-QU-N.RGB_color.0000.jpg.jpg.jpg',
    'https://www.omranarch.com/storage/projects/2014/1442-muhaidib-family-compound/2.jpg',
    'https://ideal-architects.com/data/77/2116/15721673489652.jpg',
    'https://ideal-architects.com/data/77/2116/15721674722493.JPG'
  ],
  price: 850000,
  area: 180,
  bedrooms: 3,
  bathrooms: 2,
  floor: 5,
  building: 'Building A',
  buildingAr: 'المبنى أ',
  parkingSpaces: 2,
  status: 'available' as const,
  isFavorited: false,
  coordinates: {
    lat: 24.7136,
    lng: 46.6753
  },
  features: [
    'Central Air Conditioning',
    'Built-in Kitchen',
    'Parking Space',
    'Security System',
    'Elevator Access',
    'City Views',
    'Modern Fixtures',
    'Storage Room'
  ],
  featuresAr: [
    'تكييف مركزي',
    'مطبخ مجهز',
    'موقف سيارة',
    'نظام أمان',
    'مصعد',
    'إطلالة على المدينة',
    'تجهيزات حديثة',
    'غرفة تخزين'
  ],
  description: 'This stunning 3-bedroom apartment offers modern living in the heart of King Fahd District. With spacious rooms, contemporary finishes, and breathtaking city views, this property represents the perfect blend of luxury and comfort. The apartment features an open-plan living area, fully equipped kitchen, and two well-appointed bathrooms.',
  descriptionAr: 'تقدم هذه الشقة المذهلة المكونة من 3 غرف نوم معيشة عصرية في قلب حي الملك فهد. مع الغرف الواسعة واللمسات الأخيرة المعاصرة وإطلالات المدينة الخلابة، تمثل هذه العقارات المزيج المثالي من الفخامة والراحة. تتميز الشقة بمنطقة معيشة مفتوحة ومطبخ مجهز بالكامل وحمامين مجهزين جيداً.',
  highlights: [
    'Prime location in King Fahd District',
    'Modern architectural design',
    'High-quality finishes throughout',
    'Energy-efficient appliances',
    'Covered parking space',
    'Close to shopping centers and schools'
  ],
  highlightsAr: [
    'موقع متميز في حي الملك فهد',
    'تصميم معماري حديث',
    'تشطيبات عالية الجودة في جميع أنحاء العقار',
    'أجهزة موفرة للطاقة',
    'موقف سيارات مغطى',
    'قريب من مراكز التسوق والمدارس'
  ],
  developer: 'Balance Real Estate Development',
  developerAr: 'شركة بالانس للتطوير العقاري',
  completionDate: '2022',
  propertyAge: 2,
  neighborhood: 'King Fahd District',
  neighborhoodAr: 'حي الملك فهد',
  nearbyFacilities: [
    'King Fahd Medical City - 5 mins',
    'Al Nakheel Mall - 10 mins',
    'International Schools - 8 mins',
    'Metro Station - 12 mins'
  ],
  nearbyFacilitiesAr: [
    'مدينة الملك فهد الطبية - 5 دقائق',
    'النخيل مول - 10 دقائق',
    'المدارس الدولية - 8 دقائق',
    'محطة المترو - 12 دقيقة'
  ],
  totalUnits: 120,
  floorsCount: 15,
  investmentReturn: 8.5,
  amenities: [
    'Swimming Pool',
    'Gym & Fitness Center',
    '24/7 Security',
    'Children\'s Play Area',
    'Community Garden',
    'Meeting Rooms'
  ],
  amenitiesAr: [
    'مسبح',
    'صالة رياضية',
    'أمن 24/7',
    'منطقة ألعاب أطفال',
    'حديقة مجتمعية',
    'قاعات اجتماعات'
  ],
  overview: {
    propertyType: 'Residential Apartment',
    propertyTypeAr: 'شقة سكنية',
    furnishing: 'Semi-Furnished',
    furnishingAr: 'مفروشة جزئياً',
    orientation: 'North-East',
    orientationAr: 'شمال شرق',
    view: 'City View',
    viewAr: 'إطلالة على المدينة',
    yearBuilt: 2022,
    maintenance: 'Excellent',
    maintenanceAr: 'ممتازة'
  },
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  agent: {
    name: 'Ahmed Al-Rashid',
    nameAr: 'أحمد الراشد',
    phone: '+966 50 123 4567',
    email: 'ahmed@balancerealestate.com',
    image: '/images/agents/agent1.jpg',
    title: 'Senior Property Consultant',
    titleAr: 'مستشار عقاري أول'
  }
};

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  
  const [propertyData, setPropertyData] = useState(mockPropertyData);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const content = {
    en: {
      loadingProperty: 'Loading Property Details...',
      favoriteAdded: '❤️ Property added to favorites!',
      favoriteRemoved: '💔 Property removed from favorites!',
      contactSent: '✅ Contact request sent successfully!'
    },
    ar: {
      loadingProperty: 'جاري تحميل تفاصيل العقار...',
      favoriteAdded: '❤️ تم إضافة العقار للمفضلة!',
      favoriteRemoved: '💔 تم إزالة العقار من المفضلة!',
      contactSent: '✅ تم إرسال طلب التواصل بنجاح!'
    }
  };

  const t = isArabic ? content.ar : content.en;

  useEffect(() => {
    // محاكاة تحميل البيانات من API باستخدام slug/id
    const fetchPropertyData = async () => {
      setLoading(true);
      
      try {
        // في التطبيق الحقيقي:
        // const response = await api.getPropertyBySlug(id);
        // setPropertyData(response.data);
        
        // محاكاة وقت التحميل
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // في الوقت الحالي نستخدم نفس البيانات، لكن يمكن تخصيصها حسب الـ slug
        setPropertyData({
          ...mockPropertyData,
          id: id || '1', // استخدام id من URL
        });
        
      } catch (error) {
        console.error('Error fetching property data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const handleFavoriteToggle = () => {
    const wasFavorited = propertyData.isFavorited;
    
    setPropertyData(prev => ({
      ...prev,
      isFavorited: !prev.isFavorited
    }));
    
    // Show toast notification with correct message
    setToast({
      show: true,
      message: wasFavorited ? t.favoriteRemoved : t.favoriteAdded,
      type: 'success'
    });
    
    // Auto close toast after 4 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-wrapper">
          <LoadingSpinner 
            text={t.loadingProperty}
            size="large"
            overlay={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['property-details-page']}>
      {/* Toast Notification */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={closeToast}
      />

      {/* Breadcrumb with Hero Background */}
      <PageBreadcrumb 
        title={propertyData.name}
        titleAr={propertyData.nameAr}
        location={propertyData.location}
        locationAr={propertyData.locationAr}
        backgroundImage={propertyData.images[0]}
        propertyType={propertyData.type}
        propertyTypeAr={propertyData.typeAr}
        projectName={propertyData.projectName}
        projectNameAr={propertyData.projectNameAr}
        projectSlug={propertyData.projectSlug}
      />

      {/* Property Gallery */}
      <PropertyGallery 
        images={propertyData.images}
        propertyName={propertyData.name}
        propertyNameAr={propertyData.nameAr}
      />

      {/* Property Info */}
      <PropertyInfo 
        propertyId={propertyData.id}
        title={propertyData.name}
        titleAr={propertyData.nameAr}
        location={propertyData.location}
        locationAr={propertyData.locationAr}
        price={propertyData.price}
        priceType="sale"
        bedrooms={propertyData.bedrooms}
        bathrooms={propertyData.bathrooms}
        area={propertyData.area}
        yearBuilt={propertyData.overview?.yearBuilt}
        propertyType={propertyData.type}
        propertyTypeAr={propertyData.typeAr}
        availability={propertyData.status}
        features={propertyData.features}
        featuresAr={propertyData.featuresAr}
        amenities={propertyData.amenities || []}
        amenitiesAr={propertyData.amenitiesAr || []}
        isFavorite={propertyData.isFavorited}
        onFavoriteToggle={handleFavoriteToggle}
      />

      {/* Property Description */}
      <PropertyDescription 
        description={propertyData.description}
        descriptionAr={propertyData.descriptionAr}
        highlights={propertyData.highlights}
        highlightsAr={propertyData.highlightsAr}
      />

      {/* Property Overview */}
      <PropertyOverview 
        propertyId={propertyData.id}
        developer={propertyData.developer || 'Unknown Developer'}
        developerAr={propertyData.developerAr || 'مطور غير معروف'}
        completionDate={propertyData.completionDate || '2023'}
        propertyAge={propertyData.propertyAge || 1}
        neighborhood={propertyData.neighborhood || propertyData.location}
        neighborhoodAr={propertyData.neighborhoodAr || propertyData.locationAr}
        nearbyFacilities={propertyData.nearbyFacilities || []}
        nearbyFacilitiesAr={propertyData.nearbyFacilitiesAr || []}
        totalUnits={propertyData.totalUnits}
        floorsCount={propertyData.floorsCount}
        parkingSpaces={propertyData.parkingSpaces}
        investmentReturn={propertyData.investmentReturn}
      />

      {/* Property Video */}
      {propertyData.videoUrl && (
        <PropertyVideo 
          videoUrl={propertyData.videoUrl}
          title={propertyData.name}
          titleAr={propertyData.nameAr}
        />
      )}

      {/* Property Location */}
      <PropertyLocationMap 
        latitude={propertyData.coordinates?.lat}
        longitude={propertyData.coordinates?.lng}
        address={propertyData.location}
        addressAr={propertyData.locationAr}
        city="Riyadh"
        cityAr="الرياض"
        district={propertyData.neighborhood || propertyData.location}
        districtAr={propertyData.neighborhoodAr || propertyData.locationAr}
      />

      {/* Contact Agent */}
      <PropertyContact 
        propertyTitle={propertyData.name}
        propertyTitleAr={propertyData.nameAr}
        agentName={propertyData.agent.name}
        agentNameAr={propertyData.agent.nameAr}
        agentPhone={propertyData.agent.phone}
        agentEmail={propertyData.agent.email}
        agentPhoto={propertyData.agent.image}
      />
    </div>
  );
};

export default PropertyDetailsPage;
