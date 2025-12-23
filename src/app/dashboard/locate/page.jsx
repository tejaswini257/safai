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
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F8FAFB]">

      {/* BRANDED HEADER */}
      <div className="px-8 py-6 bg-white border-b border-slate-100 shadow-sm relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/locationHierarchy"
              className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </Link>
            <div>
              <h1 className="text-xl font-black text-[#007C85] uppercase tracking-tight flex items-center gap-2">
                <MapPin className="text-[#58BECF]" size={20} strokeWidth={3} />
                Locate on Map
              </h1>
              {zoneIdFilter && (
                <p className="text-[10px] font-bold text-[#2D8E97] uppercase tracking-widest mt-1 flex items-center gap-1.5">
                  <Info size={12} />
                  Viewing Zone ID: {zoneIdFilter}
                </p>
              )}
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-[#58BECF] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search specific washrooms in this view..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#F8FAFB] border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-[#58BECF]/10 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* MAP VIEW */}
      <div className="relative flex-1">
        <SaafAIMap
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
          searchText={searchText}
          zoneIdFilter={zoneIdFilter} // Pass the zone filter to the map logic
        />
      </div>
    </div>
  );
}

// Suspense is required for any page using useSearchParams in Next.js Client Components
export default function LocatePage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFB]">
        <div className="h-12 w-12 border-4 border-[#E6F7F9] border-t-[#007C85] rounded-full animate-spin mb-4" />
        <p className="font-black text-[#007C85] uppercase tracking-[0.3em] text-xs">
          Initializing Geospatial Data...
        </p>
      </div>
    }>
      <MapContent />
    </Suspense>
  );
}