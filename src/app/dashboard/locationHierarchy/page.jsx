"use client";

import LocationHeader from "@/components/locationHierarchy/LocationHeader";
import LocationTable from "@/components/locationHierarchy/LocationTable";

export default function LocationHierarchyPage() {
    return (
        <div className="min-h-screen p-6 space-y-6 bg-white">
            <LocationHeader />
            <LocationTable />
        </div>
    );
}
