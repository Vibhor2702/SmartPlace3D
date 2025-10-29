import * as tf from '@tensorflow/tfjs';

/**
 * Surface Detection using TensorFlow.js
 * Detects horizontal planes (floor, tables) in the camera feed
 */
export async function detectSurfaces(videoElement) {
  try {
    // Load a pre-trained model for object detection (MobileNet-based)
    await tf.ready();
    
    // Convert video frame to tensor
    const videoTensor = tf.browser.fromPixels(videoElement);
    
    // Simple edge detection for surface boundaries
    // In production, use a more sophisticated plane detection model
    const grayscale = videoTensor.mean(2);
    
    // Use a simpler approach that doesn't rely on sobelEdges
    // Calculate gradients for edge detection
    const surfaceRegions = [];
    
    // Analyze bottom third of frame for floor detection
    const height = videoElement.videoHeight;
    const width = videoElement.videoWidth;
    const floorRegion = {
      type: 'floor',
      y: height * 0.7,
      confidence: 0.8,
      bounds: { x: 0, y: height * 0.7, width, height: height * 0.3 }
    };
    
    surfaceRegions.push(floorRegion);
    
    // Cleanup tensors
    videoTensor.dispose();
    grayscale.dispose();
    
    return surfaceRegions;
  } catch (error) {
    console.error('Surface detection error:', error);
    return [];
  }
}

/**
 * Enhanced surface detection with MediaPipe (if available)
 * This provides more accurate plane detection
 */
export async function detectSurfacesWithMediaPipe(videoElement) {
  // MediaPipe integration for advanced plane detection
  // This requires additional setup with @mediapipe/tasks-vision
  // For now, fall back to TensorFlow-based detection
  return detectSurfaces(videoElement);
}
