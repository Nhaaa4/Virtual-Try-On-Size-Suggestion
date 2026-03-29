export default function SizeResult({ result, onReset }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-8 text-center space-y-6 border border-[#12284c]/15">
        <div>
          <h3 className="text-xl font-semibold text-[#12284c] mb-4">Recommended Size</h3>
          <div className="text-8xl font-bold text-[#12284c] mb-6">
            {result.recommended_size}
          </div>
          <p className="text-sm text-[#12284c]/70">Model: {result.model_version}</p>
        </div>

        {result.alternatives && result.alternatives.length > 0 && (
          <div className="bg-white rounded-lg p-6 border border-[#12284c]/20">
            <h4 className="font-semibold text-[#12284c] mb-4">Alternative Sizes</h4>
            <div className="grid grid-cols-3 gap-4">
              {result.alternatives.map((alt, index) => (
                <div key={index} className="bg-[#12284c]/8 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#12284c]">{alt.size}</div>
                  <div className="text-sm text-[#12284c]/75 mt-1">
                    {(alt.score * 100).toFixed(1)}% match
                  </div>
                </div>
              ))}
            </div>
            {result.alternatives_note && (
              <p className="text-sm text-[#12284c]/70 mt-4 italic">{result.alternatives_note}</p>
            )}
          </div>
        )}

        <button
          onClick={onReset}
          className="px-8 py-3 bg-[#12284c] text-white font-semibold rounded-lg hover:bg-[#0d1f3b] transition-all"
        >
          Calculate Again
        </button>
      </div>
    </div>
  );
}
