# حل مؤقت لاختبار Google OAuth

## المشكلة الحالية:
- Google Client ID لا يسمح بـ `localhost:5173`
- خطأ 403: Origin غير مسموح

## الحلول المتاحة:

### 1. **الحل الأسرع: تحديث Google Cloud Console**
1. اذهب إلى: https://console.cloud.google.com/apis/credentials
2. ابحث عن Client ID: `58398704119-laopqg34cmgca6g6er7s16a3mbamn93f`
3. اضغط "Edit"
4. أضف في "Authorized JavaScript origins":
   - `http://localhost:5173`
   - `http://localhost:3000`
5. أضف في "Authorized redirect URIs":
   - `http://localhost:5173/auth/google/callback`
   - `http://localhost:3000/auth/google/callback`
6. احفظ واستنظر 5-10 دقائق

### 2. **الحل البديل: استخدام ngrok (HTTPS مؤقت)**
```bash
# تثبيت ngrok
npm install -g ngrok

# تشغيل ngrok
ngrok http 5173

# استخدم الرابط المعطى (مثل: https://abc123.ngrok.io)
```

### 3. **الحل المؤقت: تجربة port 3000**
```bash
npm run dev -- --port 3000
```

### 4. **اختبار بدون localhost**
استخدم ملف HTML المستقل الذي أنشأناه للاختبار.

## التحقق من الإصلاح:
بعد تحديث Google Cloud Console، جرب هذا الرابط:
```
https://accounts.google.com/gsi/status?client_id=58398704119-laopqg34cmgca6g6er7s16a3mbamn93f.apps.googleusercontent.com
```

يجب أن يعطي 200 بدلاً من 403.

## ملاحظة:
التحديثات في Google Cloud Console قد تستغرق 5-10 دقائق لتصبح نافذة.
