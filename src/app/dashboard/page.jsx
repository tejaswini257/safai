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
  <div className="bg-white rounded-2xl border border-[#EEF2F5] shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          {subtitle && (
            <p className="text-xs font-semibold text-[#2DB7C4]">
              {subtitle}
            </p>
          )}
          <h3 className="text-base font-semibold text-[#2F3A45]">
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
      label: "Total Users",
      value: "50",
      icon: Users,
      bg: "bg-[#EAF7F8]",
      color: "text-[#2DB7C4]",
    },
    {
      label: "New Users",
      value: "100",
      icon: MessageSquare,
      bg: "bg-[#EEF4FF]",
      color: "text-[#4F7FD9]",
    },
    {
      label: "Active Users",
      value: "4 / 18",
      icon: CheckCircle2,
      bg: "bg-[#ECFDF3]",
      color: "text-[#10B981]",
    },
    {
      label: "Total Repairs",
      value: "4",
      icon: Wrench,
      bg: "bg-[#FFF6E5]",
      color: "text-[#F4B740]",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-[#EEF2F5] px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-lg ${card.bg} flex items-center justify-center`}
              >
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#2F3A45] leading-tight">
                  {card.value}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {card.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ------------------ TOP RATED ------------------ */
const HighlightsCard = ({ locations }) => {
  const rankStyles = [
    { bg: "bg-[#FFF6E5]", badge: "bg-[#F4B740] text-white" },
    { bg: "bg-[#EEF4FF]", badge: "bg-[#4F7FD9] text-white" },
    { bg: "bg-[#FFF1E8]", badge: "bg-[#C77C5C] text-white" },
  ];

  return (
    <CardShell
      title="Today’s Top Rated"
      headerRight={
        <button className="text-sm text-[#2DB7C4] hover:underline">
          View all
        </button>
      }
    >
      <div className="space-y-3">
        {locations.slice(0, 3).map((loc, i) => (
          <div
            key={loc.name}
            className={`flex items-center justify-between rounded-xl px-4 py-3 ${rankStyles[i].bg}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-semibold ${rankStyles[i].badge}`}
              >
                {i + 1}
              </div>
              <p className="text-sm font-medium text-[#2F3A45]">
                {loc.name}
              </p>
            </div>
            <span className="text-sm font-semibold text-[#2F3A45]">
              ⭐ {loc.score}
            </span>
          </div>
        ))}
      </div>
    </CardShell>
  );
};

/* ------------------ ACTIVITY ------------------ */
const ActivityCard = ({ items }) => (
  <CardShell
    title="Cleaner Activity"
    icon={
      <div className="h-8 w-8 rounded-xl bg-[#EAF7F8] flex items-center justify-center">
        <Activity className="h-4 w-4 text-[#2DB7C4]" />
      </div>
    }
  >
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 bg-[#F8FAFB] border border-[#EEF2F5] rounded-xl p-3"
        >
          <span className="w-2 h-2 mt-2 rounded-full bg-[#2DB7C4]" />
          <div>
            <p className="text-sm text-[#2F3A45]">{item.text}</p>
            <p className="text-xs text-[#6B7280]">
              {item.time}
              {item.rating && ` • ⭐ ${item.rating}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  </CardShell>
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
    <div className="bg-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-[#2DB7C4]">
            Overview
          </p>
          <h1 className="text-2xl font-bold text-[#2F3A45]">
            Dashboard
          </h1>
          <p className="text-sm text-[#6B7280]">
            Snapshot of toilets, cleaners and field updates
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#EEF2F5] text-sm text-[#2F3A45]">
          <Sparkles className="h-4 w-4 text-[#2DB7C4]" />
          Fresh insights ready
        </div>
      </div>

      {/* Compact summary cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[400px]">
          <WashroomCleanlinessChart />
        </div>
        <div className="h-[400px]">
          <CleanerPerformanceChart />
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
