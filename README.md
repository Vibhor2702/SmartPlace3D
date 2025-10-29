# 🚀 SmartPlace3D

**AI-Powered Augmented Reality Object Placement**

A cutting-edge web-based AR application that brings 3D object placement to life using artificial intelligence and real-time camera integration. Place, scale, and interact with 3D models in your physical environment — directly in your browser.

![Demo](https://img.shields.io/badge/Status-Ready%20for%20Demo-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Web%20AR-blue)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Three.js%20%7C%20TensorFlow-orange)

---

## ✨ Features

### 🎯 Core Functionality
- **📱 Camera-Based AR**: Real-time augmented reality using device camera
- **🎨 3D Model Support**: Import .glb and .gltf files or use preset models
- **🤖 AI-Powered Search**: Describe objects in natural language to fetch 3D models
- **🔄 Interactive Controls**: Rotate, scale, and reposition objects with intuitive gestures
- **📸 Snapshot & Share**: Capture and download AR scenes

### 🧠 AI-Enhanced Features
- **Surface Detection**: ML-powered floor and table surface identification using TensorFlow.js
- **Depth Estimation**: Realistic scaling based on distance from camera
- **Adaptive Lighting**: Dynamic light adjustment based on camera feed brightness
- **Shadow Rendering**: Real-time shadows for immersive realism
- **PBR Materials**: Physically-based rendering for lifelike 3D models

### 🎮 User Experience
- **Tap to Place**: Simple tap interaction for object placement
- **Gesture Controls**: Pinch, drag, and rotate support
- **Preset Library**: 4 demo models ready to use (chair, table, lamp, sofa)
- **Clean UI**: Minimal, modern interface with smooth animations
- **Mobile Optimized**: Responsive design for all devices

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI framework for component-based architecture |
| **Vite** | Fast build tool and development server |
| **Three.js** | 3D rendering and scene management |
| **TensorFlow.js** | Machine learning for surface/depth detection |
| **MediaPipe** | Advanced computer vision capabilities |
| **Framer Motion** | Smooth animations and transitions |
| **WebXR / AR.js** | AR capabilities in browser |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A device with a camera (mobile recommended)
- Modern browser (Chrome/Safari with camera permissions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vibhor2702/SmartPlace3D.git
   cd SmartPlace3D
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Allow camera permissions when prompted
   - Start placing objects! 🎉

### Production Build
```bash
npm run build
npm run preview
```

---

## 📖 Usage Guide

### Step 1: Select a Model
Choose from three options:
- **Demo Models**: Click any preset model (chair, table, lamp, sofa)
- **Upload File**: Upload your own .glb or .gltf file
- **AI Search**: Type a description (e.g., "wooden chair") to fetch a model

### Step 2: Enter AR Mode
- Click **"🚀 Enter AR Mode"**
- Grant camera permissions if prompted
- Point camera at a flat surface (floor or table)

### Step 3: Place Object
- **Tap** on the detected surface to place your 3D model
- The object will appear with realistic shadows

### Step 4: Interact
Use the control buttons:
- **🔄 Rotate**: Spin the object 45 degrees
- **➕ Scale Up**: Make the object larger
- **➖ Scale Down**: Make the object smaller
- **🗑️ Delete**: Remove the current object
- **📸 Snapshot**: Capture and download the scene

### Step 5: Exit
- Click **"❌ Exit AR"** to return to model selection

---

## 🏗️ Project Structure

```
SmartPlace3D/
├── index.html              # Main HTML entry
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app component
│   ├── components/
│   │   ├── ARScene.jsx     # 3D rendering & AR logic
│   │   ├── ModelSelector.jsx  # Model selection UI
│   │   └── Controls.jsx    # AR control buttons
│   ├── utils/
│   │   ├── modelLoader.js  # Model fetching & loading
│   │   ├── surfaceDetection.js  # ML surface detection
│   │   └── mlHelpers.js    # Depth & lighting AI
│   └── styles/
│       └── index.css       # Global styles
└── README.md               # This file
```

---

## 🎨 Model Sources

### Preset Models
The app includes 4 demo models from the [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models) repository:
- Wooden Chair
- Coffee Table  
- Modern Lamp
- Sofa

### Custom Models
Upload your own 3D models in:
- `.glb` format (recommended)
- `.gltf` format

### AI-Powered Search
The app can fetch models from Sketchfab API based on text descriptions:
1. Enter a description (e.g., "coffee table")
2. App searches Sketchfab's downloadable models
3. First result is automatically loaded
4. Falls back to preset models if API fails

**Note**: Sketchfab API requires an API key. Replace `YOUR_SKETCHFAB_API_KEY` in `src/utils/modelLoader.js` with your key from [Sketchfab Developers](https://sketchfab.com/developers).

---

## 🧠 AI/ML Integration Details

### Surface Detection
- **Library**: TensorFlow.js
- **Method**: Edge detection + horizontal plane analysis
- **Purpose**: Identify floor/table surfaces for object placement
- **File**: `src/utils/surfaceDetection.js`

### Depth Estimation
- **Method**: Position-based heuristics (can be enhanced with MiDaS model)
- **Purpose**: Scale objects realistically based on distance
- **File**: `src/utils/mlHelpers.js`

### Lighting Adaptation
- **Method**: Real-time camera frame brightness analysis
- **Purpose**: Adjust 3D scene lighting to match environment
- **Update Frequency**: Every 2 seconds
- **File**: `src/utils/mlHelpers.js`

### Shadow Rendering
- **Method**: Three.js shadow maps with PCF soft shadows
- **Configuration**: 2048x2048 shadow map (1024 on mobile)
- **File**: `src/components/ARScene.jsx`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build and deploy**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Configure camera permissions**
   - Vercel automatically provides HTTPS (required for camera access)
   - Ensure your domain has SSL certificate

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

---

## 🔧 Configuration

### Camera Settings
Modify camera constraints in `src/components/ARScene.jsx`:
```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: 'environment', // 'user' for front camera
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  }
});
```

### Model Scale
Adjust default model scaling in `src/components/ARScene.jsx`:
```javascript
const scale = 1 / maxDim; // Change denominator for different sizes
```

### Lighting Intensity
Modify light settings in `src/components/ARScene.jsx`:
```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Intensity
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
```

---

## 🐛 Troubleshooting

### Camera Not Working
- ✅ Ensure HTTPS connection (required for camera access)
- ✅ Grant camera permissions in browser settings
- ✅ Check if camera is already in use by another app
- ✅ Try different browser (Chrome/Safari recommended)

### Models Not Loading
- ✅ Verify file format is .glb or .gltf
- ✅ Check file size (large models may take time)
- ✅ Ensure stable internet connection for preset models
- ✅ Open browser console to see error messages

### Performance Issues
- ✅ Close other tabs/apps
- ✅ Use smaller 3D models (low poly preferred)
- ✅ Reduce shadow map size for mobile
- ✅ Disable ML features if too slow

### AR Not Placing Objects
- ✅ Point camera at flat, well-lit surface
- ✅ Ensure surface is visible in frame
- ✅ Tap directly on the surface area
- ✅ Move device slowly for better tracking

---

## 📱 Browser Compatibility

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome | ✅ | ✅ | Best performance |
| Safari | ✅ | ✅ | iOS 11+ required |
| Firefox | ⚠️ | ⚠️ | Limited WebXR support |
| Edge | ✅ | ✅ | Chromium-based |

**Recommended**: Chrome on Android, Safari on iOS

---

## 🎓 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [TensorFlow.js Guide](https://www.tensorflow.org/js)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [glTF Format Spec](https://www.khronos.org/gltf/)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created as a **demo/educational project** showcasing the integration of:
- Machine Learning (TensorFlow.js)
- 3D Rendering (Three.js)
- Augmented Reality (WebXR)

Feel free to use, modify, and learn from this code!

---

## 🙏 Credits

**Developed by**: Vibhor Verma  
**Purpose**: Demo project integrating ML + 3D rendering + AR for Smart Environments  
**Date**: 2025

### Technologies Used
- React & Vite teams
- Three.js community
- TensorFlow.js team
- Khronos Group (glTF format)
- Sketchfab (3D model platform)

---

## 📧 Contact

For questions, feedback, or collaboration:
- **GitHub**: [@Vibhor2702](https://github.com/Vibhor2702)
- **Project**: [SmartPlace3D](https://github.com/Vibhor2702/SmartPlace3D)

---

## 🎯 Roadmap

Future enhancements planned:
- [ ] Multi-object placement support
- [ ] Advanced gesture controls (pinch to scale, drag to move)
- [ ] Object persistence (save/load scenes)
- [ ] Collaboration mode (multi-user AR)
- [ ] Enhanced AI models (MiDaS depth, improved surface detection)
- [ ] Voice commands integration
- [ ] AR furniture catalog with real dimensions
- [ ] Social sharing to Instagram/Twitter

---

**Made with ❤️ and cutting-edge web technologies**