"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Hash,
    Navigation2,
    Activity,
    Edit3,
    Trash2,
    MapPin,
    Map
} from "lucide-react";

export default function LocationTable() {
    const router = useRouter();

    const [locationData, setLocationData] = useState([
        { id: "114", name: "Nagpur Urban", parent_id: null },
        { id: "115", name: "Dharampeth Zone", parent_id: "114" },
        { id: "118", name: "Nehru Nagar Zone", parent_id: "114" },
        { id: "126", name: "Dhantoli", parent_id: "114" },
        { id: "127", name: "Sadar Zone", parent_id: "114" },
        { id: "131", name: "Nagpur East", parent_id: "114" },
        { id: "132", name: "Manish Nagar Zone", parent_id: "114" },
        { id: "133", name: "Shanti Nagar", parent_id: "114" },
        { id: "134", name: "Nagpur Ruaral", parent_id: null },
        { id: "135", name: "Butobori", parent_id: "114" }
    ]);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this zone?")) {
            const updatedData = locationData.filter((item) => item.id !== id);
            setLocationData(updatedData);
        }
    };

    const getParentName = (parentId) => {
        if (!parentId) return "—";
        const parent = locationData.find(loc => loc.id === parentId);
        return parent ? parent.name : "Unknown";
    };

    return (
        <div className="rounded-[24px] bg-white shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-[#E6F7F9]">
                            <th className="px-6 py-5 text-left border-b border-[#D1F0F2] sticky top-0 z-10">
                                <div className="flex items-center gap-2 text-[#2D8E97] font-black text-[10px] uppercase tracking-widest">
                                    <Hash size={14} strokeWidth={3} /> SR NO
                                </div>
                            </th>
                            <th className="px-6 py-5 text-left border-b border-[#D1F0F2] sticky top-0 z-10">
                                <div className="flex items-center gap-2 text-[#2D8E97] font-black text-[10px] uppercase tracking-widest">
                                    <Navigation2 size={14} strokeWidth={3} /> Zone Name
                                </div>
                            </th>
                            <th className="px-6 py-5 text-left border-b border-[#D1F0F2] sticky top-0 z-10">
                                <div className="flex items-center gap-2 text-[#2D8E97] font-black text-[10px] uppercase tracking-widest">
                                    <Activity size={14} strokeWidth={3} /> Parent Hierarchy
                                </div>
                            </th>
                            {/* NEW COLUMN: Locate on Map */}
                            <th className="px-6 py-5 text-center border-b border-[#D1F0F2] sticky top-0 z-10">
                                <div className="flex items-center justify-center gap-2 text-[#2D8E97] font-black text-[10px] uppercase tracking-widest">
                                    <Map size={14} strokeWidth={3} /> Map view
                                </div>
                            </th>
                            <th className="px-6 py-5 text-center border-b border-[#D1F0F2] sticky top-0 z-10 text-[#2D8E97] font-black text-[10px] uppercase tracking-widest">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {locationData.map((loc, index) => (
                            <tr key={loc.id} className="hover:bg-[#F8FDFF] transition-all group">
                                <td className="px-6 py-5 text-slate-400 font-bold text-xs text-left">
                                    {(index + 1).toString().padStart(2, '0')}
                                </td>

                                <td className="px-6 py-5">
                                    <span className="text-[#007C85] font-black text-sm tracking-tight group-hover:text-[#58BECF] transition-colors">
                                        {loc.name}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="inline-flex items-center px-3 py-1 bg-[#F8FAFB] border border-slate-100 rounded-lg text-slate-500 font-bold text-[10px] uppercase tracking-wider group-hover:bg-[#E6F7F9] group-hover:text-[#2D8E97] transition-all">
                                        {getParentName(loc.parent_id)}
                                    </div>
                                </td>

                                {/* LOCATE ON MAP BUTTON */}
                                <td className="px-6 py-5 text-center">
                                    <button
                                        onClick={() => router.push(`/dashboard/locate?zoneId=${loc.id}`)}
                                        title={`Show all locations in ${loc.name}`}
                                        className="inline-flex items-center justify-center p-2.5 bg-white border border-slate-200 rounded-xl text-[#007C85] hover:bg-[#007C85] hover:text-white hover:shadow-lg hover:shadow-[#007C85]/20 transition-all active:scale-95"
                                    >
                                        <MapPin size={16} strokeWidth={2.5} />
                                    </button>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => router.push(`/dashboard/locationHierarchy/edit/${loc.id}`)}
                                            title="Edit Zone Information"
                                            className="p-2.5 bg-white border border-slate-100 rounded-xl text-[#58BECF] hover:bg-[#E6F7F9] hover:border-[#58BECF]/30 transition-all shadow-sm active:scale-90"
                                        >
                                            <Edit3 size={16} strokeWidth={2.5} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(loc.id)}
                                            title="Permanently Delete Zone"
                                            className="p-2.5 bg-white border border-slate-100 rounded-xl text-rose-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm active:scale-90"
                                        >
                                            <Trash2 size={16} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-8 py-5 bg-[#F8FAFB] border-t border-slate-100 flex justify-between items-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Safai Portal Architecture Overview
                </p>
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#58BECF] animate-pulse" />
                    <span className="text-[10px] font-black text-[#007C85] uppercase tracking-widest">
                        {locationData.length} Total Zones Registered
                    </span>
                </div>
            </div>
        </div>
    );
}