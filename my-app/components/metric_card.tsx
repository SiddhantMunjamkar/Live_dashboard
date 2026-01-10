"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { TimerReset } from "lucide-react";
import { ShieldAlert } from "lucide-react";
import { Wifi } from "lucide-react";
import { Zap } from "lucide-react";
import { Metrics, useMetrics } from "@/types/metrics";

interface MetricCardProps {
  label: string;
  value?: string | number;
  unit?: string;
  delta?: number;
  icon: React.ReactNode;
  iconColor: string;
  progress?: number;
  progressColor?: "primary" | "blue" | "orange" | "emerald";
  status?: "LIVE" | "DOWN";
  footer?: string;
}

export const progressColorMap = {
  primary: "#13ec80",
  blue: "#3b82f6",
  orange: "#f97316",
  emerald: "#10b981",
};

export function getMetricCards(metrics: Metrics) {
  return [
    {
      label: "Events / Sec",
      value: metrics.eps.toLocaleString(),
      delta: metrics.epsDelta,
      icon: <Zap className="w-12 h-12" />,
      iconColor: "text-green-500",
      progress: metrics.epsProgress,
      progressColor: "primary" as const,
    },
    {
      label: "Avg Latency",
      value: metrics.avg.toFixed(1),
      unit: "ms",
      icon: <TimerReset className="w-12 h-12" />,
      iconColor: "text-blue-400",
      progress: metrics.avgProgress,
      progressColor: "blue" as const,
    },
    {
      label: "Max Latency",
      value: metrics.max.toFixed(1),
      unit: "ms",
      icon: <ShieldAlert className="w-12 h-12" />,
      iconColor: "text-orange-400",
      progress: metrics.maxProgress,
      progressColor: "orange" as const,
    },
    {
      label: "Connection Status",
      icon: <Wifi className="w-12 h-12" />,
      iconColor: "text-emerald-400",
      status: metrics.status,
      footer: `Uptime: ${metrics.uptime}`,
    },
  ];
}

// export const METRIC_CARDS: MetricCardProps[] = [
//   {
//     label: "Events / Sec",
//     value: "1,245",
//     delta: 5.2,
//     icon: <Zap className="w-12 h-12" />,
//     iconColor: "text-green-500",
//     progress: 70,
//     progressColor: "primary" as const,
//   },
//   {
//     label: "Avg Latency",
//     value: "45.2",
//     unit: "ms",
//     icon: <TimerReset className="w-12 h-12" />,
//     iconColor: "text-blue-400",
//     progress: 45,
//     progressColor: "blue" as const,
//   },
//   {
//     label: "Max Latency",
//     value: "98.1",
//     unit: "ms",
//     icon: <ShieldAlert className="w-12 h-12" />,
//     iconColor: "text-orange-400",
//     progress: 30,
//     progressColor: "orange" as const,
//   },
//   {
//     label: "Connection Status",
//     icon: <Wifi className="w-12 h-12" />,
//     iconColor: "text-emerald-400",
//     status: "LIVE",
//     footer: "Uptime: 14d 2h 12m",
//   },
// ];

export function MetricCard({
  label,
  value,
  unit,
  delta,
  icon,
  iconColor,
  progress,
  progressColor = "primary",
  status,
  footer,
}: MetricCardProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group gap-0 shadow-none">
      {/* Background Icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className={cn("material-symbols-outlined text-6xl ", iconColor)}>
          {icon}
        </span>
      </div>

      {/* Label */}
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
        {label}
      </h3>

      {/* Value */}
      {value && (
        <div className="flex items-baseline gap-2 z-10">
          <span className="text-3xl font-bold text-white">{value}</span>
          {unit && (
            <span className="text-sm font-medium text-slate-400">{unit}</span>
          )}
          {delta !== undefined && (
            <span
              className={`text-xs font-medium  flex items-center gap-1 ${
                delta >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {delta >= 0 ? (
                <TrendingUp className="text-green-500 w-3 h-3" />
              ) : (
                <TrendingDown className="text-red-500 w-3 h-3" />
              )}
              {delta.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      {/* Status */}
      {status && (
        <div className="flex items-center gap-3 z-10 mt-1">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
          </span>
          <span className="text-2xl font-bold text-white tracking-tight">
            {status}
          </span>
        </div>
      )}

      {/* Progress */}
      {progress !== undefined && (
        <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              backgroundColor: progressColorMap[progressColor],
            }}
          />
        </div>
      )}

      {/* Footer */}
      {footer && (
        <p className="text-xs text-slate-500 mt-2 font-mono">{footer}</p>
      )}
    </Card>
  );
}

export function MetricCards() {
  const metrics = useMetrics();
  const cards = getMetricCards(metrics);

  return (
    <>
      {cards.map((card, i) => (
        <MetricCard key={i} {...card} />
      ))}
    </>
  );
}
