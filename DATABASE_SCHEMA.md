# Balance Real Estate - Database Schema
## مخطط قاعدة البيانات - موقع بالانس للتطوير العقاري

---

## 📊 هيكل قاعدة البيانات

### 1. جدول المستخدمين (Users)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  phone VARCHAR(20),
  avatar TEXT,
  role user_role_enum DEFAULT 'client',
  permissions TEXT[], -- Array of permission strings
  is_active BOOLEAN DEFAULT true,
  email_verified_at TIMESTAMP,
  phone_verified_at TIMESTAMP,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Enum for user roles
CREATE TYPE user_role_enum AS ENUM (
  'super_admin',
  'admin', 
  'employee',
  'client'
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);
```

### 2. جدول المشاريع (Projects)
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  name_ar VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  slug_ar VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  short_description TEXT,
  short_description_ar TEXT,
  
  -- Basic Info
  status project_status_enum DEFAULT 'planning',
  category project_category_enum NOT NULL,
  project_code VARCHAR(50) UNIQUE,
  
  -- Location
  city VARCHAR(255) NOT NULL,
  city_ar VARCHAR(255) NOT NULL,
  district VARCHAR(255) NOT NULL,
  district_ar VARCHAR(255) NOT NULL,
  address TEXT,
  address_ar TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  map_embed_url TEXT,
  
  -- Specifications
  total_area DECIMAL(10, 2), -- square meters
  built_up_area DECIMAL(10, 2),
  total_units INTEGER,
  floors_count INTEGER,
  parking_spaces INTEGER,
  elevators INTEGER,
  completion_date DATE,
  delivery_date DATE,
  
  -- Pricing
  starting_price DECIMAL(15, 2),
  max_price DECIMAL(15, 2),
  currency VARCHAR(3) DEFAULT 'SAR',
  
  -- Media
  images TEXT[], -- Array of image URLs
  videos JSONB, -- Array of video objects
  brochure_url TEXT,
  floor_plans TEXT[],
  virtual_tour_url TEXT,
  
  -- Developer
  developer_id UUID REFERENCES developers(id),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_title_ar VARCHAR(255),
  meta_description TEXT,
  meta_description_ar TEXT,
  keywords TEXT[],
  keywords_ar TEXT[],
  
  -- Publishing
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  
  -- Analytics
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Enums
CREATE TYPE project_status_enum AS ENUM (
  'planning',
  'under_construction', 
  'completed',
  'on_hold'
);

CREATE TYPE project_category_enum AS ENUM (
  'residential',
  'commercial',
  'mixed',
  'industrial'
);

-- Indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_city ON projects(city);
CREATE INDEX idx_projects_published ON projects(is_published);
CREATE INDEX idx_projects_featured ON projects(is_featured);
```

### 3. جدول العقارات (Properties)
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  description TEXT,
  description_ar TEXT,
  property_code VARCHAR(50) UNIQUE NOT NULL,
  
  -- Type and Category
  type property_type_enum NOT NULL,
  category property_category_enum NOT NULL,
  
  -- Project Reference
  project_id UUID REFERENCES projects(id),
  
  -- Location
  city VARCHAR(255) NOT NULL,
  city_ar VARCHAR(255) NOT NULL,
  district VARCHAR(255) NOT NULL,
  district_ar VARCHAR(255) NOT NULL,
  address TEXT,
  address_ar TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Specifications
  area DECIMAL(8, 2) NOT NULL, -- square meters
  bedrooms INTEGER,
  bathrooms INTEGER,
  floor_number INTEGER,
  total_floors INTEGER,
  building VARCHAR(255),
  building_ar VARCHAR(255),
  parking_spaces INTEGER DEFAULT 0,
  balconies INTEGER DEFAULT 0,
  year_built INTEGER,
  furnishing furnishing_enum,
  orientation orientation_enum,
  view_description VARCHAR(500),
  view_description_ar VARCHAR(500),
  
  -- Pricing
  price DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'SAR',
  price_per_meter DECIMAL(10, 2),
  maintenance_fee DECIMAL(10, 2), -- monthly
  included_services TEXT[],
  included_services_ar TEXT[],
  is_negotiable BOOLEAN DEFAULT false,
  
  -- Availability
  status property_status_enum DEFAULT 'available',
  available_from DATE,
  minimum_rent_period INTEGER, -- months for rent
  
  -- Media
  images TEXT[],
  videos JSONB,
  floor_plan_url TEXT,
  virtual_tour_url TEXT,
  
  -- Agent
  agent_id UUID REFERENCES agents(id),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_title_ar VARCHAR(255),
  meta_description TEXT,
  meta_description_ar TEXT,
  keywords TEXT[],
  keywords_ar TEXT[],
  
  -- Publishing
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  
  -- Analytics
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Enums
CREATE TYPE property_type_enum AS ENUM (
  'apartment',
  'villa',
  'office',
  'shop',
  'warehouse',
  'land'
);

