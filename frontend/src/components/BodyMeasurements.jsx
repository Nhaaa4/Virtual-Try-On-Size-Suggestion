import { useState } from 'react';

export default function BodyMeasurements() {
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    shoulder: '',
    sleeve: '',
    inseam: '',
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const calculateSize = () => {
    // Simple size calculation logic based on measurements
    const { chest, waist, hips } = measurements;
    
    if (!chest || !waist || !hips) {
      alert('Please fill in at least chest, waist, and hips measurements');
      return;
    }

    const avgMeasurement = (parseFloat(chest) + parseFloat(waist) + parseFloat(hips)) / 3;

    let size = '';
    if (avgMeasurement < 80) size = 'XS';
    else if (avgMeasurement < 90) size = 'S';
    else if (avgMeasurement < 100) size = 'M';
    else if (avgMeasurement < 110) size = 'L';
    else if (avgMeasurement < 120) size = 'XL';
    else size = 'XXL';

    setResult({ size, measurements: { ...measurements } });
  };

  const resetForm = () => {
    setMeasurements({
      chest: '',
      waist: '',
      hips: '',
      shoulder: '',
      sleeve: '',
      inseam: '',
    });
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Body Measurements</h2>
        <p className="text-gray-600 mb-8">Enter your body measurements to find your perfect size</p>

        {!result ? (
          <div className="space-y-6">
            {/* Measurement Guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">📏 How to Measure</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
                <li>• <strong>Hips:</strong> Measure around the fullest part of your hips</li>
                <li>• <strong>Shoulder:</strong> Measure from shoulder point to shoulder point</li>
                <li>• <strong>Sleeve:</strong> Measure from shoulder to wrist</li>
                <li>• <strong>Inseam:</strong> Measure from crotch to ankle</li>
              </ul>
            </div>

            {/* Measurement Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Chest */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chest (cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => handleInputChange('chest', e.target.value)}
                  placeholder="e.g., 92"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Waist */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waist (cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={measurements.waist}
                  onChange={(e) => handleInputChange('waist', e.target.value)}
                  placeholder="e.g., 76"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Hips */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hips (cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={measurements.hips}
                  onChange={(e) => handleInputChange('hips', e.target.value)}
                  placeholder="e.g., 95"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Shoulder */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shoulder (cm)
                </label>
                <input
                  type="number"
                  value={measurements.shoulder}
                  onChange={(e) => handleInputChange('shoulder', e.target.value)}
                  placeholder="e.g., 42"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Sleeve */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sleeve (cm)
                </label>
                <input
                  type="number"
                  value={measurements.sleeve}
                  onChange={(e) => handleInputChange('sleeve', e.target.value)}
                  placeholder="e.g., 60"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Inseam */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Inseam (cm)
                </label>
                <input
                  type="number"
                  value={measurements.inseam}
                  onChange={(e) => handleInputChange('inseam', e.target.value)}
                  placeholder="e.g., 78"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={calculateSize}
                className="px-12 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Calculate Size
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 text-center space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Recommended Size</h3>
                <div className="text-8xl font-bold text-gray-900 mb-6">
                  {result.size}
                </div>
              </div>

              {/* Measurements Summary */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Your Measurements</h4>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {Object.entries(result.measurements).map(([key, value]) => 
                    value && (
                      <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-semibold text-gray-800">{value} cm</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={resetForm}
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
              >
                Measure Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
