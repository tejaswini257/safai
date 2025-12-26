"use client";

import { Star, User, ShieldCheck } from "lucide-react";

export default function LocationStats({ location }) {
    return (
        <div className="space-y-4">
            {/* Header label for the stats section */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                Key Performance
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {/* 1. RATING CARD */}
                <div className="bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 p-4 rounded-xl shadow-sm transition-all hover:shadow-md group">
                    <div className="flex items-center gap-2 mb-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">Rating</p>
                    </div>
                    <p className="text-2xl font-extrabold text-blue-800 dark:text-blue-300 tracking-tight">
                        {location.rating || "N/A"}
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">/ 5.0</span>
                    </p>
                </div>

                {/* 2. CLEANER CARD */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-xl shadow-sm transition-all hover:shadow-md group">
                    <div className="flex items-center gap-2 mb-1">
                        <User className="w-3.5 h-3.5 text-blue-500" />
                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">Main Cleaner</p>
                    </div>
                    <p className={`text-sm font-bold truncate ${location.cleaner ? 'text-gray-900 dark:text-white' : 'text-rose-500'}`}>
                        {location.cleaner || "Unassigned"}
                    </p>
                    {location.cleaner && (
                        <div className="mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">On Duty</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}