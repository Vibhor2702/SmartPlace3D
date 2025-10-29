# 🎯 SmartPlace3D — Quick Start Guide

Welcome to **SmartPlace3D**! This guide will get you up and running in minutes.

---

## ⚡ Fast Setup (3 Steps)

### Step 1: Install Dependencies
```powershell
# Windows (PowerShell)
.\setup.ps1
```

```bash
# Mac/Linux
chmod +x setup.sh
./setup.sh
```

Or manually:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

🎉 **You're ready to go!**

---

## 📱 First-Time Usage

### On Desktop
1. Click "Allow" when browser asks for camera permission
2. Select a demo model (chair, table, lamp, or sofa)
3. Click **"🚀 Enter AR Mode"**
4. Point your camera at a flat surface
5. Click on the surface to place your object
6. Use controls to rotate, scale, or take a snapshot

### On Mobile
1. Open in **Chrome** (Android) or **Safari** (iOS)
2. Grant camera permissions
3. Use rear camera for best results
4. Follow desktop steps above
5. Tap with finger instead of mouse click

---

## 🎨 Exploring Features

### Feature 1: Demo Models
- 4 preset models included
- Instant loading
- Perfect for quick testing

### Feature 2: Custom Upload
- Click **"Choose File"**
- Select `.glb` or `.gltf` file
- Wait for loading
- Enter AR mode

### Feature 3: AI Search
- Type object description: "wooden chair"
- Click **"🔍 Find Model"**
- App searches Sketchfab
- Model loads automatically

### Feature 4: AR Controls
- **🔄 Rotate**: Spin 45 degrees
- **➕ Scale Up**: Make bigger
- **➖ Scale Down**: Make smaller  
- **🗑️ Delete**: Remove object
- **📸 Snapshot**: Save image

---

## 🔧 Optional Configuration

### Sketchfab API (for AI search)
1. Get API key from [Sketchfab Developers](https://sketchfab.com/developers)
2. Copy `.env.example` to `.env`
3. Add your key:
   ```env
   VITE_SKETCHFAB_API_KEY=your_key_here
   ```
4. Restart dev server

---

## 📱 Mobile Testing

### Local Network Access
1. Find your computer's IP address:
   ```powershell
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Look for IPv4 address (e.g., `192.168.1.100`)

3. On mobile, open: `http://YOUR_IP:3000`

### HTTPS (for full camera access)
Use [ngrok](https://ngrok.com) for HTTPS tunnel:
```bash
ngrok http 3000
```

---

## 🚀 Building for Production

### Option 1: Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Option 2: Netlify
```bash
npm run build
# Drag 'dist' folder to netlify.com
```

### Option 3: GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

---

## 🎥 Demo Script

**Quick 60-Second Demo:**

1. **[0:00-0:10]** "Welcome to SmartPlace3D - AI-powered AR"
2. **[0:10-0:20]** Select wooden chair model
3. **[0:20-0:30]** Enter AR mode, show camera feed
4. **[0:30-0:40]** Tap to place chair on floor
5. **[0:40-0:50]** Rotate and scale the chair
6. **[0:50-0:60]** Take snapshot and show result

---

## 🐛 Troubleshooting

### Camera Not Working
**Issue**: Black screen or "Camera access required" error  
**Solution**: 
- Use HTTPS (required for camera)
- Check browser permissions
- Try different browser
- Ensure camera not in use

### Model Not Loading
**Issue**: "Failed to load model" error  
**Solution**:
- Check internet connection
- Try different model
- Check file format (.glb or .gltf only)
- Look at browser console for details

### Poor Performance
**Issue**: Laggy or slow rendering  
**Solution**:
- Close other tabs/apps
- Use smaller 3D models
- Try on desktop instead of mobile
- Reduce shadow quality (edit code)

### Can't Place Object
**Issue**: Nothing happens when tapping  
**Solution**:
- Ensure model is loaded (check green checkmark)
- Point at flat surface
- Improve lighting in room
- Tap directly on visible surface

---

## 📚 Next Steps

### Learn More
- Read **README.md** for full documentation
- Check **DEVELOPMENT.md** for architecture details
- See **SHOWCASE.md** for project highlights
- Review **CONTRIBUTING.md** to contribute

### Customize
- Modify colors in `src/styles/index.css`
- Add more preset models in `src/utils/modelLoader.js`
- Adjust camera resolution in `src/components/ARScene.jsx`
- Change ML update frequency in `src/utils/mlHelpers.js`

### Deploy
- Follow deployment guide in README.md
- Configure custom domain
- Set up analytics (optional)
- Share with the world!

---

## 💡 Tips & Tricks

### Best Practices
✅ Use good lighting for better surface detection  
✅ Keep camera steady when placing objects  
✅ Start with small objects, scale up as needed  
✅ Take snapshots from different angles  
✅ Use Chrome/Safari for best compatibility  

### Power User Features
🔥 Press **Esc** to quickly exit AR mode (future)  
🔥 Double-tap to reset object position (future)  
🔥 Use two fingers to rotate (future)  
🔥 Pinch to scale (future)  

---

## 🎓 Learning Resources

Want to understand how it works?

- **React**: [react.dev](https://react.dev)
- **Three.js**: [threejs.org](https://threejs.org)
- **TensorFlow.js**: [tensorflow.org/js](https://www.tensorflow.org/js)
- **WebXR**: [immersiveweb.dev](https://immersiveweb.dev)

---

## 🤝 Get Help

Having issues? Here's how to get help:

1. Check the **Troubleshooting** section above
2. Search [GitHub Issues](https://github.com/Vibhor2702/SmartPlace3D/issues)
3. Create a new issue with details
4. Join discussions in the repo

---

## 🌟 Share Your Creations

Made something cool? Share it!

- Take snapshots of your AR scenes
- Share on social media with #SmartPlace3D
- Submit to the project showcase (future)
- Inspire others!

---

**Happy AR-ing! 🚀✨**

Built with ❤️ by Vibhor Verma
