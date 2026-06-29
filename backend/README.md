# 📚 Edu Management System - Backend

نظام إدارة تعليمي متكامل مع إمكانيات متقدمة لإدارة الطلاب والحضور والدفوعات والامتحانات والسلوك.

## ✨ المميزات الرئيسية

- 👥 **إدارة الطلاب**: إضافة وتعديل وحذف بيانات الطلاب
- 📋 **الحضور والغياب**: تسجيل الحضور وإرسال إشعارات للآباء
- 💰 **إدارة الدفوعات**: تتبع الرسوم والدفوعات
- 📝 **الامتحانات**: تسجيل الدرجات والإحصائيات
- 📊 **السلوك**: تسجيل ملاحظات السلوك وإرسال إشعارات
- 🔔 **تنبيهات WhatsApp**: إرسال إشعارات فورية للآباء
- 📈 **التقارير والإحصائيات**: تحليل شامل لأداء الطلاب

## 🛠️ التقنيات المستخدمة

- **Express.js** - خادم الويب
- **MongoDB** - قاعدة البيانات
- **Mongoose** - مكتبة ODM
- **Twilio** - خدمة WhatsApp
- **TypeScript** - لغة البرمجة

## 📦 التثبيت

### المتطلبات
- Node.js (v14 أو أحدث)
- MongoDB (محلي أو سحابي)
- حساب Twilio

### خطوات التثبيت

1. استنساخ المستودع:
```bash
git clone https://github.com/deaia/Edu-.git
cd Edu-/backend
```

2. تثبيت المكتبات:
```bash
npm install
```

3. إنشاء ملف `.env`:
```bash
cp .env.example .env
```

4. تعبئة متغيرات البيئة في `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edu-management
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```

5. تشغيل الخادم:
```bash
npm run dev
```

سيكون الخادم متاحاً على `http://localhost:5000`

## 🔌 نقاط النهاية (Endpoints)

### الطلاب
- `GET /api/students` - جميع الطلاب
- `GET /api/students/:id` - طالب محدد
- `POST /api/students` - إضافة طالب جديد
- `PUT /api/students/:id` - تعديل طالب
- `DELETE /api/students/:id` - حذف طالب

### الحضور
- `GET /api/attendance` - جميع السجلات
- `GET /api/attendance/date/:date` - حضور في تاريخ محدد
- `GET /api/attendance/student/:studentId` - حضور طالب
- `GET /api/attendance/stats/student/:studentId` - إحصائيات الحضور
- `POST /api/attendance` - تسجيل حضور

### الدفوعات
- `GET /api/payments` - جميع الدفوعات
- `GET /api/payments/student/:studentId` - دفوعات طالب
- `GET /api/payments/stats/student/:studentId` - إحصائيات الدفوعات
- `POST /api/payments` - تسجيل دفعة

### الامتحانات
- `GET /api/exams` - جميع الامتحانات
- `GET /api/exams/student/:studentId` - امتحانات طالب
- `GET /api/exams/stats/student/:studentId` - إحصائيات الامتحانات
- `POST /api/exams` - تسجيل امتحان

### السلوك
- `GET /api/behavior` - جميع السجلات
- `GET /api/behavior/student/:studentId` - سلوك طالب
- `GET /api/behavior/stats/student/:studentId` - إحصائيات السلوك
- `POST /api/behavior` - تسجيل ملاحظة سلوك

### الأقسام
- `GET /api/sections` - جميع الأقسام
- `GET /api/sections/:id` - قسم محدد
- `POST /api/sections` - إضافة قسم جديد
- `PUT /api/sections/:id` - تعديل قسم
- `DELETE /api/sections/:id` - حذف قسم

## 📝 أمثلة على الطلبات

### إضافة طالب جديد
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "محمد أحمد",
    "fatherName": "أحمد علي",
    "motherName": "فاطمة محمود",
    "familyName": "السراج",
    "gender": "male",
    "age": 10,
    "studentPhone": "0912345678",
    "parentPhone": "0987654321",
    "parentJob": "مهندس",
    "address": "دمشق",
    "totalFees": 5000
  }'
```

### تسجيل حضور
```bash
curl -X POST http://localhost:5000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "60d5ec49f1b2c72b8c8e4a1a",
    "status": "present",
    "note": "حاضر"
  }'
```

## 🔐 الأمان

- استخدم متغيرات البيئة لجميع المعلومات الحساسة
- لا تقم بالتوثيق في المستودع
- تحقق من صحة البيانات المدخلة
- استخدم HTTPS في الإنتاج

## 📚 الملفات الرئيسية

```
backend/
├── src/
│   ├── index.ts           # الملف الرئيسي
│   ├── models/            # نماذج قاعدة البيانات
│   │   ├── Student.ts
│   │   ├── Attendance.ts
│   │   ├── Payment.ts
│   │   ├── Exam.ts
│   │   ├── Behavior.ts
│   │   └── Section.ts
│   ├── routes/            # المسارات والنقاط النهائية
│   │   ├── students.ts
│   │   ├── attendance.ts
│   │   ├── payments.ts
│   │   ├── exams.ts
│   │   ├── behavior.ts
│   │   └── sections.ts
│   └── services/          # الخدمات
│       └── WhatsAppService.ts
├── package.json
├── .env.example
└── tsconfig.json
```

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. عمل Fork للمستودع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. الالتزام بالتغييرات (`git commit -m 'Add amazing feature'`)
4. الدفع للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📞 الدعم

إذا واجهت أي مشاكل، يرجى فتح Issue في المستودع.

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

**تم تطويره بواسطة**: deaia
**آخر تحديث**: 2026-06-29
