"use client";

import CleanerHeader from "@/components/washroomCleaners/CleanerHeader";
import CleanerStats from "@/components/washroomCleaners/CleanerStats";
import CleanerFilters from "@/components/washroomCleaners/CleanerFilters";
import CleanerGrid from "@/components/washroomCleaners/CleanerGrid";

export default function AssignedCleanersPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            <CleanerHeader />
            <CleanerStats />
            <CleanerFilters />
            <CleanerGrid />
        </div>
    );
}
