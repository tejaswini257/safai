"use client";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  ClipboardList,
  MapPin,
  MessageSquare,
  Sparkles,
  Wrench,
  Users,
} from "lucide-react";
import { WashroomCleanlinessChart, CleanerPerformanceChart } from "@/components/dashboard/Charts";

/* ------------------ CARD SHELL ------------------ */
const CardShell = ({ title, subtitle, icon, headerRight, children }) => (
  <div className="bg-card text-card-foreground rounded-2xl border border-border/50 shadow-sm p-5">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          {subtitle && (
            <p className="text-xs font-semibold text-primary">
              {subtitle}
            </p>
          )}
          <h3 className="text-base font-semibold text-foreground">
            {title}
          </h3>
        </div>
      </div>
      {headerRight}
    </div>
    {children}
  </div>
);

/* ------------------ COMPACT SUMMARY CARDS ------------------ */
const SummaryCards = () => {
  const cards = [
    {
      label: "Total Tolites",
      value: "18",
      icon: Users,
      bg: "bg-gradient-to-br from-[#EAF7F8] to-[#d8f0f2] dark:from-[#0d3c45] dark:to-[#0a2a30]",
      text: "text-[#2DB7C4] dark:text-cyan-400",
      border: "border-[#2DB7C4]/20 dark:border-cyan-400/20"
    },
    {
      label: "Ongoing Tasks",
      value: "5",
      icon: MessageSquare,
      bg: "bg-gradient-to-br from-[#EEF4FF] to-[#dde7ff] dark:from-[#1e2840] dark:to-[#141d33]",
      text: "text-[#4F7FD9] dark:text-blue-400",
      border: "border-[#4F7FD9]/20 dark:border-blue-400/20"
    },
    {
      label: "Completed Tasks",
      value: "4 / 18",
      icon: CheckCircle2,
      bg: "bg-gradient-to-br from-[#ECFDF3] to-[#daf5e8] dark:from-[#0f3a2a] dark:to-[#0a291d]",
      text: "text-[#10B981] dark:text-emerald-400",
      border: "border-[#10B981]/20 dark:border-emerald-400/20"
    },
    {
      label: "Total Repairs",
      value: "4",
      icon: Wrench,
      bg: "bg-gradient-to-br from-[#FFF6E5] to-[#ffedcc] dark:from-[#3d2e15] dark:to-[#2d220f]",
      text: "text-[#F4B740] dark:text-amber-400",
      border: "border-[#F4B740]/20 dark:border-amber-400/20"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`${card.bg} rounded-xl p-4 border ${card.border} transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:hover:shadow-cyan-500/10`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${card.text}/10 dark:bg-opacity-20`}>
                <Icon className={`h-4 w-4 ${card.text}`} />
              </div>
              <div>
                <p className={`text-lg font-bold ${card.text}`}>{card.value}</p>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{card.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const HighlightsCard = ({ locations }) => {
  const rankStyles = [
    {
      light: { bg: "bg-[#EAF7F8]", text: "text-[#2DB7C4]", border: "border-[#2DB7C4]/20" },
      dark: { bg: "dark:bg-[#0d3c45]", text: "dark:text-cyan-300", border: "dark:border-cyan-500/30" }
    },
    {
      light: { bg: "bg-[#F5F0FF]", text: "text-[#7E5BDD]", border: "border-[#7E5BDD]/20" },
      dark: { bg: "dark:bg-[#1e2840]", text: "dark:text-blue-300", border: "dark:border-blue-500/30" }
    },
    {
      light: { bg: "bg-[#ECFDF3]", text: "text-[#10B981]", border: "border-[#10B981]/20" },
      dark: { bg: "dark:bg-[#0f3a2a]", text: "dark:text-emerald-300", border: "dark:border-emerald-500/30" }
    }
  ];

  return (
    <CardShell
      title="Today's Top Rated"
      headerRight={
        <button className="text-sm text-[#2DB7C4] hover:underline font-medium dark:text-cyan-400">
          View all
        </button>
      }
    >
      <div className="space-y-2">
        {locations.slice(0, 3).map((loc, i) => (
          <div
            key={loc.name}
            className={`flex items-center justify-between p-3 rounded-xl ${rankStyles[i].light.bg} ${rankStyles[i].light.border} border ${rankStyles[i].dark.bg} ${rankStyles[i].dark.border} transition-colors duration-300`}
          >
            <div className="flex items-center gap-2">
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${i === 0 ? 'bg-[#2DB7C4] dark:bg-gradient-to-br dark:from-cyan-500 dark:to-blue-600' :
                  i === 1 ? 'bg-[#7E5BDD] dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-600' :
                    'bg-[#10B981] dark:bg-gradient-to-br dark:from-emerald-500 dark:to-teal-600'
                }`}>
                {i + 1}
              </div>
              <p className={`text-xs font-medium ${rankStyles[i].light.text} ${rankStyles[i].dark.text}`}>
                {loc.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className={`text-xs font-semibold ${rankStyles[i].light.text} ${rankStyles[i].dark.text}`}>
                {loc.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
};
/* ------------------ ACTIVITY ------------------ */
const ActivityCard = ({ items }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#EAF7F8] rounded-lg">
          <Activity className="h-4 w-4 text-[#2DB7C4]" />
        </div>
        <h3 className="text-base font-semibold text-gray-800">Cleaner Activity</h3>
      </div>
      <button className="text-sm text-[#2DB7C4] font-medium hover:underline">
        View all
      </button>
    </div>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
          <span className="w-2 h-2 mt-2 rounded-full bg-[#2DB7C4] flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-800">{item.text}</p>
            <p className="text-xs text-gray-500">
              {item.time}
              {item.rating && ` • ⭐ ${item.rating}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------ DATA ------------------ */
const locations = [
  { name: "Budhawar Bazaar", score: 9.6 },
  { name: "Narendra Nagar", score: 9.2 },
  { name: "Sakkardara Bridge", score: 6.2 },
];

const activities = [
  {
    text: "Anil Safai completed cleaning at Mehadiya Chowk",
    time: "3h ago",
    rating: 8.7,
  },
  {
    text: "Raj Ram started cleaning at Mehadiya Chowk",
    time: "3h ago",
  },
  {
    text: "Anil Safai completed cleaning at Civil Lines",
    time: "2h ago",
    rating: 8.8,
  },
];

/* ------------------ PAGE ------------------ */
export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm font-semibold text-[#2DB7C4]">Overview</p>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Snapshot of toilets, cleaners and field updates</p>
        </div>
        <div className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-200 text-sm">
          <Sparkles className="h-4 w-4 text-[#2DB7C4]" />
          Fresh insights ready
        </div>
      </div>

      {/* Compact summary cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-800">Washroom Cleanliness</h3>
            <p className="text-xs text-gray-500">Last 7 days performance</p>
          </div>
          <div className="h-[300px]">
            <WashroomCleanlinessChart />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-800">Cleaner Performance</h3>
            <p className="text-xs text-gray-500">Top 5 cleaners by rating</p>
          </div>
          <div className="h-[300px]">
            <CleanerPerformanceChart />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HighlightsCard locations={locations} />
        <ActivityCard items={activities} />
      </div>
    </div>
  );
}