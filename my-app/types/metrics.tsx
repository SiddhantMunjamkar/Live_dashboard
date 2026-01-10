"use client";
import { useState, useEffect } from "react";
import { stats } from "@/engine/stats";

export interface Metrics {
  eps: number; // events per second
  epsDelta: number; // % change vs last second
  avg: number; // avg latency
  max: number; // max latency

  epsProgress: number; // eps progress bar
  avgProgress: number; // avg progress bar
  maxProgress: number; // max progress bar

  status: "LIVE" | "DOWN"; // connection status
  uptime: string;
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    eps: 0,
    epsDelta: 0,
    avg: 0,
    max: 0,
    epsProgress: 0,
    avgProgress: 0,
    maxProgress: 0,
    status: "LIVE",
    uptime: "14d 2h 12m",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const eps = stats.events;
      const avg =
        stats.values.reduce((a, b) => a + b, 0) / stats.values.length || 1;
      const max = Math.max(...stats.values);
      

      const MAX_EPS = 2000;
      const MAX_AVG = 200;
      const MAX_MAX = 300;

      setMetrics((prev) => ({
        eps,
        epsDelta: prev.eps === 0 ? 0 : ((eps - prev.eps) / prev.eps) * 100,
        avg,
        max,
        epsProgress: Math.min((eps / MAX_EPS) * 100, 100),
        avgProgress: Math.min((avg / MAX_AVG) * 100, 100),
        maxProgress: Math.min((max / MAX_MAX) * 100, 100),
        status: "LIVE",
        uptime: prev.uptime,
      }));

      // Reset stats immediately after reading
      stats.events = 0;
      stats.values = [];
      stats.dropped = 0;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return metrics;
}
