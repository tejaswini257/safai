"use client";

import { useRouter } from "next/navigation";
import {
    MoreVertical,
    MapPin,
    ChevronRight,
    Hash,
    Layers,
    Navigation2
} from "lucide-react";

const locations = [
    { id: "01", name: "Nagpur Urban", parent: "—", status: "Active", zone: "HQ Central" },
    { id: "02", name: "Dharampeth Zone", parent: "Nagpur Urban", status: "Active", zone: "Dharampeth" },
    { id: "03", name: "Nehru Nagar Zone", parent: "Nagpur Urban", status: "Inactive", zone: "Nehru Nagar" },
];

export default function LocationTable() {
    const router = useRouter();

    return (
        <div className="rounded-[24px] bg-white shadow-sm border border-slate-100 overflow-hidden">

            {/* Header: Teal Aesthetic matching the screenshot */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-[#E6F7F9]">
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-[#2D8E97] font-bold text-[11px] uppercase tracking-wider">
                                    <Hash size={14} /> SR NO
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-[#2D8E97] font-bold text-[11px] uppercase tracking-wider">
                                    <Navigation2 size={14} /> LOCATION NAME
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-[#2D8E97] font-bold text-[11px] uppercase tracking-wider">
                                    <MapPin size={14} /> ZONE
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-[#2D8E97] font-bold text-[11px] uppercase tracking-wider">
                                PARENT NODE
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-2 text-[#2D8E97] font-bold text-[11px] uppercase tracking-wider">
                                    <Layers size={14} /> STATUS
                                </div>
                            </th>
                            <th className="px-6 py-4 text-center text-[#2D8E97] font-bold text-[11px] uppercase tracking-wider">
                                ACTION
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {locations.map((loc) => (
                            <tr key={loc.id} className="hover:bg-slate-50/50 transition-colors group border-b border-slate-100 last:border-0">
                                {/* Serial No */}
                                <td className="px-6 py-5 text-[#5A607F] font-medium text-center sm:text-left">
                                    {loc.id}
                                </td>

                                {/* Name - Bold Teal */}
                                <td className="px-6 py-5">
                                    <span className="text-[#007C85] font-extrabold text-sm tracking-tight cursor-pointer hover:underline">
                                        {loc.name}
                                    </span>
                                </td>

                                {/* Zone */}
                                <td className="px-6 py-5 text-[#5A607F] font-medium">
                                    {loc.zone}
                                </td>

                                {/* Parent - Pill style badge */}
                                <td className="px-6 py-5">
                                    <div className="inline-flex items-center px-3 py-1 bg-[#F0FAFB] border border-[#D1F0F2] rounded-lg text-[#2D8E97] font-bold text-xs">
                                        {loc.parent}
                                    </div>
                                </td>

                                {/* Status - Red/Green Pill matching screenshot */}
                                <td className="px-6 py-5">
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${loc.status === "Active"
                                            ? "bg-[#E7F8F1] text-[#28C76F]"
                                            : "bg-[#FCEAEB] text-[#EA5455]"
                                        }`}>
                                        {loc.status}
                                    </span>
                                </td>

                                {/* Actions - Icon matching the screenshot */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="p-2 bg-[#F0FAFB] rounded-lg cursor-pointer hover:bg-[#D1F0F2] transition-colors">
                                            <MapPin size={16} className="text-[#007C85]" />
                                        </div>
                                        <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                                            <MoreVertical size={18} className="text-slate-400" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer matching screenshot */}
            <div className="px-8 py-4 bg-white border-t border-slate-50 flex justify-between items-center">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Showing {locations.length} Total Facilities
                </p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#28C76F]" />
                    <span className="text-[10px] font-black text-[#2D8E97] uppercase tracking-tighter">
                        Live Data Feed
                    </span>
                </div>
            </div>
        </div>
    );
}