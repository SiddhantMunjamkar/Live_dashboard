import { useState, useEffect, useRef } from "react";
import { stats } from "@/engine/stats";

export interface ClientPerformance {
  fps: number;
  ops: number;
  drops: number;
  fpsProgress: number;
  opsProgress: number;
  dropsProgress: number;
}

export function useClientPerformance() {
  const [clientPerformance, setClientPerformance] = useState<ClientPerformance>(
    {
      fps: 0,
      ops: 0,
      drops: 0,
      fpsProgress: 0,
      opsProgress: 0,
      dropsProgress: 0,
    }
  );
  
  const prevStatsRef = useRef({ events: 0, dropped: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      const MAX_FPS = 60;
      const MAX_OPS = 3000;
      const MAX_DROPS = 100;
      
      // Track deltas since stats get reset by useMetrics
      const currentEvents = stats.events;
      const currentDropped = stats.dropped;
      
      // If stats got reset (currentEvents < prev), use current value directly
      // Otherwise calculate delta
      let opsThisSecond = currentEvents;
      let dropsThisSecond = currentDropped;
      
      if (currentEvents >= prevStatsRef.current.events) {
        opsThisSecond = currentEvents - prevStatsRef.current.events;
      }
      if (currentDropped >= prevStatsRef.current.dropped) {
        dropsThisSecond = currentDropped - prevStatsRef.current.dropped;
      }
      
      prevStatsRef.current.events = currentEvents;
      prevStatsRef.current.dropped = currentDropped;
      
      setClientPerformance({
        fps: stats.fps || 0,
        ops: opsThisSecond,
        drops: dropsThisSecond,
        fpsProgress: Math.min((stats.fps / MAX_FPS) * 100, 100),
        opsProgress: Math.min((opsThisSecond / MAX_OPS) * 100, 100),
        dropsProgress: Math.min((dropsThisSecond / MAX_DROPS) * 100, 100),
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return clientPerformance;
}
