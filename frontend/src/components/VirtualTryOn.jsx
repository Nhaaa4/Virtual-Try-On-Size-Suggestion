import { useState } from 'react';
import { virtualTryOnAPI, getImageURL } from '../services/api';

export default function VirtualTryOn() {
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);
  const [garmentPreview, setGarmentPreview] = useState(null);
  const [category, setCategory] = useState('Upper-body');
  const [model, setModel] = useState('dc');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePersonImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPersonPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGarmentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGarmentImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setGarmentPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!personImage || !garmentImage) {
      setError('Please upload both person and garment images');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let data;
      
      // Call the appropriate API based on selected model
      if (model === 'hd') {
        data = await virtualTryOnAPI.tryOnHD(personImage, garmentImage);
      } else if (model === 'dc') {
        data = await virtualTryOnAPI.tryOnDC(personImage, garmentImage, category);
      } else if (model === 'gemini') {
        data = await virtualTryOnAPI.tryOnGemini(personImage, garmentImage);
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPersonImage(null);
    setGarmentImage(null);
    setPersonPreview(null);
    setGarmentPreview(null);
    setResult(null);
    setError(null);
  };

  const modelOptions = [
    { id: 'hd', name: 'HD Model', description: 'High Definition - Best quality' },
    { id: 'dc', name: 'DC Model', description: 'Deep Clothing - Fast processing' },
    { id: 'gemini', name: 'Google Gemini', description: 'AI-powered results' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Virtual Try-On</h2>
        <p className="text-gray-600 mb-8">Upload your photo and a garment image to see how it looks on you</p>

        {!result ? (
          <div className="space-y-6">
            {/* Image Uploads */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Person Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Person Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors bg-gray-50">
                  {personPreview ? (
                    <div className="space-y-3">
                      <img
                        src={personPreview}
                        alt="Person"
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <button
                        onClick={() => {
                          setPersonImage(null);
                          setPersonPreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div className="flex flex-col items-center py-8">
                        <svg
                          className="w-16 h-16 text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium mb-1">Click to upload person image</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePersonImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Garment Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Garment Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors bg-gray-50">
                  {garmentPreview ? (
                    <div className="space-y-3">
                      <img
                        src={garmentPreview}
                        alt="Garment"
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <button
                        onClick={() => {
                          setGarmentImage(null);
                          setGarmentPreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div className="flex flex-col items-center py-8">
                        <svg
                          className="w-16 h-16 text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-700 font-medium mb-1">Click to upload garment image</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGarmentImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Model
              </label>
              <div className="grid grid-cols-3 gap-4">
                {modelOptions.map((modelOption) => (
                  <button
                    key={modelOption.id}
                    onClick={() => setModel(modelOption.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      model === modelOption.id
                        ? 'border-gray-900 bg-gray-50 shadow-md'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-800 mb-1">{modelOption.name}</div>
                    <div className="text-xs text-gray-600">{modelOption.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection - Only show for DC model */}
            {model === 'dc' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Garment Category
                </label>
                <div className="flex gap-4">
                  {['Upper-body', 'Lower-body', 'Dress'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        category === cat
                          ? 'bg-gray-900 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleTryOn}
                disabled={!personImage || !garmentImage || loading}
                className="px-12 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Generate Try-On'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Result</h3>
              <img
                src={getImageURL(result.image_url)}
                alt="Try-On Result"
                className="max-h-[500px] mx-auto rounded-lg shadow-xl"
              />
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Model Used</p>
                  <p className="font-semibold text-gray-800 capitalize">{model === 'gemini' ? 'Google Gemini' : model.toUpperCase()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-gray-800">{result.category}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Processing Time</p>
                  <p className="font-semibold text-gray-800">{result.processing_time?.toFixed(2)}s</p>
                </div>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
            >
              Try Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
