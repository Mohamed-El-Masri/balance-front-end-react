# Balance Real Estate - Backend API Documentation
## وثائق API للباك إند - موقع بالانس للتطوير العقاري

### نظرة عامة
هذا الدليل يوضح جميع متطلبات API للباك إند لموقع بالانس للتطوير العقاري، بما في ذلك نظام إدارة المحتوى متعدد اللغات ونظام الأدوار والصلاحيات.

---

## 🔐 نظام المصادقة والأدوار (Authentication & Authorization)

### الأدوار المطلوبة
```typescript
enum UserRole {
  SUPER_ADMIN = 'super_admin',      // سوبر أدمن - كامل الصلاحيات
  ADMIN = 'admin',                  // أدمن - كل شيء عدا إدارة المستخدمين
  EMPLOYEE = 'employee',            // موظف - مخصص له مشاريع/عقارات محددة
  CLIENT = 'client'                 // عميل عادي
}
```

### واجهات برمجة التطبيقات للمصادقة

#### تسجيل الدخول
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "أحمد محمد",
      "nameEn": "Ahmed Mohamed",
      "role": "admin",
      "permissions": ["read_projects", "write_projects", ...],
      "assignedProjects": ["project_uuid1", "project_uuid2"],
      "assignedProperties": ["property_uuid1", "property_uuid2"],
      "avatar": "https://example.com/avatar.jpg",
      "phone": "+966501234567",
      "isActive": true,
      "lastLogin": "2025-01-15T10:30:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  }
}
```

#### تسجيل مستخدم جديد
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "محمد أحمد",
  "nameEn": "Mohamed Ahmed",
  "phone": "+966501234567"
}
```

---

## 👥 إدارة المستخدمين (User Management)

### الحصول على قائمة المستخدمين
```http
GET /api/users?page=1&limit=20&role=admin&search=أحمد

Response:
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "name": "أحمد محمد",
        "nameEn": "Ahmed Mohamed",
        "role": "admin",
        "permissions": ["read_projects", "write_projects"],
        "assignedProjects": ["uuid1", "uuid2"],
        "assignedProperties": ["uuid1", "uuid2"],
        "isActive": true,
        "avatar": "url",
        "phone": "+966501234567",
        "lastLogin": "2025-01-15T10:30:00Z",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### تعديل أدوار المستخدم (Super Admin Only)
```http
PATCH /api/users/{userId}/role
Content-Type: application/json

{
  "role": "admin",
  "permissions": ["read_projects", "write_projects", "read_properties"],
  "assignedProjects": ["project_uuid1"],
  "assignedProperties": ["property_uuid1", "property_uuid2"]
}
```

---

## 🏢 إدارة المشاريع (Projects Management)

### هيكل بيانات المشروع
```typescript
interface Project {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  slugAr: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  
  // معلومات أساسية
  status: 'planning' | 'under_construction' | 'completed' | 'on_hold';
  category: 'residential' | 'commercial' | 'mixed' | 'industrial';
  
  // الموقع
  location: {
    city: string;
    cityAr: string;
    district: string;
    districtAr: string;
    address: string;
    addressAr: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    mapEmbedUrl?: string;
  };
  
  // المواصفات
  specifications: {
    totalArea: number; // بالمتر المربع
    builtUpArea: number;
    totalUnits: number;
    floorsCount: number;
    parkingSpaces: number;
    elevators: number;
    completionDate: string; // ISO date
    deliveryDate: string;
  };
  
  // الصور والملفات
  media: {
    images: string[]; // URLs
    videos: {
      url: string;
      thumbnail: string;
      title: string;
      titleAr: string;
    }[];
    brochure?: string; // PDF URL
    floorPlans: string[];
    virtualTour?: string;
  };
  
  // المرافق والخدمات
  amenities: {
    id: string;
    name: string;
    nameAr: string;
    icon: string;
  }[];
  
  // الأسعار
  pricing: {
    startingPrice: number;
    maxPrice: number;
    currency: 'SAR';
    paymentPlans: {
      name: string;
      nameAr: string;
      downPayment: number; // percentage
      installments: number; // months
      description: string;
      descriptionAr: string;
    }[];
  };
  
  // المطور
  developer: {
    id: string;
    name: string;
    nameAr: string;
    logo: string;
    website?: string;
    contact: {
      phone: string;
      email: string;
    };
  };
  
  // SEO
  seo: {
    metaTitle: string;
    metaTitleAr: string;
    metaDescription: string;
    metaDescriptionAr: string;
    keywords: string[];
    keywordsAr: string[];
  };
  
