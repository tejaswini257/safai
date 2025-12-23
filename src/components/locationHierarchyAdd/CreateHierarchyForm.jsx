"use client";

import { useRouter } from "next/navigation";
import { FolderPlus, X, Check, Info, Layers, ChevronDown } from "lucide-react";

export default function CreateHierarchyForm() {
    const router = useRouter();

    return (
        /* UI UPDATE: Removed max-width and internal header to let the 
           page-level container handle the card structure. 
        */
        <div className="p-8 space-y-8">

            {/* Form Title Section */}
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#E6F7F9] flex items-center justify-center border border-[#D1F0F2]">
                        <Layers size={20} className="text-[#58BECF]" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                        <h2 className="text-[12px] font-black text-[#007C85] uppercase tracking-widest leading-none">
                            Type Configuration
                        </h2>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                            Define a new zone classification
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Zone Type Name */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007C85] ml-1">
                        Zone Type Name *
                    </label>
                    <div className="relative group">
                        <input
                            placeholder="e.g., Ward, Floor, Platform"
                            className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFB] px-5 py-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50/50 focus:border-[#58BECF] transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* Parent Type */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007C85] ml-1">
                        Parent Type (Optional)
                    </label>
                    <div className="relative group">
                        <select
                            defaultValue="No Parent"
                            className="w-full appearance-none rounded-2xl border border-slate-200 bg-[#F8FAFB] px-5 py-4 text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-cyan-50/50 focus:border-[#58BECF] cursor-pointer"
                        >
                            <option>No Parent (Top Level)</option>
                            <option>Nagpur Urban</option>
                            <option>Dharampeth Zone</option>
                            <option>Nehru Nagar Zone</option>
                        </select>
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#58BECF] transition-colors">
                            <ChevronDown size={20} strokeWidth={3} />
                        </div>
                    </div>

                    {/* Branded Info Box */}
                    <div className="flex items-center gap-3 mt-3 px-4 py-3 bg-[#F0FAFB] rounded-xl border border-[#D1F0F2]/50">
                        <Info size={14} className="text-[#2D8E97]" />
                        <p className="text-[9px] font-black text-[#2D8E97] uppercase tracking-widest opacity-80">
                            Assigning a parent establishes a functional relationship in the architecture
                        </p>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-slate-50">
                    {/* Discard */}
                    <button
                        onClick={() => router.back()}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all active:scale-95 shadow-sm"
                    >
                        <X size={16} strokeWidth={3} />
                        Discard changes
                    </button>

                    {/* Submit - Branded Gradient */}
                    <button
                        style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
                        className="flex-[1.5] flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:brightness-105 transition-all active:scale-95"
                    >
                        <Check size={16} strokeWidth={3} />
                        Create Zone Details
                    </button>
                </div>
            </div>
        </div>
    );
}