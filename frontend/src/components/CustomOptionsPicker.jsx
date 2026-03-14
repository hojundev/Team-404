export default function CustomOptionsPicker({ options, description, onSelect, onBack }) {
  return (
    <div className="min-h-screen pb-8" style={{ background: "#FFF8F0" }}>

      {/* header */}
      <div
        className="px-5 pt-6 pb-10 rounded-b-[2.5rem]"
        style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 8px 32px #6366F144" }}
      >
        <button
          onClick={onBack}
          className="bg-white/25 rounded-xl px-3.5 py-2 text-white text-lg font-black border-none mb-4"
        >
          ←
        </button>
        <div className="text-5xl mb-3">✨</div>
        <h2 className="text-3xl font-black text-white">এগুলো কি ঠিক আছে?</h2>
        <p className="text-white/80 font-bold mt-1">Which one do you need?</p>
        {description && (
          <p className="text-white/60 text-sm font-semibold mt-2 italic">"{description}"</p>
        )}
      </div>

      <div className="px-4 mt-5">
        <p className="text-xs font-black text-center tracking-widest uppercase mb-4" style={{ color: "#8B5CF699" }}>
          বেছে নিন · Choose
        </p>
        <div className="grid grid-cols-2 gap-3.5">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              style={{
                animationDelay: `${i * 0.06}s`,
                background: `${opt.color}12`,
                border: `2.5px solid ${opt.color}44`,
                borderRadius: 24,
                boxShadow: `0 4px 20px ${opt.color}1E`,
              }}
              className="pop-in flex flex-col items-center py-6 px-3 active:scale-95 transition-transform"
            >
              <span className="text-5xl leading-none mb-2.5">{opt.emoji}</span>
              <span className="font-black text-lg" style={{ color: opt.color }}>{opt.label}</span>
              <span className="text-xs font-bold text-gray-400 mt-1">{opt.labelEn}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
