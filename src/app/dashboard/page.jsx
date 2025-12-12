"use client";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  ClipboardList,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";

// Reusable card shells for consistent styling
const CardShell = ({ title, subtitle, icon, headerRight, children }) => (
  <div className="card-base">
    <div className="card-header">
      <div className="card-heading">
        {icon}
        <div>
          {subtitle && <p className="eyebrow">{subtitle}</p>}
          <h3 className="heading">{title}</h3>
        </div>
      </div>
      {headerRight}
    </div>
    {children}
  </div>
);

const ChartCard = ({ series }) => (
  <CardShell
    title="Weekly satisfaction score"
    subtitle="Service Quality Trend"
    headerRight={
      <div className="badge badge-soft-emerald gap-1.5">
        <span className="dot dot-emerald" />
        Rising +0.4
      </div>
    }
  >
    <div className="mt-3">
      <div className="relative rounded-[var(--card-radius)] bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 p-[10px] ring-1 ring-slate-100/70">
        <svg viewBox="0 0 240 80" className="h-20 w-full text-indigo-500">
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${sparklinePath(series)} L232,80 L8,80 Z`} fill="url(#area)" />
          <path
            d={sparklinePath(series)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
          <span>Nov</span>
        </div>
      </div>
    </div>
  </CardShell>
);

const HighlightsCard = ({ locations }) => (
  <CardShell
    title="Today&apos;s Top Rated Locations"
    headerRight={
      <button className="link-cta" type="button">
        View All
      </button>
    }
  >
    <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
      {locations.slice(0, 3).map((loc, idx) => {
        const medalColors = [
          { bg: "from-amber-400 to-amber-600", icon: "text-amber-500", border: "border-amber-200" },
          { bg: "from-slate-300 to-slate-500", icon: "text-slate-400", border: "border-slate-200" },
          { bg: "from-orange-400 to-orange-600", icon: "text-orange-500", border: "border-orange-200" },
        ];
        const colors = medalColors[idx];
        const positions = ["1st", "2nd", "3rd"];

        return (
          <div
            key={loc.name}
            className={`group relative overflow-hidden rounded-[var(--card-radius)] border ${colors.border} bg-gradient-to-br ${colors.bg} p-3 shadow-sm transition hover:shadow-md`}
          >
            <div className="flex flex-col">
              <div className="mb-1 flex items-center gap-1.5">
                <Trophy
                  className={`h-4 w-4 ${
                    colors.icon === "text-amber-500"
                      ? "text-amber-600"
                      : colors.icon === "text-slate-400"
                        ? "text-slate-500"
                        : "text-orange-600"
                  }`}
                />
                <span className="text-[10px] font-bold text-white/90">{positions[idx]}</span>
              </div>
              <p className="mb-1 text-xs font-semibold leading-snug text-white line-clamp-2">{loc.name}</p>
              <div className="mt-1 flex items-center gap-0.5">
                <span className="text-sm font-bold text-white">{loc.score.toFixed(1)}</span>
                <span className="text-[10px] text-white/90">★</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {locations.length > 3 && (
      <div className="divide-y divide-slate-100 border-t border-slate-100 pt-3">
        {locations.slice(3).map((loc, idx) => (
          <div key={loc.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
                {idx + 4}
              </span>
              <div>
                <p className="text-xs font-medium text-slate-900 leading-snug">{loc.name}</p>
                <p className="text-[10px] text-slate-500">Today</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-xs font-semibold text-slate-900">{loc.score.toFixed(1)}</span>
              <span className="text-amber-400 text-xs">★</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </CardShell>
);

const ActivityCard = ({ items }) => (
  <CardShell
    title="Today&apos;s Activities"
    icon={
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50">
        <svg
          className="h-4 w-4 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    }
    headerRight={
      <div className="flex items-center gap-1.5">
        <span className="badge badge-soft-emerald">Live feed</span>
        <span className="badge badge-soft-slate hidden sm:inline">Auto-refresh</span>
      </div>
    }
  >
    <div className="mb-3 flex items-center gap-3 text-[11px] text-slate-600">
      <span className="legend">
        <span className="dot dot-emerald" />
        Completed
      </span>
      <span className="legend">
        <span className="dot dot-sky" />
        In progress
      </span>
      <span className="legend">
        <span className="dot dot-amber" />
        Rating
      </span>
    </div>

    <div className="max-h-[560px] space-y-2 overflow-y-auto pr-1">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group rounded-[var(--card-radius)] border border-slate-100 bg-slate-50/70 p-3 shadow-xs transition hover:-translate-y-[1px] hover:border-indigo-100 hover:bg-white hover:shadow-sm"
        >
          <div className="grid grid-cols-[auto,1fr] gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                item.status === "completed" ? "bg-emerald-50 ring-1 ring-emerald-100" : "bg-sky-50 ring-1 ring-sky-100"
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  item.status === "completed" ? "bg-emerald-500" : "bg-sky-500"
                }`}
              >
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`badge badge-chip ${
                    item.status === "completed" ? "badge-emerald" : "badge-sky"
                  }`}
                >
                  <span className={`dot ${item.status === "completed" ? "dot-emerald" : "dot-sky"}`} />
                  {item.status}
                </span>
                <span className="badge badge-soft-slate gap-1">
                  <span className="dot dot-slate" />
                  {item.time}
                </span>
                {item.rating !== null && (
                  <span className="badge badge-soft-amber gap-1">
                    <span className="text-amber-500">★</span>
                    {item.rating}
                  </span>
                )}
              </div>

              <p className="text-[var(--body)] font-semibold leading-relaxed text-slate-900">
                {item.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardShell>
);

