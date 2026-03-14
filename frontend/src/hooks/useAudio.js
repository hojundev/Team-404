import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const API = import.meta.env.VITE_API_BASE || "http://localhost:3001";

/**
 * Returns { playing, toggle, stop }
 * src  – relative path returned by the API, e.g. /public/audio/store_step1.mp3
 */
export function useAudio(src) {
  const howlRef  = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;

    // Resolve full URL (backend serves audio as static files)
    const url = src.startsWith("http") ? src : `${API}${src}`;

    howlRef.current = new Howl({
      src:    [url],
      html5:  true,
      onend:  () => setPlaying(false),
      onplay: () => setPlaying(true),
      onstop: () => setPlaying(false),
    });

    return () => {
      howlRef.current?.unload();
      setPlaying(false);
    };
  }, [src]);

  const toggle = () => {
    const h = howlRef.current;
    if (!h) return;
    if (h.playing()) { h.stop(); }
    else             { h.play(); }
  };

  const stop = () => howlRef.current?.stop();

  return { playing, toggle, stop };
}
