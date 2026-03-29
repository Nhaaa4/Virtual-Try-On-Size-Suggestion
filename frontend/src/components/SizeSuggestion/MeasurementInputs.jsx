export default function MeasurementInputs({ age, setAge, height, setHeight, weight, setWeight }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-semibold text-[#12284c] mb-2">
          Age (years)
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g., 25"
          className="w-full px-4 py-3 border-2 border-[#12284c]/20 rounded-lg focus:ring-2 focus:ring-[#12284c]/35 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#12284c] mb-2">
          Height (cm)
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="e.g., 170"
          className="w-full px-4 py-3 border-2 border-[#12284c]/20 rounded-lg focus:ring-2 focus:ring-[#12284c]/35 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#12284c] mb-2">
          Weight (kg)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 65"
          className="w-full px-4 py-3 border-2 border-[#12284c]/20 rounded-lg focus:ring-2 focus:ring-[#12284c]/35 focus:border-transparent outline-none transition-all"
        />
      </div>
    </div>
  );
}
