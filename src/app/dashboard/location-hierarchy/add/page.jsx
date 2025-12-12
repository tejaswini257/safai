"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_LOCATIONS = [
  { id: 114, name: "Nagpur Urban", parent: "—" },
  { id: 115, name: "Dharampeth Zone", parent: "Nagpur Urban" },
  { id: 118, name: "Nehru Nagar Zone", parent: "Nagpur Urban" },
  { id: 126, name: "Dhantoli", parent: "Nagpur Urban" },
  { id: 127, name: "Sadar Zone", parent: "Nagpur Urban" },
  { id: 130, name: "Nagpur East", parent: "Nagpur Urban" },
  { id: 131, name: "Manish Nagar Zone", parent: "Nagpur Urban" },
  { id: 132, name: "Shanti Nagar", parent: "Nagpur Urban" },
  { id: 133, name: "Nagpur Ruaral", parent: "Nagpur Urban" },
  { id: 134, name: "Mangalwari Zone", parent: "Nagpur Urban" },
  { id: 135, name: "Itwari", parent: "Nagpur Urban" },
  { id: 136, name: "Jaripatka", parent: "Nagpur Urban" },
  { id: 137, name: "Ajni", parent: "Nagpur Urban" },
  { id: 138, name: "Manish Nagar", parent: "Nagpur Urban" },
];

export default function AddLocation() {
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("No Parent (Top Level)");
  const [saving, setSaving] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("safai_locations");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          setLocations(parsed);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const parentOptions = useMemo(() => ["No Parent (Top Level)", ...locations.map((l) => l.name)], [locations]);

  const tree = useMemo(() => {
    const childrenMap = new Map();
    locations.forEach((loc) => {
      const key = loc.parent || "—";
      if (!childrenMap.has(key)) childrenMap.set(key, []);
      childrenMap.get(key).push(loc);
    });
    const roots = childrenMap.get("—") || [];
    return { roots, childrenMap };
  }, [locations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      const newLocation = {
        id: Date.now(),
        name: name || "(unnamed)",
        parent: parent === "No Parent (Top Level)" ? "—" : parent,
      };
      const next = [...locations, newLocation];
      setLocations(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("safai_locations", JSON.stringify(next));
      }
      alert(`Location added: ${newLocation.name} under ${newLocation.parent === "—" ? "No Parent" : newLocation.parent}`);
      setSaving(false);
      setName("");
      setParent("No Parent (Top Level)");
    }, 400);
  };

  const renderChildren = (parentName, indent = 0) => {
    const list = tree.childrenMap.get(parentName) || [];
    return list.map((loc) => (
      <div key={loc.id} className="flex items-center gap-2 text-sm text-slate-800" style={{ marginLeft: indent }}>
        <span className="font-medium">{loc.name}</span>
        <span className="text-xs text-slate-500">[ID: {loc.id}]</span>
        {renderChildren(loc.name, indent + 16)}
      </div>
    ));
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Create New Location Hierarchy</h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800">Hierarchy Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Ward, Floor, Platform"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-800">Parent Hierarchy (optional)</label>
            <select
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {parentOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <p className="text-xs text-slate-500">Select a parent to create a hierarchy</p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow hover:from-sky-700 hover:to-blue-800 disabled:opacity-60"
          >
            {saving ? "Creating..." : "Create Location Hierarchy"}
          </button>
        </form>

        <div className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">Current Hierarchy (View Only)</h2>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            {tree.roots.length === 0 ? (
              <p className="text-sm text-slate-500">No locations yet.</p>
            ) : (
              tree.roots.map((root) => (
                <div key={root.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    {root.name} <span className="text-xs text-slate-500">[ID: {root.id}]</span>
                  </div>
                  <div className="space-y-1">{renderChildren(root.name, 16)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div>
        <Link href="/dashboard/location-hierarchy" className="text-blue-600 text-sm hover:underline">
          Back to list
        </Link>
      </div>
    </div>
  );
}