CREATE TYPE property_category_enum AS ENUM (
  'sale',
  'rent'
);

CREATE TYPE furnishing_enum AS ENUM (
  'furnished',
  'semi_furnished',
  'unfurnished'
);

CREATE TYPE orientation_enum AS ENUM (
  'north',
  'south',
  'east',
  'west',
  'north_east',
  'north_west',
  'south_east',
  'south_west'
);

CREATE TYPE property_status_enum AS ENUM (
  'available',
  'sold',
  'rented',
  'reserved'
);

-- Indexes
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_category ON properties(category);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_area ON properties(area);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_published ON properties(is_published);
```

### 4. جدول المطورين (Developers)
```sql
CREATE TABLE developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  logo TEXT,
  description TEXT,
  description_ar TEXT,
  website VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  address_ar TEXT,
  established_year INTEGER,
  license_number VARCHAR(100),
  
  -- Social Media
  social_media JSONB, -- {facebook, twitter, instagram, linkedin}
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. جدول الوكلاء (Agents)
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  title_ar VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  whatsapp VARCHAR(20),
  image TEXT,
  bio TEXT,
  bio_ar TEXT,
  license_number VARCHAR(100),
  
  -- Performance
  total_sales INTEGER DEFAULT 0,
  total_rentals INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.00,
  reviews_count INTEGER DEFAULT 0,
  
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. جدول المرافق والخدمات (Amenities)
```sql
CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  icon VARCHAR(255), -- Icon class or URL
  category amenity_category_enum,
  description TEXT,
  description_ar TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE amenity_category_enum AS ENUM (
  'security',
  'recreation',
  'utilities',
  'transportation',
  'healthcare',
  'education',
  'retail'
);
```

### 7. جدول الميزات (Features)
```sql
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  icon VARCHAR(255),
  category feature_category_enum,
  description TEXT,
  description_ar TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE feature_category_enum AS ENUM (
  'interior',
  'exterior',
  'technology',
  'safety',
  'accessibility'
);
```

### 8. جداول الربط (Junction Tables)

#### ربط المشاريع بالمرافق
```sql
CREATE TABLE project_amenities (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, amenity_id)
);
```

#### ربط العقارات بالميزات
```sql
CREATE TABLE property_features (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  feature_id UUID REFERENCES features(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, feature_id)
);
```

#### ربط العقارات بالمرافق
```sql
CREATE TABLE property_amenities (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);
```

#### تخصيص الموظفين للمشاريع
```sql
CREATE TABLE user_project_assignments (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_by UUID REFERENCES users(id),
  permissions TEXT[], -- Specific permissions for this project
  PRIMARY KEY (user_id, project_id)
);
```

#### تخصيص الموظفين للعقارات
```sql
CREATE TABLE user_property_assignments (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_by UUID REFERENCES users(id),
  permissions TEXT[], -- Specific permissions for this property
  PRIMARY KEY (user_id, property_id)
);
```

