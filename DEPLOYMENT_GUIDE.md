# 🚀 TradeFlux Deployment Guide

## Deployment URLs

**Frontend:** `https://tradeflux-smart-trading-platform-sunilsethi.netlify.app`
**Backend:** `https://tradeflux-api-backend.onrender.com`

---

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Netlify account (free) - https://netlify.com
3. ✅ Render account (free) - https://render.com
4. ✅ MongoDB Atlas account (free) - https://mongodb.com/atlas

---

## 🎯 STEP 1: Prepare MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Cluster

1. Go to https://mongodb.com/atlas
2. Sign up / Login
3. Create a **FREE M0** cluster
4. Choose provider: **AWS**
5. Region: Choose closest to you
6. Cluster Name: **TradeFlux**

### 1.2 Create Database User

1. Click **Database Access** → **Add New Database User**
2. Username: `tradeflux_user`
3. Password: Generate strong password (SAVE THIS!)
4. Database User Privileges: **Read and write to any database**
5. Click **Add User**

### 1.3 Whitelist All IPs (for deployment)

1. Click **Network Access** → **Add IP Address**
2. Click **Allow Access from Anywhere**
3. IP Address: `0.0.0.0/0`
4. Click **Confirm**

### 1.4 Get Connection String

1. Go to **Database** → **Connect** → **Connect your application**
2. Driver: **Node.js**
3. Version: **4.1 or later**
4. Copy connection string (looks like):
   ```
   mongodb+srv://tradeflux_user:<password>@tradeflux.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. **SAVE THIS CONNECTION STRING!**

---

## 🎯 STEP 2: Push Code to GitHub

### 2.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: **TradeFlux**
3. Make it **Public**
4. **DON'T** initialize with README
5. Click **Create repository**

### 2.2 Push Your Code

Open terminal in `TradeFlux` folder and run:

```bash
git init
git add .
git commit -m "Initial commit - TradeFlux project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/TradeFlux.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username!

---

## 🎯 STEP 3: Deploy Backend to Render

### 3.1 Create New Web Service

1. Go to https://render.com
2. Sign up / Login with GitHub
3. Click **New** → **Web Service**
4. Connect your **TradeFlux** repository
5. Click **Connect**

### 3.2 Configure Web Service

**Name:** `tradeflux-api-backend` (or any name you like)

**Region:** Choose closest to you

**Root Directory:** `backend`

**Runtime:** `Node`

**Build Command:** `npm install`

**Start Command:** `npm start`

**Instance Type:** **Free**

### 3.3 Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add these variables:

| Key | Value |
|-----|-------|
| `MONGO_URL` | Your MongoDB connection string from Step 1.4 |
| `JWT_SECRET` | `your_super_secret_jwt_key_12345` |
| `FINNHUB_API_KEY` | Your Finnhub API key (if you have one) |
| `PORT` | `4000` |
| `FRONTEND_URL` | `https://tradeflux-smart-trading-platform-sunilsethi.netlify.app` |

**IMPORTANT:** We'll update `FRONTEND_URL` after deploying frontend!

### 3.4 Deploy

1. Click **Create Web Service**
2. Wait 5-10 minutes for deployment
3. Once done, you'll get a URL like:
   ```
   https://tradeflux-api-backend.onrender.com
   ```
4. **SAVE THIS URL!** You'll need it for frontend

---

## 🎯 STEP 4: Deploy Frontend to Netlify

### 4.1 Create Production Environment File

1. In your project, update `frontend/.env` file:

```env
PORT=3000
REACT_APP_API_URL=https://tradeflux-api-backend.onrender.com
```

Replace with YOUR Render backend URL!

### 4.2 Build Frontend Locally (Optional Test)

```bash
cd frontend
npm run build
```

This creates a `build` folder. If successful, delete it and proceed.

### 4.3 Deploy to Netlify

#### Option A: Drag & Drop (Easier)

1. Go to https://netlify.com
2. Sign up / Login
3. After login, go to: https://app.netlify.com/drop
4. In terminal, run:
   ```bash
   cd frontend
   npm run build
   ```
5. Drag the `build` folder to Netlify
6. Wait for deployment

#### Option B: GitHub (Recommended)

1. Go to https://netlify.com
2. Sign up / Login with GitHub
3. Click **Add new site** → **Import an existing project**
4. Choose **GitHub**
5. Select **TradeFlux** repository
6. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
7. Click **Show advanced** → **New variable**
8. Add:
   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_URL` | Your Render backend URL |

9. Click **Deploy site**

### 4.4 Change Site Name (Add your name!)

1. After deployment, go to **Site settings**
2. Click **Change site name**
3. Enter: `tradeflux-smart-trading-platform-sunilsethi`
4. Click **Save**

Your site will be: `https://tradeflux-smart-trading-platform-sunilsethi.netlify.app`

---

## 🎯 STEP 5: Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Click **Environment**
4. Update `FRONTEND_URL`:
   ```
   https://tradeflux-smart-trading-platform-sunilsethi.netlify.app
   ```
5. Click **Save Changes**
6. Service will auto-redeploy (2-3 minutes)

---

## ✅ STEP 6: Test Your Deployment

1. Open: `https://tradeflux-smart-trading-platform-sunilsethi.netlify.app`
2. Try to **Sign Up** with a new account
3. Try to **Login**
4. Check if dashboard loads
5. Try creating a dummy trade (if data exists)

---

## 🔧 Troubleshooting

### Frontend not loading?
- Check Netlify deploy logs
- Ensure environment variable `REACT_APP_API_URL` is set correctly

### Backend not responding?
- Check Render logs (click on your service → Logs)
- Ensure MongoDB connection string is correct
- Check if all environment variables are set

### CORS errors?
- Ensure `FRONTEND_URL` in Render matches your Netlify URL exactly
- Make sure Render service redeployed after updating

### "Cannot connect to database"?
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Verify connection string has correct password
- Check if cluster is active

---

## 📝 Important Notes

1. **Free Tier Limitations:**
   - Render: Service sleeps after 15 min of inactivity (first request takes ~30 seconds)
   - Netlify: 100GB bandwidth/month (more than enough)
   - MongoDB Atlas: 512MB storage

2. **Custom Domain (Optional):**
   - Buy domain from Namecheap/GoDaddy
   - Add to Netlify: Settings → Domain management → Add custom domain

3. **Keep .env files secret:**
   - Never commit `.env` files to GitHub
   - They're already in `.gitignore`

---

## 🎉 You're Live!

Your TradeFlux application is now deployed at:

**Frontend:** `https://tradeflux-smart-trading-platform-sunilsethi.netlify.app`
**Backend:** `https://tradeflux-api-backend.onrender.com`

Share it with the world! 🚀🌟

---

## 📧 Support

If you face any issues:
1. Check Netlify deployment logs
2. Check Render service logs
3. Verify all environment variables

Good luck! 🍀