  // النشر والإدارة
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  assignedEmployees: string[]; // User IDs
  
  // التفاعل
  views: number;
  favorites: number;
  inquiries: number;
  
  createdAt: string;
  updatedAt: string;
  createdBy: string; // User ID
  updatedBy: string; // User ID
}
```

### API للمشاريع

#### الحصول على قائمة المشاريع
```http
GET /api/projects?page=1&limit=12&status=completed&category=residential&city=الرياض&featured=true&lang=ar

Response:
{
  "success": true,
  "data": {
    "projects": [/* مصفوفة من المشاريع */],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 45,
      "totalPages": 4
    },
    "filters": {
      "cities": [
        {"id": "riyadh", "name": "الرياض", "nameEn": "Riyadh", "count": 15},
        {"id": "jeddah", "name": "جدة", "nameEn": "Jeddah", "count": 10}
      ],
      "categories": [
        {"id": "residential", "name": "سكني", "nameEn": "Residential", "count": 25},
        {"id": "commercial", "name": "تجاري", "nameEn": "Commercial", "count": 20}
      ],
      "statuses": [
        {"id": "completed", "name": "مكتمل", "nameEn": "Completed", "count": 30},
        {"id": "under_construction", "name": "تحت الإنشاء", "nameEn": "Under Construction", "count": 15}
      ]
    }
  }
}
```

#### تفاصيل مشروع واحد
```http
GET /api/projects/{projectId}?lang=ar

Response:
{
  "success": true,
  "data": {
    "project": {/* كامل بيانات المشروع */},
    "relatedProjects": [/* مشاريع مشابهة */],
    "properties": [/* العقارات التابعة للمشروع */]
  }
}
```

---

## 🏠 إدارة العقارات (Properties Management)

### هيكل بيانات العقار
```typescript
interface Property {
  id: string;
  
  // معلومات أساسية
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  propertyCode: string; // كود العقار
  
  // النوع والفئة
  type: 'apartment' | 'villa' | 'office' | 'shop' | 'warehouse' | 'land';
  category: 'sale' | 'rent';
  
  // المشروع (إن وجد)
  projectId?: string;
  projectName?: string;
  projectNameAr?: string;
  
  // الموقع
  location: {
    city: string;
    cityAr: string;
    district: string;
    districtAr: string;
    address: string;
    addressAr: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearbyFacilities: {
      name: string;
      nameAr: string;
      distance: string; // "5 minutes"
      type: 'hospital' | 'school' | 'mall' | 'metro' | 'mosque' | 'park';
    }[];
  };
  
  // المواصفات
  specifications: {
    area: number; // متر مربع
    bedrooms: number;
    bathrooms: number;
    floor: number;
    totalFloors: number;
    building: string;
    buildingAr: string;
    parkingSpaces: number;
    balconies: number;
    yearBuilt: number;
    furnishing: 'furnished' | 'semi_furnished' | 'unfurnished';
    orientation: 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west';
    view: string;
    viewAr: string;
  };
  
  // السعر
  pricing: {
    price: number;
    currency: 'SAR';
    pricePerMeter?: number;
    maintenance?: number; // رسوم الصيانة الشهرية
    includedServices: string[];
    includedServicesAr: string[];
    negotiable: boolean;
  };
  
  // الميزات
  features: {
    id: string;
    name: string;
    nameAr: string;
    icon: string;
  }[];
  
  // المرافق
  amenities: {
    id: string;
    name: string;
    nameAr: string;
    icon: string;
  }[];
  
  // الوسائط
  media: {
    images: string[];
    videos: {
      url: string;
      thumbnail: string;
      title: string;
      titleAr: string;
    }[];
    floorPlan?: string;
    virtualTour?: string;
  };
  
  // الحالة
  status: 'available' | 'sold' | 'rented' | 'reserved';
  availability: {
    availableFrom: string; // ISO date
    minimumRentPeriod?: number; // شهور للإيجار
  };
  
  // المالك/الوكيل
  agent: {
    id: string;
    name: string;
    nameAr: string;
    title: string;
    titleAr: string;
    phone: string;
    email: string;
    whatsapp?: string;
    image?: string;
    isVerified: boolean;
  };
  
  // النشر والإدارة
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  assignedEmployees: string[];
  
  // SEO
  seo: {
    metaTitle: string;
    metaTitleAr: string;
    metaDescription: string;
    metaDescriptionAr: string;
    keywords: string[];
    keywordsAr: string[];
  };
  
