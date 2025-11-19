# Practical Steps: Deploy Spring Boot to Railway

## ✅ Your Code is Already Configured!

Your Spring Boot backend is already set up for Railway deployment:
- ✅ Dockerfile configured
- ✅ Environment variables support (PORT, DATABASE_URL, CORS)
- ✅ DatabaseConfig handles Railway's DATABASE_URL format
- ✅ SecurityConfig supports CORS from environment variable

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub
```bash
cd foodwastesystem
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 2: Create Railway Project
1. Go to **https://railway.app**
2. Sign up/Login (use GitHub for easy connection)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: `DonKisaka/Food-waste-management-system`

### Step 3: Configure Service Settings ⚠️ CRITICAL

**Go to your service → Settings tab:**

#### A. Source Section:
- **Root Directory**: `foodwastesystem`
  - ⚠️ **MUST SET THIS** - tells Railway where your code is

#### B. Build Section:
- **Builder**: `Dockerfile` 
  - If it shows "Railpack" or "Nixpacks", change it to "Dockerfile"
- **Dockerfile Path**: `Dockerfile`
  - (Relative to root directory)

#### C. Deploy Section:
- **Start Command**: `java -jar app.jar`

**Click Save!**

### Step 4: Add PostgreSQL Database
1. In Railway dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway automatically:
   - Creates PostgreSQL database
   - Sets `DATABASE_URL` environment variable in your service
   - Links the database to your service
   - **Note**: Railway uses `DATABASE_URL` format: `postgresql://user:password@host:port/database`

### Step 5: Set Environment Variables

**Go to your service → Variables tab:**

Click **"New Variable"** and add:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` | Your Vercel frontend URL (no trailing slash) |
| `JWT_SECRET_KEY` | `[generate]` | Run: `openssl rand -hex 32` |
| `HIBERNATE_DDL_AUTO` | `update` | For first deploy (use `validate` in production) |
| `SHOW_SQL` | `false` | Reduces log noise |

**Auto-set by Railway:**
- ✅ `DATABASE_URL` (set automatically when you add PostgreSQL)
  - Format: `postgresql://user:password@host:port/database`
  - Your `DatabaseConfig.java` handles parsing this automatically
- ✅ `PORT` (set automatically by Railway - your app reads this)
- ✅ `RAILWAY_ENVIRONMENT` (set automatically)
- ✅ `RAILWAY_PUBLIC_DOMAIN` (set automatically - your service URL)

### Step 6: Deploy

1. **Save all settings** (Root Directory, Builder, Variables)
2. Go to **Deployments** tab
3. Click **"Redeploy"** button
   - OR push a new commit to trigger auto-deploy
4. **Watch build logs:**
   - Should show "Building Docker image"
   - Maven build steps
   - "Successfully built"
   - Application starting

### Step 7: Get Your Backend URL

After deployment succeeds:
- Railway provides URL: `https://your-app.up.railway.app`
- Copy this URL

### Step 8: Update Frontend

1. Go to **Vercel Dashboard**
2. **Settings** → **Environment Variables**
3. Add/Update: `NEXT_PUBLIC_API_URL`
4. Value: Your Railway URL (e.g., `https://your-app.up.railway.app`)
   - ⚠️ No trailing slash

### Step 9: Test Deployment

```bash
# Test API endpoint
curl https://your-app.up.railway.app/api/v1/auth/signup

# Or visit in browser
https://your-app.up.railway.app/api/v1/auth/signup
```

Test from your frontend:
- Try signing up or signing in
- Check browser console for errors

## ✅ Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Root Directory set to `foodwastesystem`
- [ ] Builder set to `Dockerfile` (not Railpack)
- [ ] PostgreSQL database added
- [ ] `CORS_ALLOWED_ORIGINS` set to Vercel URL
- [ ] `JWT_SECRET_KEY` set
- [ ] Settings saved
- [ ] Deployment successful
- [ ] Frontend updated with Railway URL
- [ ] API tested

## 🔧 Common Issues & Fixes

### "Railpack could not determine how to build"
**Fix**: Settings → Build → Change Builder to `Dockerfile`

### "Dockerfile not found"
**Fix**: Settings → Source → Set Root Directory to `foodwastesystem`

### CORS Errors
**Fix**: Check `CORS_ALLOWED_ORIGINS` matches your exact Vercel URL

### Database Connection Failed
**Fix**: Verify PostgreSQL is linked and `DATABASE_URL` is set

## 💡 Pro Tips

### Using railway.json (Optional)
You can also use `railway.json` file for configuration:
- Place it in your `foodwastesystem/` directory
- Railway will automatically detect and use it
- See `railway.json` file in your project

### Database Migrations
If you need to run migrations:
- Railway supports running commands before deployment
- Add a pre-deploy script or use Railway's CLI
- Or run migrations manually via Railway's database console

### Service References
Railway supports referencing other services:
- Use `${{ServiceName.VARIABLE}}` syntax
- Example: `${{Backend.RAILWAY_PUBLIC_DOMAIN}}` to reference backend URL

## 📚 More Help

- **Full Guide**: See `RAILWAY_DEPLOYMENT.md`
- **Quick Reference**: See `RAILWAY_QUICK_START.md`
- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Railway Status**: https://status.railway.app

## 🎉 You're Ready!

Your backend is configured for Railway. Follow the steps above to deploy!

