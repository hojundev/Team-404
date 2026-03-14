import { useState } from "react";

const API = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export default function CustomInputScreen({ onOptions, onBack }) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onOptions(null, trimmed, "❓"); // signal loading
    try {
      const res = await fetch(`${API}/api/custom/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: trimmed }),
      });
      if (!res.ok) throw new Error("Server error");
      const { options } = await res.json();
      onOptions(options, trimmed, "❓");
    } catch {
      onOptions([], trimmed, "❓");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFF8F0" }}>

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
        <div className="text-5xl mb-3">❓</div>
        <h2 className="text-3xl font-black text-white">আপনার কী দরকার?</h2>
        <p className="text-white/80 font-bold mt-1">What do you need?</p>
      </div>

      <div className="flex-1 px-4 py-8 flex flex-col gap-4">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="e.g. mosque, money, ID card…"
          autoFocus
          className="w-full px-5 py-5 rounded-3xl text-xl font-bold text-gray-700 outline-none"
          style={{
            background: "white",
            border: "2.5px solid #DDD6FE",
            boxShadow: "0 4px 20px #6366F110",
          }}
        />
      </div>

      {/* submit */}
      <div className="px-4 pb-10">
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="w-full py-5 rounded-2xl text-white text-xl font-black border-none"
          style={{
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            boxShadow: "0 6px 20px #6366F155",
            opacity: text.trim() ? 1 : 0.4,
          }}
        >
          ✨ চলুন →
        </button>
      </div>
    </div>
  );
}
