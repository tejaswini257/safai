"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
    // Normalize status to lowercase for comparison
    const normalizedStatus = status?.toLowerCase();
    const isActive = normalizedStatus === "active" || status === true;

    return (
        <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${isActive
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : "bg-rose-50 text-rose-500 border-rose-100"
                }`}
        >
            <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
            {isActive ? (
                <>
                    <CheckCircle2 size={10} strokeWidth={3} />
                    Active
                </>
            ) : (
                <>
                    <XCircle size={10} strokeWidth={3} />
                    Inactive
                </>
            )}
        </div>
    );
}
