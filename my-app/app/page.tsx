import ChartCanvas from "@/components/ChartCanvas";
import { MetricCard } from "@/components/metric_card";
import { METRIC_CARDS } from "@/components/metric_card";

export default function DashboardPage() {
  return (
    <div className="p-6 min-h-screen  bg-slate-950 text-slate-200 selection:bg-primary/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-5">
        {METRIC_CARDS.map((card, i) => (
          <MetricCard key={i} {...card} />
        ))}
      </div>
      <ChartCanvas />
    </div>
  );
}
