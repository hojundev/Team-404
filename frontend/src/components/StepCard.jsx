import Avatar from "./Avatar";
import { useAudio } from "../hooks/useAudio";

const API = import.meta.env.VITE_API_BASE || "http://localhost:3001";

const BG_COLORS = [
  "#FFF0D4","#E8F8EF","#FFF0E5","#E8F0FF",
  "#F0EBFF","#FFFBEB","#FFE8E8","#E8F8EF",
];

export default function StepCard({ step, index, color, total }) {
  const { playing, toggle } = useAudio(step.audio);
  const bg = BG_COLORS[index % BG_COLORS.length];

  // Resolve full image URL
  const imgSrc = step.image
    ? (step.image.startsWith("http") ? step.image : `${API}${step.image}`)
    : null;

  return (
    <div className="slide-up w-full max-w-md mx-auto flex flex-col gap-4">

      {/* step image */}
      <div
        style={{ background: bg, borderRadius: 28, minHeight: 190 }}
        className="w-full flex items-center justify-center border-2 border-black/5 overflow-hidden"
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={step.instruction}
            className="w-full h-48 object-cover"
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
        ) : null}
        {/* emoji fallback */}
        <div
          className="float text-8xl"
          style={{ display: imgSrc ? "none" : "flex" }}
        >
          {step.emoji || "🗺️"}
        </div>
      </div>

      {/* title */}
      <div className="text-center">
        <p className="text-2xl font-black text-gray-800">
          {step.rohingya_text || step.instruction}
        </p>
        <p className="text-sm font-bold text-gray-400 mt-1">{step.instruction}</p>
        {step.distance && (
          <span
            className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: `${color}22`, color }}
          >
            {step.distance} · {step.duration}
          </span>
        )}
      </div>

      {/* avatar + audio */}
      <div
        onClick={toggle}
        className="flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all"
        style={{
          background: playing ? `${color}10` : "white",
          border: `2px solid ${playing ? color : "#F3F4F6"}`,
          boxShadow: playing ? `0 4px 20px ${color}33` : "0 2px 8px #0001",
        }}
      >
        <Avatar playing={playing} color={color} size={68} />

        <div className="flex-1 min-w-0">
          <p className="text-base font-black text-gray-800 leading-snug">
            {step.rohingya_text || step.instruction}
          </p>
          <p className="text-xs text-gray-400 font-semibold mt-1 truncate">
            {step.instruction}
          </p>

          {/* play button row */}
          <div className="flex items-center gap-2 mt-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
              style={{ background: playing ? color : "#F3F4F6" }}
            >
              {playing ? "⏸" : "▶️"}
            </div>
            <span
              className="text-xs font-bold"
              style={{ color: playing ? color : "#9CA3AF" }}
            >
              {playing ? "শুনছেন… (Playing…)" : "শুনতে চাপুন (Tap to hear)"}
            </span>
          </div>
        </div>
      </div>

      {/* progress pips */}
      <div className="flex justify-center gap-1.5 pt-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width:  i === index ? 20 : 8,
              height: 8,
              borderRadius: 6,
              background: i === index ? color : "#E5E7EB",
              transition: "all .3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
