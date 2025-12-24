"use client";

import {
    AddHierarchyHeader,
    CreateHierarchyForm,
    HierarchyTreePreview,
} from "@/components/locationHierarchyAdd";

export default function AddHierarchyPage() {
    return (
        <div className="min-h-screen p-6 space-y-6 bg-white">
            <AddHierarchyHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CreateHierarchyForm />
                <HierarchyTreePreview />
            </div>
        </div>
    );
}
