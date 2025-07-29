# خطأ Google OAuth: Error 401: invalid_client

## سبب المشكلة
خطأ `Error 401: invalid_client` يعني أن Google Client ID غير صحيح أو غير مُعد بشكل صحيح.

## الحلول:

### 1. إنشاء Google Client ID جديد

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. اختر مشروعك أو أنشئ مشروع جديد
3. فعّل "Google Identity Services API"
4. اذهب إلى **APIs & Services** → **Credentials**
5. انقر **Create Credentials** → **OAuth 2.0 Client IDs**
6. اختر **Web application**
7. أضف التالي:

#### Authorized JavaScript origins:
```
http://localhost:5173
http://127.0.0.1:5173
https://balance-jade.vercel.app
https://your-production-domain.com
```

#### Authorized redirect URIs:
```
http://localhost:5173
http://127.0.0.1:5173
https://balance-jade.vercel.app
https://your-production-domain.com
```

### 2. نسخ Client ID الجديد

1. انسخ Client ID الذي ظهر (يجب أن ينتهي بـ `.apps.googleusercontent.com`)
2. ضعه في ملف `.env`:

```env
VITE_GOOGLE_CLIENT_ID=58398704119-laopqg34cmgca6g6er7s16a3mbamn93f.apps.googleusercontent.com
```

### 3. إعادة تشغيل الخادم

```bash
npm run dev
```

### 4. للتأكد من التكوين الصحيح

افتح Developer Tools في المتصفح وتأكد من:
- عدم وجود رسائل console errors حول Client ID
- ظهور "Google Client ID configured" في console عند تحميل الصفحة

### 5. أمثلة على Client IDs صحيحة:

```
123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
987654321098-zyxwvutsrqponmlkjihgfedcba098765.apps.googleusercontent.com
```

### 6. ملاحظات مهمة:

- Client ID يجب أن يكون public (ليس secret)
- تأكد من إضافة جميع domains المطلوبة
- للتطوير المحلي، أضف `localhost` و `127.0.0.1`
- للإنتاج، أضف domain الحقيقي

### 7. إذا استمرت المشكلة:

1. تأكد من أن المشروع في Google Console مُفعل
2. تحقق من أن APIs مُفعلة
3. جرب إنشاء مشروع جديد كلياً
4. تأكد من أن ملف `.env` يتم قراءته بشكل صحيح

### 8. اختبار سريع:

أضف هذا في console المتصفح للتأكد من Client ID:

```javascript
console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
```

يجب أن يطبع Client ID وليس `undefined`.