### 9. جدول الاستفسارات (Inquiries)
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type inquiry_type_enum NOT NULL,
  
  -- Contact Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  preferred_contact contact_method_enum DEFAULT 'email',
  
  -- Inquiry Details
  subject VARCHAR(500),
  message TEXT NOT NULL,
  
  -- Reference
  reference_id UUID, -- Property or Project ID
  reference_type reference_type_enum,
  
  -- Status and Priority
  status inquiry_status_enum DEFAULT 'new',
  priority priority_enum DEFAULT 'medium',
  
  -- Assignment
  assigned_to UUID REFERENCES users(id),
  assigned_at TIMESTAMP,
  
  -- Response
  response_time INTEGER, -- minutes
  last_contacted_at TIMESTAMP,
  
  -- Source
  source VARCHAR(255), -- 'website', 'facebook', 'google', etc.
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enums for inquiries
CREATE TYPE inquiry_type_enum AS ENUM (
  'general',
  'property',
  'project',
  'investment'
);

CREATE TYPE contact_method_enum AS ENUM (
  'email',
  'phone',
  'whatsapp'
);

CREATE TYPE reference_type_enum AS ENUM (
  'property',
  'project'
);

CREATE TYPE inquiry_status_enum AS ENUM (
  'new',
  'in_progress',
  'contacted',
  'closed'
);

CREATE TYPE priority_enum AS ENUM (
  'low',
  'medium',
  'high'
);
```

### 10. جدول ملاحظات الاستفسارات (Inquiry Notes)
```sql
CREATE TABLE inquiry_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT true, -- true = internal note, false = client communication
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 11. جدول المفضلة (Favorites)
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL, -- Property or Project ID
  item_type favorite_type_enum NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, item_id, item_type)
);

CREATE TYPE favorite_type_enum AS ENUM (
  'property',
  'project'
);
```

### 12. جدول المشاهدات (Views)
```sql
CREATE TABLE views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL, -- Property or Project ID
  item_type view_type_enum NOT NULL,
  user_id UUID REFERENCES users(id), -- NULL for anonymous
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE view_type_enum AS ENUM (
  'property',
  'project',
  'page'
);

-- Index for analytics
CREATE INDEX idx_views_item ON views(item_id, item_type);
CREATE INDEX idx_views_date ON views(created_at);
```

### 13. جدول الصفحات الثابتة (Pages)
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  slug_ar VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  content TEXT,
  content_ar TEXT,
  excerpt TEXT,
  excerpt_ar TEXT,
  featured_image TEXT,
  gallery TEXT[],
  
  -- SEO
  meta_title VARCHAR(255),
  meta_title_ar VARCHAR(255),
  meta_description TEXT,
  meta_description_ar TEXT,
  keywords TEXT[],
  keywords_ar TEXT[],
  
  -- Publishing
  status page_status_enum DEFAULT 'draft',
  published_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

CREATE TYPE page_status_enum AS ENUM (
  'draft',
  'published',
  'archived'
);
```

### 14. جدول أقسام الصفحة الرئيسية (Home Sections)
```sql
CREATE TABLE home_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type section_type_enum NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  content JSONB NOT NULL, -- Flexible content structure
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id)
);

CREATE TYPE section_type_enum AS ENUM (
  'hero',
  'about',
  'featured_projects',
  'services',
  'testimonials',
  'contact'
);
```

### 15. جدول إعدادات الموقع (Site Settings)
```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_group VARCHAR(100) NOT NULL,
  setting_key VARCHAR(100) NOT NULL,
  setting_value JSONB,
  setting_value_ar JSONB,
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- Can be accessed by frontend
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id),
  UNIQUE(setting_group, setting_key)
);

-- Common settings:
-- general: site_name, logo, contact_info, social_media
-- seo: default_meta_title, default_meta_description
-- features: enable_favorites, enable_inquiries, enable_virtual_tours
```

