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
      bg: "bg-gradient-to-br from-[#EAF7F8] to-[#d8f0f2]",
      border: "border border-[#2DB7C4]/20",
      text: "text-[#2DB7C4]",
      iconBg: "bg-[#2DB7C4]/10"
    },
    {
      label: "Ongoing Tasks",
      value: "5",
      icon: MessageSquare,
      bg: "bg-gradient-to-br from-[#EEF4FF] to-[#dde7ff]",
      border: "border border-[#9F7AEA]/20",
      text: "text-[#4F7FD9]",
      iconBg: "bg-[#4F7FD9]/10"
    },
    {
      label: "Completed Tasks",
      value: "4 / 18",
      icon: CheckCircle2,
      bg: "bg-gradient-to-br from-[#ECFDF3] to-[#daf5e8]",
      border: "border border-[#48BB78]/20",
      text: "text-[#10B981]",
      iconBg: "bg-[#10B981]/10"
    },
    {
      label: "Total Repairs",
      value: "4",
      icon: Wrench,
      bg: "bg-gradient-to-br from-[#FFF6E5] to-[#ffedcc]",
      border: "border border-[#F4B740]/20",
      text: "text-[#F4B740]",
      iconBg: "bg-[#F4B740]/10"
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
            className={`summary-card ${card.bg} dark:bg-card dark:border dark:border-border/30 relative rounded-xl px-4 py-3 shadow-sm transition-all duration-500 hover:scale-[1.02] group overflow-hidden`}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 dark:group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-500/80 dark:to-blue-500/80 rounded-xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-15 blur-md transition-all duration-500 group-hover:duration-200" />
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-lg ${card.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`h-4 w-4 ${card.text}`} />
              </div>
              <div>
                <p className={`text-lg font-bold ${card.text} dark:text-foreground leading-tight card-text`}>
                  {card.value}
                </p>
                <p className={`text-xs font-medium ${card.text}/80 dark:text-muted-foreground card-label`}>
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
      bg: "bg-gradient-to-br from-[#EAF7F8] to-[#d8f0f2]", 
      border: "border border-[#49B8D3]/30",
      text: "text-[#2DB7C4]",
      badge: "bg-[#2DB7C4] text-white" 
    },
    { 
      bg: "bg-gradient-to-br from-[#F5F0FF] to-[#eae0ff]", 
      border: "border border-[#9F7AEA]/30",
      text: "text-[#7E5BDD]",
      badge: "bg-[#7E5BDD] text-white" 
    },
    { 
      bg: "bg-gradient-to-br from-[#ECFDF3] to-[#daf5e8]", 
      border: "border border-[#48BB78]/30",
      text: "text-[#10B981]",
      badge: "bg-[#10B981] text-white" 
    },
  ];

  return (
    <CardShell
      title="Today's Top Rated"
      headerRight={
        <button className="text-sm text-[#2DB7C4] font-medium hover:underline">
          View all
        </button>
      }
    >
      <div className="space-y-2 sm:space-y-3">
        {locations.slice(0, 3).map((loc, i) => (
          <div
            key={loc.name}
            className={`highlights-card flex items-center justify-between rounded-xl px-4 py-3 ${rankStyles[i].bg} dark:bg-card/50 dark:border dark:border-border/30 shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-semibold ${rankStyles[i].badge} dark:bg-primary/80 dark:text-white`}
              >
                {i + 1}
              </div>
              <p className={`text-sm font-medium ${rankStyles[i].text} dark:text-foreground location-name`}>
                {loc.name}
              </p>
            </div>
            <span className={`text-sm font-semibold ${rankStyles[i].text} dark:text-primary location-score`}>
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
    <div className="min-h-screen p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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