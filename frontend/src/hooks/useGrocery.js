import { useState, useCallback } from "react";

const API = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export function useGrocery() {
  const [state, setState] = useState({
    status: "idle",   // idle | locating | loading | ready | error
    data:   null,
    error:  null,
  });

  const fetchGrocery = useCallback(async () => {
    setState({ status: "locating", data: null, error: null });

    let lat, lng;
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, {
          enableHighAccuracy: true,
          timeout: 10000,
        })
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch (err) {
      const msg = err?.code === 1
        ? "Location access denied. Please allow location permission and try again."
        : "Could not get your location. Please try again.";
      setState({ status: "error", data: null, error: msg });
      return;
    }

    setState(s => ({ ...s, status: "loading" }));

    try {
      const res  = await fetch(`${API}/api/nearest-grocery?lat=${lat}&lng=${lng}`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setState({ status: "ready", data, error: null });
    } catch (err) {
      setState({ status: "error", data: null, error: err.message });
    }
  }, []);

  const reset = useCallback(() =>
    setState({ status: "idle", data: null, error: null }), []);

  return { ...state, fetchGrocery, reset };
}
