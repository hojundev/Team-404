export default function StatusScreen({ status, error, onRetry }) {
  if (status === "locating") return (
    <Screen emoji="📍" color="#3B82F6"
      title="আপনার অবস্থান খুঁজছি…"
      sub="Finding your location…"
    />
  );
  if (status === "loading") return (
    <Screen emoji="🗺️" color="#FF8C42"
      title="কাছের দোকান খুঁজছি…"
      sub="Finding nearest grocery store…"
    />
  );
  if (status === "error") return (
    <Screen emoji="❌" color="#EF4444"
      title="সমস্যা হয়েছে"
      sub={error || "Something went wrong"}
      action={<button onClick={onRetry} className="mt-6 px-8 py-4 rounded-2xl text-white font-black text-lg" style={{ background: "#EF4444" }}>আবার চেষ্টা করুন · Retry</button>}
    />
  );
  return null;
}

function Screen({ emoji, color, title, sub, action }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ background: "#FFF8F0" }}>
      <div className="float text-8xl">{emoji}</div>
      <div
        className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: `${color}55`, borderTopColor: color }}
      />
      <p className="text-2xl font-black text-gray-800">{title}</p>
      <p className="text-base text-gray-400 font-semibold">{sub}</p>
      {action}
    </div>
  );
}
