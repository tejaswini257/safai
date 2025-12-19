"use client";

import Link from "next/link";
import { CheckCircle2, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { MOCK_USERS } from "../../data/mockAssignments";

const MOCK_HISTORY = [
  {
    id: 1,
    date: "Mar 05, 2025 - 10:30 AM",
    title: "Supervisor Jane Doe assigned.",
    detail: "Assigned by Admin User 1. Status set to Active.",
  },
  {
    id: 2,
    date: "Feb 15, 2025 - 03:15 PM",
    title: "Supervisor John Smith unassigned.",
    detail: "Unassigned due transfer. Status set to Inactive.",
  },
  {
    id: 3,
    date: "Jan 01, 2025 - 09:00 PM",
    title: "Location created and setup",
    detail: "Initial assignment mapping completed.",
  },
];

export default function MapSupervisorsForm({ washroomName = "Abhyankar Nagar Garden" }) {
  const supervisors = useMemo(
    () => MOCK_USERS.filter((u) => u.role === "supervisor"),
    []
  );
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSupervisor = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedIds.length;

  const handleCreate = () => {
    if (!selectedCount) {
      alert("Select at least one supervisor.");
      return;
    }
    alert(`Created ${selectedCount} supervisor assignments (demo).`);
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
              <h1 className="text-xl font-semibold">Map Supervisors</h1>
              <p className="text-xs text-indigo-100">{washroomName}</p>
            </div>
          </div>
          <Link href="/dashboard/washrooms/1/supervisors">
            <button className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-xs font-semibold hover:bg-white/20">
              Back to Supervisors
            </button>
          </Link>
        </div>

        {/* Selection card */}
        <div className="p-6 space-y-4">
          <div className="text-sm font-semibold text-slate-800">
            Select Supervisors ({selectedCount} selected)
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-50 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-green-700 font-semibold">
                {selectedCount
                  ? `${selectedCount} Supervisor${selectedCount > 1 ? "s" : ""} Selected`
                  : "No supervisors selected"}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Click to select and assign supervisors to this location.
            </p>

            <div className="rounded-lg border border-[var(--border-subtle)] bg-white">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  <div>
                    <div className="font-semibold text-[var(--navy)]">
                      Assigning to Location:
                    </div>
                    <div className="text-sm text-slate-700">{washroomName}</div>
                  </div>
                </div>
                <span className="px-4 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
                  STATUS: PENDING
                </span>
              </div>

              <div className="max-h-60 overflow-auto divide-y divide-slate-100">
                {supervisors.map((s) => {
                  const selected = selectedIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSupervisor(s.id)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm transition ${
                        selected ? "bg-emerald-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-800">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.email}</div>
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
          </div>

          {/* Create assignments button */}
          <button
            type="button"
            onClick={handleCreate}
            className="w-full px-6 py-3 rounded-xl bg-[var(--navy)] text-white font-semibold shadow-md hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <Users className="h-4 w-4" />
            {`Create ${selectedCount || 0} Assignment${selectedCount === 1 ? "" : "s"}`}
          </button>
        </div>
      </div>

      {/* Assignment history */}
      <div className="bg-white rounded-2xl border border-[var(--border-subtle)] shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[var(--navy)] mb-4">
          Assignment History
        </h2>
        <div className="space-y-6">
          {MOCK_HISTORY.map((item, index) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="h-3 w-3 rounded-full bg-emerald-500 mt-1" />
                {index < MOCK_HISTORY.length - 1 && (
                  <span className="mt-1 h-12 w-px bg-slate-200" />
                )}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  {item.date}
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {item.title}
                </div>
                <div className="text-xs text-slate-500">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


