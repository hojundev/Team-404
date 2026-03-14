import Avatar from "./Avatar";
import { useAudio } from "../hooks/useAudio";

// Iconify CDN — fluent-emoji set (Microsoft illustrated emoji, free, no key)
const ICON = (name) => `https://api.iconify.design/fluent-emoji/${name}.svg`;

const LABEL_ICONS = [
  // ── store steps (must come before generic "take"/"walk" matches) ──
  ["front door",       ICON("door")],
  ["enter",            ICON("door")],
  ["basket",           ICON("basket")],
  ["shopping cart",    ICON("shopping-cart")],
  ["cart",             ICON("shopping-cart")],
  ["pick the items",   ICON("shopping-bags")],
  ["collect",          ICON("shopping-bags")],
  ["cashier",          ICON("credit-card")],
  ["counter",          ICON("credit-card")],
  ["pay and",          ICON("money-bag")],
  ["pay",              ICON("money-bag")],
  // ── health steps ──
  ["doctor",           ICON("stethoscope")],
  ["clinic",           ICON("stethoscope")],
  ["hospital",         ICON("hospital")],
  ["pharmacy",         ICON("pill")],
  ["medicine",         ICON("pill")],
  ["reception",        ICON("medical-symbol")],
  ["emergency",        ICON("ambulance")],
  // ── navigation ──
  ["turn right",       ICON("right-arrow")],
  ["turn left",        ICON("left-arrow")],
  ["roundabout",       ICON("counterclockwise-arrows-button")],
  ["arrive",           ICON("round-pushpin")],
  ["go straight",      ICON("up-arrow")],
  ["destination",      ICON("round-pushpin")],
  // ── transit (only match when it's clearly a bus/transit step) ──
  ["take the bus",     ICON("bus")],
  ["take bus",         ICON("bus")],
  ["bus",              ICON("bus")],
  ["train",            ICON("train")],
  ["transit",          ICON("bus")],
  // ── walking (catch-all for navigation steps) ──
  ["continue",         ICON("person-walking")],
  ["head ",            ICON("person-walking")],
  ["walk",             ICON("person-walking")],
];

function stepIcon(label = "", instruction = "") {
  const text = (label + " " + instruction).toLowerCase();
  for (const [key, url] of LABEL_ICONS) {
    if (text.includes(key)) return url;
  }
  return ICON("person-running");
}

export default function StepCard({ step, index, color, total }) {
  const { playing, toggle } = useAudio(step.audio);
  const iconUrl = stepIcon(step.label, step.instruction);

  return (
    <div className="slide-up w-full max-w-md mx-auto flex flex-col gap-4">

      {/* ── illustration ── */}
      <div
        className="w-full flex items-center justify-center py-10 rounded-3xl border-2 border-black/5"
        style={{ background: `${color}10` }}
      >
        <img
          src={iconUrl}
          alt={step.label}
          className="w-36 h-36 object-contain"
          onError={e => { e.target.style.display = "none"; }}
        />
      </div>

      {/* ── instruction (hero text) + distance ── */}
      <div className="text-center px-2">
        <p className="text-2xl font-black text-gray-800 leading-snug">
          {step.instruction}
        </p>
        {step.distance && (
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mt-3" style={{ background: color }}>
            <span className="text-xl font-black text-white">{step.distance}</span>
            {step.duration && (
              <span className="text-sm font-semibold text-white/80">· {step.duration}</span>
            )}
          </div>
        )}
      </div>

      {/* ── audio ── */}
      <div
        onClick={toggle}
        className="flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all"
        style={{
          background: playing ? `${color}10` : "white",
          border: `2px solid ${playing ? color : "#F3F4F6"}`,
          boxShadow: playing ? `0 4px 20px ${color}33` : "0 2px 8px #0001",
        }}
      >
        <Avatar playing={playing} color={color} size={52} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
              style={{ background: playing ? color : "#F3F4F6" }}
            >
              {playing ? "⏸" : "▶️"}
            </div>
            <span className="text-xs font-bold" style={{ color: playing ? color : "#9CA3AF" }}>
              {playing ? "শুনছেন… Playing…" : "শুনতে চাপুন · Tap to hear"}
            </span>
          </div>
        </div>
      </div>

      {/* ── progress pips ── */}
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
