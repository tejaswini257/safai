"use client";

import { Network, ChevronDown, Activity, Info } from "lucide-react";

const locations = [
    "Nagpur Urban",
    "Dharampeth Zone",
    "Nehru Nagar Zone",
    "Dhantoli",
];

export default function ParentMapping() {
    return (
        /* Container: Uses #E6F7F9 (primary-light) for background and 
          #D1F0F2 for border to separate from the main page.
        */
        <div className="rounded-[32px] bg-[#E6F7F9] border border-[#D1F0F2] p-7 shadow-sm transition-all">

            {/* Header with Branded Teal/Cyan Theme */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-white">
                        <Network size={20} className="text-[#58BECF]" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                        <h2 className="text-[12px] font-black text-[#007C85] uppercase tracking-widest leading-none">
                            Relational Mapping
                        </h2>
                        <p className="text-[9px] font-bold text-[#2D8E97] uppercase tracking-widest mt-1.5 opacity-70">
                            Define Structural Logic
                        </p>
                    </div>
                </div>

                {/* Live Status Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/50 rounded-full border border-white/50">
                    <Activity size={10} className="text-[#28C76F] animate-pulse" />
                    <span className="text-[8px] font-black text-[#007C85] uppercase tracking-tighter">Live Config</span>
                </div>
            </div>

            {/* Mapping Selectors - Encapsulated in White Cards for visual depth */}
            <div className="space-y-3">
                {locations.map((loc) => (
                    <div key={loc} className="group p-4 bg-white rounded-2xl border border-white shadow-sm hover:border-[#58BECF]/30 transition-all">
                        <div className="flex justify-between items-center mb-2.5">
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] ml-0.5 group-focus-within:text-[#58BECF] transition-colors">
                                Parent for <span className="text-slate-600 font-extrabold">{loc}</span>
                            </label>
                            <Info size={12} className="text-slate-200 group-hover:text-[#58BECF] transition-colors" />
                        </div>

                        <div className="relative">
                            <select
                                defaultValue="Nagpur Urban"
                                className="w-full appearance-none rounded-xl border border-slate-100 bg-[#F8FAFB] px-4 py-3 text-[11px] font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-cyan-50 focus:border-[#58BECF] cursor-pointer"
                            >
                                <option value="No Parent">Root Level (No Parent)</option>
                                <option value="Nagpur Urban">Nagpur Urban</option>
                                <option value="Dharampeth Zone">Dharampeth Zone</option>
                                <option value="Nehru Nagar Zone">Nehru Nagar Zone</option>
                            </select>

                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-[#58BECF] transition-colors">
                                <ChevronDown size={14} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Branded System Footer */}
            <div className="mt-8 flex flex-col items-center gap-2">
                <div className="h-px w-12 bg-[#D1F0F2]" />
                <p className="text-[8px] font-black text-[#2D8E97] uppercase tracking-[0.4em] opacity-40">
                    Architecture Synchronized
                </p>
            </div>
        </div>
    );
}