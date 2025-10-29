# Contributing to SmartPlace3D

First off, thank you for considering contributing to SmartPlace3D! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When submitting a bug report, include:**
- Clear descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots/videos if applicable
- Device and browser information
- Console error messages

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:
- Clear use case and motivation
- Detailed description of the feature
- Potential implementation approach
- Any relevant examples or mockups

### 🔧 Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test thoroughly**
   - Test on desktop and mobile
   - Test in different browsers
   - Ensure AR features work correctly

5. **Commit your changes**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```
   Use commit prefixes:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

6. **Push to your fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Describe your changes in detail
   - Link related issues
   - Add screenshots if UI changes

## 📝 Code Style Guidelines

### JavaScript/React
- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions
- Use destructuring where appropriate
- Add JSDoc comments for utility functions

### Component Structure
```jsx
// Imports
import { useState } from 'react';
import ComponentName from './ComponentName';

// Component
function MyComponent({ prop1, prop2 }) {
  // Hooks
  const [state, setState] = useState(null);
  
  // Handlers
  const handleAction = () => {
    // Implementation
  };
  
  // Render
  return (
    <div>
      {/* Content */}
    </div>
  );
}

export default MyComponent;
```

### Three.js Best Practices
- Always dispose of geometries and materials
- Clean up event listeners in useEffect cleanup
- Use refs for Three.js objects
- Comment complex 3D math operations

### CSS Styling
- Use CSS custom properties for colors
- Follow BEM naming when appropriate
- Use responsive units (rem, %, vh/vw)
- Mobile-first approach

## 🧪 Testing

Before submitting a PR:
- [ ] Test on Chrome (desktop and mobile)
- [ ] Test on Safari (iOS if possible)
- [ ] Test camera permissions flow
- [ ] Test AR placement and controls
- [ ] Test model loading (preset, upload, AI fetch)
- [ ] Check console for errors
- [ ] Verify performance (smooth 60fps)

## 🏗️ Project Structure

Understanding the architecture helps with contributions:

```
src/
├── components/       # React components
├── utils/           # Utility functions
└── styles/          # CSS files
```

**Key files:**
- `App.jsx`: Main application logic
- `ARScene.jsx`: 3D rendering and AR
- `modelLoader.js`: Model fetching/loading
- `surfaceDetection.js`: ML surface detection
- `mlHelpers.js`: ML utilities

## 📚 Resources

Helpful documentation:
- [Three.js Docs](https://threejs.org/docs/)
- [TensorFlow.js Guide](https://www.tensorflow.org/js)
- [React Hooks](https://react.dev/reference/react)
- [WebXR API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Stay on topic

## 💬 Communication

- Use GitHub Issues for bugs and features
- Comment on issues before starting work
- Ask questions in issue comments
- Be patient and kind

## 🎯 Priority Areas

Current areas where contributions are especially welcome:
- [ ] Performance optimization for low-end devices
- [ ] Enhanced ML models (depth estimation, SLAM)
- [ ] Multi-object placement support
- [ ] Touch gesture improvements
- [ ] Cross-browser compatibility fixes
- [ ] Documentation improvements
- [ ] Additional 3D model presets

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making SmartPlace3D better! 🚀
