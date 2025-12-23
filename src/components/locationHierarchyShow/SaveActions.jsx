"use client";

import { useRouter } from "next/navigation";
import { Save, Edit3, CheckCircle2, ShieldCheck } from "lucide-react";

const locations = [
    { id: "114", name: "Nagpur Urban" },
    { id: "118", name: "Dharampeth Zone" },
    { id: "119", name: "Nehru Nagar Zone" },
];

export default function SaveActions() {
    const router = useRouter();

    return (
        <div className="rounded-[32px] bg-[#E6F7F9] border border-[#D1F0F2] p-7 shadow-sm">

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <Save size={20} className="text-[#58BECF]" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                        <h2 className="text-[12px] font-black text-[#007C85] uppercase tracking-widest leading-none">
                            Save Hierarchy
                        </h2>
                        <p className="text-[9px] font-bold text-[#2D8E97] uppercase tracking-widest mt-1.5 opacity-70">
                            Commit structural updates
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {locations.map((loc) => (
                    <div key={loc.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm group">
                        <div className="text-left">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1.5 group-hover:text-[#58BECF] transition-colors">
                                Zone ID: #{loc.id}
                            </p>
                            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                {loc.name}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.push(`/dashboard/locationHierarchy/edit/${loc.id}`)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-100 bg-[#F8FAFB] text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#58BECF] hover:bg-[#E6F7F9] transition-all"
                            >
                                <Edit3 size={12} strokeWidth={2.5} />
                                Edit
                            </button>

                            {/* USING YOUR .btn-gradient CLASS FROM CSS */}
                            <button className="btn-gradient flex items-center gap-1.5 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md active:scale-95">
                                <CheckCircle2 size={12} strokeWidth={2.5} />
                                Save
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}