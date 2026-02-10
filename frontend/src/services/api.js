// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Virtual Try-On API Service
export const virtualTryOnAPI = {
  /**
   * Try-On with HD Model
   * @param {File} personImage - Person image file
   * @param {File} garmentImage - Garment image file
   * @returns {Promise} API response
   */
  tryOnHD: async (personImage, garmentImage) => {
    const formData = new FormData();
    formData.append('vton_img', personImage);
    formData.append('garm_img', garmentImage);

    const response = await fetch(`${API_BASE_URL}/api/virtual-tryon/try-on-hd`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process virtual try-on with HD model');
    }

    return response.json();
  },

  /**
   * Try-On with DC Model
   * @param {File} personImage - Person image file
   * @param {File} garmentImage - Garment image file
   * @param {string} category - Garment category (Upper-body, Lower-body, Dress)
   * @returns {Promise} API response
   */
  tryOnDC: async (personImage, garmentImage, category = 'Upper-body') => {
    const formData = new FormData();
    formData.append('vton_img', personImage);
    formData.append('garm_img', garmentImage);
    formData.append('category', category);

    const response = await fetch(`${API_BASE_URL}/api/virtual-tryon/try-on-dc`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process virtual try-on with DC model');
    }

    return response.json();
  },

  /**
   * Try-On with Google Gemini Model
   * @param {File} personImage - Person image file
   * @param {File} garmentImage - Garment image file
   * @returns {Promise} API response
   */
  tryOnGemini: async (personImage, garmentImage) => {
    const formData = new FormData();
    formData.append('vton_img', personImage);
    formData.append('garm_img', garmentImage);

    const response = await fetch(`${API_BASE_URL}/api/virtual-tryon/try-on-gemini`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process virtual try-on with Gemini model');
    }

    return response.json();
  },
};

// Size Suggestion API Service
export const sizeSuggestionAPI = {
  /**
   * Get size prediction based on body measurements
   * @param {number} age - Age in years
   * @param {number} height - Height in centimeters
   * @param {number} weight - Weight in kilograms
   * @param {string} modelType - Model type (decision_tree or neural_network)
   * @returns {Promise} API response
   */
  predict: async (age, height, weight, modelType = 'decision_tree') => {
    const response = await fetch(`${API_BASE_URL}/api/size-suggestion/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: parseFloat(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
        model_type: modelType,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get size prediction');
    }

    return response.json();
  },

  /**
   * Get available models
   * @returns {Promise} API response with available models
   */
  getModels: async () => {
    const response = await fetch(`${API_BASE_URL}/api/size-suggestion/models`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available models');
    }

    return response.json();
  },
};

// Utility function to get full image URL
export const getImageURL = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
};

// Export API base URL for other uses
export { API_BASE_URL };
