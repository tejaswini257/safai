"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import Link from "next/link";
import { MapPin, Star, User } from "lucide-react";
import AssignedCleanersModal from "./AssignedCleanersModal"; // You'll create this component below

export default function WashroomRow({ washroom, index }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!washroom) return null;

    const mapUrl = washroom.latitude && washroom.longitude
        ? `https://www.google.com/maps?q=${washroom.latitude},${washroom.longitude}`
        : "#";

    // Data Mapping logic for Cleaners
    const assignments = washroom.cleaner_assignments || [];
    const primaryCleaner = assignments.length > 0 ? assignments[0].cleaner_user?.name : "Unassigned";
    const extraCount = assignments.length > 1 ? assignments.length - 1 : 0;

    return (
        <>
            <tr className="border-b border-[hsl(var(--border))] hover:bg-[#F4FBFC] transition-colors group">
                <td className="p-4 text-center text-xs font-bold text-[hsl(var(--muted-foreground))]">
                    {String(index + 1).padStart(2, '0')}
                </td>

                <td className="p-4 font-bold">
                    <Link
                        href={`/dashboard/washrooms/${washroom.id}`}
                        className="text-[hsl(var(--primary-dark))] hover:text-[hsl(var(--primary))] transition-colors"
                    >
                        {washroom.name}
                    </Link>
                </td>

                <td className="p-4 text-sm font-medium text-[hsl(var(--foreground))]">
                    {washroom.location_types?.name || "N/A"}
                </td>

                <td className="p-4">
                    <span className="px-3 py-1 bg-[#E0F7FA] text-[hsl(var(--primary-dark))] rounded-lg text-xs font-extrabold border border-[hsl(var(--primary)/0.1)] shadow-sm">
                        {washroom.current_cleaning_score ?? washroom.average_cleaning_score ?? "-"}
                    </span>
                </td>

                <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{washroom.averageRating ? washroom.averageRating.toFixed(1) : "0.0"}</span>
                    </div>
                </td>

                {/* UPDATED CLEANER COLUMN */}
                <td className="p-4 text-sm font-semibold text-[hsl(var(--foreground))]">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${assignments.length > 0 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <span className="text-[hsl(var(--primary-dark))]">{primaryCleaner}</span>

                        {extraCount > 0 && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-bold transition-colors ml-1"
                            >
                                +{extraCount} more
                            </button>
                        )}
                    </div>
                </td>

                <td className="p-4 text-sm text-[hsl(var(--muted-foreground))]">
                    {washroom.facility_companies?.name || "N/A"}
                </td>


                <td className="p-4">
                    {/* If washroom.status is true -> "active" (Green)
        If washroom.status is false -> "inactive" (Red)
    */}
                    <StatusBadge status={washroom.status ? "active" : "inactive"} />
                </td>

                <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white border border-[hsl(var(--border))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all shadow-sm active:scale-95 group-hover:border-[hsl(var(--primary)/0.3)]"
                        >
                            <MapPin className="w-4 h-4" />
                        </a>
                        <ActionMenu washroomId={washroom.id} />
                    </div>
                </td>
            </tr>

            {/* Modal for viewing all cleaners */}
            {isModalOpen && (
                <AssignedCleanersModal
                    cleaners={assignments}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}