import ChartCanvas from "@/components/ChartCanvas";
import { MetricCard } from "@/components/metric_card";
import { METRIC_CARDS } from "@/components/metric_card";
import { PerformancePanel } from "@/components/PerformancePanel";

export default function DashboardPage() {
  return (
    <div className="p-6 min-h-screen  bg-slate-950 text-slate-200 selection:bg-primary/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-5">
        {METRIC_CARDS.map((card, i) => (
          <MetricCard key={i} {...card} />
        ))}
      </div>
      <ChartCanvas />
      <div className=" flex gap-5 pt-5">
        <div className="flex-[2] bg-slate-900 border border-slate-800 rounded-lg">
          hi there
        </div>

        <div className="flex-[1]">
          {/* Performance Panel */}
          <PerformancePanel />
        </div>
      </div>
    </div>
  );
}
