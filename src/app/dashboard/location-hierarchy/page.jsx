"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiChevronDown, FiChevronUp, FiPlus, FiLayers, FiArrowLeft } from "react-icons/fi";

const INITIAL_LOCATIONS = [
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

export default function LocationHierarchyPage() {
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [query, setQuery] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, target: null, hasChildren: false });

  // Hydrate from localStorage so edits/adds persist across pages
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("safai_locations");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLocations(parsed);
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  const setAndPersist = (updater) => {
    setLocations((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("safai_locations", JSON.stringify(next));
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.parent.toLowerCase().includes(q) ||
        String(loc.id).includes(q)
    );
  }, [locations, query]);

  const openDelete = (loc) => {
    const hasChildren = locations.some((l) => l.parent === loc.name);
    setDeleteModal({ open: true, target: loc, hasChildren });
  };

  const confirmDelete = () => {
    if (!deleteModal.target) return;
    setAndPersist((prev) => prev.filter((l) => l.id !== deleteModal.target.id));
    setDeleteModal({ open: false, target: null, hasChildren: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Location Hierarchy</h1>
          <p className="text-sm text-slate-600">Company-specific location hierarchy</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm hover:border-blue-200 hover:bg-blue-100 hover:shadow"
            onClick={() => setShowHierarchy((s) => !s)}
          >
            {showHierarchy ? <FiChevronUp /> : <FiChevronDown />} Show Hierarchy
          </button>
          <Link
            href="/dashboard/location-hierarchy/add"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow hover:from-sky-700 hover:to-blue-800"
          >
            <FiPlus /> Add Location Hierarchy
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-xl">
            <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search location hierarchy..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {showHierarchy && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
            <FiLayers /> Hierarchy View
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="font-semibold">Nagpur Urban</div>
            <div className="ml-4 space-y-1">
              <div>- Dharampeth Zone</div>
              <div>- Nehru Nagar Zone</div>
              <div>- Dhantoli</div>
              <div>- Sadar Zone</div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
          All Location Hierarchy
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Parent Type</th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">#{loc.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{loc.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{loc.parent}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/location-hierarchy/edit/${loc.id}`}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 hover:border-blue-300 hover:bg-blue-100"
                      >
                        Edit
                      </Link>
                      <button
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:border-rose-300 hover:bg-rose-100"
                        onClick={() => openDelete(loc)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-slate-500">
                    No locations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Delete Location Type</h3>
              <p className="text-sm text-slate-600">This action cannot be undone</p>
            </div>
            <p className="text-sm text-slate-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">"{deleteModal.target?.name}"</span>?
            </p>
            {deleteModal.hasChildren && (
              <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                This hierarchy has children. Deleting this item will NOT remove child records.
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                onClick={() => setDeleteModal({ open: false, target: null, hasChildren: false })}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-gradient-to-r from-rose-600 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:from-rose-700 hover:to-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
