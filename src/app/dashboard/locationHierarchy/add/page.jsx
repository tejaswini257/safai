"use client";

import {
    AddHierarchyHeader,
    CreateHierarchyForm,
    HierarchyTreePreview,
} from "@/components/locationHierarchyAdd";

export default function AddHierarchyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFB] pb-12 transition-all duration-300">
            <div className="max-w-[1600px] mx-auto p-4 md:p-8 flex flex-col gap-8">

                {/* 1. Header Section - Acts as a floating white command bar */}
                <div className="z-20">
                    <AddHierarchyHeader />
                </div>

                {/* 2. Content Grid - Two-column split for creation and visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* Form Column - Left */}
                    <div className="relative group">
                        {/* Decorative branded glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#58BECF]/10 to-[#6D9CDC]/10 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

                        <div className="relative bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                            {/* Branded accent line */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-[#58BECF] to-[#6D9CDC]" />
                            <CreateHierarchyForm />
                        </div>
                    </div>

                    {/* Preview Column - Right */}
                    <div className="relative h-full">
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-2 h-full">
                            <HierarchyTreePreview />
                        </div>
                    </div>

                </div>

                {/* 3. Helper Footer */}

            </div>
        </div>
    );
}