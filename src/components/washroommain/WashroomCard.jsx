"use client";

import { MapPin, Star, User, Check, X } from "lucide-react";
import Link from "next/link";

export default function WashroomCard({ washroom, index }) {
    if (!washroom) return null;

    const primaryCleaner = washroom.cleaner_assignments?.[0]?.cleaner_user?.name || "Unassigned";
    const extraCount = washroom.cleaner_assignments?.length > 1 ? washroom.cleaner_assignments.length - 1 : 0;
    const score = washroom.current_cleaning_score ?? washroom.average_cleaning_score ?? "-";
    const rating = washroom.averageRating?.toFixed(1) ?? "-";

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                <Link href={`/dashboard/washrooms/${washroom.id}`} className="hover:text-blue-600">
                                    {washroom.name}
                                </Link>
                            </h3>
                            <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                                <span className="truncate">{washroom.location_types?.name || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
                            <Star className="w-3 h-3 mr-1" />
                            {score}/10
                        </div>
                        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                            {rating}/10
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Cleaner</span>
                        <div className="flex-1">
                            <div className="flex items-center">
                                <User className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="font-medium">{primaryCleaner}</span>
                                {extraCount > 0 && (
                                    <span className="ml-1 text-xs text-gray-500">+{extraCount} more</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Facility</span>
                        <span className="font-medium">
                            {washroom.facility_companies?.name || "N/A"}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Status</span>
                        <div className="flex items-center">
                            {washroom.status ? (
                                <>
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-green-700 font-medium">Active</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                                    <span className="text-gray-500 font-medium">Inactive</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                    <Link
                        href={`/dashboard/washrooms/${washroom.id}`}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 -mr-2"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
