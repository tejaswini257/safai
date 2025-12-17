"use client";

import Link from "next/link";
import { CheckCircle2, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { MOCK_USERS } from "../../data/mockAssignments";

export default function MapCleanersForm({ washroomName = "Abhyankar Nagar Garden" }) {
  const cleaners = useMemo(
    () => MOCK_USERS.filter((u) => u.role === "cleaner"),
    []
  );
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleCleaner = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedIds.length;

  const handleCreate = () => {
    if (!selectedCount) {
      alert("Select at least one cleaner.");
      return;
    }
    alert(`Created ${selectedCount} cleaner assignments (demo).`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header card */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-white shadow-sm overflow-hidden">
        <div className="bg-[var(--navy)] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Map Cleaners</h1>
              <p className="text-xs text-indigo-100">{washroomName}</p>
            </div>
          </div>
          <Link href="/dashboard/washrooms/1/cleaners">
            <button className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-xs font-semibold hover:bg-white/20">
              Back to Cleaners
            </button>
          </Link>
        </div>

        {/* Info banner */}
        <div className="bg-slate-800 text-slate-100 px-6 py-3 text-sm">
          <span className="font-semibold">2 cleaner(s) already assigned</span>{" "}
          <span className="text-slate-300">
            Only showing cleaners who haven&apos;t been assigned to this location yet.
          </span>
        </div>

        {/* Selection card */}
        <div className="p-6 space-y-4">
          <div className="text-sm font-semibold text-slate-800">
            Select Cleaners ({selectedCount} selected)
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-50 p-4 space-y-4">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-white">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-slate-600"
              >
                <span>Click to select cleaners...</span>
                <span className="text-xs text-slate-400">
                  {cleaners.length} cleaner(s) available to assign
                </span>
              </button>

              <div className="max-h-56 overflow-auto divide-y divide-slate-100">
                {cleaners.map((c) => {
                  const selected = selectedIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCleaner(c.id)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm transition ${
                        selected ? "bg-emerald-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-800">{c.name}</div>
                        <div className="text-[11px] text-slate-500">{c.email}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selected
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {selected ? "Selected" : "Select"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border-subtle)] bg-white p-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-500" />
                <div>
                  <div className="text-xs text-slate-500">Assigning to Location:</div>
                  <div className="text-sm font-semibold text-slate-800">
                    {washroomName}
                  </div>
                  <div className="text-xs text-emerald-600">
                    Status will be set to: <span className="font-semibold">Assigned</span>
                  </div>
                </div>
              </div>
              <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                Assigned
              </span>
            </div>
          </div>

          {/* Create assignments button */}
          <button
            type="button"
            onClick={handleCreate}
            className="w-full px-6 py-3 rounded-xl bg-[var(--navy)] text-white font-semibold shadow-md hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <Users className="h-4 w-4" />
            {`Create ${selectedCount || 0} Assignments`}
          </button>
        </div>
      </div>
    </div>
  );
}