### 16. جدول سجل المراجعة (Audit Log)
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- CREATE, UPDATE, DELETE, LOGIN, etc.
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for querying
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_date ON audit_logs(created_at);
```

### 17. جدول الإشعارات (Notifications)
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type notification_type_enum NOT NULL,
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  message TEXT,
  message_ar TEXT,
  data JSONB, -- Additional data for the notification
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE notification_type_enum AS ENUM (
  'inquiry',
  'assignment',
  'system',
  'marketing',
  'task'
);

-- Index for user notifications
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
```

### 18. جدول الملاحظات الداخلية (Internal Notes)
```sql
CREATE TABLE internal_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id UUID NOT NULL, -- Property or Project ID
  reference_type reference_type_enum NOT NULL,
  title VARCHAR(255),
  content TEXT NOT NULL,
  is_important BOOLEAN DEFAULT false,
  is_private BOOLEAN DEFAULT false, -- Only creator can see
  
  -- Files and attachments
  attachments TEXT[], -- Array of file URLs
  
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for efficient querying
CREATE INDEX idx_internal_notes_reference ON internal_notes(reference_id, reference_type);
CREATE INDEX idx_internal_notes_creator ON internal_notes(created_by);
```

### 19. جدول المهام (Tasks)
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  description TEXT,
  description_ar TEXT,
  
  -- Assignment
  assigned_to UUID REFERENCES users(id) NOT NULL,
  assigned_by UUID REFERENCES users(id) NOT NULL,
  
  -- Reference (optional - task can be related to property/project)
  reference_id UUID,
  reference_type reference_type_enum,
  
  -- Priority and Status
  priority priority_enum DEFAULT 'medium',
  status task_status_enum DEFAULT 'pending',
  
  -- Timing
  due_date TIMESTAMP,
  estimated_hours INTEGER,
  actual_hours INTEGER,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  
  -- Tracking
  progress INTEGER DEFAULT 0, -- 0-100 percentage
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE task_status_enum AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'cancelled',
  'overdue'
);

-- Indexes
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_assigned_by ON tasks(assigned_by);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

### 20. جدول ردود المهام (Task Responses)
```sql
CREATE TABLE task_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  attachments TEXT[], -- Array of file URLs
  progress_update INTEGER, -- New progress percentage
  status_update task_status_enum,
  hours_logged INTEGER, -- Hours spent on this update
  
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for task responses
CREATE INDEX idx_task_responses_task ON task_responses(task_id);
```

### 21. جدول محتوى الموقع القابل للتحرير (Editable Content)
```sql
CREATE TABLE editable_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key VARCHAR(100) NOT NULL, -- 'hero', 'about', 'contact', etc.
  content_key VARCHAR(100) NOT NULL, -- 'title', 'subtitle', 'cta_text', etc.
  content_type content_type_enum NOT NULL,
  
  -- Content in both languages
  content TEXT,
  content_ar TEXT,
  
  -- For images and files
  media_url TEXT,
  alt_text VARCHAR(255),
  alt_text_ar VARCHAR(255),
  
  -- For links and CTAs
  link_url TEXT,
  link_target VARCHAR(20) DEFAULT '_self', -- '_self', '_blank'
  
  -- Meta information
  description TEXT, -- For admin reference
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(section_key, content_key)
);

CREATE TYPE content_type_enum AS ENUM (
  'text',
  'html',
  'image',
  'video',
  'link',
  'cta_button',
  'social_media'
);

-- Index for content management
CREATE INDEX idx_editable_content_section ON editable_content(section_key);
```

