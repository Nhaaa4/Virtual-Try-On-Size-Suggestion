import { getImageURL } from '../../services/api';

export default function ResultDisplay({ result, model, onReset }) {
  return (
    <div className="text-center space-y-6">
      <div className="bg-white rounded-xl p-8 border border-[#12284c]/15">
        <h3 className="text-2xl font-semibold text-[#12284c] mb-4">Result</h3>
        <img
          src={getImageURL(result.image_url)}
          alt="Try-On Result"
          className="max-h-[500px] mx-auto rounded-lg shadow-xl border border-[#12284c]/20"
        />
        <div className="mt-6 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-[#12284c]/70">Model Used</p>
            <p className="font-semibold text-[#12284c] capitalize">
              {model === 'gemini' ? 'Google Gemini' : model.toUpperCase()}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-[#12284c]/70">Category</p>
            <p className="font-semibold text-[#12284c]">{result.category}</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-[#12284c]/70">Processing Time</p>
            <p className="font-semibold text-[#12284c]">{result.processing_time?.toFixed(2)}s</p>
          </div>
        </div>
      </div>
      <button
        onClick={onReset}
        className="px-8 py-3 bg-[#12284c] text-white font-semibold rounded-lg hover:bg-[#0d1f3b] transition-all"
      >
        Try Another
      </button>
    </div>
  );
}
