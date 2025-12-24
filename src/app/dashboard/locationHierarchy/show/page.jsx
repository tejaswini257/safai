"use client";

import {
    ShowHeader,
    LocationNodes,
    ParentMapping,
    SaveActions,
} from "@/components/locationHierarchyShow";

export default function ShowHierarchyPage() {
    return (
        <div className="min-h-screen p-6 space-y-6 bg-white">
            <ShowHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <LocationNodes />
                <ParentMapping />
                <SaveActions />
            </div>
        </div>
    );
}
