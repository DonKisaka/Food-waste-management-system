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
3. Select your repository
4. Railway will auto-detect Dockerfile

### 3. Add PostgreSQL Database
1. In Railway dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. ✅ Railway auto-sets `DATABASE_URL`

### 4. Set Environment Variables
Go to your service → **Variables** tab:

| Variable | Value | Required |
|----------|-------|----------|
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` | ✅ Yes |
| `JWT_SECRET_KEY` | Generate with: `openssl rand -hex 32` | ⚠️ Recommended |
| `HIBERNATE_DDL_AUTO` | `update` (first deploy) or `validate` (production) | ❌ Optional |
| `SHOW_SQL` | `false` | ❌ Optional |

### 5. Update Frontend
In Vercel dashboard → **Settings** → **Environment Variables**:
- Add/Update: `NEXT_PUBLIC_API_URL` = `https://your-railway-app.up.railway.app`

### 6. Deploy!
Railway will automatically build and deploy. Check logs for any errors.

## ✅ Verification

Test your API:
```bash
curl https://your-railway-app.up.railway.app/api/v1/auth/signup
```

## 🔧 Troubleshooting

**CORS Errors?**
- Verify `CORS_ALLOWED_ORIGINS` matches your exact Vercel URL (with `https://`)

**Database Connection Failed?**
- Check PostgreSQL service is running
- Verify `DATABASE_URL` is set (Railway sets this automatically)

**Build Failed?**
- Check Railway build logs
- Verify Java 25 compatibility

## 📚 Full Guide
See `RAILWAY_DEPLOYMENT.md` for detailed instructions.

