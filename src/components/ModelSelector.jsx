import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getPresetModels, loadModelFromFile, isValidModelFile } from '../utils/modelLoader';

function ModelSelector({ onModelSelect, onPromptFetch, isLoading }) {
  const [promptText, setPromptText] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const fileInputRef = useRef(null);

  const presetModels = getPresetModels();

  // Handle preset model selection
  const handlePresetSelect = (model) => {
    setSelectedPreset(model.name);
    onModelSelect(model);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!isValidModelFile(file)) {
      alert('Please upload a valid .glb or .gltf file');
      return;
    }

    try {
      const url = await loadModelFromFile(file);
      onModelSelect({ url, name: file.name });
    } catch (error) {
      alert('Failed to load model file');
    }
  };

  // Handle AI prompt submission
  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (promptText.trim()) {
      onPromptFetch(promptText.trim());
      setSelectedPreset(null);
    }
  };

  return (
    <div className="model-selector">
      <h2>Select or Upload a 3D Model</h2>

      {/* Preset Models */}
      <div className="preset-models">
        <h3>📦 Demo Models</h3>
        <div className="model-grid">
          {presetModels.map((model, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePresetSelect(model)}
              className={`model-card ${selectedPreset === model.name ? 'selected' : ''}`}
            >
              <span className="model-icon">{model.thumbnail}</span>
              <span className="model-name">{model.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="upload-section">
        <h3>📤 Upload Model</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept=".glb,.gltf"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="upload-button"
        >
          Choose File (.glb / .gltf)
        </motion.button>
      </div>

      {/* AI Prompt */}
      <div className="prompt-section">
        <h3>🤖 Describe an Object</h3>
        <form onSubmit={handlePromptSubmit}>
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="e.g., wooden chair, coffee table..."
            className="prompt-input"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="prompt-button"
            disabled={isLoading || !promptText.trim()}
          >
            {isLoading ? '🔄 Searching...' : '🔍 Find Model'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default ModelSelector;
