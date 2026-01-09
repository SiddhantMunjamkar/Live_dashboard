"use client";
import { useEffect, useState } from "react";

export function LiveDataCard() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    
    setIsOnline(navigator.onLine);

    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline ? (
    <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 fixe">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      LIVE DATA
    </span>
  ) : (
    <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      OFFLINE
    </span>
  );
}
