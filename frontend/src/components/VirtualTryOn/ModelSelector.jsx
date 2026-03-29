export default function ModelSelector({ model, setModel }) {
  const modelOptions = [
    { id: 'hd', name: 'Upper Body Only', description: 'Best for shirts and tops' },
    { id: 'dc', name: 'Full Outfit', description: 'Better for dresses and full outfits' },
    { id: 'gemini', name: 'Advanced AI (Best Quality)', description: 'Most realistic results' }
  ];

  return (
    <div>
      <label className="block text-sm font-semibold text-[#12284c] mb-3">
        Select Model
      </label>
      <div className="grid grid-cols-3 gap-3">
        {modelOptions.map((modelOption) => (
          <button
            key={modelOption.id}
            onClick={() => setModel(modelOption.id)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              model === modelOption.id
                ? 'border-[#12284c] shadow-md'
                : 'border-[#12284c]/20 bg-white hover:border-[#12284c]/45'
            }`}
          >
            <div className="font-semibold text-[#12284c] text-sm mb-1">{modelOption.name}</div>
            <div className="text-xs text-[#12284c]/70">{modelOption.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
