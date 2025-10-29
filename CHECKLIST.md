# ✅ SmartPlace3D - Installation & Deployment Checklist

## 🎯 Pre-Installation Checklist

### System Requirements
- [ ] Node.js v16 or higher installed
- [ ] npm or yarn package manager
- [ ] Git installed (for cloning)
- [ ] Modern web browser (Chrome/Safari recommended)
- [ ] Device with camera (for AR features)

### Check Node.js Version
```powershell
node --version  # Should be v16.0.0 or higher
npm --version   # Should be v7.0.0 or higher
```

---

## 📦 Installation Steps

### Step 1: Get the Code
```bash
# If cloning from GitHub
git clone https://github.com/Vibhor2702/SmartPlace3D.git
cd SmartPlace3D

# Or if you have the source files
cd SmartPlace3D
```
- [ ] Code downloaded successfully
- [ ] In project directory

### Step 2: Install Dependencies

#### Option A: Quick Setup (Recommended)
**Windows:**
```powershell
.\setup.ps1
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

#### Option B: Manual Installation
```bash
npm install
```

Wait for installation to complete (may take 2-3 minutes)

- [ ] Dependencies installed
- [ ] No error messages
- [ ] `node_modules/` folder created

### Step 3: Optional Configuration
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file and add Sketchfab API key (optional)
# VITE_SKETCHFAB_API_KEY=your_key_here
```

- [ ] Environment file created (if needed)
- [ ] API key added (optional)

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.8  ready in 1234 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.100:3000/
```

- [ ] Server started successfully
- [ ] No error messages
- [ ] Port 3000 is accessible

### Access the Application

1. **Desktop:**
   - [ ] Open browser
   - [ ] Navigate to `http://localhost:3000`
   - [ ] Page loads successfully
   - [ ] Allow camera permissions

2. **Mobile (same network):**
   - [ ] Find your IP address (shown in terminal)
   - [ ] Open `http://YOUR_IP:3000` on mobile
   - [ ] Page loads on mobile
   - [ ] Camera permissions granted

---

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Page loads without errors
- [ ] UI elements visible and styled
- [ ] No console errors

### Model Selection
- [ ] Preset models display correctly
- [ ] Can click on preset models
- [ ] File upload button works
- [ ] AI prompt input accepts text
- [ ] Selected model shows confirmation

### AR Mode
- [ ] "Enter AR Mode" button enabled after model selection
- [ ] Camera permission prompt appears
- [ ] Camera feed displays as background
- [ ] Scene renders correctly

### Model Placement
- [ ] Can tap on surface to place model
- [ ] Model appears at tap location
- [ ] Model has shadows
- [ ] Model renders with proper lighting

### Controls
- [ ] Rotate button spins model 45°
- [ ] Scale up button increases size
- [ ] Scale down button decreases size
- [ ] Delete button removes model
- [ ] Snapshot button captures and downloads image
- [ ] Exit button returns to selection

### Performance
- [ ] Smooth 60fps rendering
- [ ] No lag when placing objects
- [ ] Camera feed is fluid
- [ ] Controls respond instantly

---

## 🏗️ Building for Production

### Build Process
```bash
npm run build
```

**Expected output:**
```
vite v5.0.8 building for production...
✓ 123 modules transformed.
dist/index.html                   1.23 kB
dist/assets/index-abc123.js     234.56 kB │ gzip: 78.90 kB
✓ built in 5.67s
```

- [ ] Build completes successfully
- [ ] `dist/` folder created
- [ ] No build errors
- [ ] File sizes reasonable

### Preview Build
```bash
npm run preview
```

- [ ] Preview server starts
- [ ] Production build works locally
- [ ] All features functional

---

## 🌐 Deployment Checklist

### Option 1: Vercel (Recommended)

#### Prerequisites
- [ ] Vercel account created
- [ ] Vercel CLI installed: `npm install -g vercel`

#### Deploy
```bash
vercel --prod
```

**Checklist:**
- [ ] Deployment successful
- [ ] Live URL received
- [ ] Site accessible via URL
- [ ] HTTPS enabled (automatic)
- [ ] Camera works on deployed site

### Option 2: Netlify

#### Deploy
```bash
npm run build
# Then drag 'dist' folder to netlify.com
```

**Checklist:**
- [ ] Build created
- [ ] Uploaded to Netlify
- [ ] Site published
- [ ] Custom domain configured (optional)

