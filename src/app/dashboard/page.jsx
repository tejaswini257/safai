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
  <div className="bg-white rounded-2xl border border-[#EEF2F5] shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-4 sm:p-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {icon}
        <div>
          {subtitle && (
            <p className="text-xs font-semibold text-[#2DB7C4] leading-none sm:leading-normal">
              {subtitle}
            </p>
          )}
          <h3 className="text-sm sm:text-base font-semibold text-[#2F3A45] leading-tight sm:leading-normal">
            {title}
          </h3>
        </div>
      </div>
      {headerRight}
    </div>
    <div className="text-sm sm:text-base">
      {children}
    </div>
  </div>
);

/* ------------------ COMPACT SUMMARY CARDS ------------------ */
const SummaryCards = () => {
  const cards = [
    {
      label: "Total Tolites",
      value: "18",
      icon: Users,
      bg: "from-[#EAF7F8] to-[#d8f0f2]",
      color: "text-[#2DB7C4]",
      shadow: "shadow-[0_4px_20px_rgba(45,183,196,0.15)]",
      hover: "hover:shadow-[0_8px_25px_rgba(45,183,196,0.25)]"
    },
    {
      label: "Ongoing Tasks",
      value: "5",
      icon: MessageSquare,
      bg: "from-[#EEF4FF] to-[#dde7ff]",
      color: "text-[#4F7FD9]",
      shadow: "shadow-[0_4px_20px_rgba(79,127,217,0.15)]",
      hover: "hover:shadow-[0_8px_25px_rgba(79,127,217,0.25)]"
    },
    {
      label: "Completed Tasks",
      value: "4 / 18",
      icon: CheckCircle2,
      bg: "from-[#ECFDF3] to-[#daf5e8]",
      color: "text-[#10B981]",
      shadow: "shadow-[0_4px_20px_rgba(16,185,129,0.15)]",
      hover: "hover:shadow-[0_8px_25px_rgba(16,185,129,0.25)]"
    },
    {
      label: "Total Repairs",
      value: "4",
      icon: Wrench,
      bg: "from-[#FFF6E5] to-[#ffedcc]",
      color: "text-[#F4B740]",
      shadow: "shadow-[0_4px_20px_rgba(244,183,64,0.15)]",
      hover: "hover:shadow-[0_8px_25px_rgba(244,183,64,0.25)]"
    },
  ];

  // Animation variants for framer-motion
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-[#EEF2F5] p-2 sm:px-3 sm:py-3 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${card.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-semibold text-[#2F3A45] leading-tight truncate">
                  {card.value}
                </p>
                <p className="text-[10px] sm:text-xs text-[#6B7280] truncate">
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
      title="Today's Top Rated"
      headerRight={
        <button className="text-xs sm:text-sm text-[#2DB7C4] hover:underline whitespace-nowrap">
          View all
        </button>
      }
    >
      <div className="space-y-2 sm:space-y-3">
        {locations.slice(0, 3).map((loc, i) => (
          <div
            key={loc.name}
            className={`flex items-center justify-between rounded-xl px-3 sm:px-4 py-2 sm:py-3 ${rankStyles[i].bg}`}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div
                className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs sm:text-sm font-semibold ${rankStyles[i].badge}`}
              >
                {i + 1}
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#2F3A45] truncate">
                {loc.name}
              </p>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#2F3A45] whitespace-nowrap ml-2">
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
      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-[#EAF7F8] flex items-center justify-center flex-shrink-0">
        <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-[#2DB7C4]" />
      </div>
    }
  >
    <div className="space-y-2 sm:space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-2 sm:gap-3 bg-[#F8FAFB] border border-[#EEF2F5] rounded-xl p-2 sm:p-3"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-2 sm:mt-2.5 rounded-full bg-[#2DB7C4] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-[#2F3A45] leading-snug">{item.text}</p>
            <p className="text-[10px] sm:text-xs text-[#6B7280] mt-0.5">
              {item.time}
              {item.rating && <span className="whitespace-nowrap"> • ⭐ {item.rating}</span>}
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
    <div className="bg-white p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-xs sm:text-sm font-semibold text-[#2DB7C4]">
            Overview
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2F3A45]">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Snapshot of toilets, cleaners and field updates
          </p>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-2 bg-white px-3 sm:px-4 py-2 rounded-full border border-[#EEF2F5] text-xs sm:text-sm text-[#2F3A45] w-full sm:w-auto">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#2DB7C4] flex-shrink-0" />
          <span className="truncate">Fresh insights ready</span>
        </div>
      </div>

      {/* Compact summary cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
          <WashroomCleanlinessChart />
        </div>
        <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
          <CleanerPerformanceChart />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <HighlightsCard locations={locations} />
        <ActivityCard items={activities} />
      </div>
    </div>
  );
}