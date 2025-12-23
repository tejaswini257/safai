"use client";

import WashroomRow from "./WashroomRow";
import { Hash, List, MapPin, Star, User, Building2, Activity, Settings } from "lucide-react";

export default function WashroomTable({ items }) {
    const rows = items ?? [];

    return (
        <div className="
            relative 
            bg-white 
            rounded-[var(--radius)] 
            border border-[hsl(var(--border))] 
            shadow-sm 
            overflow-hidden
        ">
            {/* Scrollable Container with Custom Scrollbar Styling */}
            <div className="overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
                <table className="min-w-[1200px] w-full text-sm border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20">
                        <tr className="bg-[#E0F7FA] border-b border-[hsl(var(--primary)/0.2)]">
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <Hash className="w-3.5 h-3.5" />
                                    Sr No
                                </div>
                            </th>
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <List className="w-3.5 h-3.5" />
                                    Washroom Name
                                </div>
                            </th>
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5" />
                                    Zone
                                </div>
                            </th>
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <Star className="w-3.5 h-3.5" />
                                    Current Score
                                </div>
                            </th>
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <Star className="w-3.5 h-3.5" />
                                    Avg Rating
                                </div>
                            </th>
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" />
                                    Cleaner
                                </div>
                            </th>
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5" />
                                    Facility
                                </div>
                            </th>
                            <th className="px-5 py-4 text-left font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-3.5 h-3.5" />
                                    Status
                                </div>
                            </th>
                            <th className="px-5 py-4 text-right font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter text-[11px]">
                                <div className="flex items-center justify-end gap-2">
                                    <Settings className="w-3.5 h-3.5" />
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[hsl(var(--border))]">
                        {rows.length > 0 ? (
                            rows.map((washroom, index) => (
                                <WashroomRow
                                    key={washroom.id}
                                    index={index}
                                    washroom={washroom}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="py-20 text-center bg-slate-50">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-white rounded-full shadow-sm">
                                            <Activity className="w-8 h-8 text-[hsl(var(--muted-foreground))] opacity-20" />
                                        </div>
                                        <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">No washroom records found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Table Footer / Summary */}
            <div className="px-6 py-3 bg-white border-t border-[hsl(var(--border))] flex items-center justify-between">
                <p className="text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
                    Showing {rows.length} Total Facilities
                </p>

            </div>
        </div>
    );
}