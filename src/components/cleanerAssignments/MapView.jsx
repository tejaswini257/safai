// src/components/cleanerAssignments/MapView.jsx
"use client";
import { useEffect, useRef } from "react";

export default function MapView({ locations = [], selected = [], onToggle }) {
  const ref = useRef();

  useEffect(() => {
    // minimal placeholder: do nothing heavy here
    if (!ref.current) return;
    // Optionally show simple markers using DOM for now, or leave blank.
  }, [locations, selected]);

  return (
    <div
      ref={ref}
      className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-400 text-sm"
    >
      Map placeholder
    </div>
  );
}
