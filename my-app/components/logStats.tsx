export function LogStats() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col h-[225px] ">
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/90 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-200">Recent Events</h3>
        <span className="text-xs text-slate-500">Auto-scroll: ON</span>
      </div>
      <div className="overflow-y-scroll flex-1 p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase sticky top-0 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-2 font-semibold">Timestamp</th>
              <th className="px-4 py-2 font-semibold">Source</th>
              <th className="px-4 py-2 font-semibold">Event</th>
              <th className="px-4 py-2 font-semibold text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono text-xs">
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-2 text-green-400">10:42:15.342</td>
              <td className="px-4 py-2 text-slate-300">Worker-04</td>
              <td className="px-4 py-2">
                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                  INFO
                </span>{" "}
                Data sync completed
              </td>
              <td className="px-4 py-2 text-right text-slate-400">12ms</td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-2 text-green-400">10:42:12.105</td>
              <td className="px-4 py-2 text-slate-300">Auth-Service</td>
              <td className="px-4 py-2">
                <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold">
                  SUCCESS
                </span>{" "}
                User login
              </td>
              <td className="px-4 py-2 text-right text-slate-400">200</td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-2 text-green-400">10:42:08.882</td>
              <td className="px-4 py-2 text-slate-300">DB-Primary</td>
              <td className="px-4 py-2">
                <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold">
                  WARN
                </span>{" "}
                Long running query
              </td>
              <td className="px-4 py-2 text-right text-orange-400">1.2s</td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-2 text-green-400">10:42:05.421</td>
              <td className="px-4 py-2 text-slate-300">API-Gateway</td>
              <td className="px-4 py-2">
                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                  INFO
                </span>{" "}
                Incoming Request
              </td>
              <td className="px-4 py-2 text-right text-slate-400">45ms</td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-2 text-green-400">10:42:01.002</td>
              <td className="px-4 py-2 text-slate-300">System</td>
              <td className="px-4 py-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600 text-[10px] font-bold">
                  DEBUG
                </span>{" "}
                Garbage Collection
              </td>
              <td className="px-4 py-2 text-right text-slate-400">8ms</td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-2 text-green-400">10:41:59.998</td>
              <td className="px-4 py-2 text-slate-300">Worker-02</td>
              <td className="px-4 py-2">
                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                  INFO
                </span>{" "}
                Job processed
              </td>
              <td className="px-4 py-2 text-right text-slate-400">105ms</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
