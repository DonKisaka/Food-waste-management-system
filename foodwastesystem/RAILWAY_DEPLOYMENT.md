# Railway Deployment Guide for Food Waste System Backend

This guide will walk you through deploying your Spring Boot backend to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Your backend code ready in a Git repository (GitHub, GitLab, or Bitbucket)
3. Your Vercel frontend URL (you'll need this for CORS configuration)

## Step-by-Step Deployment Instructions

### Step 1: Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket). Railway will connect to this repository.

### Step 2: Create a New Railway Project

1. Go to https://railway.app and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** (or your Git provider)
4. Select your repository
5. Railway will detect your Dockerfile automatically

### Step 3: Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. Note: Railway will automatically set the `DATABASE_URL` environment variable

### Step 4: Configure Environment Variables

In your Railway service settings, go to the **"Variables"** tab and add the following:

#### Required Variables:

1. **CORS_ALLOWED_ORIGINS**
   - Value: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
   - If you have multiple origins, separate them with commas: `https://app1.vercel.app,https://app2.vercel.app`

2. **JWT_SECRET_KEY** (Optional but Recommended)
   - Generate a secure random key for production
   - You can generate one using: `openssl rand -hex 32`
   - Or use an online generator: https://generate-secret.vercel.app/32

3. **HIBERNATE_DDL_AUTO** (Optional)
   - For production, set to: `validate` or `none`
   - For initial deployment, you can use: `update`
   - **Warning**: Using `update` in production can be risky

4. **SHOW_SQL** (Optional)
   - Set to: `false` for production (reduces log noise)

#### Database Variables (Auto-configured by Railway):

Railway automatically sets these when you add PostgreSQL:
- `DATABASE_URL` - Full connection string
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Individual components

**Note**: Your `application.properties` is configured to use `DATABASE_URL` if available, or parse individual components.

### Step 5: Configure Port

Railway automatically sets the `PORT` environment variable. Your application is configured to use it. No manual configuration needed.

### Step 6: Deploy

1. Railway will automatically start building and deploying your application
2. You can watch the build logs in the Railway dashboard
3. Once deployment completes, Railway will provide you with a public URL (e.g., `https://your-app.up.railway.app`)

### Step 7: Update Frontend Environment Variable

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add or update `NEXT_PUBLIC_API_URL` with your Railway backend URL:
   - Example: `https://your-app.up.railway.app`
   - **Important**: Do NOT include a trailing slash

### Step 8: Verify Deployment

1. Test your backend API:
   ```bash
   curl https://your-app.up.railway.app/api/v1/auth/signup
   ```

2. Test from your frontend:
   - Try signing up or signing in from your Vercel-deployed frontend
   - Check browser console for any CORS errors

## Troubleshooting

### Issue: CORS Errors

**Solution**: 
- Verify `CORS_ALLOWED_ORIGINS` includes your exact Vercel URL (with `https://`)
- Check that there are no trailing slashes
- Ensure credentials are allowed (already configured in SecurityConfig)

### Issue: Database Connection Failed

**Solution**:
- Verify PostgreSQL service is running in Railway
- Check that `DATABASE_URL` is set correctly
- Review Railway logs for connection errors

### Issue: Application Won't Start

**Solution**:
- Check Railway build logs for compilation errors
- Verify Java version compatibility (you're using Java 25)
- Ensure all dependencies are correctly specified in `pom.xml`

### Issue: Port Already in Use

**Solution**:
- Railway handles this automatically via the `PORT` environment variable
- Your application is configured to use `PORT` or default to 8080

## Environment Variables Summary

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CORS_ALLOWED_ORIGINS` | Yes | Frontend URL(s) | `https://myapp.vercel.app` |
| `DATABASE_URL` | Auto | PostgreSQL connection string | Auto-set by Railway |
| `JWT_SECRET_KEY` | Recommended | Secret key for JWT tokens | Generate secure key |
| `PORT` | Auto | Server port | Auto-set by Railway |
| `HIBERNATE_DDL_AUTO` | Optional | Hibernate DDL mode | `validate` or `update` |
| `SHOW_SQL` | Optional | Show SQL queries in logs | `false` for production |

## Additional Tips

1. **Custom Domain**: Railway allows you to add a custom domain in the service settings
2. **Monitoring**: Railway provides logs and metrics in the dashboard
3. **Rollbacks**: Railway keeps deployment history - you can rollback if needed
4. **Scaling**: Railway can scale your service based on demand (paid plans)

## Security Checklist

- [ ] Use a strong `JWT_SECRET_KEY` in production
- [ ] Set `HIBERNATE_DDL_AUTO` to `validate` or `none` in production
- [ ] Set `SHOW_SQL` to `false` in production
- [ ] Verify CORS origins only include your frontend domain(s)
- [ ] Keep your Railway project private or secure
- [ ] Regularly rotate secrets

## Next Steps

After successful deployment:
1. Test all API endpoints
2. Monitor Railway logs for any errors
3. Set up monitoring/alerting if needed
4. Consider adding health check endpoints
5. Document your API endpoints for your team

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

