import ChartCanvas from "@/components/ChartCanvas";
import { MetricCard } from "@/components/metric_card";

export default function DashboardPage() {
  return (
    <div className="p-6 min-h-screen  bg-slate-950 text-slate-200 selection:bg-primary/30">
      <MetricCard />
      <ChartCanvas />
    </div>
  );
}
