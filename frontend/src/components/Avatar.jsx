export default function Avatar({ playing, color = "#FF8C42", size = 72 }) {
  const bars = [8, 14, 6, 18, 10, 16, 8];

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {/* pulse rings when playing */}
      {playing && (
        <>
          <span style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            border: `3px solid ${color}`,
            animation: "pulse-ring 1s ease-out infinite",
          }} />
          <span style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            border: `2px solid ${color}`,
            animation: "pulse-ring 1s ease-out 0.4s infinite",
          }} />
        </>
      )}

      <div
        className={playing ? "speaking" : "bounce-av"}
        style={{
          width: size, height: size, borderRadius: "50%",
          background: `${color}18`,
          border: `3px solid ${color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.47,
          boxShadow: `0 4px 16px ${color}44`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        🧑

        {/* audio waveform bars */}
        {playing && (
          <div style={{
            position: "absolute", bottom: 8, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: 2, alignItems: "flex-end",
          }}>
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 3, height: h, borderRadius: 2,
                  background: color,
                  transformOrigin: "bottom",
                  animation: `bar-bounce ${0.32 + i * 0.07}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
