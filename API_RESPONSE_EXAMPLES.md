# Balance Real Estate - API Response Examples
## أمثلة على استجابات API - موقع بالانس للتطوير العقاري

---

## 🏢 أمثلة استجابات المشاريع

### 1. قائمة المشاريع مع فلاتر
```json
{
  "success": true,
  "message": "تم جلب المشاريع بنجاح",
  "messageEn": "Projects fetched successfully",
  "data": {
    "projects": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "مجمع بالانس السكني",
        "nameEn": "Balance Residential Complex",
        "slug": "balance-residential-complex",
        "slugEn": "balance-residential-complex",
        "shortDescription": "مجمع سكني فاخر في قلب الرياض",
        "shortDescriptionEn": "Luxury residential complex in the heart of Riyadh",
        "status": "under_construction",
        "category": "residential",
        "location": {
          "city": "الرياض",
          "cityEn": "Riyadh",
          "district": "حي الملك فهد",
          "districtEn": "King Fahd District",
          "coordinates": {
            "lat": 24.7136,
            "lng": 46.6753
          }
        },
        "specifications": {
          "totalUnits": 200,
          "floorsCount": 15,
          "parkingSpaces": 250,
          "completionDate": "2025-12-31"
        },
        "pricing": {
          "startingPrice": 850000,
          "maxPrice": 2500000,
          "currency": "SAR"
        },
        "media": {
          "mainImage": "https://cdn.balance.com/projects/balance-residential/main.jpg",
          "images": [
            "https://cdn.balance.com/projects/balance-residential/1.jpg",
            "https://cdn.balance.com/projects/balance-residential/2.jpg"
          ]
        },
        "developer": {
          "id": "dev-001",
          "name": "شركة بالانس للتطوير",
          "nameEn": "Balance Development Company",
          "logo": "https://cdn.balance.com/developers/balance-logo.png"
        },
        "amenities": [
          {
            "id": "amenity-001",
            "name": "مسبح",
            "nameEn": "Swimming Pool",
            "icon": "swimming-pool"
          },
          {
            "id": "amenity-002", 
            "name": "صالة رياضية",
            "nameEn": "Gym",
            "icon": "gym"
          }
        ],
        "analytics": {
          "views": 1542,
          "favorites": 89,
          "inquiries": 23
        },
        "isPublished": true,
        "isFeatured": true,
        "publishedAt": "2024-01-15T10:00:00Z",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 45,
      "totalPages": 4,
      "hasNext": true,
      "hasPrev": false
    },
    "filters": {
      "cities": [
        {
          "id": "riyadh",
          "name": "الرياض",
          "nameEn": "Riyadh",
          "count": 25
        },
        {
          "id": "jeddah",
          "name": "جدة", 
          "nameEn": "Jeddah",
          "count": 20
        }
      ],
      "categories": [
        {
          "id": "residential",
          "name": "سكني",
          "nameEn": "Residential",
          "count": 35
        },
        {
          "id": "commercial",
          "name": "تجاري",
          "nameEn": "Commercial", 
          "count": 10
        }
      ],
      "statuses": [
        {
          "id": "completed",
          "name": "مكتمل",
          "nameEn": "Completed",
          "count": 20
        },
        {
          "id": "under_construction",
          "name": "تحت الإنشاء",
          "nameEn": "Under Construction",
          "count": 25
        }
      ],
      "priceRange": {
        "min": 500000,
        "max": 5000000
      }
    }
  }
}
```

