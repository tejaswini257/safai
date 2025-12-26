"use client";

import { HiOutlineClipboardList } from "react-icons/hi";

export default function CleanerActivityHeader() {
    return (
        <div className="
            flex flex-col md:flex-row justify-between items-start md:items-center
            rounded-[var(--radius)]
            px-8 py-6
            /* Matching your header theme: Light Cyan background */
            bg-[#E0F7FA] 
            border border-[hsl(var(--primary)/0.2)]
            shadow-sm
        ">
            {/* Left content: Icon, Title & Subtext */}
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-[hsl(var(--primary)/0.1)]">
                    <HiOutlineClipboardList className="text-[hsl(var(--primary))] text-2xl" />
                </div>
                <div>
                    <h1 className="text-lg font-extrabold tracking-tight text-[#007c85]">
                        CLENERS ACTIVITY
                    </h1>
                    <p className="mt-0.5 text-sm font-medium text-[#71b5bb] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#71b5bb] animate-pulse"></span>
                        Monitor real-time daily cleaning tasks and progress
                    </p>
                </div>
            </div>

            {/* Right Side: Filter Tabs */}
            <div className="flex bg-white/50 p-1 rounded-xl border border-[hsl(var(--primary)/0.1)] gap-1 mt-4 md:mt-0">
                <button className="
                    rounded-lg px-5 py-2 text-sm font-bold transition-all
                    bg-[hsl(var(--primary))] text-white shadow-md
                ">
                    All Tasks
                </button>

                <button className="
                    rounded-lg px-5 py-2 text-sm font-bold transition-all
                    text-[hsl(var(--muted-foreground))] hover:bg-[#F4FBFC] hover:text-[hsl(var(--primary-dark))]
                ">
                    Ongoing
                </button>

                <button className="
                    rounded-lg px-5 py-2 text-sm font-bold transition-all
                    text-[hsl(var(--muted-foreground))] hover:bg-[#F4FBFC] hover:text-[hsl(var(--primary-dark))]
                ">
                    Completed
                </button>
            </div>
        </div>
    );
}