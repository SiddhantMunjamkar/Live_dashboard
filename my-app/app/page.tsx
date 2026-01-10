import ChartCanvas from "@/components/ChartCanvas";
import { LogStats } from "@/components/logStats";
import { MetricCards } from "@/components/metric_card";
import { PerformancePanel } from "@/components/PerformancePanel";

export default function DashboardPage() {
  return (
    <div className="p-6 min-h-screen  bg-slate-950 text-slate-200 selection:bg-primary/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-5">
        <MetricCards />
      </div>
      <ChartCanvas />
      <div className=" flex gap-5 pt-5 ">
        <div className="flex-[2]">
          <LogStats />
        </div>

        <div className="flex-[1]">
          {/* Performance Panel */}
          <PerformancePanel />
        </div>
      </div>
    </div>
  );
}
