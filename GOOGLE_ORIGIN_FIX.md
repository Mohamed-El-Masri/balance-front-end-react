# 🚨 خطأ في إعدادات Google Cloud Console

## المشكلة:
```
The given origin is not allowed for the given client ID.
```

## السبب:
Google Client ID غير مُعد للسماح بـ `localhost:5173`

## الحل:

### 1. اذهب إلى Google Cloud Console:
https://console.cloud.google.com/apis/credentials

### 2. ابحث عن OAuth 2.0 Client ID:
`58398704119-laopqg34cmgca6g6er7s16a3mbamn93f.apps.googleusercontent.com`

### 3. اضغط على "تحرير" أو "Edit"

### 4. في قسم "Authorized JavaScript origins":
أضف هذه العناوين:
- `http://localhost:5173`
- `http://localhost:3000` (احتياط)
- `http://127.0.0.1:5173` (احتياط)

### 5. في قسم "Authorized redirect URIs":
أضف هذه العناوين:
- `http://localhost:5173/auth/google/callback`
- `http://localhost:3000/auth/google/callback` (احتياط)

### 6. احفظ التغييرات

## ملاحظة مهمة:
بعد الحفظ، قد يستغرق الأمر 5-10 دقائق حتى تصبح التغييرات نافذة المفعول.

## اختبار سريع:
بعد إضافة الـ origins، جرب هذا الرابط:
https://accounts.google.com/gsi/status?client_id=58398704119-laopqg34cmgca6g6er7s16a3mbamn93f.apps.googleusercontent.com

يجب أن يعطي استجابة 200 بدلاً من 403.
