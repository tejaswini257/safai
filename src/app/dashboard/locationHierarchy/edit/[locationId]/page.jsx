"use client";

import {
    EditHeader,
    EditForm,
    HierarchyTree,
} from "@/components/locationHierarchyEdit";

export default function EditLocationHierarchyPage() {
    return (
        <div className="min-h-screen p-6 bg-white">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <EditHeader />
                    <EditForm />
                </div>
                <HierarchyTree />
            </div>
        </div>
    );
}
