import { useState } from 'react';
import { sizeSuggestionAPI } from '../services/api';

export default function SizeSuggestion() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [modelType, setModelType] = useState('decision_tree');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!age || !height || !weight) {
      setError('Please fill in all fields');
      return;
    }

    if (age <= 0 || height <= 0 || weight <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await sizeSuggestionAPI.predict(age, height, weight, modelType);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAge('');
    setHeight('');
    setWeight('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Size Suggestion</h2>
        <p className="text-gray-600 mb-8">Get personalized size recommendations based on your body measurements</p>

        {!result ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Input Fields */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g., 25"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g., 170"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 65"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Prediction Model
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setModelType('decision_tree')}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'decision_tree'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Decision Tree
                </button>
                <button
                  onClick={() => setModelType('neural_network')}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'neural_network'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Neural Network
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handlePredict}
                disabled={loading}
                className="px-12 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  'Get Size Recommendation'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 text-center space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Recommended Size</h3>
                <div className="text-8xl font-bold text-gray-900 mb-6">
                  {result.recommended_size}
                </div>
                <p className="text-sm text-gray-600">Model: {result.model_version}</p>
              </div>

              {result.alternatives && result.alternatives.length > 0 && (
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Alternative Sizes</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {result.alternatives.map((alt, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{alt.size}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {(alt.score * 100).toFixed(1)}% match
                        </div>
                      </div>
                    ))}
                  </div>
                  {result.alternatives_note && (
                    <p className="text-sm text-gray-600 mt-4 italic">{result.alternatives_note}</p>
                  )}
                </div>
              )}

              <button
                onClick={resetForm}
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
              >
                Calculate Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
