# Railway Deployment Guide for Spring Boot Backend

Complete step-by-step guide to deploy your Spring Boot backend to Railway.

## Prerequisites

1. ✅ Railway account (sign up at https://railway.app - free tier available)
2. ✅ Code pushed to GitHub/GitLab/Bitbucket
3. ✅ Vercel frontend URL (for CORS configuration)

## Step-by-Step Deployment Instructions

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### Step 2: Create Railway Account and Project

1. Go to https://railway.app
2. Sign up or sign in (use GitHub for easy integration)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Authorize Railway to access your repositories
6. Select your repository: `DonKisaka/Food-waste-management-system`

### Step 3: Configure Service Settings (CRITICAL for Monorepo)

After Railway creates your service, go to **Settings** tab:

#### Source Configuration:
- **Root Directory**: Set to `foodwastesystem` ⚠️ **MUST SET THIS**
  - This tells Railway where your backend code is located
  - Without this, Railway will look in the wrong directory

#### Build Configuration:
- **Builder**: Select `Dockerfile` (not Railpack/Nixpacks)
  - If it shows "Railpack" or "Nixpacks", change it to "Dockerfile"
- **Dockerfile Path**: `Dockerfile` (relative to root directory)
  - Since Root Directory is `foodwastesystem`, Railway will use `foodwastesystem/Dockerfile`

#### Deploy Configuration:
- **Start Command**: `java -jar app.jar`
  - This command starts your Spring Boot application

### Step 4: Add PostgreSQL Database

1. In Railway dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically:
   - Create a PostgreSQL database
   - Set `DATABASE_URL` environment variable
   - Link it to your service

### Step 5: Configure Environment Variables

Go to your service → **Variables** tab and add:

#### Required Variables:

1. **CORS_ALLOWED_ORIGINS** ✅ REQUIRED
   - **Value**: Your Vercel frontend URL
   - **Example**: `https://your-app.vercel.app`
   - **Multiple origins**: `https://app1.vercel.app,https://app2.vercel.app`
   - **Important**: Include `https://`, no trailing slash

2. **JWT_SECRET_KEY** ⚠️ RECOMMENDED
   - **Generate**: `openssl rand -hex 32`
   - **Or use**: https://generate-secret.vercel.app/32
   - **Why**: Use a strong, unique key for production

#### Optional Variables:

3. **HIBERNATE_DDL_AUTO**
   - **First deploy**: `update` (creates/updates tables)
   - **Production**: `validate` or `none` (safer)
   - **Warning**: `update` can modify your database schema

4. **SHOW_SQL**
   - **Production**: `false` (reduces log noise)
   - **Development**: `true` (helps debugging)

#### Auto-Set Variables (by Railway):
- ✅ `DATABASE_URL` - Automatically set when PostgreSQL is added
  - Format: `postgresql://user:password@host:port/database`
  - Your `DatabaseConfig.java` parses this automatically
- ✅ `PORT` - Automatically set by Railway (your app reads this)
- ✅ `RAILWAY_ENVIRONMENT` - Current environment name
- ✅ `RAILWAY_PUBLIC_DOMAIN` - Your service's public URL

### Step 6: Deploy

1. **Save all settings** (Root Directory, Builder, Environment Variables)
2. Go to **Deployments** tab
3. Click **"Redeploy"** (or push a new commit to trigger auto-deploy)
4. Watch the build logs:
   - Should show "Building Docker image"
   - Maven build steps (`./mvnw clean package`)
   - "Successfully built" message
   - Application starting

### Step 7: Get Your Railway Backend URL

After successful deployment:
1. Railway provides a URL like: `https://your-app.up.railway.app`
2. Copy this URL (you'll need it for frontend)

### Step 8: Update Frontend Environment Variable

1. Go to your Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add or update: `NEXT_PUBLIC_API_URL`
4. **Value**: Your Railway backend URL
   - Example: `https://your-app.up.railway.app`
   - **Important**: No trailing slash

### Step 9: Verify Deployment

Test your API:
```bash
# Test signup endpoint
curl https://your-app.up.railway.app/api/v1/auth/signup

# Or test from browser
https://your-app.up.railway.app/api/v1/auth/signup
```

Test from your frontend:
- Try signing up or signing in
- Check browser console for any CORS errors

## Monorepo Configuration Summary

Your repository structure:
```
foodwastesystem/  (repo root)
├── foodwastesystem/  ← Backend (Spring Boot)
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
└── frontend/  ← Frontend (Next.js)
```

**Critical Railway Settings:**
- ✅ **Root Directory**: `foodwastesystem`
- ✅ **Builder**: `Dockerfile`
- ✅ **Dockerfile Path**: `Dockerfile` (relative to root directory)

## Environment Variables Summary

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CORS_ALLOWED_ORIGINS` | ✅ Yes | Frontend URL(s) | `https://myapp.vercel.app` |
| `DATABASE_URL` | Auto | PostgreSQL connection | Auto-set by Railway |
| `PORT` | Auto | Server port | Auto-set by Railway |
| `JWT_SECRET_KEY` | ⚠️ Recommended | JWT secret key | Generate secure key |
| `HIBERNATE_DDL_AUTO` | ❌ Optional | Hibernate DDL mode | `update` or `validate` |
| `SHOW_SQL` | ❌ Optional | Show SQL in logs | `false` for production |

## Troubleshooting

### Issue: "Railpack could not determine how to build"
**Cause**: Railway is using buildpacks instead of Docker
**Solution**: 
- Go to Settings → Build → Builder
- Change from "Railpack" to "Dockerfile"
- Save and redeploy

### Issue: "Dockerfile not found"
**Cause**: Root Directory not set correctly
**Solution**:
- Go to Settings → Source → Root Directory
- Set to: `foodwastesystem`
- Save and redeploy

### Issue: CORS Errors
**Solution**:
- Verify `CORS_ALLOWED_ORIGINS` includes your exact Vercel URL
- Check for trailing slashes (should be none)
- Ensure `https://` is included
- Check browser console for exact error message

### Issue: Database Connection Failed
**Solution**:
- Verify PostgreSQL service is running in Railway
- Check `DATABASE_URL` is set in Variables tab
- Review Railway logs for connection errors
- Verify DatabaseConfig.java is parsing DATABASE_URL correctly

### Issue: Application Won't Start
**Solution**:
- Check Start Command is: `java -jar app.jar`
- Verify PORT environment variable (Railway sets this automatically)
- Review application logs in Railway dashboard
- Check if JAR file is being created correctly

### Issue: Port Already in Use
**Solution**:
- Railway handles this automatically via `PORT` environment variable
- Your application reads `PORT` or defaults to 8080
- No manual configuration needed

## Verification Checklist

After deployment, verify:
- [ ] Root Directory set to `foodwastesystem`
- [ ] Builder set to `Dockerfile`
- [ ] PostgreSQL database created and linked
- [ ] `DATABASE_URL` environment variable set
- [ ] `CORS_ALLOWED_ORIGINS` set to your Vercel URL
- [ ] `JWT_SECRET_KEY` set (recommended)
- [ ] Build successful (check logs)
- [ ] Application started successfully
- [ ] API endpoint accessible
- [ ] Frontend can connect (no CORS errors)

## Security Checklist

- [ ] Use strong `JWT_SECRET_KEY` in production
- [ ] Set `HIBERNATE_DDL_AUTO` to `validate` or `none` in production
- [ ] Set `SHOW_SQL` to `false` in production
- [ ] Verify CORS origins only include your frontend domain(s)
- [ ] Keep Railway project private/secure
- [ ] Regularly rotate secrets

## Additional Tips

1. **Custom Domain**: Railway allows custom domains (paid plans)
2. **Monitoring**: Railway provides logs and metrics in dashboard
3. **Rollbacks**: Railway keeps deployment history - you can rollback if needed
4. **Scaling**: Railway can scale your service based on demand (paid plans)
5. **Health Checks**: Consider adding `/actuator/health` endpoint
6. **railway.json**: Optional config file - Railway auto-detects it
7. **Service References**: Use `${{ServiceName.VARIABLE}}` to reference other services
8. **Database Migrations**: Run migrations via Railway CLI or pre-deploy scripts

## Next Steps

After successful deployment:
1. ✅ Test all API endpoints
2. ✅ Monitor Railway logs for errors
3. ✅ Set up monitoring/alerting if needed
4. ✅ Document your API endpoints
5. ✅ Share your deployed backend URL with your team

## Support Resources

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