### 2. تفاصيل مشروع واحد
```json
{
  "success": true,
  "message": "تم جلب تفاصيل المشروع بنجاح",
  "messageEn": "Project details fetched successfully",
  "data": {
    "project": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "مجمع بالانس السكني",
      "nameEn": "Balance Residential Complex",
      "slug": "balance-residential-complex",
      "description": "مجمع سكني فاخر يقع في قلب الرياض...",
      "descriptionEn": "A luxury residential complex located in the heart of Riyadh...",
      "status": "under_construction",
      "category": "residential",
      "projectCode": "BAL-001",
      "location": {
        "city": "الرياض",
        "cityEn": "Riyadh",
        "district": "حي الملك فهد",
        "districtEn": "King Fahd District",
        "address": "طريق الملك فهد، الرياض 12271",
        "addressEn": "King Fahd Road, Riyadh 12271",
        "coordinates": {
          "lat": 24.7136,
          "lng": 46.6753
        },
        "mapEmbedUrl": "https://maps.google.com/embed?..."
      },
      "specifications": {
        "totalArea": 50000,
        "builtUpArea": 35000,
        "totalUnits": 200,
        "floorsCount": 15,
        "parkingSpaces": 250,
        "elevators": 8,
        "completionDate": "2025-12-31",
        "deliveryDate": "2026-02-28"
      },
      "pricing": {
        "startingPrice": 850000,
        "maxPrice": 2500000,
        "currency": "SAR",
        "paymentPlans": [
          {
            "name": "خطة الدفع الأساسية",
            "nameEn": "Basic Payment Plan",
            "downPayment": 20,
            "installments": 60,
            "description": "دفعة مقدمة 20% والباقي على 60 شهر",
            "descriptionEn": "20% down payment, remaining over 60 months"
          }
        ]
      },
      "media": {
        "images": [
          "https://cdn.balance.com/projects/balance-residential/gallery/1.jpg",
          "https://cdn.balance.com/projects/balance-residential/gallery/2.jpg"
        ],
        "videos": [
          {
            "url": "https://youtube.com/watch?v=...",
            "thumbnail": "https://cdn.balance.com/projects/balance-residential/video-thumb.jpg",
            "title": "جولة افتراضية في المشروع",
            "titleEn": "Virtual Project Tour"
          }
        ],
        "brochureUrl": "https://cdn.balance.com/projects/balance-residential/brochure.pdf",
        "floorPlans": [
          "https://cdn.balance.com/projects/balance-residential/floor-plan-1.jpg"
        ],
        "virtualTourUrl": "https://tours.balance.com/balance-residential"
      },
      "amenities": [
        {
          "id": "amenity-001",
          "name": "مسبح",
          "nameEn": "Swimming Pool",
          "icon": "swimming-pool",
          "category": "recreation"
        }
      ],
      "developer": {
        "id": "dev-001",
        "name": "شركة بالانس للتطوير",
        "nameEn": "Balance Development Company",
        "logo": "https://cdn.balance.com/developers/balance-logo.png",
        "website": "https://balance-development.com",
        "contact": {
          "phone": "+966112345678",
          "email": "info@balance-development.com"
        }
      },
      "seo": {
        "metaTitle": "مجمع بالانس السكني - مشروع سكني فاخر في الرياض",
        "metaTitleEn": "Balance Residential Complex - Luxury Residential Project in Riyadh",
        "metaDescription": "اكتشف مجمع بالانس السكني...",
        "metaDescriptionEn": "Discover Balance Residential Complex...",
        "keywords": ["مجمع سكني", "الرياض", "شقق فاخرة"],
        "keywordsEn": ["residential complex", "riyadh", "luxury apartments"]
      },
      "analytics": {
        "views": 1542,
        "favorites": 89,
        "inquiries": 23
      },
      "isPublished": true,
      "isFeatured": true,
      "publishedAt": "2024-01-15T10:00:00Z"
    },
    "relatedProjects": [
      {
        "id": "related-project-1",
        "name": "مشروع النخيل",
        "nameEn": "Palm Project",
        "mainImage": "https://cdn.balance.com/projects/palm/main.jpg",
        "startingPrice": 750000
      }
    ],
    "properties": [
      {
        "id": "property-1",
        "title": "شقة 3 غرف نوم",
        "titleEn": "3-Bedroom Apartment",
        "type": "apartment",
        "area": 150,
        "price": 1200000,
        "status": "available",
        "mainImage": "https://cdn.balance.com/properties/apt-001/main.jpg"
      }
    ]
  }
}
```

---

## 🏠 أمثلة استجابات العقارات

### 1. قائمة العقارات مع فلاتر
```json
{
  "success": true,
  "message": "تم جلب العقارات بنجاح",
  "messageEn": "Properties fetched successfully",
  "data": {
    "properties": [
      {
        "id": "prop-001",
        "title": "شقة فاخرة في حي الملك فهد",
        "titleEn": "Luxury Apartment in King Fahd District",
        "description": "شقة فاخرة بمواصفات عالية ومرافق متميزة",
        "descriptionEn": "Luxury apartment with high-end specifications",
        "propertyCode": "APT-KF-001",
        "type": "apartment",
        "category": "sale",
        "location": {
          "city": "الرياض",
          "cityEn": "Riyadh",
          "district": "حي الملك فهد",
          "districtEn": "King Fahd District",
          "address": "طريق الملك فهد، مبنى 123",
          "addressEn": "King Fahd Road, Building 123",
          "coordinates": {
            "lat": 24.7136,
            "lng": 46.6753
          }
        },
        "specifications": {
          "area": 150,
          "bedrooms": 3,
          "bathrooms": 2,
          "floor": 5,
          "totalFloors": 10,
          "building": "المبنى أ",
          "buildingEn": "Building A",
          "parkingSpaces": 2,
          "yearBuilt": 2022,
          "furnishing": "semi_furnished",
          "orientation": "north_east",
          "view": "إطلالة على المدينة",
          "viewEn": "City View"
        },
        "pricing": {
          "price": 1200000,
          "currency": "SAR",
          "pricePerMeter": 8000,
          "maintenanceFee": 500,
          "isNegotiable": true
        },
        "features": [
          {
            "id": "feature-001",
            "name": "شرفة",
            "nameEn": "Balcony",
            "icon": "balcony"
          }
        ],
        "amenities": [
          {
            "id": "amenity-001",
            "name": "مسبح",
            "nameEn": "Swimming Pool",
            "icon": "swimming-pool"
          }
        ],
        "media": {
          "images": [
            "https://cdn.balance.com/properties/prop-001/1.jpg",
            "https://cdn.balance.com/properties/prop-001/2.jpg"
          ],
          "mainImage": "https://cdn.balance.com/properties/prop-001/main.jpg"
        },
        "status": "available",
        "availability": {
          "availableFrom": "2024-02-01"
        },
        "agent": {
          "id": "agent-001",
          "name": "أحمد الراشد",
          "nameEn": "Ahmed Al-Rashid",
          "title": "مستشار عقاري أول",
          "titleEn": "Senior Property Consultant",
          "phone": "+966501234567",
          "email": "ahmed@balance.com",
          "whatsapp": "+966501234567",
          "image": "https://cdn.balance.com/agents/ahmed.jpg",
          "isVerified": true
        },
        "project": {
          "id": "project-001",
          "name": "مجمع بالانس السكني",
          "nameEn": "Balance Residential Complex"
        },
        "analytics": {
          "views": 543,
          "favorites": 12,
          "inquiries": 5
        },
        "isPublished": true,
        "isFeatured": false,
        "publishedAt": "2024-01-10T08:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 234,
      "totalPages": 20,
      "hasNext": true,
      "hasPrev": false
    },
    "filters": {
      "types": [
        {
          "id": "apartment",
          "name": "شقة",
          "nameEn": "Apartment", 
          "count": 150
        },
        {
          "id": "villa",
          "name": "فيلا",
          "nameEn": "Villa",
          "count": 84
        }
      ],
      "categories": [
        {
          "id": "sale",
          "name": "للبيع",
          "nameEn": "For Sale",
          "count": 180
        },
        {
          "id": "rent",
          "name": "للإيجار", 
          "nameEn": "For Rent",
          "count": 54
        }
      ],
      "priceRange": {
        "min": 300000,
        "max": 5000000
      },
      "areaRange": {
        "min": 80,
        "max": 500
      },
      "bedrooms": [
        {"value": 1, "count": 45},
        {"value": 2, "count": 89},
        {"value": 3, "count": 67},
        {"value": 4, "count": 33}
      ]
    }
  }
}
```

