"use client";

import { HiOutlineClipboardCheck } from "react-icons/hi";
import { MdChatBubbleOutline, MdHistory } from "react-icons/md";

export default function TaskReview() {
    return (
        <div className="rounded-[var(--radius)] bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm p-6 space-y-5">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#E0F7FA] rounded-lg shadow-sm">
                    <HiOutlineClipboardCheck className="text-[hsl(var(--primary))] text-xl" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                    Task Review
                </h3>
            </div>

            {/* Score & Status Card */}
            <div className="flex justify-between items-center bg-[#F4FBFC] border border-[hsl(var(--primary)/0.1)] rounded-2xl p-5">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-1">
                        Cleaning Status
                    </p>
                    <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
                        Unsanitized Condition
                    </p>
                </div>

                {/* Themed Circular Progress / Score */}
                <div className="relative flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-white shadow-sm flex items-center justify-center font-black text-[hsl(var(--foreground))] bg-white z-10">
                        6<span className="text-[10px] text-[hsl(var(--muted-foreground))] ml-0.5">/10</span>
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-[hsl(var(--primary))] opacity-20 scale-110"></div>
                </div>
            </div>

            {/* Completion Badge */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-start gap-3">
                <div className="mt-0.5 text-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-bold text-emerald-800">
                        Completed in 1m
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                        Finished: 13/12/2025 • 11:13 am
                    </p>
                </div>
            </div>

            {/* Comment Section (Replaced Attached Evidence) */}
            <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))] ml-1">
                    Inspection Feedback
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {/* Before Comment */}
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] shadow-inner">
                        <div className="flex items-center gap-1.5 opacity-60">
                            <MdHistory className="text-sm" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">Initial Observation</span>
                        </div>
                        <p className="text-xs font-bold text-slate-600 italic">
                            "Floors exhibited visible dust accumulation and trash bins were near capacity."
                        </p>
                    </div>

                    {/* After Comment */}
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] shadow-inner">
                        <div className="flex items-center gap-1.5 text-[hsl(var(--primary))]">
                            <MdChatBubbleOutline className="text-sm" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">Post-Cleaning Notes</span>
                        </div>
                        <p className="text-xs font-bold text-slate-700">
                            "All surfaces sanitized. Odor control applied and supply restock completed successfully."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}