# 🏗️ SmartPlace3D - Project Structure

```
SmartPlace3D/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── vite.config.js            # Vite build configuration
│   ├── vercel.json               # Vercel deployment config
│   ├── .gitignore                # Git ignored files
│   ├── .env.example              # Environment variables template
│   └── .vscode/
│       └── launch.json           # VS Code debug configuration
│
├── 📱 Application Code
│   ├── index.html                # Main HTML entry point
│   └── src/
│       ├── main.jsx              # React application entry
│       ├── App.jsx               # Main app controller
│       │
│       ├── components/           # React components
│       │   ├── ARScene.jsx       # 3D rendering & AR logic
│       │   ├── ModelSelector.jsx # Model selection UI
│       │   └── Controls.jsx      # AR control buttons
│       │
│       ├── utils/                # Utility functions
│       │   ├── modelLoader.js    # 3D model loading & API
│       │   ├── surfaceDetection.js # ML surface detection
│       │   └── mlHelpers.js      # ML utilities (depth, lighting)
│       │
│       └── styles/               # CSS styling
│           └── index.css         # Global styles
│
├── 📚 Documentation
│   ├── README.md                 # Complete documentation
│   ├── QUICKSTART.md             # Fast setup guide
│   ├── DEVELOPMENT.md            # Developer guide
│   ├── SHOWCASE.md               # Project highlights
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   ├── PROJECT_SUMMARY.md        # Project completion summary
│   └── LICENSE                   # MIT license
│
├── 🛠️ Setup Scripts
│   ├── setup.ps1                 # Windows setup script
│   └── setup.sh                  # Unix/Linux/Mac setup script
│
└── 🗂️ Generated (after build)
    ├── node_modules/             # Dependencies (gitignored)
    └── dist/                     # Production build (gitignored)

```

## 📊 Component Architecture

```
┌─────────────────────────────────────────────────────┐
│                    index.html                        │
│              (HTML Entry Point)                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                   main.jsx                           │
│            (React Root Renderer)                     │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                    App.jsx                           │
│     (Main Controller & State Management)             │
│                                                      │
│  State:                                              │
│  • arMode (boolean)                                  │
│  • selectedModel (object)                            │
│  • isLoading (boolean)                               │
│  • error (string)                                    │
└──────────┬──────────────────────────┬────────────────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌────────────────────────┐
│  ModelSelector.jsx   │    │     ARScene.jsx        │
│  (Selection View)    │    │     (AR View)          │
│                      │    │                        │
│  • Preset Models     │    │  • Three.js Scene      │
│  • File Upload       │    │  • Camera Stream       │
│  • AI Prompt Input   │    │  • Model Placement     │
│                      │    │  • ML Integration      │
└──────────────────────┘    └──────┬─────────────────┘
                                   │
                                   ▼
                          ┌────────────────────┐
                          │   Controls.jsx     │
                          │  (Control Panel)   │
                          │                    │
                          │  • Rotate Button   │
                          │  • Scale Buttons   │
                          │  • Delete Button   │
                          │  • Snapshot Button │
                          │  • Exit Button     │
                          └────────────────────┘
```

## 🔄 Data Flow Diagram

```
┌─────────────┐
│   User      │
│  Actions    │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────────┐
│        Event Handlers                │
│  • handleModelSelect()               │
│  • handlePromptFetch()               │
│  • enterARMode()                     │
│  • handleRotate()                    │
│  • handleScale()                     │
│  • handleDelete()                    │
│  • handleSnapshot()                  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│       State Updates                  │
│  • setArMode()                       │
│  • setSelectedModel()                │
│  • setIsLoading()                    │
│  • setError()                        │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│    Component Re-render               │
│  • ModelSelector updates             │
│  • ARScene updates                   │
│  • Controls update                   │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│      Side Effects                    │
│  • Load 3D model                     │
│  • Start camera stream               │
│  • Run ML detection                  │
│  • Update Three.js scene             │
└──────────────────────────────────────┘
```

## 🧠 ML Processing Pipeline

