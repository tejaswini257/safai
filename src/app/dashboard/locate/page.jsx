"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SaafAIMap from "@/components/map/SaafAIMap";
import { Search, MapPin, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

function MapContent() {
  const searchParams = useSearchParams();
  const zoneIdFilter = searchParams.get("zoneId"); // Capture the Zone ID from the URL

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB] dark:bg-slate-900">
      {/* BRANDED HEADER */}
      <div className="px-8 py-6 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/locationHierarchy"
              className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-slate-400 transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </Link>
            <div>
              <h1 className="text-xl font-black text-[#007C85] dark:text-[#58BECF] uppercase tracking-tight flex items-center gap-2">
                <MapPin className="text-[#58BECF]" size={20} strokeWidth={3} />
                Locate on Map
              </h1>
              {zoneIdFilter && (
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-300 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                  <Info size={12} />
                  Viewing Zone ID: {zoneIdFilter}
                </p>
              )}
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search specific washrooms in this view..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl text-sm font-medium text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* MAP VIEW */}
      <div className="flex-1 bg-white dark:bg-slate-900">
        <SaafAIMap
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
          searchText={searchText}
          zoneIdFilter={zoneIdFilter}
        />
      </div>
    </div>
  );
}

// Suspense is required for any page using useSearchParams in Next.js Client Components
export default function LocatePage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <div className="h-12 w-12 border-4 border-blue-100 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="font-black text-blue-700 dark:text-blue-400 uppercase tracking-[0.3em] text-xs">
          Initializing Geospatial Data...
        </p>
      </div>
    }>
      <MapContent />
    </Suspense>
  );
}