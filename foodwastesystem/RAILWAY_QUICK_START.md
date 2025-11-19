# Quick Start: Deploy to Railway

## 🚀 Quick Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create Railway Project
1. Go to https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository: `DonKisaka/Food-waste-management-system`

### 3. Configure Service Settings ⚠️ CRITICAL
Go to your service → **Settings** tab:

**Source:**
- **Root Directory**: `foodwastesystem` ← MUST SET THIS

**Build:**
- **Builder**: `Dockerfile` (change from Railpack if needed)
- **Dockerfile Path**: `Dockerfile`

**Deploy:**
- **Start Command**: `java -jar app.jar`

### 4. Add PostgreSQL Database
1. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway auto-sets `DATABASE_URL`

### 5. Set Environment Variables
Go to **Variables** tab:

| Variable | Value |
|---------|-------|
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` |
| `JWT_SECRET_KEY` | Generate: `openssl rand -hex 32` |
| `HIBERNATE_DDL_AUTO` | `update` (first) or `validate` (prod) |
| `SHOW_SQL` | `false` |

### 6. Deploy!
1. Save all settings
2. Go to **Deployments** tab
3. Click **"Redeploy"** or push new commit
4. Watch build logs

### 7. Update Frontend
In Vercel → **Settings** → **Environment Variables**:
- `NEXT_PUBLIC_API_URL` = Your Railway URL

## ✅ Verification

Test API:
```bash
curl https://your-app.up.railway.app/api/v1/auth/signup
```

## 🔧 Common Issues

**Railpack Error?**
→ Settings → Build → Change Builder to `Dockerfile`

**Dockerfile Not Found?**
→ Settings → Source → Set Root Directory to `foodwastesystem`

**CORS Errors?**
→ Check `CORS_ALLOWED_ORIGINS` matches your Vercel URL exactly

## 📚 Full Guide
See `RAILWAY_DEPLOYMENT.md` for detailed instructions.

