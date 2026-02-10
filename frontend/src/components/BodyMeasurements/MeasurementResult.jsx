export default function MeasurementResult({ result, onReset }) {
  return (
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
          onClick={onReset}
          className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
        >
          Measure Again
        </button>
      </div>
    </div>
  );
}
