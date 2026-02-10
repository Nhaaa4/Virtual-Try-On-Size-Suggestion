import { useState } from 'react';
import MeasurementGuide from './BodyMeasurements/MeasurementGuide';
import MeasurementForm from './BodyMeasurements/MeasurementForm';
import MeasurementResult from './BodyMeasurements/MeasurementResult';

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
            <MeasurementGuide />
            <MeasurementForm
              measurements={measurements}
              onInputChange={handleInputChange}
              onCalculate={calculateSize}
            />
          </div>
        ) : (
          <MeasurementResult result={result} onReset={resetForm} />
        )}
      </div>
    </div>
  );
}
