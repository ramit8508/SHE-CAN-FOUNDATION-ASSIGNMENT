# Render.com Deployment Guide

## Steps to Deploy Backend on Render

1. **Push your code to GitHub**
2. **Go to render.com** and sign up/login
3. **Create New → Web Service**
4. **Connect your GitHub repo** and select the backend folder
5. **Set Build & Start Commands:**
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. **Add Environment Variables** in Render dashboard:
   ```
   PORT=10000
   NODE_ENV=production
   MONGO_URI=mongodb+srv://24bai70506_db_user:Ramit123@cluster0.gkgav5w.mongodb.net/she_can_foundation
   JWT_SECRET=8f4c9d2a7b1e6f3c0d8a5e9b7c2f1a6d4e8b9c7f2a1d5e6c3b8f0a9d1e4c7b2
   JWT_EXPIRE=7d
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   CORS_ORIGIN=https://your-vercel-frontend.vercel.app
   ```
7. **Deploy!** Render will auto-deploy on GitHub push

## Note
- Render provides a free tier but may have cold starts
- Copy your Render URL (will look like: https://your-app.onrender.com)
- Update frontend VITE_API_BASE_URL with this URL

---

# Vercel Deployment Guide

## Steps to Deploy Frontend on Vercel

1. **Push your code to GitHub**
2. **Go to vercel.com** and sign up/login
3. **Import Project** → Select your GitHub repo
4. **Configure Project:**
   - Framework: Vite
   - Root Directory: `frontend`
5. **Add Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
   ```
6. **Deploy!** Vercel will auto-deploy on GitHub push

## Note
- Vercel provides free tier with generous limits
- Your frontend URL will be: https://your-app.vercel.app
- Update this in your Render CORS_ORIGIN setting

---

# Summary of Environment Variables Needed

## Backend (Render)
- `PORT` = 10000 (Render requires this)
- `NODE_ENV` = production
- `MONGO_URI` = Your MongoDB connection string ✅ ALREADY SET
- `JWT_SECRET` = Your secret key ✅ ALREADY SET
- `JWT_EXPIRE` = 7d
- `ADMIN_USERNAME` = admin
- `ADMIN_PASSWORD` = admin123
- `CORS_ORIGIN` = Your Vercel frontend URL

## Frontend (Vercel)
- `VITE_API_BASE_URL` = Your Render backend API URL (e.g., https://backend.onrender.com/api)
