"use client";

import { useState, useEffect } from "react";
import { Clock4 } from "lucide-react";

function getUTCTime() {
  return new Date().toUTCString().split(" ")[4];
}

export function ClockComponentNavbar() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getUTCTime());
    
    const interval = setInterval(() => {
      setTime(getUTCTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center text-slate-400 text-sm font-medium gap-1">
      <Clock4 className="w-4 h-4" />
      <div className="font-mono tabular-nums">{mounted ? time : "--:--:--"}</div> UTC
    </div>
  );
}