### 2. تفاصيل عقار واحد
```json
{
  "success": true,
  "message": "تم جلب تفاصيل العقار بنجاح",
  "messageEn": "Property details fetched successfully", 
  "data": {
    "property": {
      "id": "prop-001",
      "title": "شقة فاخرة في حي الملك فهد",
      "titleEn": "Luxury Apartment in King Fahd District",
      "description": "شقة فاخرة بمواصفات عالية تتكون من 3 غرف نوم...",
      "descriptionEn": "Luxury apartment with high-end specifications featuring 3 bedrooms...",
      "propertyCode": "APT-KF-001",
      "type": "apartment",
      "category": "sale",
      "location": {
        "city": "الرياض", 
        "cityEn": "Riyadh",
        "district": "حي الملك فهد",
        "districtEn": "King Fahd District",
        "address": "طريق الملك فهد، مبنى 123، الطابق 5",
        "addressEn": "King Fahd Road, Building 123, Floor 5",
        "coordinates": {
          "lat": 24.7136,
          "lng": 46.6753
        },
        "nearbyFacilities": [
          {
            "name": "مدينة الملك فهد الطبية",
            "nameEn": "King Fahd Medical City",
            "distance": "5 دقائق",
            "distanceEn": "5 minutes",
            "type": "hospital"
          },
          {
            "name": "النخيل مول",
            "nameEn": "Al Nakheel Mall", 
            "distance": "10 دقائق",
            "distanceEn": "10 minutes",
            "type": "mall"
          }
        ]
      },
      "specifications": {
        "area": 150,
        "bedrooms": 3,
        "bathrooms": 2,
        "floor": 5,
        "totalFloors": 10,
        "building": "المبنى أ",
        "buildingEn": "Building A",
        "parkingSpaces": 2,
        "balconies": 1,
        "yearBuilt": 2022,
        "furnishing": "semi_furnished",
        "orientation": "north_east",
        "view": "إطلالة على المدينة",
        "viewEn": "City View"
      },
      "pricing": {
        "price": 1200000,
        "currency": "SAR",
        "pricePerMeter": 8000,
        "maintenanceFee": 500,
        "includedServices": [
          "أمن 24/7",
          "صيانة عامة",
          "تنظيف المناطق المشتركة"
        ],
        "includedServicesEn": [
          "24/7 Security",
          "General Maintenance", 
          "Common Area Cleaning"
        ],
        "isNegotiable": true
      },
      "features": [
        {
          "id": "feature-001",
          "name": "شرفة",
          "nameEn": "Balcony",
          "icon": "balcony",
          "category": "exterior"
        },
        {
          "id": "feature-002",
          "name": "مكيف مركزي",
          "nameEn": "Central AC",
          "icon": "ac",
          "category": "interior"
        }
      ],
      "amenities": [
        {
          "id": "amenity-001",
          "name": "مسبح",
          "nameEn": "Swimming Pool",
          "icon": "swimming-pool",
          "category": "recreation"
        },
        {
          "id": "amenity-002",
          "name": "صالة رياضية",
          "nameEn": "Gym",
          "icon": "gym", 
          "category": "recreation"
        }
      ],
      "media": {
        "images": [
          "https://cdn.balance.com/properties/prop-001/living-room.jpg",
          "https://cdn.balance.com/properties/prop-001/bedroom-1.jpg",
          "https://cdn.balance.com/properties/prop-001/kitchen.jpg",
          "https://cdn.balance.com/properties/prop-001/bathroom.jpg",
          "https://cdn.balance.com/properties/prop-001/balcony.jpg",
          "https://cdn.balance.com/properties/prop-001/building-exterior.jpg"
        ],
        "videos": [
          {
            "url": "https://youtube.com/watch?v=...",
            "thumbnail": "https://cdn.balance.com/properties/prop-001/video-thumb.jpg",
            "title": "جولة في الشقة",
            "titleEn": "Apartment Tour"
          }
        ],
        "floorPlanUrl": "https://cdn.balance.com/properties/prop-001/floor-plan.jpg",
        "virtualTourUrl": "https://tours.balance.com/property-001"
      },
      "status": "available",
      "availability": {
        "availableFrom": "2024-02-01"
      },
      "agent": {
        "id": "agent-001",
        "name": "أحمد الراشد",
        "nameEn": "Ahmed Al-Rashid",
        "title": "مستشار عقاري أول",
        "titleEn": "Senior Property Consultant",
        "phone": "+966501234567",
        "email": "ahmed@balance.com",
        "whatsapp": "+966501234567",
        "image": "https://cdn.balance.com/agents/ahmed.jpg",
        "bio": "خبرة 10 سنوات في السوق العقاري",
        "bioEn": "10 years experience in real estate market",
        "isVerified": true,
        "rating": 4.8,
        "reviewsCount": 127
      },
      "project": {
        "id": "project-001",
        "name": "مجمع بالانس السكني",
        "nameEn": "Balance Residential Complex",
        "slug": "balance-residential-complex"
      },
      "seo": {
        "metaTitle": "شقة فاخرة للبيع في حي الملك فهد - 3 غرف نوم",
        "metaTitleEn": "Luxury Apartment for Sale in King Fahd District - 3 Bedrooms",
        "metaDescription": "شقة فاخرة للبيع بمساحة 150 متر...",
        "metaDescriptionEn": "Luxury apartment for sale with 150 sqm area...",
        "keywords": ["شقة للبيع", "حي الملك فهد", "3 غرف نوم"],
        "keywordsEn": ["apartment for sale", "king fahd district", "3 bedrooms"]
      },
      "analytics": {
        "views": 543,
        "favorites": 12,
        "inquiries": 5
      },
      "isPublished": true,
      "isFeatured": false,
      "publishedAt": "2024-01-10T08:00:00Z",
      "createdAt": "2024-01-08T10:00:00Z",
      "updatedAt": "2024-01-15T14:30:00Z"
    },
    "similarProperties": [
      {
        "id": "prop-002",
        "title": "شقة مشابهة في نفس المنطقة",
        "titleEn": "Similar Apartment in Same Area",
        "price": 1150000,
        "area": 140,
        "bedrooms": 3,
        "bathrooms": 2,
        "mainImage": "https://cdn.balance.com/properties/prop-002/main.jpg"
      }
    ]
  }
}
```

