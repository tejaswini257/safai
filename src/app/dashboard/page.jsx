// src/app/dashboard/page.js
// This renders the content for the /dashboard URL (the home page after login)

const DashboardHomePage = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard!</h2>
      <p className="mt-2 text-gray-600">
        This content is wrapped by the layout.js file with the sidebar and header.
      </p>
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
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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

const ChartCard = () => {
  // Updated data to match the reference image
  const data = [
    { day: 'Mon', value: 40 },
    { day: 'Tue', value: 30 },
    { day: 'Wed', value: 60 },
    { day: 'Thu', value: 50 },
    { day: 'Fri', value: 45 },
    { day: 'Sat', value: 25 },
    { day: 'Sun', value: 35 },
  ];

  const chartHeight = 150;
  const chartWidth = 300;
  const padding = { top: 20, right: 20, bottom: 30, left: 10 };
  const maxValue = 80;
  const step = (chartWidth - padding.left - padding.right) / (data.length - 1);

  // Calculate points with adjusted padding
  const points = data.map((item, index) => ({
    x: padding.left + index * step,
    y: chartHeight - padding.bottom - (item.value / maxValue) * (chartHeight - padding.top - padding.bottom),
    value: item.value,
    day: item.day
  }));

  // Create path for the line
  const path = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    return `${acc} L ${point.x},${point.y}`;
  }, '');

  // Create area path for gradient fill
  const areaPath = `${path} L ${points[points.length - 1].x},${chartHeight - padding.bottom} L ${points[0].x},${chartHeight - padding.bottom} Z`;

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-900">Weekly Satisfaction Score</h3>
        <span className="text-xs text-gray-500">This Week</span>
      </div>
      <div className="relative h-40 -mx-2 -mb-2">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F123F" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0F123F" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path 
            d={areaPath}
            fill="url(#areaGradient)"
            stroke="none"
          />
          
          {/* Line path */}
          <path 
            d={path}
            fill="none"
            stroke="#0f123fe2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="2.5"
              fill="#0F123F"
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}
          
          {/* X-axis labels */}
          {points.map((point, i) => (
            <text
              key={`label-${i}`}
              x={point.x}
              y={chartHeight - 10}
              textAnchor="middle"
              fontSize="9"
              fill="#6B7280"
              fontFamily="sans-serif"
            >
              {point.day}
            </text>
          ))}
          
          {/* Y-axis values - removed 0 */}
          {[20, 40, 60, 80].map((value, i) => (
            <text
              key={`y-${i}`}
              x={padding.left - 5}
              y={chartHeight - padding.bottom - (value / maxValue) * (chartHeight - padding.top - padding.bottom) + 3}
              textAnchor="end"
              fontSize="8"
              fill="#9CA3AF"
              fontFamily="sans-serif"
            >
              {value}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default DashboardHomePage;
const ActivityCard = ({ items }) => (
  <CardShell
    title="Today's Activities"
    icon={
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
        <Activity
          className="h-4 w-4 text-gray-600"
          strokeWidth={2}
        />
      </div>
    }
    headerRight={null}
  >
    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
      <span className="flex items-center">
        <span className="w-2 h-2 rounded-full bg-[#FFADB0] mr-1"></span>
        Completed
      </span>
      <span className="flex items-center">
        <span className="w-2 h-2 rounded-full bg-[#666797] mr-1"></span>
        In progress
      </span>
      <span className="flex items-center">
        <span className="w-2 h-2 rounded-full bg-[#FCB967] mr-1"></span>
        Rating
      </span>
    </div>

    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group rounded-lg bg-white p-3 border border-gray-100 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${item.status === "completed" ? 'bg-[#FFADB0]/20' : 'bg-[#666797]/20'}`}>
              <ShieldCheck className={`h-4 w-4 ${item.status === "completed" ? 'text-[#FFADB0]' : 'text-[#666797]'}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === "completed" ? 'bg-[#FFADB0]/10 text-[#FFADB0]' : 'bg-[#666797]/10 text-[#666797]'}`}>
                  {item.status}
                </span>
                <span className="text-xs text-gray-500">
                  {item.time}
                </span>
                {item.rating !== null && (
                  <span className="flex items-center text-xs text-amber-600">
                    <span className="text-amber-400">★</span>
                    {item.rating}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-800 leading-snug">
                {item.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardShell>
);

const HighlightsCard = ({ locations }) => (
  <CardShell
    title="Today's Top Rated"
    headerRight={
      <button className="text-xs font-medium text-indigo-600 hover:underline">
        View all
      </button>
    }
  >
    <div className="space-y-3">
      {locations.slice(0, 3).map((loc, idx) => {
        const styles = [
          {
            bg: "bg-[#FFE7E6]",
            iconBg: "bg-[#F87B74]",
          },
          {
            bg: "bg-[#E9EAFF]",
            iconBg: "bg-[#343667]",
          },
          {
            bg: "bg-[#FFF2DE]",
            iconBg: "bg-[#F5A847]",
          },
        ];

        return (
          <div
            key={loc.name}
            className={`flex items-center justify-between rounded-xl p-3 ${styles[idx].bg}`}
          >
            {/* Left section */}
            <div className="flex items-center gap-3">
              <div
                className={`h-9 w-9 flex items-center justify-center rounded-full text-white ${styles[idx].iconBg}`}
              >
                <Trophy className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {loc.name}
                </p>
                <p className="text-xs text-gray-600">
                  {loc.tasks ?? "—"} tasks completed
                </p>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
              <span>{loc.score.toFixed(1)}</span>
              <span className="text-amber-400">★</span>
            </div>
          </div>
        );
      })}
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
      from: "#0b0e37ff",  // Darker blue
      to: "#42444eff",  // Lighter blue
    },
    trend: { change: "+2", note: "this week" },
  },
  {
    label: "Toilets Cleaned",
    value: "4/18",
    icon: ClipboardList,
    href: "/dashboard/cleaner-activity",
    gradient: {
      from: "#0b0e37ff",
      to: "#42444eff",
    },
    trend: { change: "0", note: "all cleared" },
  },
  {
    label: "Completed Tasks",
    value: "4",
    icon: CheckCircle2,
    href: "/dashboard/cleaner-activity",
    gradient: {
      from: "#0b0e37ff",
      to: "#42444eff",
    },
    trend: { change: "+1", note: "today" },
  },
  {
    label: "Total Repairs",
    value: "0",
    icon: Wrench,
    href: "/dashboard/washrooms",
    gradient: {
      from: "#0b0e37ff",
      to: "#42444eff",
    },
    trend: { change: "0 pending", note: "stable" },
  },
  {
    label: "Number of Cleaners",
    value: "12",
    icon: Users,
    href: "/dashboard/user-management",
    gradient: {
      from: "#0b0e37ff",
      to: "#42444eff",
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
    return "bg-[#FE9697]/10 text-[#FE9697] ring-1 ring-[#FE9697]/20";
  return "bg-[#62658E]/10 text-[#62658E] ring-1 ring-[#62658E]/20";
};

export default function DashboardPage() {
  return (
    <>
      <div className="space-y-5 bg-[#F0F0FA] p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold text-blue-700">Overview</p>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Snapshot of toilets, cleaners, and today's field updates.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 sm:flex">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Fresh insights ready
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6">
          {summaryStats.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex flex-col gap-2 overflow-hidden rounded-lg bg-white border border-gray-100 p-3 shadow-sm transition hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 flex-shrink-0 rounded-lg flex items-center justify-center`} style={{ background: item.gradient ? `linear-gradient(135deg, ${item.gradient.from} 0%, ${item.gradient.to} 100%)` : '#4A69FF' }}>
                      <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        {item.label}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Chart and Activities (Swapped position) */}
          <div className="space-y-6">
            <ChartCard />
            <ActivityCard items={activities} /> 
          </div>
          
          {/* Column 2: Highlights (Swapped position) */}
          <div>
            <HighlightsCard locations={topLocations} /> 
          </div>
        </div>
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
