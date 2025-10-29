# 🚀 Cloudflare Pages Deployment Guide

## Quick Deploy to Cloudflare Pages

### Method 1: Direct GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages** → **Pages**
   - Click **"Create a project"**
   - Click **"Connect to Git"**

3. **Configure Build Settings**
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables (optional):**
     - `NODE_VERSION`: `18`

4. **Deploy**
   - Click **"Save and Deploy"**
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at: `https://your-project.pages.dev`

### Method 2: Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   npm run deploy:cloudflare
   ```

4. **Follow prompts to create project**

### Method 3: Direct Upload

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Go to Cloudflare Dashboard**
   - Navigate to **Workers & Pages** → **Pages**
   - Click **"Upload assets"**
   - Upload the `dist` folder
   - Deploy!

## Configuration Files

### `wrangler.toml`
Configures Cloudflare Workers/Pages settings.

### `public/_headers`
Sets HTTP headers for:
- Camera permissions
- Security headers
- Cache control

### `public/_redirects`
Handles SPA routing for client-side navigation.

## Custom Domain Setup

1. **In Cloudflare Dashboard**
   - Go to your Pages project
   - Click **"Custom domains"**
   - Click **"Set up a custom domain"**
   - Enter your domain (e.g., `smartplace3d.com`)
   - Follow DNS configuration steps

2. **SSL/TLS**
   - Automatically enabled by Cloudflare
   - HTTPS required for camera access ✅

## Environment Variables

If using Sketchfab API:

1. **In Cloudflare Dashboard**
   - Go to your project **Settings**
   - Click **"Environment variables"**
   - Add:
     - **Variable name:** `VITE_SKETCHFAB_API_KEY`
     - **Value:** Your API key

2. **Redeploy** for changes to take effect

## Benefits of Cloudflare Pages

✅ **Fast Global CDN** - 275+ locations worldwide  
✅ **Automatic HTTPS** - Free SSL certificates  
✅ **Unlimited Bandwidth** - No limits on free tier  
✅ **Instant Rollbacks** - Easy to revert deployments  
✅ **Preview Deployments** - Every PR gets a preview URL  
✅ **Free Tier** - Generous limits for personal projects  

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Project connected to Cloudflare Pages
- [ ] Build settings configured
- [ ] Environment variables set (if needed)
- [ ] First deployment successful
- [ ] HTTPS enabled (automatic)
- [ ] Camera permissions working
- [ ] All features tested on live site

## Troubleshooting

### Build Fails
**Error:** Build command fails

**Solution:**
- Check Node version (should be 18+)
- Verify all dependencies in package.json
- Test build locally: `npm run build`

### Camera Not Working
**Error:** Camera permission denied

**Solution:**
- Ensure site uses HTTPS (Cloudflare automatic)
- Check browser permissions
- Verify `_headers` file deployed correctly

### 404 on Refresh
**Error:** Page refreshes show 404

**Solution:**
- Verify `_redirects` file in `public/` folder
- Check deployment includes redirect rules
- Ensure SPA routing configured

## Monitoring & Analytics

1. **Cloudflare Web Analytics**
   - Go to **Analytics** in your project
   - View page views, bandwidth, etc.

2. **Real User Monitoring**
   - Track performance metrics
   - Monitor errors
   - Free tier available

## CI/CD Pipeline

Cloudflare Pages automatically:
- Builds on every push to main
- Creates preview deployments for PRs
- Runs your build command
- Deploys on success

## Cost

**Free Tier Includes:**
- 500 builds per month
- Unlimited sites
- Unlimited bandwidth
- Unlimited requests
- 1 concurrent build

Perfect for personal projects and demos! 🎉

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [GitHub Issues](https://github.com/Vibhor2702/SmartPlace3D/issues)

---

**Your SmartPlace3D app is now deployed on Cloudflare's global network!** 🌍✨
