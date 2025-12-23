// src/app/dashboard/locationHierarchy/show/page.jsx
"use client";

import {
    ShowHeader,
    ParentMapping,
    SaveActions,
} from "@/components/locationHierarchyShow";

export default function ShowHierarchyPage() {
    return (
        /* UI UPDATE: Applied a very soft neutral background (#F8FAFB) 
           to make the pure white cards pop. Added a max-width container 
           for better readability on ultra-wide monitors.
        */
        <div className="min-h-screen bg-[#F8FAFB] pb-20">
            <div className="max-w-[1600px] mx-auto p-6 space-y-8">

                {/* Header Section */}
                <ShowHeader />

                {/* GRID ADJUSTMENT: 
                    Left (2/3): Parent Mapping (Main Task)
                    Right (1/3): Save Actions (Finalization)
                */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-7 xl:col-span-8">
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                            {/* Top Accent Bar for Brand Identity */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-[#58BECF] to-[#6D9CDC]" />
                            <ParentMapping />
                        </div>
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                            <SaveActions />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}