---

## 👥 أمثلة استجابات المستخدمين

### 1. تسجيل الدخول
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "messageEn": "Login successful",
  "data": {
    "user": {
      "id": "user-001",
      "email": "ahmed@balance.com",
      "name": "أحمد محمد",
      "nameEn": "Ahmed Mohamed",
      "role": "admin",
      "permissions": [
        "projects.read",
        "projects.create", 
        "projects.update",
        "properties.read",
        "properties.create",
        "properties.update",
        "inquiries.read",
        "inquiries.update"
      ],
      "assignedProjects": [
        "project-001",
        "project-002"
      ],
      "assignedProperties": [
        "prop-001",
        "prop-002",
        "prop-003"
      ],
      "avatar": "https://cdn.balance.com/users/ahmed-avatar.jpg",
      "phone": "+966501234567",
      "isActive": true,
      "emailVerified": true,
      "phoneVerified": true,
      "lastLogin": "2024-01-15T10:30:00Z",
      "createdAt": "2023-06-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refreshToken": "refresh_token_string_here",
    "expiresIn": 3600,
    "tokenType": "Bearer"
  }
}
```

### 2. قائمة المستخدمين (للإدارة)
```json
{
  "success": true,
  "message": "تم جلب قائمة المستخدمين بنجاح",
  "messageEn": "Users list fetched successfully",
  "data": {
    "users": [
      {
        "id": "user-001",
        "email": "ahmed@balance.com",
        "name": "أحمد محمد",
        "nameEn": "Ahmed Mohamed",
        "role": "admin",
        "permissions": ["projects.read", "properties.read"],
        "assignedProjectsCount": 5,
        "assignedPropertiesCount": 12,
        "isActive": true,
        "avatar": "https://cdn.balance.com/users/ahmed-avatar.jpg",
        "phone": "+966501234567",
        "lastLogin": "2024-01-15T10:30:00Z",
        "createdAt": "2023-06-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    },
    "summary": {
      "totalUsers": 156,
      "activeUsers": 145,
      "adminUsers": 5,
      "employeeUsers": 25,
      "clientUsers": 126
    }
  }
}
```

---

## 📊 أمثلة استجابات لوحة التحكم

### 1. إحصائيات عامة
```json
{
  "success": true,
  "message": "تم جلب الإحصائيات بنجاح",
  "messageEn": "Statistics fetched successfully",
  "data": {
    "overview": {
      "totalProjects": 45,
      "publishedProjects": 38,
      "totalProperties": 234,
      "publishedProperties": 198,
      "totalUsers": 1250,
      "activeUsers": 1156,
      "totalInquiries": 89,
      "newInquiries": 23,
      "monthlyViews": 15420,
      "monthlyInquiries": 234,
      "conversionRate": 1.52
    },
    "recentActivity": [
      {
        "id": "activity-001",
        "type": "new_inquiry",
        "title": "استفسار جديد",
        "titleEn": "New Inquiry",
        "message": "استفسار جديد على شقة في الرياض من أحمد علي",
        "messageEn": "New inquiry on apartment in Riyadh from Ahmed Ali",
        "timestamp": "2024-01-15T10:30:00Z",
        "user": {
          "name": "أحمد علي",
          "nameEn": "Ahmed Ali",
          "avatar": "https://cdn.balance.com/users/default-avatar.jpg"
        },
        "reference": {
          "type": "property",
          "id": "prop-001",
          "title": "شقة فاخرة في حي الملك فهد"
        }
      },
      {
        "id": "activity-002",
        "type": "property_published",
        "title": "نشر عقار جديد",
        "titleEn": "New Property Published",
        "message": "تم نشر عقار جديد: فيلا في الرياض",
        "messageEn": "New property published: Villa in Riyadh",
        "timestamp": "2024-01-15T09:15:00Z",
        "user": {
          "name": "سعد المحمد",
          "nameEn": "Saad Al-Mohammed",
          "avatar": "https://cdn.balance.com/users/saad-avatar.jpg"
        }
      }
    ],
    "topPerforming": {
      "projects": [
        {
          "id": "project-001",
          "name": "مجمع بالانس السكني",
          "nameEn": "Balance Residential Complex",
          "views": 1542,
          "inquiries": 23,
          "conversionRate": 1.49
        }
      ],
      "properties": [
        {
          "id": "prop-001",
          "title": "شقة فاخرة في حي الملك فهد",
          "titleEn": "Luxury Apartment in King Fahd District",
          "views": 543,
          "inquiries": 5,
          "conversionRate": 0.92
        }
      ],
      "agents": [
        {
          "id": "agent-001",
          "name": "أحمد الراشد",
          "nameEn": "Ahmed Al-Rashid",
          "propertiesCount": 15,
          "inquiriesCount": 47,
          "conversionRate": 3.13
        }
      ]
    },
    "chartData": {
      "monthlyViews": {
        "labels": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
        "labelsEn": ["January", "February", "March", "April", "May", "June"],
        "data": [12000, 13500, 15420, 14200, 16800, 15420]
      },
      "inquiriesByType": {
        "general": 45,
        "property": 89,
        "project": 67,
        "investment": 23
      },
      "popularCities": [
        {"city": "الرياض", "cityEn": "Riyadh", "count": 156},
        {"city": "جدة", "cityEn": "Jeddah", "count": 89},
        {"city": "الدمام", "cityEn": "Dammam", "count": 67}
      ]
    }
  }
}
```

---

## 📧 أمثلة استجابات الاستفسارات

### 1. قائمة الاستفسارات
```json
{
  "success": true,
  "message": "تم جلب الاستفسارات بنجاح",
  "messageEn": "Inquiries fetched successfully",
  "data": {
    "inquiries": [
      {
        "id": "inquiry-001",
        "type": "property",
        "contact": {
          "name": "محمد أحمد",
          "email": "mohamed@email.com",
          "phone": "+966501234567",
          "preferredContactMethod": "whatsapp"
        },
        "subject": "استفسار عن شقة في الرياض",
        "message": "أود الاستفسار عن توفر شقة 3 غرف في حي الملك فهد...",
        "reference": {
          "id": "prop-001",
          "type": "property",
          "title": "شقة فاخرة في حي الملك فهد",
          "titleEn": "Luxury Apartment in King Fahd District"
        },
        "status": "new",
        "priority": "medium",
        "assignedTo": {
          "id": "user-001",
          "name": "أحمد الراشد",
          "nameEn": "Ahmed Al-Rashid"
        },
        "source": "website",
        "utmData": {
          "utmSource": "google",
          "utmMedium": "cpc",
          "utmCampaign": "riyadh-apartments"
        },
        "responseTime": null,
        "lastContactedAt": null,
        "notes": [
          {
            "id": "note-001",
            "content": "تم الاتصال بالعميل وهو مهتم بالمعاينة",
            "isInternal": false,
            "createdBy": {
              "name": "أحمد الراشد",
              "nameEn": "Ahmed Al-Rashid"
            },
            "createdAt": "2024-01-15T11:00:00Z"
          }
        ],
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T11:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 89,
      "totalPages": 5
    },
    "summary": {
      "total": 89,
      "new": 23,
      "inProgress": 34,
      "contacted": 25,
      "closed": 7,
      "averageResponseTime": 145 // minutes
    }
  }
}
```

---

## 🔍 أمثلة استجابات البحث

### 1. البحث العام
```json
{
  "success": true,
  "message": "تمت عملية البحث بنجاح",
  "messageEn": "Search completed successfully",
  "data": {
    "query": "شقة في الرياض",
    "results": {
      "properties": [
        {
          "id": "prop-001",
          "title": "شقة فاخرة في حي الملك فهد",
          "titleEn": "Luxury Apartment in King Fahd District",
          "excerpt": "شقة فاخرة بمساحة 150 متر مربع...",
          "excerptEn": "Luxury apartment with 150 sqm area...",
          "type": "property",
          "price": 1200000,
          "area": 150,
          "bedrooms": 3,
          "mainImage": "https://cdn.balance.com/properties/prop-001/main.jpg",
          "relevanceScore": 0.95
        }
      ],
      "projects": [
        {
          "id": "project-001",
          "name": "مجمع بالانس السكني",
          "nameEn": "Balance Residential Complex",
          "excerpt": "مجمع سكني فاخر في قلب الرياض...",
          "excerptEn": "Luxury residential complex in the heart of Riyadh...",
          "type": "project",
          "startingPrice": 850000,
          "totalUnits": 200,
          "mainImage": "https://cdn.balance.com/projects/project-001/main.jpg",
          "relevanceScore": 0.87
        }
      ],
      "pages": [
        {
          "id": "page-001",
          "title": "خدماتنا في الرياض",
          "titleEn": "Our Services in Riyadh",
          "excerpt": "نقدم خدمات عقارية متميزة في الرياض...",
          "excerptEn": "We provide exceptional real estate services in Riyadh...",
          "type": "page",
          "url": "/services",
          "relevanceScore": 0.73
        }
      ]
    },
    "totalResults": 127,
    "searchTime": 0.234, // seconds
    "suggestions": [
      "شقق للبيع في الرياض",
      "شقق للإيجار في الرياض",
      "شقق في حي الملك فهد",
      "مشاريع سكنية في الرياض"
    ],
    "filters": {
      "properties": 89,
      "projects": 23,
      "pages": 15
    }
  }
}
```

---

## 📈 أمثلة استجابات التقارير

### 1. تقرير شامل
```json
{
  "success": true,
  "message": "تم إنشاء التقرير بنجاح",
  "messageEn": "Report generated successfully",
  "data": {
    "period": {
      "from": "2024-01-01",
      "to": "2024-01-31",
      "description": "يناير 2024",
      "descriptionEn": "January 2024"
    },
    "summary": {
      "totalViews": 15420,
      "totalInquiries": 234,
      "totalNewUsers": 156,
      "conversionRate": 1.52,
      "averageTimeOnSite": 185, // seconds
      "bounceRate": 0.34,
      "topTrafficSources": [
        {"source": "Google", "visits": 8500, "percentage": 55.1},
        {"source": "Direct", "visits": 3200, "percentage": 20.8},
        {"source": "Facebook", "visits": 2100, "percentage": 13.6}
      ]
    },
    "performance": {
      "topPages": [
        {
          "url": "/properties/apartment-riyadh-123",
          "title": "شقة فاخرة في الرياض",
          "titleEn": "Luxury Apartment in Riyadh",
          "views": 543,
          "uniqueViews": 421,
          "inquiries": 12,
          "conversionRate": 2.21
        }
      ],
      "topProjects": [
        {
          "id": "project-001",
          "name": "مجمع بالانس السكني",
          "nameEn": "Balance Residential Complex",
          "views": 1542,
          "inquiries": 23,
          "conversionRate": 1.49
        }
      ],
      "topProperties": [
        {
          "id": "prop-001",
          "title": "شقة فاخرة في حي الملك فهد",
          "titleEn": "Luxury Apartment in King Fahd District",
          "views": 543,
          "inquiries": 5,
          "conversionRate": 0.92
        }
      ]
    },
    "demographics": {
      "cities": [
        {"city": "الرياض", "cityEn": "Riyadh", "users": 5420, "percentage": 35.2},
        {"city": "جدة", "cityEn": "Jeddah", "users": 3100, "percentage": 20.1},
        {"city": "الدمام", "cityEn": "Dammam", "users": 2300, "percentage": 14.9}
      ],
      "devices": [
        {"device": "Mobile", "users": 9250, "percentage": 60.0},
        {"device": "Desktop", "users": 4620, "percentage": 30.0},
        {"device": "Tablet", "users": 1550, "percentage": 10.0}
      ]
    },
    "charts": {
      "dailyViews": {
        "labels": ["1", "2", "3", "4", "5", "6", "7"],
        "data": [450, 520, 489, 612, 578, 634, 567]
      },
      "inquiriesBySource": {
        "website": 123,
        "facebook": 45,
        "google": 66
      },
      "popularSearches": [
        {"query": "شقق للبيع", "count": 234},
        {"query": "فلل الرياض", "count": 189},
        {"query": "مشاريع جديدة", "count": 156}
      ]
    }
  }
}
```

---

## ⚠️ أمثلة استجابات الأخطاء

### 1. خطأ في المصادقة
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "غير مصرح لك بالوصول لهذا المورد",
    "messageEn": "You are not authorized to access this resource",
    "details": "الرمز المميز منتهي الصلاحية",
    "detailsEn": "Token has expired"
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/admin/users"
}
```

### 2. خطأ في التحقق من البيانات
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "بيانات غير صحيحة",
    "messageEn": "Invalid data provided",
    "details": {
      "email": [
        "البريد الإلكتروني مطلوب",
        "تنسيق البريد الإلكتروني غير صحيح"
      ],
      "emailEn": [
        "Email is required",
        "Email format is invalid"
      ],
      "price": [
        "السعر يجب أن يكون رقم موجب"
      ],
      "priceEn": [
        "Price must be a positive number"
      ]
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/properties"
}
```

### 3. خطأ عدم العثور على المورد
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "العقار غير موجود",
    "messageEn": "Property not found",
    "details": "العقار بالمعرف prop-999 غير موجود",
    "detailsEn": "Property with ID prop-999 does not exist"
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/properties/prop-999"
}
```

---

## 🔧 ملاحظات تقنية

### معايير الاستجابة
1. **الهيكل الموحد**: جميع الاستجابات تتبع نفس الهيكل الأساسي
2. **دعم اللغات**: كل نص يحتوي على النسخة العربية والإنجليزية
3. **الأمان**: حذف الحقول الحساسة من الاستجابات العامة
4. **الأداء**: تطبيق pagination والتخزين المؤقت
5. **المرونة**: استخدام JSONB للحقول المرنة

### رموز الحالة HTTP
- `200`: نجح الطلب
- `201`: تم إنشاء المورد بنجاح
- `400`: خطأ في البيانات المرسلة
- `401`: غير مصرح
- `403`: ممنوع الوصول
- `404`: المورد غير موجود
- `422`: خطأ في التحقق من البيانات
- `500`: خطأ في الخادم

### Headers مطلوبة
```
Authorization: Bearer {token}
Content-Type: application/json
Accept-Language: ar | en
X-API-Version: v1
```

---

## 📝 Internal Notes API Responses

### GET /api/internal-notes
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "reference_id": "550e8400-e29b-41d4-a716-446655440001", 
      "reference_type": "property",
      "title": "ملاحظات اجتماع العميل",
      "content": "العميل أحمد محمد مهتم جداً بالبنتهاوس. يفضل الطابق العلوي مع إطلالة على البحر. لديه استعداد لدفع 2.5 مليون ريال. يريد المعاينة يوم الخميس القادم الساعة 3 عصراً.",
      "is_important": true,
      "is_private": false,
      "attachments": [
        "/uploads/notes/client-requirements.pdf",
        "/uploads/notes/floor-plan-notes.jpg"
      ],
      "created_by": {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "name": "سارة أحمد",
        "name_ar": "سارة أحمد",
        "role": "employee",
        "email": "sara@balance.com"
      },
      "updated_by": {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "name": "سارة أحمد",
        "role": "employee"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T14:45:00Z"
    }
  ]
}
```

### POST /api/internal-notes
```json
{
  "success": true,
  "message": "تم إنشاء الملاحظة بنجاح",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "reference_id": "550e8400-e29b-41d4-a716-446655440001",
    "reference_type": "property",
    "title": "ملاحظات اجتماع العميل الجديد",
    "content": "العميل مهتم بالشقة في الدور الثالث...",
    "is_important": true,
    "is_private": false,
    "attachments": ["file1.pdf"],
    "created_by": {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "سارة أحمد",
      "role": "employee"
    },
    "created_at": "2024-01-15T16:30:00Z"
  }
}
```

---

## 📋 Tasks API Responses  

### GET /api/tasks
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "title": "تحديث صور العقار",
      "title_ar": "تحديث صور العقار", 
      "description": "استبدال الصور القديمة بصور جديدة عالية الجودة للبنتهاوس في برج العنود",
      "description_ar": "استبدال الصور القديمة بصور جديدة عالية الجودة للبنتهاوس في برج العنود",
      "assigned_to": {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "name": "سارة أحمد",
        "name_ar": "سارة أحمد",
        "email": "sara@balance.com",
        "role": "employee"
      },
      "assigned_by": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "أدمن النظام",
        "role": "admin"
      },
      "reference_id": "550e8400-e29b-41d4-a716-446655440001",
      "reference_type": "property",
      "reference_details": {
        "title": "بنتهاوس فاخر في برج العنود",
        "property_code": "BAL-001"
      },
      "priority": "high",
      "status": "in_progress", 
      "progress": 60,
      "due_date": "2024-01-20T00:00:00Z",
      "estimated_hours": 4,
      "actual_hours": 2.5,
      "started_at": "2024-01-15T09:00:00Z",
      "created_at": "2024-01-15T08:30:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### POST /api/tasks/{id}/responses
```json
{
  "success": true,
  "message": "تم إضافة الرد بنجاح",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440030",
    "task_id": "550e8400-e29b-41d4-a716-446655440020",
    "response_text": "تم رفع 10 صور جديدة للبنتهاوس. الصور تشمل جميع الغرف والمرافق. جودة عالية 4K. باقي 5 صور سيتم رفعها غداً بعد تعديل الإضاءة.",
    "attachments": [
      "/uploads/tasks/photos-batch-1.zip",
      "/uploads/tasks/photo-list.xlsx"
    ],
    "progress_update": 60,
    "status_update": "in_progress",
    "hours_logged": 2.5,
    "created_by": {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "سارة أحمد",
      "role": "employee"
    },
    "created_at": "2024-01-15T14:30:00Z"
  }
}
```

---

## 🎨 Content Management API Responses

### GET /api/content
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440040",
      "section_key": "hero",
      "content_key": "main_title",
      "content_type": "text",
      "content": "اعثر على عقار أحلامك",
      "content_ar": "اعثر على عقار أحلامك",
      "media_url": null,
      "alt_text": null,
      "alt_text_ar": null,
      "link_url": null,
      "link_target": "_self",
      "description": "العنوان الرئيسي في قسم الـ Hero",
      "is_active": true,
      "sort_order": 1,
      "updated_by": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "أدمن النظام",
        "role": "admin"
      },
      "updated_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440042",
      "section_key": "hero",
      "content_key": "cta_button",
      "content_type": "cta_button",
      "content": "استكشف العقارات",
      "content_ar": "استكشف العقارات",
      "media_url": null,
      "alt_text": null,
      "alt_text_ar": null,
      "link_url": "/properties",
      "link_target": "_self",
      "description": "زر الدعوة للعمل الرئيسي",
      "is_active": true,
      "sort_order": 5,
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 📧 Form Management API Responses

### GET /api/forms/submissions
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440060",
      "form_type": "property_inquiry",
      "form_data": {
        "name": "أحمد محمد السعيد",
        "email": "ahmed.saeed@example.com",
        "phone": "+966501234567",
        "message": "مهتم بشراء هذا العقار. هل يمكن ترتيب موعد للمعاينة؟",
        "preferred_contact": "whatsapp",
        "budget": "2000000-3000000",
        "financing_needed": "yes"
      },
      "name": "أحمد محمد السعيد",
      "email": "ahmed.saeed@example.com",
      "phone": "+966501234567",
      "reference_id": "550e8400-e29b-41d4-a716-446655440001",
      "reference_type": "property",
      "reference_details": {
        "title": "بنتهاوس فاخر في برج العنود",
        "property_code": "BAL-001",
        "price": 2800000,
        "location": "الرياض - حي العليا"
      },
      "status": "new",
      "assigned_to": null,
      "email_sent": true,
      "email_sent_at": "2024-01-15T10:35:00Z",
      "auto_response_sent": true,
      "auto_response_sent_at": "2024-01-15T10:31:00Z",
      "source": "website",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### POST /api/forms/submissions/{id}/respond
```json
{
  "success": true,
  "message": "تم إرسال الرد بنجاح",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440070",
    "submission_id": "550e8400-e29b-41d4-a716-446655440060",
    "response_text": "عزيزي أحمد،\n\nشكراً لاستفسارك عن البنتهاوس في برج العنود. يسعدنا ترتيب موعد للمعاينة.\n\nالمواعيد المتاحة:\n- الخميس 18 يناير الساعة 3:00 عصراً\n- الجمعة 19 يناير الساعة 10:00 صباحاً\n- السبت 20 يناير الساعة 2:00 عصراً\n\nيرجى تأكيد الموعد المناسب لك.\n\nمع تحياتي،\nسارة أحمد\nمستشارة عقارية",
    "response_method": "email",
    "email_subject": "رد: استفسار عن البنتهاوس في برج العنود",
    "email_recipients": [
      "ahmed.saeed@example.com"
    ],
    "email_sent_at": "2024-01-15T16:45:00Z",
    "attachments": [
      "/uploads/responses/pentifhouse-brochure.pdf",
      "/uploads/responses/floor-plans.pdf"
    ],
    "sent_by": {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "سارة أحمد",
      "email": "sara@balance.com",
      "role": "employee"
    },
    "created_at": "2024-01-15T16:45:00Z"
  }
}
```

---

## 📊 Favorites Analytics API Responses

### GET /api/analytics/favorites
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_favorites": 1847,
      "period_favorites": 127,
      "growth_rate": 8.2,
      "most_active_day": "Thursday",
      "peak_hour": "20:00-21:00"
    },
    "top_items": [
      {
        "item_id": "550e8400-e29b-41d4-a716-446655440001",
        "item_type": "property",
        "item_title": "بنتهاوس فاخر في برج العنود",
        "item_title_ar": "بنتهاوس فاخر في برج العنود",
        "property_code": "BAL-001",
        "price": 2800000,
        "location": "الرياض - حي العليا",
        "favorites_count": 89,
        "recent_favorites": 12,
        "conversion_rate": 15.7
      }
    ],
    "user_demographics": {
      "by_location": [
        {"location": "الرياض", "count": 687, "percentage": 37.2},
        {"location": "جدة", "count": 523, "percentage": 28.3},
        {"location": "الدمام", "count": 298, "percentage": 16.1}
      ],
      "by_device": [
        {"device": "الجوال", "count": 1294, "percentage": 70.1},
        {"device": "سطح المكتب", "count": 398, "percentage": 21.6},
        {"device": "التابلت", "count": 155, "percentage": 8.4}
      ]
    },
    "trends": [
      {"date": "2024-01-01", "count": 15, "unique_users": 12},
      {"date": "2024-01-02", "count": 18, "unique_users": 15},
      {"date": "2024-01-03", "count": 22, "unique_users": 18}
    ]
  }
}
```

