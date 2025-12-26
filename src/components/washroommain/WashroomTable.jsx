"use client";

import WashroomRow from "./WashroomRow";
import WashroomCard from "./WashroomCard";
import { Hash, List, MapPin, Star, User, Building2, Activity, Settings } from "lucide-react";

export default function WashroomTable({ items }) {
    const rows = items ?? [];

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#E0F7FA]">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Hash className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Sr No</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <List className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Washroom</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Zone</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Score</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Rating</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Cleaner</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Facility</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-[#007C85] uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Status</span>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-[#007C85] uppercase tracking-wider">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="sr-only">Actions</span>
                                        <Settings className="w-3.5 h-3.5" />
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
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
                                    <td colSpan="9" className="py-12 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="p-3 bg-gray-50 rounded-full">
                                                <Activity className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-500">No washroom records found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="px-4 sm:px-6 py-3 bg-white border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500">
                        Showing <span className="font-semibold">{rows.length}</span> {rows.length === 1 ? 'facility' : 'facilities'}
                    </p>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-3">
                {rows.length > 0 ? (
                    rows.map((washroom, index) => (
                        <WashroomCard
                            key={washroom.id}
                            washroom={washroom}
                            index={index}
                        />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="p-3 bg-gray-50 rounded-full inline-flex items-center justify-center mb-3">
                            <Activity className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No washroom records found</p>
                    </div>
                )}
            </div>
        </div>
    );
}