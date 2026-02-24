# SU Meeting Room Booking System 📅

ระบบจองห้องประชุม คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร (Full-stack Application)

## 🚀 Overview

โปรเจกต์นี้ประกอบด้วย 3 ส่วนหลักที่รันผ่าน Docker:

1. **Frontend**: React (Vite) + Ant Design + Tailwind CSS
2. **Backend**: Node.js (Express) + JWT Auth
3. **Database**: PostgreSQL (Supabase)

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Ant Design, Tailwind CSS
- **Backend**: Node.js 22, Express, Prisma (or direct SQL), JWT Authentication
- **Infrastructure**: Docker, Docker Compose, Nginx (as External Proxy)

---

## 💻 การติดตั้งในเครื่องตัวเอง (Local Development)

1. **เตรียมไฟล์ `.env`**:
   สร้างไฟล์ `.env` ที่ root และตั้งค่าสำหรับเครื่องตัวเอง:

   ```env
   VITE_API_BASE=http://localhost:6081
   CLIENT_URL=http://localhost:8794/booking
   DATABASE_URL=postgresql://... (Supabase URL)
   JWT_ACCESS_SECRET=your_secret_key
   JWT_REFRESH_SECRET=your_secret_key
   ```

2. **สั่งรันระบบ**:

   ```bash
   docker-compose up -d --build
   ```

3. **เข้าใช้งาน**:
   - URL: [http://localhost:8794/booking/](http://localhost:8794/booking/)

---

## 🌐 การติดตั้งบน Server จริง (Production / Tailscale)

โปรเจกต์นี้ถูกออกแบบมาให้เสียบใช้งานร่วมกับ **Nginx Gateway** เดิมของลูกค้าบนเครื่อง Server ได้ทันที

### 1. การตั้งค่า Nginx (บน Server ลูกค้า)

ตรวจสอบให้แน่ใจว่าไฟล์ Config ของ Nginx ลูกค้ามีส่วนนี้อยู่:

```nginx
location /booking {
    proxy_pass http://127.0.0.1:8794;
    rewrite ^/booking(.*)$ $1 break;
}

location /booking/api {
    proxy_pass http://127.0.0.1:6081;
    rewrite ^/booking/api(.*)$ $1 break;
}
```

### 2. ตั้งค่า `.env` บน Server

ปรับ IP ให้เป็นของเครื่อง Server นั้นๆ (เช่น Tailscale IP):

```env
VITE_API_BASE=http://100.x.y.z/booking/api
CLIENT_URL=http://100.x.y.z/booking
DATABASE_URL=...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
```

### 3. สั่ง Deploy

```bash
docker-compose up -d --build
```

---

## 📁 โครงสร้างโฟลเดอร์

- `/client`: ซอร์สโค้ดของหน้าบ้าน (React) และ Dockerfile สำหรับรัน sirv-cli
- `/server`: ซอร์สโค้ดของหลังบ้าน (Node.js) และ Dockerfile สำหรับรัน Express
- `docker-compose.yml`: ตัวควบคุมการรัน Container ทั้งหมด

---

## 🆘 Troubleshooting (การแก้ปัญหาเบื้องต้น)

- **หน้าขาว (White Screen)**: ตรวจสอบเรื่อง Path ท้าย URL ต้องเข้าผ่าน `/booking/` (มี slash ปิดท้าย) หากเข้าพอร์ตตรงๆ (:8794) ระบบจะ Redirect ให้เองอัตโนมัติ
- **Login ไม่ได้ (CORS Error)**: ตรวจสอบพอร์ตใน `CLIENT_URL` ของฝั่ง Backend ในไฟล์ `.env` ให้ตรงกับพอร์ตที่หน้าบ้านเรียกเข้ามาจริง (ปกติจะเซ็ตไว้ที่ 8794 สำหรับ Local)
- **API 404 หลังจาก Deployment**: ตรวจสอบคำสั่ง `rewrite` ใน Nginx ว่ามีการตัด `/booking/api` ทิ้งก่อนส่งเข้า Docker หรือไม่ (ระบบปัจจุบันใน Code ฝั่ง Server จะไม่มี `/api` นำหน้าเพื่อรอรับงานจาก Proxy)

---