### GET /api/analytics/favorites/detailed
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440080",
      "user_id": "550e8400-e29b-41d4-a716-446655440100",
      "user": {
        "name": "سارة أحمد محمد",
        "email": "sara.ahmed@example.com",
        "phone": "+966501234567",
        "registration_date": "2023-08-15T10:30:00Z",
        "total_favorites": 5,
        "total_inquiries": 2
      },
      "item_id": "550e8400-e29b-41d4-a716-446655440001",
      "item_type": "property",
      "item_details": {
        "title": "بنتهاوس فاخر في برج العنود",
        "title_ar": "بنتهاوس فاخر في برج العنود",
        "property_code": "BAL-001",
        "price": 2800000,
        "location": "الرياض - حي العليا",
        "bedrooms": 4,
        "bathrooms": 5,
        "area": 350
      },
      "analytics": {
        "user_location": "الرياض، السعودية",
        "user_device": "الجوال",
        "user_browser": "Safari 17.0",
        "views_before_favorite": 4,
        "time_on_page": 340,
        "traffic_source": "google",
        "search_keywords": "بنتهاوس الرياض فاخر",
        "utm_campaign": "luxury_properties_2024",
        "country_code": "SA",
        "city_name": "الرياض",
        "language_preference": "ar",
        "is_returning_visitor": true
      },
      "created_at": "2024-01-15T19:22:00Z"
    }
  ]
}
```
