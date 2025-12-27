"use client";

import {
  CleanerActivityHeader,
  ActivityFilters,
  ActivityStats,
  ActivityGrid,
} from "@/components/cleanerActivity";
import {
  Send,
  MapPin,
  PlusCircle,
  Info,
  ChevronDown
} from "lucide-react";

export default function CleanerActivityPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--muted))]">

      {/* FIX 1: SITE-WIDE TOP NAVIGATION LAYER 
         This represents your main "Nagpur Municipal Corporation" header. 
         Ensure your Global Header component has 'sticky top-0' and 'z-[100]'
      */}

      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-[1600px] mx-auto space-y-6">

          {/* CLEANER ACTIVITY PAGE HEADER */}
          <div className="relative z-10">
            <CleanerActivityHeader />
          </div>

          {/* FILTERS SECTION */}
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-[var(--radius)] p-4 shadow-sm relative z-20">
            <ActivityFilters />
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: FIXED SIDEBAR 
                FIX 2: We use 'top-28' to ensure it stays below the main navigation bar 
                and 'z-0' so it naturally goes behind the global header on scroll.
            */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-28 z-0">

              {/* STATS CARD (The +2 circular chip is inside here) */}
              <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-[var(--radius)] shadow-md">
                <ActivityStats />
              </div>

              {/* QUICK ACTION LOG (Utilizing empty space) */}
              <div className="bg-white border border-[#cceef2] rounded-[24px] overflow-hidden shadow-md">
                <div className="bg-[#e6f7f9] px-5 py-4 border-b border-[#cceef2] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlusCircle size={16} className="text-[#007b8a]" />
                    <h3 className="text-[11px] font-black text-[#007b8a] uppercase tracking-widest">
                      Quick Action Log
                    </h3>
                  </div>
                  <Info size={14} className="text-[#4a9ba6] opacity-50" />
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter ml-1">Location Node</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-9 py-3 text-[12px] font-bold text-slate-700 outline-none focus:border-[#007b8a] appearance-none cursor-pointer">
                        <option>Select Washroom</option>
                        <option>Public Toilet - Zone 1</option>
                      </select>
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#007b8a]" />
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter ml-1">Activity Note</label>
                    <textarea
                      placeholder="Briefly describe the update..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-700 outline-none focus:border-[#007b8a] min-h-[100px] resize-none"
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#5bc4d4] to-[#6a82e5] hover:opacity-90 text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                    <Send size={14} />
                    Submit Log
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Activity Grid */}
            <div className="lg:col-span-8 xl:col-span-9 relative z-0">
              <ActivityGrid />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}