### 22. جدول إعدادات النماذج (Form Settings)
```sql
CREATE TABLE form_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type form_type_enum NOT NULL,
  
  -- Email Configuration
  recipient_emails TEXT[] NOT NULL, -- Array of email addresses
  cc_emails TEXT[],
  bcc_emails TEXT[],
  email_subject VARCHAR(255),
  email_subject_ar VARCHAR(255),
  email_template TEXT, -- HTML template
  email_template_ar TEXT,
  
  -- Auto-response
  auto_response_enabled BOOLEAN DEFAULT false,
  auto_response_subject VARCHAR(255),
  auto_response_subject_ar VARCHAR(255),
  auto_response_message TEXT,
  auto_response_message_ar TEXT,
  
  -- Form Behavior
  redirect_url TEXT, -- After successful submission
  success_message VARCHAR(500),
  success_message_ar VARCHAR(500),
  
  -- Notification Settings
  notify_dashboard BOOLEAN DEFAULT true,
  notify_email BOOLEAN DEFAULT true,
  notify_sms BOOLEAN DEFAULT false,
  
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(form_type)
);

CREATE TYPE form_type_enum AS ENUM (
  'contact',
  'inquiry',
  'property_inquiry',
  'project_inquiry',
  'callback_request',
  'investment_inquiry',
  'newsletter'
);
```

### 23. جدول إرسال النماذج (Form Submissions)
```sql
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type form_type_enum NOT NULL,
  
  -- Submitted Data
  form_data JSONB NOT NULL, -- All form fields as JSON
  
  -- Contact Information (extracted from form_data for easy querying)
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  
  -- Reference (if form is related to property/project)
  reference_id UUID,
  reference_type reference_type_enum,
  
  -- Processing
  status submission_status_enum DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),
  processed_by UUID REFERENCES users(id),
  processed_at TIMESTAMP,
  
  -- Email Status
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP,
  auto_response_sent BOOLEAN DEFAULT false,
  auto_response_sent_at TIMESTAMP,
  
  -- Source Tracking
  source VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE submission_status_enum AS ENUM (
  'new',
  'in_progress',
  'responded',
  'closed',
  'spam'
);

-- Indexes for form submissions
CREATE INDEX idx_form_submissions_type ON form_submissions(form_type);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);
CREATE INDEX idx_form_submissions_assigned ON form_submissions(assigned_to);
CREATE INDEX idx_form_submissions_reference ON form_submissions(reference_id, reference_type);
```

### 24. جدول ردود النماذج (Form Responses)
```sql
CREATE TABLE form_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  response_method response_method_enum NOT NULL,
  
  -- Email details (if sent via email)
  email_subject VARCHAR(255),
  email_recipients TEXT[],
  email_sent_at TIMESTAMP,
  
  -- Call details (if response was by phone)
  call_duration INTEGER, -- in minutes
  call_notes TEXT,
  
  attachments TEXT[], -- Array of file URLs
  
  sent_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE response_method_enum AS ENUM (
  'email',
  'phone',
  'whatsapp',
  'dashboard_message'
);
```

### 25. جدول إحصائيات المفضلة المفصلة (Detailed Favorites Analytics)
```sql
CREATE TABLE favorites_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  favorite_id UUID REFERENCES favorites(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  item_id UUID NOT NULL,
  item_type favorite_type_enum NOT NULL,
  
  -- User Information (at time of favoriting)
  user_location VARCHAR(255), -- City/Country
  user_device VARCHAR(100), -- Mobile/Desktop/Tablet
  user_browser VARCHAR(100),
  
  -- Behavior Tracking
  views_before_favorite INTEGER DEFAULT 0, -- How many times user viewed before favoriting
  time_on_page INTEGER, -- Seconds spent on page before favoriting
  
  -- Source Analysis
  traffic_source VARCHAR(255), -- organic, social, direct, etc.
  utm_campaign VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_source VARCHAR(255),
  
  -- Geographic Data
  ip_address INET,
  country_code VARCHAR(3),
  city_name VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for analytics queries
CREATE INDEX idx_favorites_analytics_item ON favorites_analytics(item_id, item_type);
CREATE INDEX idx_favorites_analytics_date ON favorites_analytics(created_at);
CREATE INDEX idx_favorites_analytics_source ON favorites_analytics(traffic_source);
```

