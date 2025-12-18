"use client";

import {
  CleanerActivityHeader,
  ActivityFilters,
  ActivityStats,
  ActivityGrid,
} from "@/components/cleanerActivity";

export default function CleanerActivityPage() {
  return (
    <div className="theme-saas min-h-screen p-6 space-y-6">
      <CleanerActivityHeader />
      <ActivityFilters />

      {/* MAIN CONTENT */}
      <div className="flex gap-6 items-start">

        {/* LEFT: CONSTANT FILTER / STATS CARD */}
        <div className="w-[320px] shrink-0 sticky top-24">
          <ActivityStats />
        </div>

        {/* RIGHT: INDEPENDENT ACTIVITY CARDS */}
        <div className="flex-1">
          <ActivityGrid />
        </div>

      </div>
    </div>
  );
}
