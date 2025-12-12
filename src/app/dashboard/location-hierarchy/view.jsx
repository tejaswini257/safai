"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const LOCATIONS = [
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

export default function ViewLocation() {
  const params = useSearchParams();
  const idParam = params.get("id");
  const idNum = idParam ? Number(idParam) : NaN;
  const current = useMemo(() => LOCATIONS.find((l) => l.id === idNum), [idNum]);

  const [name, setName] = useState(current?.name || "");
  const [parent, setParent] = useState(current?.parent || "");
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      alert(`Saved: ${name} (Parent: ${parent || "No Parent"})`);
      if (typeof window !== "undefined") {
        const raw = window.localStorage.getItem("safai_locations");
        const list = raw ? JSON.parse(raw) : [];
        const next = Array.isArray(list) && list.length
          ? list.map((l) =>
              l.id === current.id
                ? { ...l, name, parent: parent === "No Parent (Top Level)" ? "—" : parent }
                : l
            )
          : LOCATIONS.map((l) =>
              l.id === current.id
                ? { ...l, name, parent: parent === "No Parent (Top Level)" ? "—" : parent }
                : l
            );
        window.localStorage.setItem("safai_locations", JSON.stringify(next));
      }
      setSaving(false);
    }, 500);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-blue-600">
          <FiArrowLeft />
          <Link href="/dashboard/location-hierarchy" className="text-sm font-medium hover:underline">
            Back
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
                value={parent || "No Parent (Top Level)"}
                onChange={(e) => setParent(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option>No Parent (Top Level)</option>
                {LOCATIONS.filter((l) => l.id !== current.id).map((loc) => (
                  <option key={loc.id}>{loc.name}</option>
                ))}
              </select>
              <p className="text-xs text-slate-500">Select a parent type to create a hierarchy</p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard/location-hierarchy"
                className="flex-1 rounded-md border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-60"
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