const summaryStats = [
  {
    label: "Total Toilets",
    value: "18",
    icon: MapPin,
    href: "/dashboard/washrooms",
    gradient: {
      from: "#3b82f6",
      to: "#93c5fd",
    },
    trend: { change: "+2.3%", note: "vs last month" },
  },
  {
    label: "Ongoing Tasks",
    value: "0",
    icon: ClipboardList,
    href: "/dashboard/cleaner-activity",
    gradient: {
      from: "#8b5cf6",
      to: "#d8b4fe",
    },
    trend: { change: "0", note: "all cleared" },
  },
  {
    label: "Completed Tasks",
    value: "4",
    icon: CheckCircle2,
    href: "/dashboard/cleaner-activity",
    gradient: {
      from: "#22c55e",
      to: "#86efac",
    },
    trend: { change: "+1", note: "today" },
  },
  {
    label: "Total Repairs",
    value: "0",
    icon: Wrench,
    href: "/dashboard/washrooms",
    gradient: {
      from: "#fb923c",
      to: "#fdba74",
    },
    trend: { change: "0 pending", note: "stable" },
  },
  {
    label: "Number of Cleaners",
    value: "12",
    icon: Users,
    href: "/dashboard/user-management",
    gradient: {
      from: "#6366f1",
      to: "#a5b4fc",
    },
    trend: { change: "+3", note: "this week" },
  },
];

const topLocations = [
  { name: "Budhawar Bazaar", score: 9.6 },
  { name: "Narendra nagar square", score: 9.2 },
  { name: "Sakkardhar under bridge", score: 6.2 },
  { name: "Tuta Garden , Sadar , Gandhi chowk", score: 0.0 },
  { name: "Mehadiya Chowk Dhantholi", score: 0.0 },
];

const activities = [
  {
    text: "Anil Saafai User completed cleaning at Mehadiya Chowk Dhantholi",
    time: "3h ago",
    rating: 8.7,
    status: "completed",
  },
  {
    text: "Raj ram Mehadiya Chowk Toilet started cleaning at Mehadiya Chowk Dhantholi",
    time: "3h ago",
    rating: null,
    status: "started",
  },
  {
    text: "Raj ram Mehadiya Chowk Toilet completed cleaning at Mehadiya Chowk Dhantholi",
    time: "2h ago",
    rating: 8.7,
    status: "completed",
  },
  {
    text: "Anil Saafai User started cleaning at Vidhan Bhavan Back side Civil lines",
    time: "3h ago",
    rating: null,
    status: "started",
  },
  {
    text: "Anil Saafai User completed cleaning at Vidhan Bhavan Back side Civil lines",
    time: "3h ago",
    rating: 8.8,
    status: "completed",
  },
  {
    text: "Anil Saafai User started cleaning at Mehaditya Chowk Dhantholi",
    time: "3h ago",
    rating: null,
    status: "started",
  },
  {
    text: "Anil Saafai User started cleaning at SBT Kadimbhag",
    time: "4h ago",
    rating: null,
    status: "started",
  },
  {
    text: "Anil Saafai User completed cleaning at SBT Kadimbhag",
    time: "4h ago",
    rating: 9.5,
    status: "completed",
  },
  {
    text: "Anil Saafai User started cleaning at Tuta Garden — Gandhi Chowk (Sadar)",
    time: "4h ago",
    rating: null,
    status: "started",
  },
];

