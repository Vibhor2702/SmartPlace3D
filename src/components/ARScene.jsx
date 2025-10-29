import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { detectSurfaces } from '../utils/surfaceDetection';
import { estimateDepth, adaptLighting } from '../utils/mlHelpers';

/**
 * ARScene Component
 * Handles 3D rendering, camera setup, model placement, lighting, and AR interactions
 */
const ARScene = forwardRef(({ modelData, cameraId, onError }, ref) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const videoRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const groundPlaneRef = useRef(null);
  const lightRef = useRef(null);
  const [surfaces, setSurfaces] = useState([]);
  const [isPlaced, setIsPlaced] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup (perspective for 3D realism)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 3); // Eye-level height
    cameraRef.current = camera;

    // Renderer setup with alpha for video background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true // For screenshots
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup
    // Ambient light for overall scene brightness
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional light for shadows and depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    lightRef.current = directionalLight;

    // Hemisphere light for natural outdoor/indoor feel
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    scene.add(hemiLight);

    // Ground plane for shadow receiving (invisible but casts shadows)
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = 0;
    groundPlane.receiveShadow = true;
    scene.add(groundPlane);
    groundPlaneRef.current = groundPlane;

    // Start camera stream
    startCameraStream();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Start camera stream for AR background
  const startCameraStream = async () => {
    try {
      // Use selected camera or fallback to default
      const constraints = {
        video: cameraId 
          ? {
              deviceId: { exact: cameraId },
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            }
          : {
              facingMode: { ideal: 'environment' }, // Prefer rear camera
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      const video = document.createElement('video');
      video.srcObject = stream;
      video.setAttribute('playsinline', ''); // Important for iOS
      video.muted = true;
      video.autoplay = true;
      videoRef.current = video;

      // Wait for video to be ready
      await video.play();

      // Create video texture as scene background
      video.onloadedmetadata = () => {
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        sceneRef.current.background = videoTexture;

        // Start surface detection with ML
        detectSurfacesML(video);
        
        // Adapt lighting based on camera feed
        adaptSceneLighting(video);
      };

      // Trigger immediately if metadata already loaded
      if (video.readyState >= 2) {
        video.onloadedmetadata();
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      onError?.('Camera access required for AR mode. Please grant camera permissions and reload.');
    }
  };

  // ML-based surface detection
  const detectSurfacesML = async (video) => {
    try {
      const detectedSurfaces = await detectSurfaces(video);
      setSurfaces(detectedSurfaces);
    } catch (err) {
      console.warn('Surface detection failed:', err);
    }
  };

  // Adapt lighting dynamically based on camera brightness
  const adaptSceneLighting = async (video) => {
    setInterval(async () => {
      try {
        const lightIntensity = await adaptLighting(video);
        if (lightRef.current) {
          lightRef.current.intensity = lightIntensity;
        }
      } catch (err) {
        console.warn('Lighting adaptation failed:', err);
      }
    }, 2000); // Update every 2 seconds
  };

  // Load 3D model
  useEffect(() => {
    if (!modelData || !sceneRef.current) return;

    const loader = new GLTFLoader();
    loader.load(
      modelData.url,
      (gltf) => {
        const model = gltf.scene;

        // Enable shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Apply PBR materials for realism
            if (child.material) {
              child.material.needsUpdate = true;
            }
          }
        });

        // Scale model appropriately
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxDim; // Normalize to 1 unit
        model.scale.multiplyScalar(scale);

        // Center model
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(scale));

        modelRef.current = model;
        // Model will be placed on tap
      },
      undefined,
      (error) => {
        console.error('Model loading error:', error);
        onError?.('Failed to load 3D model');
      }
    );
  }, [modelData]);

  // Handle tap to place model
  useEffect(() => {
    const handleTap = (event) => {
      if (!modelRef.current || isPlaced) return;

      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera({ x, y }, cameraRef.current);
      const intersects = raycasterRef.current.intersectObject(groundPlaneRef.current);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        modelRef.current.position.copy(point);
        modelRef.current.position.y += 0.5; // Lift slightly above ground
        sceneRef.current.add(modelRef.current);
        setIsPlaced(true);

        // Estimate depth for realistic scaling
        estimateModelDepth(point);
      }
    };

    const canvas = rendererRef.current?.domElement;
    canvas?.addEventListener('click', handleTap);
    return () => canvas?.removeEventListener('click', handleTap);
  }, [isPlaced]);

  // Depth-aware scaling using ML
  const estimateModelDepth = async (position) => {
    try {
      const depth = await estimateDepth(videoRef.current, position);
      if (modelRef.current && depth) {
        const scaleFactor = depth / 3; // Normalize depth
        modelRef.current.scale.multiplyScalar(scaleFactor);
      }
    } catch (err) {
      console.warn('Depth estimation failed:', err);
    }
  };

  // Expose control methods to parent
  useImperativeHandle(ref, () => ({
    rotateModel: () => {
      if (modelRef.current) {
        modelRef.current.rotation.y += Math.PI / 4;
      }
    },
    scaleModel: (delta) => {
      if (modelRef.current) {
        const newScale = modelRef.current.scale.x + delta;
        if (newScale > 0.1 && newScale < 5) {
          modelRef.current.scale.set(newScale, newScale, newScale);
        }
      }
    },
    deleteModel: () => {
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
        setIsPlaced(false);
      }
    },
    takeSnapshot: () => {
      if (rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        const dataURL = rendererRef.current.domElement.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `smartplace3d-${Date.now()}.png`;
        link.href = dataURL;
        link.click();
      }
    }
  }));

  return (
    <div ref={containerRef} className="ar-container">
      {!isPlaced && modelRef.current && (
        <div className="tap-instruction">
          👆 Tap on the surface to place your object
        </div>
      )}
    </div>
  );
});

ARScene.displayName = 'ARScene';

export default ARScene;