```
┌─────────────────┐
│  Camera Stream  │
│  (Video Input)  │
└────────┬────────┘
         │
         ▼
┌──────────────────────────────────────┐
│     Video Frame Capture              │
│  • Extract current frame             │
│  • Convert to tensor                 │
└────────┬─────────────────────────────┘
         │
         ├─────────────────┬──────────────┐
         │                 │              │
         ▼                 ▼              ▼
┌─────────────┐  ┌──────────────┐  ┌────────────────┐
│  Surface    │  │    Depth     │  │   Lighting     │
│  Detection  │  │  Estimation  │  │  Adaptation    │
│             │  │              │  │                │
│ • Edge det. │  │ • Position   │  │ • Brightness   │
│ • Plane ID  │  │   analysis   │  │   analysis     │
│ • Confidence│  │ • Scale calc.│  │ • Intensity    │
└─────────────┘  └──────────────┘  └────────────────┘
         │                 │              │
         └─────────┬───────┴──────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│      Scene Updates                   │
│  • Update ground plane               │
│  • Adjust object scale               │
│  • Modify light intensity            │
└──────────────────────────────────────┘
```

## 🎨 3D Scene Hierarchy

```
Three.js Scene
│
├── Camera (PerspectiveCamera)
│   └── Position: (0, 1.6, 3)
│
├── Lights
│   ├── AmbientLight (0.6 intensity)
│   ├── DirectionalLight (0.8 intensity)
│   │   └── Casts shadows
│   └── HemisphereLight (0.4 intensity)
│
├── Background
│   └── VideoTexture (Camera stream)
│
├── Ground Plane (Shadow receiver)
│   ├── Geometry: PlaneGeometry (100x100)
│   ├── Material: ShadowMaterial
│   └── Receives shadows
│
└── Loaded Model (GLTF/GLB)
    ├── Geometry: From loaded file
    ├── Material: PBR materials
    ├── Casts shadows
    ├── Receives shadows
    └── Transformations:
        ├── Position (tap-to-place)
        ├── Rotation (user control)
        └── Scale (user control)
```

## 📦 Dependency Tree

```
SmartPlace3D
│
├── Production Dependencies
│   ├── react (^18.2.0)
│   ├── react-dom (^18.2.0)
│   ├── three (^0.159.0)
│   ├── @tensorflow/tfjs (^4.15.0)
│   ├── @mediapipe/tasks-vision (^0.10.8)
│   └── framer-motion (^10.16.16)
│
└── Development Dependencies
    ├── @vitejs/plugin-react (^4.2.1)
    └── vite (^5.0.8)
```

## 🚀 Build Process

```
┌─────────────────┐
│  Source Code    │
│   (src/)        │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│    Vite Development Server      │
│  • Hot Module Replacement       │
│  • Fast refresh                 │
│  • Source maps                  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│     Production Build            │
│  • Code splitting               │
│  • Minification                 │
│  • Tree shaking                 │
│  • Asset optimization           │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│     dist/ folder                │
│  • index.html                   │
│  • Bundled JS                   │
│  • Bundled CSS                  │
│  • Optimized assets             │
└─────────────────────────────────┘
```

## 🌐 Deployment Flow

```
┌─────────────────┐
│  Local Build    │
│  (npm run build)│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│     dist/ folder                │
└────────┬────────────────────────┘
         │
         ├──────────┬──────────┬──────────┐
         │          │          │          │
         ▼          ▼          ▼          ▼
┌─────────┐  ┌─────────┐  ┌────────┐  ┌─────────┐
│ Vercel  │  │ Netlify │  │ GitHub │  │  Other  │
│         │  │         │  │  Pages │  │ Hosting │
└─────────┘  └─────────┘  └────────┘  └─────────┘
     │            │            │            │
     └────────────┴────────────┴────────────┘
                  │
                  ▼
         ┌─────────────────┐
         │   Live Website  │
         │   (HTTPS)       │
         └─────────────────┘
```

## 📱 User Journey

```
┌──────────────────┐
│  Open Website    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│   Landing Page               │
│  • View app name & tagline   │
│  • See model selector        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Select Model               │
│  • Choose preset             │
│  • Upload file               │
│  • AI search                 │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Enter AR Mode              │
│  • Grant camera permission   │
│  • See live camera feed      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Place Object               │
│  • Tap on surface            │
│  • Object appears            │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Interact                   │
│  • Rotate object             │
│  • Scale object              │
│  • Take snapshot             │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Exit or Continue           │
│  • Delete & place new        │
│  • Exit AR mode              │
│  • Share snapshot            │
└──────────────────────────────┘
```

---

**📍 Current Location**: Complete project structure documented  
**✅ Status**: All files created and organized  
**🚀 Next**: Run `npm install` and `npm run dev` to start!
