"use client";

import { useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic"; // 1. Import dynamic for SSR handling
import { Search, MapPin, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

// 2. Dynamically import the Map with SSR disabled
// This prevents "window is not defined" errors common with maps
const SaafAIMap = dynamic(() => import("@/components/map/SaafAIMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50 dark:bg-slate-800">
      <p className="text-xs font-black text-slate-400 animate-pulse uppercase tracking-widest">
        Loading Map Layers...
      </p>
    </div>
  ),
});

function MapContent() {
  const searchParams = useSearchParams();
  const zoneIdFilter = searchParams.get("zoneId");

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFB] dark:bg-slate-900 overflow-hidden">
      {/* BRANDED HEADER */}
      <div className="px-8 py-6 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 shadow-sm z-10">
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
                <p className="text-[10px] font-black text-blue-600 dark:text-blue-300 uppercase tracking-widest mt-1 flex items-center gap-1.5">
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

      {/* MAP VIEW CONTAINER */}
      {/* Added h-full and relative to ensure the map has a defined space to render */}
      <div className="flex-1 relative w-full h-full overflow-hidden">
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