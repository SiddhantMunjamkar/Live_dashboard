interface MetricCardProps{
    Name: string;
    Value: string;
    Icon: string;

}



export function MetricCard({Name,Value,Icon}:MetricCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto shrink-0 pb-6">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="material-symbols-outlined text-6xl text-primary">
            {Icon}
          </span>
        </div>
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
          Events / Sec{Name}
        </h3>
        <div className="flex items-baseline gap-2 z-10">
          <span className="text-3xl font-bold text-white">1,245{Value}</span>
          <span className="text-xs font-medium text-primary flex items-center">
            <span className="material-symbols-outlined text-sm">
              trending_up
            </span>
            +5.2%
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full w-[70%]"></div>
        </div>
      </div>
    </div>
  );
}