  // التفاعل
  views: number;
  favorites: number;
  inquiries: number;
  
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
```

### API للعقارات

#### قائمة العقارات مع فلاتر
```http
GET /api/properties?page=1&limit=12&type=apartment&category=sale&city=الرياض&minPrice=500000&maxPrice=1000000&bedrooms=3&bathrooms=2&lang=ar

Response:
{
  "success": true,
  "data": {
    "properties": [/* مصفوفة العقارات */],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 245,
      "totalPages": 21
    },
    "filters": {
      "priceRange": {
        "min": 200000,
        "max": 5000000
      },
      "areaRange": {
        "min": 50,
        "max": 800
      }
    }
  }
}
```

---

## 📊 لوحة التحكم (Dashboard)

### إحصائيات عامة
```http
GET /api/dashboard/stats?lang=ar

Response:
{
  "success": true,
  "data": {
    "overview": {
      "totalProjects": 45,
      "totalProperties": 234,
      "totalUsers": 1250,
      "totalInquiries": 89,
      "monthlyViews": 15420,
      "monthlyLeads": 234
    },
    "recentActivity": [
      {
        "id": "uuid",
        "type": "new_inquiry",
        "message": "استفسار جديد على عقار شقة في الرياض",
        "messageEn": "New inquiry on apartment in Riyadh",
        "timestamp": "2025-01-15T10:30:00Z",
        "user": {
          "name": "أحمد محمد",
          "avatar": "url"
        }
      }
    ],
    "topPerforming": {
      "projects": [/* أفضل المشاريع أداءً */],
      "properties": [/* أفضل العقارات أداءً */],
      "agents": [/* أفضل الوكلاء أداءً */]
    }
  }
}
```

---

## 📝 إدارة المحتوى (Content Management)

### الصفحات الثابتة
```typescript
interface Page {
  id: string;
  slug: string;
  slugAr: string;
  
  // المحتوى
  title: string;
  titleAr: string;
  content: string; // HTML content
  contentAr: string;
  excerpt?: string;
  excerptAr?: string;
  
  // الوسائط
  featuredImage?: string;
  gallery?: string[];
  
  // SEO
  seo: {
    metaTitle: string;
    metaTitleAr: string;
    metaDescription: string;
    metaDescriptionAr: string;
    keywords: string[];
    keywordsAr: string[];
  };
  
  // النشر
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
```

### أقسام الصفحة الرئيسية
```typescript
interface HomeSection {
  id: string;
  sectionType: 'hero' | 'about' | 'featured_projects' | 'services' | 'testimonials' | 'contact';
  isActive: boolean;
  order: number;
  
  content: {
    // Hero Section
    hero?: {
      slides: {
        image: string;
        title: string;
        titleAr: string;
        subtitle: string;
        subtitleAr: string;
        ctaText: string;
        ctaTextAr: string;
        ctaLink: string;
      }[];
    };
    
    // About Section
    about?: {
      title: string;
      titleAr: string;
      description: string;
      descriptionAr: string;
      image: string;
      features: {
        icon: string;
        title: string;
        titleAr: string;
        description: string;
        descriptionAr: string;
      }[];
    };
    
    // Featured Projects
    featuredProjects?: {
      title: string;
      titleAr: string;
      subtitle: string;
      subtitleAr: string;
      projectIds: string[];
      viewAllText: string;
      viewAllTextAr: string;
    };
  };
  
  updatedAt: string;
  updatedBy: string;
}
```

---

## 📧 إدارة الاستفسارات (Inquiries Management)

### هيكل الاستفسار
```typescript
interface Inquiry {
  id: string;
  type: 'general' | 'property' | 'project' | 'investment';
  
  // معلومات المستفسر
  contact: {
    name: string;
    email: string;
    phone: string;
    preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  };
  
  // تفاصيل الاستفسار
  subject: string;
  message: string;
  
  // المرجع (إن وجد)
  referenceId?: string; // Property or Project ID
  referenceType?: 'property' | 'project';
  
  // الحالة
  status: 'new' | 'in_progress' | 'contacted' | 'closed';
  priority: 'low' | 'medium' | 'high';
  
  // المتابعة
  assignedTo?: string; // User ID
  notes: {
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }[];
  