---

## 🔧 إجراءات وأدوار قاعدة البيانات

### إنشاء Triggers للتحديث التلقائي
```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Continue for other tables...
```

### Stored Procedures لتحديث الإحصائيات
```sql
-- Update project statistics
CREATE OR REPLACE FUNCTION update_project_stats(project_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE projects SET
    views_count = (
      SELECT COUNT(*) FROM views 
      WHERE item_id = project_uuid AND item_type = 'project'
    ),
    favorites_count = (
      SELECT COUNT(*) FROM favorites 
      WHERE item_id = project_uuid AND item_type = 'project'
    ),
    inquiries_count = (
      SELECT COUNT(*) FROM inquiries 
      WHERE reference_id = project_uuid AND reference_type = 'project'
    )
  WHERE id = project_uuid;
END;
$$ LANGUAGE plpgsql;
```

---

## 📊 Views للتقارير والإحصائيات

### إحصائيات شاملة
```sql
CREATE VIEW dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM projects WHERE is_published = true) as total_projects,
  (SELECT COUNT(*) FROM properties WHERE is_published = true) as total_properties,
  (SELECT COUNT(*) FROM users WHERE role != 'client') as total_staff,
  (SELECT COUNT(*) FROM inquiries WHERE status = 'new') as pending_inquiries,
  (SELECT COUNT(*) FROM views WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as monthly_views,
  (SELECT COUNT(*) FROM inquiries WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as monthly_inquiries;
```

### أفضل العقارات أداءً
```sql
CREATE VIEW top_performing_properties AS
SELECT 
  p.*,
  COALESCE(v.views_count, 0) as total_views,
  COALESCE(f.favorites_count, 0) as total_favorites,
  COALESCE(i.inquiries_count, 0) as total_inquiries,
  (COALESCE(v.views_count, 0) + COALESCE(f.favorites_count, 0) * 2 + COALESCE(i.inquiries_count, 0) * 5) as performance_score
FROM properties p
LEFT JOIN (
  SELECT item_id, COUNT(*) as views_count 
  FROM views WHERE item_type = 'property' 
  GROUP BY item_id
) v ON p.id = v.item_id
LEFT JOIN (
  SELECT item_id, COUNT(*) as favorites_count 
  FROM favorites WHERE item_type = 'property' 
  GROUP BY item_id
) f ON p.id = f.item_id
LEFT JOIN (
  SELECT reference_id, COUNT(*) as inquiries_count 
  FROM inquiries WHERE reference_type = 'property' 
  GROUP BY reference_id
) i ON p.id = i.reference_id
WHERE p.is_published = true
ORDER BY performance_score DESC;
```

---

## 🔄 مهام الصيانة الدورية

### تنظيف البيانات القديمة
```sql
-- Delete old views (older than 2 years)
DELETE FROM views WHERE created_at < CURRENT_DATE - INTERVAL '2 years';

-- Delete old audit logs (older than 1 year)
DELETE FROM audit_logs WHERE created_at < CURRENT_DATE - INTERVAL '1 year';

-- Delete expired notifications
DELETE FROM notifications WHERE expires_at < CURRENT_TIMESTAMP;
```

### إعادة حساب الإحصائيات
```sql
-- Refresh all project statistics
DO $$
DECLARE
    project_record RECORD;
BEGIN
    FOR project_record IN SELECT id FROM projects LOOP
        PERFORM update_project_stats(project_record.id);
    END LOOP;
END $$;
```

---

هذا المخطط يغطي جميع متطلبات قاعدة البيانات لموقع بالانس للتطوير العقاري، مع دعم كامل لتعدد اللغات ونظام الأدوار والصلاحيات المتقدم.
