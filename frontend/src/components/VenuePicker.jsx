export const FOOD_VENUES = [
  { id: "grocery_or_supermarket", label: "মুদি দোকান", labelEn: "Grocery",     emoji: "🛒", color: "#10B981" },
  { id: "restaurant",             label: "রেস্তোরাঁ",  labelEn: "Restaurant",  emoji: "🍽️", color: "#EF4444" },
  { id: "cafe",                   label: "ক্যাফে",     labelEn: "Café",        emoji: "☕", color: "#F59E0B" },
  { id: "bakery",                 label: "বেকারি",     labelEn: "Bakery",      emoji: "🥐", color: "#8B5CF6" },
  { id: "convenience_store",      label: "সুপারশপ",    labelEn: "Convenience", emoji: "🏪", color: "#FF8C42" },
];

export const HEALTH_VENUES = [
  { id: "pharmacy",  label: "ফার্মেসি",  labelEn: "Pharmacy",  emoji: "💊", color: "#3B82F6" },
  { id: "hospital",  label: "হাসপাতাল", labelEn: "Hospital",  emoji: "🏥", color: "#EF4444" },
  { id: "doctor",    label: "ডাক্তার",  labelEn: "Doctor / Clinic", emoji: "🩺", color: "#10B981" },
];

export default function VenuePicker({ venues, title, titleEn, accentColor = "#FF8C42", onSelect, onBack }) {
  return (
    <div className="min-h-screen pb-8" style={{ background: "#FFF8F0" }}>

      <div
        className="px-5 pt-6 pb-10 rounded-b-[2.5rem]"
        style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 8px 32px ${accentColor}44` }}
      >
        <button
          onClick={onBack}
          className="bg-white/25 rounded-xl px-3.5 py-2 text-white text-lg font-black border-none mb-4"
        >
          ←
        </button>
        <h2 className="text-3xl font-black text-white">{title}</h2>
        <p className="text-white/80 font-bold mt-1">{titleEn}</p>
      </div>

      <div className="px-4 mt-5">
        <p className="text-xs font-black text-center tracking-widest uppercase mb-4" style={{ color: `${accentColor}99` }}>
          বেছে নিন · Choose
        </p>
        <div className="grid grid-cols-2 gap-3.5">
          {venues.map((v, i) => (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              style={{
                animationDelay: `${i * 0.06}s`,
                background: `${v.color}12`,
                border: `2.5px solid ${v.color}44`,
                borderRadius: 24,
                boxShadow: `0 4px 20px ${v.color}1E`,
              }}
              className="pop-in flex flex-col items-center py-6 px-3 active:scale-95 transition-transform"
            >
              <span className="text-5xl leading-none mb-2.5">{v.emoji}</span>
              <span className="font-black text-lg" style={{ color: v.color }}>{v.label}</span>
              <span className="text-xs font-bold text-gray-400 mt-1">{v.labelEn}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
