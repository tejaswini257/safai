"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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
      label: "Total Users",
      value: "50",
      icon: Users,
      bg: "bg-gradient-to-br from-[#1A1C26] to-[#1E2A3A]",
      border: "border border-[#2DB7C4]/20",
      text: "text-[#2DB7C4]",
      iconBg: "bg-[#2DB7C4]/10"
    },
    {
      label: "New Users",
      value: "100",
      icon: MessageSquare,
      bg: "bg-gradient-to-br from-[#1A1C26] to-[#1E1A3A]",
      border: "border border-[#9F7AEA]/20",
      text: "text-[#9F7AEA]",
      iconBg: "bg-[#9F7AEA]/10"
    },
    {
      label: "Active Users",
      value: "4 / 18",
      icon: CheckCircle2,
      bg: "bg-gradient-to-br from-[#1A1C26] to-[#1A3A2A]",
      border: "border border-[#48BB78]/20",
      text: "text-[#48BB78]",
      iconBg: "bg-[#48BB78]/10"
    },
    {
      label: "Total Repairs",
      value: "4",
      icon: Wrench,
      bg: "bg-gradient-to-br from-[#1A1C26] to-[#3A2A1A]",
      border: "border border-[#F4B740]/20",
      text: "text-[#F4B740]",
      iconBg: "bg-[#F4B740]/10"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`${card.bg} ${card.border} rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-lg ${card.iconBg} flex items-center justify-center`}
              >
                <Icon className={`h-4 w-4 ${card.text}`} />
              </div>
              <div>
                <p className={`text-lg font-semibold text-white leading-tight`}>
                  {card.value}
                </p>
                <p className="text-xs text-gray-300">
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
    { 
      bg: "bg-gradient-to-br from-[#1A1C26] to-[#2A2D3D]", 
      border: "border border-[#49B8D3]/20",
      text: "text-[#49B8D3]",
      badge: "bg-[#49B8D3] text-white" 
    },
    { 
      bg: "bg-gradient-to-br from-[#1A1C26] to-[#2D2A3D]", 
      border: "border border-[#9F7AEA]/20",
      text: "text-[#9F7AEA]",
      badge: "bg-[#9F7AEA] text-white" 
    },
    { 
      bg: "bg-gradient-to-br from-[#1A1C26] to-[#2A3D3A]", 
      border: "border border-[#48BB78]/20",
      text: "text-[#48BB78]",
      badge: "bg-[#48BB78] text-white" 
    },
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
            className={`flex items-center justify-between rounded-xl px-4 py-3 ${rankStyles[i].bg} ${rankStyles[i].border} shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-semibold ${rankStyles[i].badge}`}
              >
                {i + 1}
              </div>
              <p className={`text-sm font-medium ${rankStyles[i].text}`}>
                {loc.name}
              </p>
            </div>
            <span className={`text-sm font-semibold ${rankStyles[i].text}`}>
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
    <div className="min-h-screen p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-primary">
            Overview
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Snapshot of toilets, cleaners and field updates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card text-foreground px-4 py-2 rounded-full border border-border text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            Fresh insights ready
          </div>
          <ThemeToggle />
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
