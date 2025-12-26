import { FileText, Download } from "lucide-react";

export default function ReportHeader() {
    const btnGradient = "bg-gradient-to-r from-[#5bc4d4] to-[#6a82e5] hover:opacity-90 transition-all active:scale-95 shadow-[0_10px_20px_-5px_rgba(106,130,229,0.3)]";

    return (
        <div className="rounded-[20px] bg-[#e6f7f9] border border-[#cceef2] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-white shrink-0">
                    <FileText size={24} className="text-[#007b8a]" strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-black text-[#007b8a] uppercase tracking-tight leading-none">
                        Analytics Reports
                    </h1>
                    <p className="text-[9px] md:text-[10px] font-bold text-[#4a9ba6] uppercase tracking-[0.15em] mt-1.5 opacity-80">
                        Generate and Export System Performance Data
                    </p>
                </div>
            </div>


        </div>
    );
}