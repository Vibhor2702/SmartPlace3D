import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CameraSelector Component
 * Allows users to select which camera/webcam to use for AR
 */
function CameraSelector({ onCameraSelect, onClose }) {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get list of available cameras
    const getCameras = async () => {
      try {
        // Request permissions first
        await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Get all video input devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        setCameras(videoDevices);
        
        // Auto-select first camera (usually front camera on laptops)
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error getting cameras:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCameras();
  }, []);

  const handleSelect = () => {
    if (selectedCamera) {
      onCameraSelect(selectedCamera);
    }
  };

  const handleCameraChange = (deviceId) => {
    setSelectedCamera(deviceId);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="camera-selector-overlay"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="camera-selector-modal"
        >
          <h2>📹 Select Camera</h2>
          
          {isLoading ? (
            <div className="loading-state">
              <p>🔄 Detecting cameras...</p>
            </div>
          ) : cameras.length === 0 ? (
            <div className="no-cameras">
              <p>❌ No cameras found</p>
              <p className="hint">Please connect a webcam and reload</p>
            </div>
          ) : (
            <>
              <div className="camera-list">
                {cameras.map((camera, index) => (
                  <motion.button
                    key={camera.deviceId}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCameraChange(camera.deviceId)}
                    className={`camera-option ${selectedCamera === camera.deviceId ? 'selected' : ''}`}
                  >
                    <span className="camera-icon">
                      {camera.label.toLowerCase().includes('back') || camera.label.toLowerCase().includes('rear') 
                        ? '📷' 
                        : '🤳'}
                    </span>
                    <div className="camera-info">
                      <strong>
                        {camera.label || `Camera ${index + 1}`}
                      </strong>
                      <span className="camera-hint">
                        {camera.label.toLowerCase().includes('back') || camera.label.toLowerCase().includes('rear')
                          ? 'Rear Camera (Recommended for AR)'
                          : 'Front Camera'}
                      </span>
                    </div>
                    {selectedCamera === camera.deviceId && (
                      <span className="check-mark">✓</span>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="camera-actions">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSelect}
                  className="confirm-button"
                  disabled={!selectedCamera}
                >
                  ✅ Use This Camera
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="cancel-button"
                >
                  Cancel
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CameraSelector;
