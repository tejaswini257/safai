"use client";

import { Search, Plus, Filter, SlidersHorizontal } from "lucide-react";

export default function LocationSearch({ onSearch }) {
    return (
        <div className="w-full flex flex-col md:flex-row items-center gap-4 mb-2">

            {/* 1. Responsive Search Input */}
            <div className="relative w-full md:flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search
                        size={18}
                        className="text-slate-400 group-focus-within:text-[#58BECF] transition-colors"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Search zones, IDs, or parent types..."
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-[#58BECF]/10 focus:border-[#58BECF] transition-all shadow-sm"
                />
            </div>

            {/* 2. Responsive Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">

                {/* Filter Button - Icon only on small screens to save space */}
                <button
                    title="Advanced Filters"
                    className="flex items-center justify-center gap-2 px-4 md:px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[#007C85] text-[10px] font-black uppercase tracking-widest hover:bg-[#F8FAFB] transition-all shadow-sm active:scale-95"
                >
                    <SlidersHorizontal size={14} strokeWidth={3} />
                    <span className="hidden sm:inline">Filters</span>
                </button>

                {/* Primary Action - Uses your .btn-gradient from globals.css */}
                <button
                    className="btn-gradient flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                >
                    <Plus size={16} strokeWidth={3} />
                    <span>Add New Zone</span>
                </button>
            </div>
        </div>
    );
}