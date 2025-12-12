"use client";
import { useEffect, useRef } from "react";
import MapView from "./MapView";

/*
 Props:
  - available: array of locations
  - selected: array
  - onChange: function(newSelected)
*/

export default function LocationsPicker({ available, selected, onChange }) {
  const toggle = (loc) => {
    const exists = selected.find((s) => s.id === loc.id);
    if (exists) onChange(selected.filter((s) => s.id !== loc.id));
    else onChange([...selected, loc]);
  };

  const clearAll = () => onChange([]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <div className="max-h-64 overflow-auto border border-slate-100 rounded p-2 space-y-2">
          {available.map((loc) => {
            const checked = !!selected.find((s) => s.id === loc.id);
            return (
              <div key={loc.id} className="flex items-center justify-between p-2 rounded hover:bg-slate-50">
                <div>
                  <div className="text-sm font-medium">{loc.name}</div>
                  <div className="text-[11px] text-slate-500">{loc.ward}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggle(loc)}
                    className={`px-2 py-1 rounded text-xs ${checked ? "bg-emerald-50 text-emerald-700" : "bg-slate-50"}`}
                  >
                    {checked ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-slate-500">{selected.length} selected</div>
          <div className="flex items-center gap-2">
            <button onClick={clearAll} className="text-xs text-indigo-600">Clear</button>
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="h-64 border rounded overflow-hidden">
          <MapView locations={available} selected={selected} onToggle={toggle} />
        </div>
      </div>
    </div>
  );
}
