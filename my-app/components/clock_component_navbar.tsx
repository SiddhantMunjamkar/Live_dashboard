"use client";

import { useState, useEffect } from "react";
import { Clock4 } from "lucide-react";

function getUTCTime() {
  return new Date().toUTCString().split(" ")[4];
}

export function ClockComponentNavbar() {
  const [time, setTime] = useState<string>(getUTCTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getUTCTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center text-slate-400 text-sm font-medium gap-1">
      <Clock4 className="w-4 h-4" />
      <div className="font-mono tabular-nums">{time}</div> UTC
    </div>
  );
}