const chartSeries = [7.1, 7.4, 7.8, 7.2, 8.0, 8.4, 8.8, 8.3, 8.9, 9.1, 8.7, 9.0];

const sparklinePath = (values, width = 240, height = 80, padding = 8) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = (width - padding * 2) / Math.max(values.length - 1, 1);

  return values
    .map((v, i) => {
      const x = padding + i * step;
      const y = height - padding - ((v - min) / span) * (height - padding * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
};

const statusBadge = (status) => {
  if (status === "completed")
    return "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100";
  return "bg-sky-50 text-sky-600 ring-1 ring-sky-100";
};

export default function DashboardPage() {
  return (
    <>
      <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Overview</p>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Snapshot of toilets, cleaners, and today&apos;s field updates.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-100 sm:flex">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          Fresh insights ready
        </div>
      </div>

      <section className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
        {summaryStats.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-transparent p-4 shadow-sm transition hover:shadow-md cursor-pointer"
              style={{
                background: `linear-gradient(to top, ${item.gradient.from} 45%, ${item.gradient.to} 100%)`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border-2 border-black/10 shadow-sm">
                  <Icon className="h-6 w-6 text-black" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">
                    {item.label}
                  </p>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p className="text-3xl font-bold text-white">
                      {item.value}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-slate-800">
                      <Activity className="h-3 w-3 text-purple-600" />
                      {item.trend.change}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-white/90 mt-1">
                    {item.trend.note}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <ChartCard series={chartSeries} />
          <HighlightsCard locations={topLocations} />
        </div>
        <ActivityCard items={activities} />
      </section>
    </div>

    <style jsx global>{`
      :root {
        --card-radius: 14px;
        --card-padding: 14px;
        --card-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
        --h4: 1.08rem;
        --h5: 0.98rem;
        --body: 0.92rem;
        --body-sm: 0.85rem;
        --badge: 0.78rem;
        --brand-indigo: #4f46e5;
        --brand-emerald: #10b981;
        --brand-sky: #0ea5e9;
        --brand-amber: #f59e0b;
        --neutral-900: #0f172a;
        --neutral-700: #334155;
        --neutral-500: #64748b;
        --neutral-100: #e2e8f0;
        --surface: #ffffff;
        --surface-muted: #f8fafc;
      }
      .card-base {
        border-radius: var(--card-radius);
        border: 1px solid #e2e8f0;
        background: var(--surface);
        padding: var(--card-padding);
        box-shadow: var(--card-shadow);
      }
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        min-height: 44px;
      }
      .card-heading {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .heading {
        font-size: var(--h5);
        font-weight: 700;
        color: var(--neutral-900);
        line-height: 1.2;
      }
      .eyebrow {
        font-size: 11px;
        font-weight: 600;
        color: #4f46e5;
        letter-spacing: 0.01em;
      }
      .link-cta {
        font-size: 12px;
        font-weight: 700;
        color: var(--brand-indigo);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.07);
      }
      .badge-chip {
        padding: 5px 9px;
      }
      .badge-soft-emerald {
        background: #ecfdf3;
        color: #059669;
        border: 1px solid #a7f3d0;
      }
      .badge-soft-slate {
        background: #f1f5f9;
        color: #475569;
        border: 1px solid #e2e8f0;
      }
      .badge-soft-amber {
        background: #fffbeb;
        color: #b45309;
        border: 1px solid #fef3c7;
      }
      .badge-emerald {
        background: #ecfdf3;
        color: #047857;
        border: 1px solid #a7f3d0;
      }
      .badge-sky {
        background: #f0f9ff;
        color: #0369a1;
        border: 1px solid #bae6fd;
      }
      .dot {
        display: inline-flex;
        height: 6px;
        width: 6px;
        border-radius: 999px;
      }
      .dot-emerald {
        background: var(--brand-emerald);
      }
      .dot-sky {
        background: var(--brand-sky);
      }
      .dot-amber {
        background: var(--brand-amber);
      }
      .dot-slate {
        background: #94a3b8;
      }
      .legend {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .heading,
      .eyebrow,
      .badge,
      .link-cta {
        font-family: "Inter", system-ui, -apple-system, sans-serif;
      }
      .card-base,
      .card-base p,
      .card-base span,
      .card-base button {
        font-family: "Inter", system-ui, -apple-system, sans-serif;
      }
      .card-base p {
        font-size: var(--body);
      }
      .card-base small {
        font-size: var(--body-sm);
      }
    `}</style>
    </>
  );
}