  // التفاعل
  responseTime?: number; // minutes
  lastContactedAt?: string;
  
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔍 البحث والفلاتر (Search & Filters)

### البحث العام
```http
GET /api/search?q=شقة في الرياض&type=properties&lang=ar

Response:
{
  "success": true,
  "data": {
    "results": {
      "properties": [/* نتائج العقارات */],
      "projects": [/* نتائج المشاريع */],
      "pages": [/* نتائج الصفحات */]
    },
    "totalResults": 45,
    "searchTime": 0.123,
    "suggestions": ["شقق للبيع في الرياض", "شقق للإيجار في الرياض"]
  }
}
```

---

## 📊 التقارير والإحصائيات (Reports & Analytics)

### تقرير شامل
```http
GET /api/reports/comprehensive?from=2025-01-01&to=2025-01-31&lang=ar

Response:
{
  "success": true,
  "data": {
    "period": {
      "from": "2025-01-01",
      "to": "2025-01-31"
    },
    "summary": {
      "totalViews": 15420,
      "totalInquiries": 234,
      "conversionRate": 1.52,
      "averageTimeOnSite": 185, // seconds
      "topPages": [
        {
          "url": "/properties/apartment-riyadh-123",
          "title": "شقة فاخرة في الرياض",
          "views": 543,
          "inquiries": 12
        }
      ]
    },
    "charts": {
      "dailyViews": [/* بيانات المشاهدات اليومية */],
      "inquiriesBySource": [/* مصادر الاستفسارات */],
      "popularLocations": [/* المواقع الأكثر بحثاً */]
    }
  }
}
```

---

## 🌍 دعم تعدد اللغات (Internationalization)

### هيكل اللغة
كل endpoint يجب أن يدعم معامل `lang` مع القيم:
- `ar` (العربية - افتراضي)
- `en` (الإنجليزية)

### مثال على الاستجابة متعددة اللغات
```json
{
  "success": true,
  "data": {
    "title": "شقة فاخرة في الرياض",
    "titleEn": "Luxury Apartment in Riyadh",
    "description": "شقة فاخرة بمواصفات عالية",
    "descriptionEn": "Luxury apartment with high-end specifications"
  }
}
```

---

## 🔐 الصلاحيات المطلوبة (Permissions)

### قائمة الصلاحيات
```typescript
enum Permission {
  // المشاريع
  'projects.read',
  'projects.create',
  'projects.update',
  'projects.delete',
  'projects.publish',
  
  // العقارات
  'properties.read',
  'properties.create',
  'properties.update',
  'properties.delete',
  'properties.publish',
  
  // المستخدمين
  'users.read',
  'users.create',
  'users.update',
  'users.delete',
  'users.manage_roles', // Super Admin only
  
  // المحتوى
  'content.read',
  'content.create',
  'content.update',
  'content.delete',
  'content.publish',
  
  // الاستفسارات
  'inquiries.read',
  'inquiries.update',
  'inquiries.assign',
  
  // التقارير
  'reports.read',
  'reports.export',
  
  // الإعدادات
  'settings.read',
  'settings.update'
}
```

---

## 📝 ملاحظات مهمة للباك إند

### 1. الأمان
- جميع endpoints تحتاج JWT authentication
- تطبيق role-based access control
- تسجيل جميع العمليات في audit log
- تشفير البيانات الحساسة

### 2. الأداء
- تطبيق pagination على جميع القوائم
- إضافة caching للبيانات الثابتة
- optimized database queries
- CDN للصور والملفات

### 3. SEO
- URLs صديقة لمحركات البحث
- XML sitemap dynamic
- Meta tags optimization
- Schema markup للعقارات

### 4. الإشعارات
- email notifications للاستفسارات الجديدة
- SMS notifications للعروض المهمة
- real-time notifications في dashboard

### 5. النسخ الاحتياطي
- نسخ احتياطية يومية للبيانات
- تسجيل جميع التغييرات
- إمكانية استرداد المحذوفات

---

## 🚀 endpoints إضافية مطلوبة

### إدارة الملفات
```http
POST /api/upload/image
POST /api/upload/video
POST /api/upload/document
DELETE /api/files/{fileId}
```

### إعدادات الموقع
```http
GET /api/settings/general
PUT /api/settings/general
GET /api/settings/seo
PUT /api/settings/seo
```

### إحصائيات مباشرة
```http
GET /api/live-stats
WebSocket: /ws/dashboard
```

### تصدير البيانات
```http
GET /api/export/properties?format=csv&lang=ar
GET /api/export/inquiries?format=excel&from=2025-01-01
```

---

## 🔄 التكامل مع خدمات خارجية

### خرائط جوجل
- تحويل العناوين إلى إحداثيات
- حساب المسافات للمرافق القريبة

### أنظمة الدفع
- تكامل مع فوري، تابي، وطرق الدفع المحلية

### خدمات الرسائل
- SMS gateway للإشعارات
- WhatsApp Business API

### خدمات البريد الإلكتروني
- SendGrid أو Amazon SES
- قوالب email احترافية

---

## 📝 إدارة الملاحظات الداخلية (Internal Notes Management)

### جلب الملاحظات للعقار/المشروع
```http
GET /api/internal-notes
Authorization: Bearer <token>
```

**Query Parameters:**
- `reference_id`: معرف العقار أو المشروع
- `reference_type`: 'property' أو 'project'

### إنشاء ملاحظة داخلية
```http
POST /api/internal-notes
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "reference_id": "uuid",
  "reference_type": "property",
  "title": "ملاحظات الاجتماع",
  "content": "العميل مهتم جداً بالبنتهاوس...",
  "is_important": true,
  "is_private": false,
  "attachments": ["file1.pdf", "image1.jpg"]
}
```

---

## 📋 إدارة المهام (Tasks Management)

### جلب المهام
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Query Parameters:**
- `assigned_to`: فلترة حسب المُكلف
- `status`: pending, in_progress, completed
- `priority`: low, medium, high

### إنشاء مهمة جديدة (Admin/Super Admin فقط)
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "تحديث وصف العقار",
  "title_ar": "تحديث وصف العقار",
  "description": "تحديث وصف العقار مع المرافق الجديدة",
  "assigned_to": "uuid",
  "reference_id": "uuid",
  "reference_type": "property",
  "priority": "medium",
  "due_date": "2024-01-25T00:00:00Z",
  "estimated_hours": 2
}
```

### إضافة رد على المهمة
```http
POST /api/tasks/{id}/responses
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "response_text": "تم الانتهاء من تحديث الصور. تم رفع 15 صورة جديدة عالية الجودة.",
  "progress_update": 100,
  "status_update": "completed",
  "hours_logged": 3,
  "attachments": ["screenshot1.jpg", "report.pdf"]
}
```

---

## 🎨 إدارة المحتوى (Content Management)

### جلب المحتوى القابل للتحرير
```http
GET /api/content
Authorization: Bearer <token>
```

**Query Parameters:**
- `section`: hero, about, contact, footer

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "section_key": "hero",
      "content_key": "main_title",
      "content_type": "text",
      "content": "اعثر على عقار أحلامك",
      "content_ar": "اعثر على عقار أحلامك",
      "is_active": true,
      "sort_order": 1
    },
    {
      "id": "uuid", 
      "section_key": "hero",
      "content_key": "cta_button",
      "content_type": "cta_button",
      "content": "تصفح العقارات",
      "content_ar": "تصفح العقارات",
      "link_url": "/properties",
      "link_target": "_self",
      "is_active": true
    }
  ]
}
```

