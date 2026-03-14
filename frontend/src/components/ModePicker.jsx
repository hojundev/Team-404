const MODES = [
  {
    id: "walking",
    label:   "হেঁটে যান",
    labelEn: "Walk",
    emoji:   "🚶",
    color:   "#10B981",
    desc:    "পায়ে হেঁটে · On foot",
  },
  {
    id: "transit",
    label:   "বাসে যান",
    labelEn: "Bus / Transit",
    emoji:   "🚌",
    color:   "#3B82F6",
    desc:    "বাস বা ট্রেনে · By bus or train",
  },
];

export default function ModePicker({ onSelect, onBack }) {
  return (
    <div className="min-h-screen pb-8" style={{ background: "#FFF8F0" }}>

      {/* header */}
      <div
        className="px-5 pt-6 pb-10 rounded-b-[2.5rem]"
        style={{ background: "linear-gradient(135deg, #FF8C42, #FFB347)", boxShadow: "0 8px 32px #FF8C4244" }}
      >
        <button
          onClick={onBack}
          className="bg-white/25 rounded-xl px-3.5 py-2 text-white text-lg font-black border-none mb-4"
        >
          ←
        </button>
        <h2 className="text-3xl font-black text-white">কীভাবে যাবেন?</h2>
        <p className="text-white/80 font-bold mt-1">How do you want to travel?</p>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-4">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            style={{
              animationDelay: `${i * 0.08}s`,
              background: `${m.color}10`,
              border: `2.5px solid ${m.color}44`,
              borderRadius: 24,
              boxShadow: `0 4px 20px ${m.color}1E`,
            }}
            className="pop-in flex items-center gap-5 px-6 py-7 active:scale-95 transition-transform"
          >
            <span className="text-6xl leading-none">{m.emoji}</span>
            <div className="text-left">
              <p className="font-black text-2xl" style={{ color: m.color }}>{m.label}</p>
              <p className="font-bold text-base text-gray-600">{m.labelEn}</p>
              <p className="text-xs text-gray-400 font-semibold mt-1">{m.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
