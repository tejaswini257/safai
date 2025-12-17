"use client";

import LocationSearchMap from "./LocationSearchMap";
import UsageCategory from "./UsageCategory";
import LocationInfoSection from "./LocationInfoSection";
import LocationImagesUpload from "./LocationImagesUpload";

export default function EditWashroomForm() {
  const handleSave = () => {
    // TODO: replace with real save integration
    console.log("Save washroom (demo)");
    alert("Washroom saved (demo). Hook up API integration to persist changes.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--navy)] px-4 py-3 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide">
              Edit Washroom
            </span>
            <span className="text-xs text-indigo-100">
              Update location information, amenities, images, and metadata
            </span>
          </div>
          <button className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/20 transition">
            View in Location
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Facility assignment */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
              <span role="img" aria-label="facility">🏢</span> Facility Company Assignment
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="input-ui" placeholder="No facility company assigned" />
              <select className="input-ui">
                <option>Select Facility Company</option>
              </select>
            </div>
          </div>

          {/* Location hierarchy */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
              <span role="img" aria-label="hierarchy">🗺️</span> Location Hierarchy
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="input-ui" placeholder="Current Live Inspection Area" />
              <select className="input-ui">
                <option>Select Location Type</option>
              </select>
            </div>
          </div>

          {/* Basic info */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
              <span role="img" aria-label="info">ℹ️</span> Basic Information
            </label>
            <input className="input-ui" placeholder="Washroom Name" />
          </div>

          {/* Location coordinates + map */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
              <span role="img" aria-label="coordinates">📍</span> Location Coordinates
            </label>
            <LocationSearchMap />
          </div>

          {/* Usage category */}
          <UsageCategory />

          {/* Address details */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
              <span role="img" aria-label="address">🏠</span> Address Details
            </label>
            <LocationInfoSection />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
              <span role="img" aria-label="images">🖼️</span> Location Images
            </label>
            <LocationImagesUpload />
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-3">
        <button className="px-5 py-2 rounded-xl border border-[var(--border-subtle)] bg-white text-[var(--navy)] font-semibold hover:bg-slate-50 transition">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-xl bg-[var(--navy)] text-white font-semibold shadow-sm hover:bg-slate-800 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

