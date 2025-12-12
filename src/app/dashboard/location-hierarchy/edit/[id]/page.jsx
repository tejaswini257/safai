"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const DEFAULT_LOCATIONS = [
  { id: 114, name: "Nagpur Urban", parent: "—" },
  { id: 115, name: "Dharampeth Zone", parent: "Nagpur Urban" },
  { id: 118, name: "Nehru Nagar Zone", parent: "Nagpur Urban" },
  { id: 126, name: "Dhantoli", parent: "Nagpur Urban" },
  { id: 127, name: "Sadar Zone", parent: "Nagpur Urban" },
  { id: 130, name: "Mangalwari Zone", parent: "Nagpur Urban" },
  { id: 131, name: "Hanuman Nagar Zone", parent: "Nagpur Urban" },
  { id: 132, name: "Laxmi Nagar Zone", parent: "Nagpur Urban" },
  { id: 133, name: "Civil Lines", parent: "Nagpur Urban" },
  { id: 134, name: "Trimurti Nagar", parent: "Nagpur Urban" },
  { id: 135, name: "Itwari", parent: "Nagpur Urban" },
  { id: 136, name: "Jaripatka", parent: "Nagpur Urban" },
  { id: 137, name: "Ajni", parent: "Nagpur Urban" },
  { id: 138, name: "Manish Nagar", parent: "Nagpur Urban" },
];

export default function EditLocationPage() {
  const params = useParams();
  const idParam = params?.id;
  const idNum = idParam ? Number(idParam) : NaN;
  const router = useRouter();

  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const current = useMemo(() => locations.find((l) => l.id === idNum), [locations, idNum]);
  const [name, setName] = useState(current?.name || "");
  const [parent, setParent] = useState(current?.parent || "No Parent (Top Level)");
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

  // sync state when locations hydrate
  useEffect(() => {
    const next = locations.find((l) => l.id === idNum);
    if (next) {
      setName(next.name);
      setParent(next.parent === "—" ? "No Parent (Top Level)" : next.parent);
    }
  }, [locations, idNum]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!current) return;
    setSaving(true);
    setTimeout(() => {
      const updatedParent = parent === "No Parent (Top Level)" ? "—" : parent;
      const next = locations.map((l) => (l.id === current.id ? { ...l, name, parent: updatedParent } : l));
      setLocations(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("safai_locations", JSON.stringify(next));
      }
      alert(`Saved: ${name} (Parent: ${updatedParent === "—" ? "No Parent" : updatedParent})`);
      setSaving(false);
      router.push("/dashboard/location-hierarchy");
    }, 400);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-blue-700">
          <FiArrowLeft />
          <Link href="/dashboard/location-hierarchy" className="text-sm font-semibold hover:underline">
            Back to list
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Location Type</h1>
          <p className="text-sm text-slate-600">Update location type information</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {!current ? (
          <p className="text-sm text-red-600">Location not found.</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-800">Type Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-800">Parent Type (optional)</label>
              <select
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>No Parent (Top Level)</option>
                {locations
                  .filter((l) => l.id !== current.id)
                  .map((loc) => (
                    <option key={loc.id}>{loc.name}</option>
                  ))}
              </select>
              <p className="text-xs text-slate-500">Select a parent type to create a hierarchy</p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard/location-hierarchy"
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow hover:from-sky-700 hover:to-blue-800 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