### تحديث المحتوى (Admin/Super Admin فقط)
```http
PUT /api/content/{id}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "اكتشف العقارات المميزة",
  "content_ar": "اكتشف العقارات المميزة", 
  "link_url": "/premium-properties",
  "is_active": true
}
```

### تحديث قسم كامل من المحتوى
```http
PUT /api/content/section/{section_key}
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 📧 إدارة النماذج (Form Management)

### جلب إعدادات النماذج
```http
GET /api/forms/settings
Authorization: Bearer <token>
```

### تحديث إعدادات النموذج (Admin/Super Admin فقط)
```http
PUT /api/forms/settings/{form_type}
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "recipient_emails": ["admin@balance.com", "sales@balance.com"],
  "email_subject": "رسالة جديدة من نموذج التواصل",
  "email_subject_ar": "رسالة جديدة من نموذج التواصل",
  "auto_response_enabled": true,
  "auto_response_message": "سنتواصل معك خلال 24 ساعة",
  "success_message": "تم إرسال رسالتك بنجاح"
}
```

### جلب رسائل النماذج
```http
GET /api/forms/submissions
Authorization: Bearer <token>
```

**Query Parameters:**
- `form_type`: contact, inquiry, etc.
- `status`: new, in_progress, responded, closed
- `assigned_to`: فلترة حسب المُكلف

**صلاحيات الوصول:**
- Admin/Super Admin: مشاهدة جميع الرسائل
- Employee: مشاهدة رسائل العقارات والمشاريع المُكلف بها فقط

### الرد على رسالة النموذج من الـ Dashboard
```http
POST /api/forms/submissions/{id}/respond
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "response_text": "شكراً لاستفسارك. سنقوم بترتيب موعد للمعاينة.",
  "response_method": "email",
  "email_subject": "رد: استفسار عن العقار",
  "email_recipients": ["ahmed@example.com"],
  "attachments": ["brochure.pdf"]
}
```

---

## 📊 تحليلات المفضلة التفصيلية (Detailed Favorites Analytics)

### جلب إحصائيات المفضلة
```http
GET /api/analytics/favorites
Authorization: Bearer <token>
```

**Query Parameters:**
- `item_id`: عقار أو مشروع محدد
- `item_type`: property, project
- `date_from`, `date_to`: نطاق زمني
- `group_by`: day, week, month, item, user

**Response:**
```json
{
  "success": true,
  "data": {
    "total_favorites": 1250,
    "period_favorites": 45,
    "top_items": [
      {
        "item_id": "uuid",
        "item_type": "property", 
        "item_title": "فيلا فاخرة في الرياض",
        "item_title_ar": "فيلا فاخرة في الرياض",
        "favorites_count": 28,
        "recent_favorites": 5
      }
    ],
    "user_demographics": {
      "by_location": [
        {"location": "الرياض", "count": 450},
        {"location": "جدة", "count": 320}
      ],
      "by_device": [
        {"device": "الجوال", "count": 780},
        {"device": "سطح المكتب", "count": 470}
      ]
    },
    "trends": [
      {"date": "2024-01-01", "count": 12},
      {"date": "2024-01-02", "count": 15}
    ]
  }
}
```

### جلب قائمة المفضلة التفصيلية
```http
GET /api/analytics/favorites/detailed
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "user": {
        "name": "سارة أحمد",
        "email": "sara@example.com",
        "phone": "+966501234567"
      },
      "item_id": "uuid",
      "item_type": "property",
      "item_details": {
        "title": "بنتهاوس في جدة",
        "title_ar": "بنتهاوس في جدة",
        "price": 2500000,
        "location": "جدة"
      },
      "analytics": {
        "user_location": "جدة، السعودية",
        "user_device": "الجوال",
        "user_browser": "Safari",
        "views_before_favorite": 3,
        "time_on_page": 240,
        "traffic_source": "google",
        "utm_campaign": "summer_properties",
        "country_code": "SA",
        "city_name": "جدة"
      },
      "created_at": "2024-01-15T14:22:00Z"
    }
  ]
}
```

---

## 🔧 الصلاحيات المطلوبة (Required Permissions)

### صلاحيات الملاحظات الداخلية
- `view_internal_notes`: مشاهدة الملاحظات للعقارات/المشاريع المُكلف بها
- `create_internal_notes`: إنشاء ملاحظات جديدة
- `edit_own_notes`: تعديل الملاحظات التي أنشأها المستخدم
- `edit_all_notes`: تعديل جميع الملاحظات (Admin/Super Admin)

### صلاحيات المهام
- `view_assigned_tasks`: مشاهدة المهام المُكلف بها
- `view_all_tasks`: مشاهدة جميع المهام (Admin/Super Admin)
- `create_tasks`: إنشاء مهام جديدة (Admin/Super Admin)
- `assign_tasks`: تكليف المهام للموظفين (Admin/Super Admin)
- `update_task_progress`: تحديث تقدم المهام

### صلاحيات إدارة المحتوى
- `manage_content`: إدارة محتوى الموقع (Admin/Super Admin)
- `edit_hero_section`: تعديل قسم الـ Hero
- `edit_about_section`: تعديل قسم من نحن
- `edit_contact_section`: تعديل قسم التواصل

### صلاحيات النماذج
- `manage_forms`: إدارة إعدادات النماذج (Admin/Super Admin)
- `view_all_submissions`: مشاهدة جميع رسائل النماذج (Admin/Super Admin)
- `view_assigned_submissions`: مشاهدة رسائل العقارات/المشاريع المُكلف بها
- `respond_to_submissions`: الرد على رسائل النماذج

### صلاحيات التحليلات
- `view_analytics`: مشاهدة التحليلات والإحصائيات
- `view_detailed_analytics`: مشاهدة التحليلات التفصيلية (Admin/Super Admin)
- `export_analytics`: تصدير التقارير

---

هذا الدليل يغطي جميع متطلبات API الأساسية والمتقدمة لموقع بالانس للتطوير العقاري. يرجى التأكد من تطبيق جميع المعايير المذكورة لضمان أداء مثالي وتجربة مستخدم ممتازة.
