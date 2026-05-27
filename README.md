# She Can Foundation — Full Stack MERN App

A production-grade full-stack web application for **She Can Foundation** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

### Frontend
- ✨ Stunning dark UI with glassmorphism & gradient design
- 📋 Contact form with real-time validation & character counter
- 🎉 Animated success modal on form submission
- 📱 Fully responsive across all devices
- 🔐 JWT-secured Admin Panel
- 📊 Admin Dashboard with stats, filters, pagination

### Backend
- ⚡ Express.js REST API with rate limiting
- 🔐 JWT Authentication with bcrypt password hashing
- 🛢️ MongoDB + Mongoose with full CRUD
- ✅ express-validator input validation
- 🛡️ Helmet.js security headers
- 📝 Morgan request logging

---

## 📁 Project Structure

```
she-can-foundation/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── formController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── FormSubmission.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── formRoutes.js
│   ├── .env
│   ├── seed.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── components/
    │   │   ├── ContactForm.jsx
    │   │   ├── Loader.jsx
    │   │   ├── Navbar.jsx
    │   │   └── SuccessModal.jsx
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminLogin.jsx
    │   │   └── Home.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── index.html
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB installed locally (or MongoDB Atlas URI)

### 1. Start MongoDB
Make sure MongoDB is running on your machine:
```bash
# Windows: Start MongoDB service from Services panel
# OR run:
mongod
```

### 2. Setup Backend
```bash
cd backend
npm install         # (already done)
npm run seed        # Creates the default admin account
npm run dev         # Starts server on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd frontend
npm install         # (already done)
npm run dev         # Starts on http://localhost:5173
```

---

## 🔑 Admin Access

| Field    | Value     |
|----------|-----------|
| Username | `admin`   |
| Password | `admin123`|
| URL      | `http://localhost:5173/admin/login` |

---

## 🌐 API Endpoints

| Method | Endpoint              | Auth | Description           |
|--------|-----------------------|------|-----------------------|
| POST   | /api/auth/login       | ❌   | Admin login           |
| GET    | /api/auth/me          | ✅   | Get admin profile     |
| POST   | /api/form/submit      | ❌   | Submit contact form   |
| GET    | /api/form/all         | ✅   | Get all submissions   |
| GET    | /api/form/:id         | ✅   | Get one submission    |
| PATCH  | /api/form/:id/status  | ✅   | Update status         |
| DELETE | /api/form/:id         | ✅   | Delete submission     |

---

## 🎨 Tech Stack

| Layer       | Technology                      |
|-------------|--------------------------------|
| Frontend    | React 18 + Vite                |
| Routing     | React Router v6                |
| HTTP Client | Axios                          |
| Styling     | Vanilla CSS (custom design)    |
| Icons       | Lucide React                   |
| Backend     | Node.js + Express.js           |
| Database    | MongoDB + Mongoose             |
| Auth        | JWT + bcryptjs                 |
| Validation  | express-validator              |
| Security    | Helmet, Rate Limiting, CORS    |
