"use client";

import { useState } from "react";
import LocationHeader from "@/components/locationHierarchy/LocationHeader";
import LocationTable from "@/components/locationHierarchy/LocationTable";
import { Search, Plus, SlidersHorizontal } from "lucide-react";

export default function LocationHierarchyPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-[#F8FAFB] pb-12 transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto p-4 md:p-8 flex flex-col gap-6">

                {/* 1. Header Section */}
                <div className="z-20">
                    <LocationHeader />
                </div>

                {/* 2. Control Layer: Responsive Search & Actions */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                    {/* Search Bar - Full width on mobile, fixed width on large screens */}
                    <div className="relative w-full lg:max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search size={18} className="text-slate-400 group-focus-within:text-[#58BECF] transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search zones or locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-[#58BECF]/10 focus:border-[#58BECF] transition-all shadow-sm"
                        />
                    </div>

                    {/* Buttons Container - Stacks on small mobile, row on tablet+ */}
                    <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
                        {/* Filter Button - Responsive text (hidden on very small screens) */}
                        <button className="flex flex-1 lg:flex-none items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[#007C85] text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                            <SlidersHorizontal size={14} strokeWidth={3} />
                            <span className="hidden sm:inline">Filter</span>
                        </button>

                        {/* Add Button - Expands to fill space on mobile */}
                        <button className="btn-gradient flex-[2] lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-cyan-500/20 active:scale-95 transition-all">
                            <Plus size={16} strokeWidth={3} />
                            <span className="whitespace-nowrap">Add New Zone</span>
                        </button>
                    </div>
                </div>

                {/* 3. Main Table Area - Responsive horizontal scroll container */}
                <div className="relative group">
                    {/* Decorative glow hidden on mobile to improve performance */}
                    <div className="hidden lg:block absolute -inset-1 bg-gradient-to-r from-[#58BECF]/10 to-[#6D9CDC]/10 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

                    <div className="relative bg-white rounded-[24px] md:rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-[#58BECF] to-[#6D9CDC] opacity-80" />

                        <div className="p-1 overflow-x-auto">
                            <LocationTable searchTerm={searchQuery} />
                        </div>
                    </div>
                </div>

                {/* 4. System Status Footer - Stacks on mobile */}
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 gap-2 mt-2">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] text-center sm:text-left">
                        Data Integrity Verified
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#007C85] uppercase tracking-widest opacity-60">
                        <span>System Stable</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-[#28C76F]" />
                    </div>
                </div>
            </div>
        </div>
    );
}