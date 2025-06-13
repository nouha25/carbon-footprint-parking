
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const API = import.meta.env.VITE_API_URL;

// ---- 1. push one GPS ping --------------------------------------------------
export const useSendLocation = () =>
  useMutation({
    mutationFn: async (payload: { lat: number; lon: number; car_id: string }) =>
      fetch(`${API}/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json()),
  });

// ---- 2. subscribe to websocket stream --------------------------------------
export type ParkingFrame = {
  timestamp: string;
  street_id: string;
  distance_km: number;
  available_spots: number;
  total_spots: number;
  congestion: number;
  emission_kg: number;
  car_id: string;
};

export const useParkingStream = () => {
  const [frame, setFrame] = useState<ParkingFrame | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // translate http:// → ws://   •   https:// → wss://
    const wsUrl = API.replace(/^http/i, "ws") + "/ws";
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      setFrame(data);
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return frame;
};
