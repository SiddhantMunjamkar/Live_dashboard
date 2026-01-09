import { ChartNoAxesCombined } from "lucide-react";

export function Navbar_path_show() {
  return (
    <div className="flex items-center gap-1">
      <div className="p-1.5 rounded bg-primary/20 text-primary">
        <ChartNoAxesCombined className=" text-green-500  material-symbols-outlined text-xl" />
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg font-bold tracking-tight text-white">
          System Monitor
        </span>
        <span className="text-slate-500 font-normal mx-2">/</span>
        <span className="text-slate-400 font-medium text-sm">
          Real-time Dashboard
        </span>
      </div>
    </div>
  );
}
