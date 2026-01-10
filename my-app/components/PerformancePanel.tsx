interface PerformancePanelProps {
  label: string;
  value: number;
  progress: number;
  progressColor: "primary" | "blue" | "orange" | "emerald";
}

const progressColorMap = {
  primary: "#13ec80",
  blue: "#3b82f6",
  orange: "#f97316",
  emerald: "#10b981",
};

export const performanceMetrics: PerformancePanelProps[] = [
  {
    label: "FPS",
    value: 60,
    progress: 98,
    progressColor: "emerald",
  },
  {
    label: "OPS",
    value: 2400,
    progress: 65,
    progressColor: "blue",
  },
  {
    label: "DROP",
    value: 0,
    progress: 2,
    progressColor: "orange",
  },
];

export function PerformancePanel() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="text-sm font-bold text-slate-200">Client Performance</h3>
        <span className="material-symbols-outlined text-slate-500 text-sm">
          Memory
        </span>
      </div>
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {performanceMetrics.map((metric, index) => (
          <GetPerformancePanels key={index} {...metric} />
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-slate-800 flex justify-between items-center">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">
          Render Engine
        </span>
        <span className="px-3 py-1 rounded-lg text-xs bg-slate-800/50 text-emerald-400 border border-slate-700/50 font-mono font-semibold">
          CANVAS_2D
        </span>
      </div>
    </div>
  );
}

function GetPerformancePanels({
  label,
  value,
  progress,
  progressColor,
}: PerformancePanelProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 text-right text-xs font-mono text-slate-400">
        {label}
      </div>
      {/* Progress */}
      {progress !== undefined && (
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              backgroundColor: progressColorMap[progressColor],
            }}
          />
        </div>
      )}
      <div className="w-12 font-mono text-sm font-bold text-white text-right">
        {value}
      </div>
    </div>
  );
}
