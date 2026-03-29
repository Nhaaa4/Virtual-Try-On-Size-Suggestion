export default function CategorySelector({ category, setCategory }) {
  const categories = ['Upper-body', 'Lower-body', 'Dresses'];

  return (
    <div>
      <label className="block text-sm font-semibold text-[#12284c] mb-3">
        Garment Category
      </label>
      <div className="flex gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              category === cat
                ? 'bg-[#12284c] text-white shadow-lg'
                : 'bg-[#12284c]/10 text-[#12284c] hover:bg-[#12284c]/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
