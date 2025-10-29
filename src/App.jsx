import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ARScene from './components/ARScene';
import ModelSelector from './components/ModelSelector';
import Controls from './components/Controls';
import CameraSelector from './components/CameraSelector';
import { fetchModelByPrompt } from './utils/modelLoader';

function App() {
  const [arMode, setArMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCameraSelector, setShowCameraSelector] = useState(false);
  const [selectedCameraId, setSelectedCameraId] = useState(null);
  const arSceneRef = useRef(null);

  // Handle model selection (upload or preset)
  const handleModelSelect = async (modelData) => {
    setIsLoading(true);
    setError(null);
    try {
      setSelectedModel(modelData);
    } catch (err) {
      setError('Failed to load model: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle AI-based model fetch from text prompt
  const handlePromptFetch = async (prompt) => {
    setIsLoading(true);
    setError(null);
    try {
      const modelUrl = await fetchModelByPrompt(prompt);
      setSelectedModel({ url: modelUrl, name: prompt });
    } catch (err) {
      setError('Could not find model: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter AR Mode - Show camera selector first
  const enterARMode = () => {
    if (!selectedModel) {
      setError('Please select or upload a 3D model first');
      return;
    }
    setShowCameraSelector(true);
  };

  // Handle camera selection
  const handleCameraSelect = (cameraId) => {
    setSelectedCameraId(cameraId);
    setShowCameraSelector(false);
    setArMode(true);
  };

  // Handle camera selector close
  const handleCameraSelectorClose = () => {
    setShowCameraSelector(false);
  };

  // Exit AR Mode
  const exitARMode = () => {
    setArMode(false);
  };

  // Control actions
  const handleRotate = () => {
    arSceneRef.current?.rotateModel();
  };

  const handleScale = (delta) => {
    arSceneRef.current?.scaleModel(delta);
  };

  const handleDelete = () => {
    arSceneRef.current?.deleteModel();
  };

  const handleSnapshot = () => {
    arSceneRef.current?.takeSnapshot();
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <h1>SmartPlace3D</h1>
          <p className="tagline">AI-Powered Augmented Reality Object Placement</p>
        </div>
      </header>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!arMode ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="selector-view"
          >
            <ModelSelector
              onModelSelect={handleModelSelect}
              onPromptFetch={handlePromptFetch}
              isLoading={isLoading}
            />
            
            {selectedModel && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="selected-model-info"
              >
                <p>✓ Model loaded: <strong>{selectedModel.name || 'Custom Model'}</strong></p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={enterARMode}
              className="ar-button"
              disabled={!selectedModel || isLoading}
            >
              🚀 Enter AR Mode
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="ar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ar-view"
          >
            <ARScene
              ref={arSceneRef}
              modelData={selectedModel}
              cameraId={selectedCameraId}
              onError={setError}
            />
            
            <Controls
              onRotate={handleRotate}
              onScale={handleScale}
              onDelete={handleDelete}
              onSnapshot={handleSnapshot}
              onExit={exitARMode}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Selector Modal */}
      {showCameraSelector && (
        <CameraSelector
          onCameraSelect={handleCameraSelect}
          onClose={handleCameraSelectorClose}
        />
      )}

      {/* Footer Credit */}
      <footer className="app-footer">
        <p>
          Developed as a demo project integrating ML + 3D rendering + AR for Smart Environments
        </p>
      </footer>
    </div>
  );
}

export default App;
