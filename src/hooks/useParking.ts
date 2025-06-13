
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ---- 1. push one GPS ping --------------------------------------------------
export const useSendLocation = () =>
  useMutation({
    mutationFn: async (payload: { lat: number; lon: number; car_id: string }) => {
      console.log('Sending location to API:', API, payload);
      return fetch(`${API}/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json());
    },
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
    if (!API) {
      console.warn('API URL not configured, websocket connection skipped');
      return;
    }

    try {
      // translate http:// → ws://   •   https:// → wss://
      const wsUrl = API.replace(/^http/i, "ws") + "/ws";
      console.log('Connecting to WebSocket:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          console.log('Received parking data:', data);
          setFrame(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      wsRef.current.onopen = () => {
        console.log('WebSocket connected successfully');
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return frame;
};
