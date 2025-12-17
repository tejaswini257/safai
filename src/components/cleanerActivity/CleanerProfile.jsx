"use client";

import { ArrowLeft, Mail, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";

const MOCK_CLEANER = {
  name: "Nikhil Tupkar",
  email: "nikhil@gmail.com",
  phone: "+91 82177 77777",
  totalReviews: 4,
  completed: 3,
  ongoing: 1,
  todaysTasks: 0,
  assignedLocations: [
    {
      id: 1,
      name: "Zanda Chowk, Dharampeth",
      address: "Aggarwal ES, near Zanda Chowk, Gopalpeth, Nagpur, Maharashtra 440009",
      status: "Assigned",
    },
  ],
};

const MOCK_TIMELINE = [
  {
    id: 1,
    title: "Shankar Nagar",
    status: "ongoing",
    tasks: [
      "Clean toilet inner timeline",
      "Clean washroom walls and surrounding area properly",
      "Check tablet and hand soap proximity",
      "Check ventilation and fittings; ensure no breakage",
      "Report any issue immediately",
    ],
    score: null,
    time: "Nov 19, 2025, 02:33 PM",
  },
  {
    id: 2,
    title: "#1 - Shankar Nagar Chowk",
    status: "ongoing",
    tasks: ["Toilet Bowl and Seat Cleaned", "Dustbins emptied"],
    score: "5.03/10",
    time: "Nov 19, 2025, 01:33 PM",
  },
  {
    id: 3,
    title: "Shankar Nagar Chowk",
    status: "completed",
    tasks: ["Toilet Bowl and Seat Cleaned", "Urinal Flushed and Wiped"],
    score: "5.37/10",
    time: "Nov 19, 2025, 01:23 PM",
  },
  {
    id: 4,
    title: "#3 - Shankar Nagar Chowk",
    status: "completed",
    tasks: ["Toilet Bowl and Seat Cleaned", "Urinal Flushed and Wiped"],
    score: "6.33/10",
    time: "Nov 19, 2025, 07:23 PM",
  },
];

export default function CleanerProfile() {
  const c = MOCK_CLEANER;

  return (
    <div className="space-y-6">
      {/* Header strip */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-[var(--border-subtle)] bg-white">
        <div className="bg-[var(--navy)] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/washrooms/1/cleaners">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">{c.name}</h1>
              <p className="text-xs text-indigo-100">Cleaner Profile & Activity</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 bg-slate-50">
          <StatCard label="Total Reviews" value={c.totalReviews} />
          <StatCard label="Completed" value={c.completed} />
          <StatCard label="Ongoing" value={c.ongoing} tone="amber" />
          <StatCard label="Today's Tasks" value={c.todaysTasks} tone="muted" />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <div className="section-card">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">
              Cleaner information
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">FULL NAME</p>
                <p className="font-semibold text-slate-800">{c.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">{c.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">{c.phone}</span>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">
              Assigned Locations ({c.assignedLocations.length})
            </h2>
            {c.assignedLocations.map((loc) => (
              <div
                key={loc.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-slate-50 p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-800">{loc.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{loc.address}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    assigned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - activity timeline */}
        <div className="section-card">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">
            Activity Timeline
          </h2>
          <div className="space-y-6">
            {MOCK_TIMELINE.map((item, index) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 h-3 w-3 rounded-full ${
                      item.status === "completed"
                        ? "bg-emerald-500"
                        : item.status === "ongoing"
                        ? "bg-amber-400"
                        : "bg-slate-400"
                    }`}
                  />
                  {index < MOCK_TIMELINE.length - 1 && (
                    <span className="mt-1 h-16 w-px bg-slate-200" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>
                    <StatusPill status={item.status} />
                  </div>
                  <div className="text-xs text-slate-500">Tasks:</div>
                  <ul className="mt-1 space-y-1 text-xs text-slate-600">
                    {item.tasks.map((t, i) => (
                      <li key={i} className="flex gap-1">
                        <span>•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      {item.score && (
                        <>
                          <Star className="h-3 w-3 text-emerald-500" />
                          <span className="font-semibold text-emerald-600">
                            Score: {item.score}
                          </span>
                        </>
                      )}
                    </div>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone = "default" }) {
  const toneClasses =
    tone === "amber"
      ? "bg-amber-50 text-amber-700"
      : tone === "muted"
      ? "bg-slate-50 text-slate-500"
      : "bg-emerald-50 text-emerald-700";

  return (
    <div className="rounded-xl bg-white border border-[var(--border-subtle)] px-4 py-3 flex items-center gap-3 shadow-sm">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${toneClasses}`}
      >
        {value}
      </span>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}

function StatusPill({ status }) {
  if (status === "completed") {
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
        completed
      </span>
    );
  }
  if (status === "ongoing") {
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold">
        ongoing
      </span>
    );
  }
  return null;
}


