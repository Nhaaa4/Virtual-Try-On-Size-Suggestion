export default function ModelTypeSelector({ modelType, setModelType }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#12284c] mb-3">
        Prediction Model
      </label>
      <div className="flex gap-4">
        <button
          onClick={() => setModelType('decision_tree')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
            modelType === 'decision_tree'
              ? 'bg-[#12284c] text-white shadow-lg'
              : 'bg-[#12284c]/10 text-[#12284c] hover:bg-[#12284c]/15'
          }`}
        >
          Decision Tree
        </button>
        <button
          onClick={() => setModelType('neural_network')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
            modelType === 'neural_network'
              ? 'bg-[#12284c] text-white shadow-lg'
              : 'bg-[#12284c]/10 text-[#12284c] hover:bg-[#12284c]/15'
          }`}
        >
          Neural Network
        </button>
      </div>
    </div>
  );
}
