import { Settings2, ChevronDown, Calendar as CalendarIcon, BarChart3, RefreshCw, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";

export default function ReportConfig({ selectedReport, config, startDate, setStartDate, endDate, setEndDate }) {
    const router = useRouter();
    const btnGradient = "bg-gradient-to-r from-[#5bc4d4] to-[#6a82e5] hover:opacity-90 text-white shadow-[0_10px_20px_-5px_rgba(106,130,229,0.3)] transition-all active:scale-95";

    const handleGenerate = () => {
        const params = new URLSearchParams({
            type: selectedReport,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
        });
        router.push(`/dashboard/reports/generated?${params.toString()}`);
    };

    return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                <Settings2 size={18} className="text-[#007b8a]" />
                <div>
                    <h2 className="text-[14px] font-black text-slate-800 uppercase">
                        Configure {selectedReport}
                    </h2>
                    <p className="text-[9px] font-bold text-[#4a9ba6] uppercase tracking-widest mt-0.5">
                        * {config.description}
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {config?.fields?.map((field, idx) => {
                        if (field.type === "select") {
                            return (
                                <div key={idx} className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <MapPin size={10} className="text-[#007b8a]" /> {field.label}
                                    </label>
                                    <div className="relative group">
                                        <select className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#007b8a] transition-all cursor-pointer">
                                            {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                    </div>
                                </div>
                            );
                        }

                        if (field.type === "date-range" || field.type === "date-single") {
                            return (
                                <div key={idx} className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        {field.label} {field.description && <span className="text-[#e67e22] lowercase italic font-medium tracking-normal">{field.description}</span>}
                                    </label>
                                    <div className="relative">
                                        <DatePicker
                                            selected={field.isEnd ? endDate : startDate}
                                            onChange={(date) => field.isEnd ? setEndDate(date) : setStartDate(date)}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-12 py-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#007b8a]"
                                            placeholderText="DD-MM-YYYY"
                                            dateFormat="dd-MM-yyyy"
                                        />
                                        <CalendarIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007b8a]" />
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                <div className="pt-6 flex flex-col md:flex-row gap-3">
                    <button
                        onClick={handleGenerate}
                        className={`${btnGradient} flex-1 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2`}
                    >
                        <BarChart3 size={16} />
                        Generate Detailed Report
                    </button>
                    <button
                        onClick={() => { setStartDate(new Date()); setEndDate(new Date()); }}
                        className="px-8 py-4 bg-slate-50 border border-slate-200 text-slate-400 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={14} />
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}