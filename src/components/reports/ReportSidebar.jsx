import { Filter, Check } from "lucide-react";

export default function ReportSidebar({ reportConfigs, selectedReport, setSelectedReport }) {
    return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-5 shadow-sm sticky top-8">
            <div className="flex items-center gap-2 mb-4 px-2">
                <Filter size={16} className="text-[#007b8a]" />
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Report Modules
                </h2>
            </div>
            <div className="space-y-2">
                {Object.keys(reportConfigs).map((report) => (
                    <button
                        key={report}
                        onClick={() => setSelectedReport(report)}
                        className={`w-full group px-4 py-4 rounded-xl border transition-all flex items-center justify-between ${selectedReport === report
                                ? "bg-[#e6f7f9] border-[#cceef2] text-[#007b8a]"
                                : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50"
                            }`}
                    >
                        <span className="text-[12px] font-bold tracking-tight">{report}</span>
                        {selectedReport === report && <Check size={14} strokeWidth={3} />}
                    </button>
                ))}
            </div>
        </div>
    );
}