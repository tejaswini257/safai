"use client";

import CleanerReviewHeader from "@/components/cleanerReview/CleanerReviewHeader";
import TaskSummary from "@/components/cleanerReview/TaskSummary";
import TaskReview from "@/components/cleanerReview/TaskReview";
import VisualEvidence from "@/components/cleanerReview/VisualEvidence";

export default function CleanerReviewPage() {
    return (
        /* UI UPDATE: Background switched to soft gray #F8FAFB to allow cards to pop */
        <div className="min-h-screen bg-[#F8FAFB] transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-6">

                {/* 1. Header Section */}
                <div className="z-20">
                    <CleanerReviewHeader />
                </div>

                {/* 2. Top Summary Section */}
                <div className="bg-white border border-slate-100 rounded-[28px] p-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                    <TaskSummary />
                </div>

                {/* 3. Detailed Review Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Task Review Card */}
                    <div className="bg-white border border-slate-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full">
                        <TaskReview />
                    </div>

                    {/* Visual Evidence Card */}
                    <div className="bg-white border border-slate-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full">
                        <VisualEvidence />
                    </div>
                </div>

                {/* 4. Portal Footer Information */}
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 gap-2 opacity-50 pt-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        Safai Portal • Inspection Registry v2.4
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#007C85] uppercase tracking-widest">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#58BECF] animate-pulse" />
                        <span>Data Verified for Compliance</span>
                    </div>
                </div>

            </div>
        </div>
    );
}