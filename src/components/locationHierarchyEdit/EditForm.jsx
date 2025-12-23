"use client";

import { Save, X, ChevronDown, Info } from "lucide-react";

export default function EditForm() {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden relative">
            {/* Subtle Brand Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#58BECF] to-[#6D9CDC]" />

            <div className="p-8 space-y-8">
                {/* Form Field: Type Name */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007C85] ml-1">
                        Zone Type Name *
                    </label>
                    <input
                        defaultValue="Nagpur Urban"
                        className="w-full rounded-2xl border border-slate-200 px-5 py-4 bg-[#F8FAFB] text-slate-700 placeholder:text-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50/50 focus:border-[#58BECF] transition-all font-bold text-sm shadow-inner"
                    />
                </div>

                {/* Form Field: Parent Type */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007C85] ml-1">
                        Parent Type (Optional)
                    </label>
                    <div className="relative group">
                        <select className="w-full appearance-none rounded-2xl border border-slate-200 bg-[#F8FAFB] px-5 py-4 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-cyan-50/50 focus:border-[#58BECF] transition-all cursor-pointer">
                            <option>No Parent (Top Level)</option>
                            <option>Nagpur Urban</option>
                        </select>
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#58BECF] transition-colors">
                            <ChevronDown size={20} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="flex justify-end items-center gap-4 pt-8 mt-4 border-t border-slate-50">
                    <button
                        type="button"
                        className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#EA5455] hover:border-rose-100 hover:bg-rose-50 transition-all shadow-sm active:scale-95"
                    >
                        <X size={14} className="inline mr-2" strokeWidth={3} />
                        Discard changes
                    </button>

                    <button
                        type="submit"
                        style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
                        className="px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-cyan-500/20 hover:brightness-105 hover:shadow-cyan-500/40 transition-all active:scale-95"
                    >
                        <Save size={14} className="inline mr-2" strokeWidth={3} />
                        Update Zone Details
                    </button>
                </div>
            </div>
        </div>
    );
}