# SmartPlace3D Development Guide

## 🎯 Project Overview
SmartPlace3D is an AI-powered AR application for placing 3D objects in real-world environments using browser-based AR technology.

## 🏗️ Architecture

### Component Hierarchy
```
App (Main Controller)
├── ModelSelector (Model Selection UI)
│   ├── Preset Models Grid
│   ├── File Upload
│   └── AI Prompt Input
│
├── ARScene (3D Rendering & AR Logic)
│   ├── Three.js Scene
│   ├── Camera Stream
│   ├── Model Placement
│   └── ML Integration
│
└── Controls (AR Interaction UI)
    ├── Rotate Button
    ├── Scale Buttons
    ├── Delete Button
    └── Snapshot Button
```

### Data Flow
1. User selects model → `App` state updated
2. User enters AR mode → `ARScene` initialized
3. Camera stream starts → TensorFlow.js surface detection
4. User taps screen → Raycasting determines placement
5. Controls manipulate model → Direct scene manipulation

## 🔧 Development Setup

### Environment Variables
Create `.env` file in root:
```env
VITE_SKETCHFAB_API_KEY=your_api_key_here
```

### Hot Module Replacement
Vite provides instant HMR for React components. Changes appear immediately without full page reload.

### Development Tools
- **React DevTools**: Debug component state
- **Three.js Inspector**: Debug 3D scene
- **TensorFlow.js Profiler**: Monitor ML performance

## 🧠 ML Integration Details

### Surface Detection Pipeline
1. Capture video frame → Convert to tensor
2. Apply edge detection (Sobel filter)
3. Identify horizontal lines in bottom third
4. Return surface regions with confidence scores

### Depth Estimation
- Simple heuristic based on Y-position in frame
- Can be enhanced with MiDaS depth estimation model
- Formula: `depth = max(1, 3 - normalizedY)`

### Lighting Adaptation
- Analyze video frame brightness every 2 seconds
- Map brightness (0-255) to light intensity (0.4-1.2)
- Update Three.js lights dynamically

## 🎨 Styling Guidelines

### Color Palette
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#10b981` (Green)
- Error: `#ef4444` (Red)

### Animation Principles
- Use Framer Motion for UI transitions
- Duration: 0.3s for most interactions
- Scale: 1.05 on hover, 0.95 on tap
- Opacity transitions for views

## 🔍 Debugging Tips

### Console Logs
Key events are logged:
- Surface detection results
- Model loading status
- Camera stream state
- Error messages

### Chrome DevTools
Use these tabs:
- **Console**: Errors and warnings
- **Network**: Model loading performance
- **Performance**: Frame rate monitoring
- **Application**: Camera permissions

### Common Issues
1. **Black screen**: Camera permission denied
2. **No placement**: Surface not detected
3. **Laggy performance**: Reduce shadow quality
4. **Model not loading**: Check CORS headers

## 📱 Testing

### Desktop Testing
```bash
npm run dev
# Open http://localhost:3000
```

### Mobile Testing
1. Get local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from phone: `http://YOUR_IP:3000`
3. Ensure both devices on same network
4. Use HTTPS for camera access (use ngrok or similar)

### Cross-Browser Testing
- Chrome/Edge: Full support
- Safari: iOS 11+ required
- Firefox: Limited WebXR support

## 🚀 Performance Optimization

### 3D Model Optimization
- Use low-poly models (<10k polygons)
- Compress textures (max 1024x1024)
- Use .glb over .gltf (binary is smaller)
- Enable Draco compression for GLTF

### ML Performance
- Reduce camera resolution on low-end devices
- Increase ML update interval (2s → 5s)
- Disable depth estimation if not needed
- Use web workers for heavy computation

### Rendering Performance
- Reduce shadow map size on mobile
- Lower pixel ratio on low-end devices
- Use LOD (Level of Detail) for models
- Implement frustum culling

## 🔐 Security Considerations

### Camera Access
- Requires HTTPS (except localhost)
- User must grant permission
- Stream stops when tab inactive
- Clean up on component unmount

### API Keys
- Never commit API keys to git
- Use environment variables
- Implement rate limiting
- Handle API errors gracefully

## 🧪 Future Enhancements

### Short-term
- [ ] Touch gestures (pinch to scale, drag to move)
- [ ] Multiple object placement
- [ ] Model library browser
- [ ] Texture/material editor

### Long-term
- [ ] WebXR integration for native AR
- [ ] Multiplayer AR sessions
- [ ] Cloud model storage
- [ ] Advanced ML (SLAM, occlusion)

## 📚 Code Style

### JavaScript/JSX
- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions
- Add JSDoc comments for utilities

### React Patterns
- Functional components with hooks
- `useRef` for DOM/Three.js objects
- `useEffect` for side effects
- `useImperativeHandle` for exposing methods

### Three.js Best Practices
- Dispose geometries and materials
- Clean up event listeners
- Stop animation loops on unmount
- Reuse materials when possible

## 🤝 Contributing

1. Follow existing code structure
2. Add comments for complex logic
3. Test on mobile before PR
4. Update documentation if needed

## 📞 Support

For questions or issues:
- Check README.md first
- Search existing GitHub issues
- Create new issue with details
- Include browser/device info

---

Happy coding! 🚀
