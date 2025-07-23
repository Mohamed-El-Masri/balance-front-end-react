# إعداد Google Maps في Balance Real Estate

## خطوات إعداد Google Maps API

### 1. الحصول على API Key
1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو اختر مشروع موجود
3. فعّل Google Maps JavaScript API
4. أنشئ مفتاح API جديد
5. قم بتقييد المفتاح للمجالات المحددة (اختياري للأمان)

### 2. إعداد المتغيرات البيئية
1. انسخ ملف `.env.example` إلى `.env.local`
2. استبدل `YOUR_GOOGLE_MAPS_API_KEY` بمفتاح API الخاص بك

```bash
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBb7zIoQBrl3GWQ2E4DyJ677ZVDtkQu_sQ
```

### 3. إعادة تشغيل الخادم
بعد إضافة مفتاح API، أعد تشغيل خادم التطوير:

```bash
npm run dev
```

## ميزات الخريطة
- عرض موقع العقار على الخريطة
- إمكانية الحصول على الاتجاهات
- عرض معلومات العنوان والمنطقة
- دعم اللغة العربية والإنجليزية
- تصميم متجاوب للهواتف المحمولة

## استكشاف الأخطاء
- إذا لم تظهر الخريطة، تأكد من صحة مفتاح API
- تأكد من تفعيل Maps JavaScript API في Google Cloud Console
- تحقق من console المتصفح للحصول على رسائل الخطأ
