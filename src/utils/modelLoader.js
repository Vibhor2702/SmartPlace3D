/**
 * Model Loader Utility
 * Handles 3D model fetching from various sources
 * - File upload (GLB/GLTF)
 * - AI-based model search using Sketchfab API
 * - Preset models
 */

const SKETCHFAB_API_KEY = 'YOUR_SKETCHFAB_API_KEY'; // Replace with actual key
const SKETCHFAB_API_URL = 'https://api.sketchfab.com/v3/search';

/**
 * Fetch 3D model based on text prompt
 * Uses Sketchfab API to search and retrieve downloadable models
 */
export async function fetchModelByPrompt(prompt) {
  try {
    // Search Sketchfab for models matching the prompt
    const searchUrl = `${SKETCHFAB_API_URL}?type=models&q=${encodeURIComponent(prompt)}&downloadable=true&count=1`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Token ${SKETCHFAB_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Sketchfab API request failed');
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const model = data.results[0];
      
      // Get download URL for the model
      const downloadUrl = await getSketchfabDownloadUrl(model.uid);
      return downloadUrl;
    } else {
      // Fallback to preset models if API fails
      console.warn('No models found, using fallback');
      return getFallbackModel(prompt);
    }
  } catch (error) {
    console.error('Model fetch error:', error);
    // Return a fallback model
    return getFallbackModel(prompt);
  }
}

/**
 * Get download URL from Sketchfab model UID
 */
async function getSketchfabDownloadUrl(uid) {
  try {
    const downloadUrl = `https://api.sketchfab.com/v3/models/${uid}/download`;
    
    const response = await fetch(downloadUrl, {
      headers: {
        'Authorization': `Token ${SKETCHFAB_API_KEY}`
      }
    });

    const data = await response.json();
    
    // Get GLTF format download link
    const gltfFormat = data.gltf || data.glb;
    if (gltfFormat && gltfFormat.url) {
      return gltfFormat.url;
    }
    
    throw new Error('No downloadable GLTF/GLB found');
  } catch (error) {
    console.error('Download URL fetch error:', error);
    throw error;
  }
}

/**
 * Fallback models when API is unavailable
 * Uses free CDN-hosted models with proper CORS
 */
function getFallbackModel(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Use models from KhronosGroup with CDN (better CORS support)
  if (lowerPrompt.includes('chair')) {
    return 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Chair/glTF-Binary/Chair.glb';
  } else if (lowerPrompt.includes('table') || lowerPrompt.includes('desk')) {
    return 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb';
  } else if (lowerPrompt.includes('sofa') || lowerPrompt.includes('couch')) {
    return 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Avocado/glTF-Binary/Avocado.glb';
  } else if (lowerPrompt.includes('lamp') || lowerPrompt.includes('light')) {
    return 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Lantern/glTF-Binary/Lantern.glb';
  } else {
    // Default to a simple box
    return 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Box/glTF-Binary/Box.glb';
  }
}

/**
 * Get preset demo models
 * Using jsDelivr CDN for better reliability and CORS support
 */
export function getPresetModels() {
  return [
    {
      name: 'Wooden Chair',
      url: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Chair/glTF-Binary/Chair.glb',
      thumbnail: '🪑'
    },
    {
      name: 'Water Bottle',
      url: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
      thumbnail: '🍶'
    },
    {
      name: 'Lantern',
      url: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Lantern/glTF-Binary/Lantern.glb',
      thumbnail: '🏮'
    },
    {
      name: 'Avocado',
      url: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Avocado/glTF-Binary/Avocado.glb',
      thumbnail: '🥑'
    }
  ];
}

/**
 * Load model from file upload
 */
export function loadModelFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const blob = new Blob([event.target.result]);
      const url = URL.createObjectURL(blob);
      resolve(url);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Validate model file type
 */
export function isValidModelFile(file) {
  const validExtensions = ['.glb', '.gltf'];
  const fileName = file.name.toLowerCase();
  return validExtensions.some(ext => fileName.endsWith(ext));
}
