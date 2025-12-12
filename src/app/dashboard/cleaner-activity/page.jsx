"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMapPin, FiClock, FiFilter } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

export default function CleanerActivityPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    date: "",
    cleaner: "",
    location: "",
    status: "",
  });

  const tasks = [
    {
      id: 1,
      cleaner: "Anil Saafai User",
      location: "Ramnagar Chowk, Nagpur",
      status: "completed",
      score: 9.7,
      duration: "4m",
      start: "12:11 PM",
      end: "12:16 PM",
      images: ["/img1.jpg", "/img2.jpg"],
    },
    {
      id: 2,
      cleaner: "Chitrali Hiwale",
      location: "Kachipura Chowk, Nagpur",
      status: "ongoing",
      score: 7.5,
      duration: "18m",
      start: "12:06 PM",
      end: null,
      images: ["/img3.jpg"],
    },
    {
      id: 3,
      cleaner: "No Photo Cleaner",
      location: "Mahal Road, Nagpur",
      status: "delayed",
      score: 4.2,
      duration: "1m",
      start: "11:50 AM",
      end: null,
      images: [],
    },
    {
      id: 4,
      cleaner: "Rajesh Sahani",
      location: "Narendra Square, Nagpur",
      status: "ongoing",
      score: 8.1,
      duration: "1h 5m",
      start: "3:44 PM",
      end: null,
      images: ["/img4.jpg", "/img5.jpg"],
    },
    {
      id: 5,
      cleaner: "Pooja Gaikwad",
      location: "Sitabuldi Market, Nagpur",
      status: "completed",
      score: 9.2,
      duration: "12m",
      start: "2:10 PM",
      end: "2:22 PM",
      images: ["/img6.jpg"],
    },
    {
      id: 6,
      cleaner: "Amit Deshmukh",
      location: "Ambazari Lake, Nagpur",
      status: "delayed",
      score: 5.1,
      duration: "35m",
      start: "1:30 PM",
      end: null,
      images: [],
    },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (activeTab !== "all" && t.status !== activeTab) return false;
    if (filters.cleaner && t.cleaner !== filters.cleaner) return false;
    if (filters.location && t.location !== filters.location) return false;
    if (filters.status && t.status !== filters.status) return false;
    return true;
  });

  const resetFilters = () => {
    setFilters({ date: "", cleaner: "", location: "", status: "" });
    setActiveTab("all");
  };

  return (
    <div className="p-6 space-y-6">
      {/* --- PAGE TITLE --- */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Operations</p>
          <h1 className="text-2xl font-bold text-slate-900">Cleaner Activity</h1>
          <p className="text-sm text-slate-600">Live view of cleaner progress and evidence</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
            Updated just now
          </span>
        </div>
      </div>

      {/* --- SUMMARY BAR --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryCard title="Total Tasks" value="120" />
        <SummaryCard title="Completed" value="85" />
        <SummaryCard title="Ongoing" value="20" />
        <SummaryCard title="Delayed" value="5" />
        <SummaryCard title="Avg Score" value="7.8" />
        <SummaryCard title="Cleaners Working" value="42" />
      </div>

      {/* --- FILTERS --- */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <input
            type="date"
            className="border px-3 py-1 rounded-md"
            value={filters.date}
            onChange={(e) => setFilters((f) => ({ ...f, date: e.target.value }))}
          />
        </div>

        <select
          className="border px-3 py-1 rounded-md"
          value={filters.cleaner}
          onChange={(e) => setFilters((f) => ({ ...f, cleaner: e.target.value }))}
        >
          <option value="">All Cleaners</option>
          {Array.from(new Set(tasks.map((t) => t.cleaner))).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>

        <select
          className="border px-3 py-1 rounded-md"
          value={filters.location}
          onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
        >
          <option value="">All Locations</option>
          {Array.from(new Set(tasks.map((t) => t.location))).map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>

        <select
          className="border px-3 py-1 rounded-md"
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="">Status</option>
          <option value="completed">Completed</option>
          <option value="ongoing">Ongoing</option>
          <option value="delayed">Delayed</option>
        </select>

        <button
          className="ml-auto rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-3">
        {["all", "ongoing", "completed", "delayed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full capitalize text-sm font-semibold shadow-sm ${
              activeTab === tab
                ? "bg-gradient-to-r from-sky-600 to-blue-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <CleanerCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

/* SUMMARY CARD COMPONENT */
function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

/* CLEANER TASK CARD — image-free placeholder */
function CleanerCard({ task }) {
  const imageCount = (task.images || []).length;

  return (
    <article className="bg-white p-5 rounded-xl shadow ring-1 ring-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold text-lg text-slate-900">{task.cleaner}</h3>
          <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
            <FiMapPin className="text-slate-400" /> {task.location}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Score: <span className="text-blue-700">{task.score ?? "-"}/10</span>
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Duration: {task.duration}
            </span>
          </div>
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold capitalize ${
            task.status === "completed"
              ? "bg-emerald-100 text-emerald-800"
              : task.status === "ongoing"
              ? "bg-amber-100 text-amber-800"
              : "bg-rose-100 text-rose-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-sm text-slate-600 mt-3 flex items-center gap-2">
        <FiClock className="text-slate-400" />
        {task.start} — {task.end || "In Progress"} ({task.duration})
      </p>

      {/* IMAGE PLACEHOLDER + COUNT */}
      <div className="flex items-center gap-4 mt-4">
        <div className="w-16 h-16 rounded-lg bg-slate-100 border flex items-center justify-center text-slate-500">
          {/* inline svg icon */}
          <svg width="28" height="20" viewBox="0 0 24 24" className="opacity-80">
            <path
              fill="currentColor"
              d="M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Zm-2 3.5-3 4-2-2.667L11 18h-2l-2-4-3 4V7h14z"
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">
                {imageCount > 0 ? `${imageCount} photo${imageCount > 1 ? "s" : ""}` : "No photos"}
              </div>
              <div className="text-xs text-gray-500">images / evidence</div>
            </div>

            <div className="text-sm text-slate-600">
              Quality:{" "}
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-700">
                <MdVerified /> {task.score ?? "-"}/10
              </span>
            </div>
          </div>

          {/* quick anomaly badges */}
          <div className="flex gap-2 mt-3">
            {task.duration && parseDuration(task.duration) < 2 && (
              <span className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-full">Too Fast</span>
            )}
            {task.score !== undefined && task.score < 5 && (
              <span className="text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded-full">Low Score</span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-4">
        <Link
          href={`/dashboard/cleaner-activity/${task.id}`}
          className="rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white text-center shadow hover:from-sky-700 hover:to-blue-800"
        >
          View Document
        </Link>
        <button
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm flex gap-2 items-center hover:bg-slate-50"
          onClick={() => alert(`Opening map for ${task.location}`)}
        >
          <FiMapPin /> Map
        </button>
        <button
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm flex gap-2 items-center hover:bg-slate-50"
          onClick={() => alert(`Verify task #${task.id}`)}
        >
          <MdVerified /> Verify
        </button>
      </div>
    </article>
  );
}

/* small helper to parse "4m" => minutes (number) */
function parseDuration(dur) {
  if (!dur) return 9999;
  const m = dur.match(/(\d+)\s*m/);
  if (m) return parseInt(m[1], 10);
  return 9999;
}