### Option 3: GitHub Pages

#### Setup
```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "vite build && gh-pages -d dist"

npm run deploy
```

**Checklist:**
- [ ] gh-pages installed
- [ ] Deployment script added
- [ ] Pushed to GitHub
- [ ] GitHub Pages enabled in settings
- [ ] Site accessible

---

## 🔍 Troubleshooting Guide

### Issue: Dependencies Won't Install
**Symptoms:** npm install fails with errors

**Solutions:**
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete node_modules: `rm -rf node_modules`
- [ ] Delete package-lock.json: `rm package-lock.json`
- [ ] Try again: `npm install`
- [ ] Check Node.js version compatibility

### Issue: Camera Not Working
**Symptoms:** Black screen, no camera feed

**Solutions:**
- [ ] Ensure HTTPS connection (required for camera)
- [ ] Check browser permissions
- [ ] Allow camera in browser settings
- [ ] Try different browser
- [ ] Check camera not in use by other app
- [ ] Restart browser

### Issue: Port 3000 Already in Use
**Symptoms:** Error: Port 3000 is already in use

**Solutions:**
- [ ] Kill process on port 3000: `npx kill-port 3000`
- [ ] Use different port: `npm run dev -- --port 3001`
- [ ] Close other dev servers

### Issue: Models Not Loading
**Symptoms:** "Failed to load model" error

**Solutions:**
- [ ] Check internet connection
- [ ] Verify file format (.glb or .gltf)
- [ ] Try different model
- [ ] Check browser console for CORS errors
- [ ] Ensure model URL is accessible

### Issue: Poor Performance
**Symptoms:** Laggy, low FPS

**Solutions:**
- [ ] Close unnecessary browser tabs
- [ ] Try on desktop instead of mobile
- [ ] Use smaller 3D models
- [ ] Reduce shadow quality in code
- [ ] Disable ML features temporarily

---

## 📊 Post-Deployment Verification

### Production Site Checks
- [ ] Site loads on desktop Chrome
- [ ] Site loads on desktop Safari
- [ ] Site loads on mobile Chrome
- [ ] Site loads on mobile Safari
- [ ] HTTPS enabled
- [ ] Camera permissions work
- [ ] All models load correctly
- [ ] AR placement works
- [ ] Controls functional
- [ ] Snapshots download
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Responsive on all screen sizes

### SEO & Sharing
- [ ] Page title correct
- [ ] Meta description present
- [ ] Open Graph tags (optional)
- [ ] Favicon (optional)
- [ ] Sitemap (optional)

---

## 🎯 Success Criteria

### Deployment is successful when:
✅ Site is live and accessible  
✅ HTTPS enabled  
✅ Camera works on all devices  
✅ All features functional  
✅ Performance is smooth  
✅ No critical errors  

---

## 📝 Final Checklist

### Before Announcing Launch
- [ ] All features tested
- [ ] Documentation reviewed
- [ ] README.md accurate
- [ ] License file present
- [ ] Contact info current
- [ ] Demo video/GIF prepared (optional)
- [ ] Screenshots captured (optional)
- [ ] GitHub repo organized
- [ ] Issues tracking enabled
- [ ] Contributing guidelines clear

### Launch Day
- [ ] Announce on social media
- [ ] Share with friends/colleagues
- [ ] Add to portfolio
- [ ] Submit to showcases
- [ ] Monitor for issues
- [ ] Respond to feedback

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**
   - [ ] README.md
   - [ ] QUICKSTART.md
   - [ ] DEVELOPMENT.md
   - [ ] This checklist

2. **Search Issues**
   - [ ] GitHub Issues tab
   - [ ] Stack Overflow
   - [ ] Three.js forum

3. **Create Issue**
   - [ ] Describe problem clearly
   - [ ] Include error messages
   - [ ] Provide steps to reproduce
   - [ ] Include device/browser info

4. **Contact Developer**
   - GitHub: @Vibhor2702
   - Issues: Create new issue

---

## 🎉 Congratulations!

If all checkboxes are marked, you have successfully:
- ✅ Installed SmartPlace3D
- ✅ Tested all features
- ✅ Built for production
- ✅ Deployed to live server

**Your AR application is now live and ready to use!** 🚀

---

**Next Steps:**
- Share your deployment URL
- Add to your portfolio
- Gather user feedback
- Plan future enhancements

**Thank you for using SmartPlace3D!** ❤️
