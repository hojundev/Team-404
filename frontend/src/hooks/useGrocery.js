import { useState, useCallback, useRef } from "react";

const API = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export function useGrocery() {
  const [state, setState] = useState({
    status: "idle",
    data:   null,
    error:  null,
  });

  const lastParams  = useRef(null);
  const cancelToken = useRef(0);

  const _fetch = useCallback(async ({ lat, lng, placeType, searchQuery, customSteps, mode, token }) => {
    setState(s => ({ ...s, status: "loading" }));
    try {
      const res = await fetch(`${API}/api/find-place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat, lng,
          type: placeType,
          ...(mode        && { mode }),
          ...(searchQuery && { searchQuery }),
          ...(customSteps && { customSteps }),
        }),
      });
      if (cancelToken.current !== token) return;
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      if (cancelToken.current !== token) return;
      setState({ status: "ready", data, error: null });
    } catch (err) {
      if (cancelToken.current !== token) return;
      setState({ status: "error", data: null, error: err.message });
    }
  }, []);

  const fetchGrocery = useCallback(async ({ placeType = "grocery_or_supermarket", searchQuery, customSteps } = {}) => {
    const token = ++cancelToken.current;
    setState({ status: "locating", data: null, error: null });

    let lat, lng;
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, {
          enableHighAccuracy: true,
          timeout: 10000,
        })
      );
      if (cancelToken.current !== token) return;
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch (err) {
      if (cancelToken.current !== token) return;
      const msg = err?.code === 1
        ? "Location access denied. Please allow location permission and try again."
        : "Could not get your location. Please try again.";
      setState({ status: "error", data: null, error: msg });
      return;
    }

    lastParams.current = { lat, lng, placeType, searchQuery, customSteps };
    await _fetch({ lat, lng, placeType, searchQuery, customSteps, token });
  }, [_fetch]);

  const switchMode = useCallback(async (mode) => {
    if (!lastParams.current) return;
    const token = ++cancelToken.current;
    await _fetch({ ...lastParams.current, mode, token });
  }, [_fetch]);

  const reset = useCallback(() => {
    cancelToken.current++;
    lastParams.current = null;
    setState({ status: "idle", data: null, error: null });
  }, []);

  return { ...state, fetchGrocery, switchMode, reset };
}
