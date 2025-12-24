"use client";

import { useRouter } from "next/navigation";
import { FolderPlus, X, Check, Info, Layers } from "lucide-react";

export default function CreateHierarchyForm() {
    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto rounded-[24px] bg-white border border-slate-100 shadow-sm overflow-hidden">
            {/* Header: Teal Aesthetic */}
            <div className="bg-[#E6F7F9] px-8 py-5 border-b border-[#D1F0F2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <FolderPlus className="w-5 h-5 text-[#2D8E97]" />
                    </div>
                    <div>
                        <h2 className="text-[#007C85] font-extrabold text-sm uppercase tracking-wider">
                            Create New Hierarchy
                        </h2>
                        <p className="text-[10px] font-bold text-[#2D8E97] opacity-70 uppercase tracking-tighter">
                            Add a new structural node to the registry
                        </p>
                    </div>
                </div>
                <div className="p-2 bg-[#D1F0F2] rounded-full text-[#2D8E97]">
                    <Layers size={16} />
                </div>
            </div>

            <div className="p-8 space-y-6">
                {/* Hierarchy Name */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[11px] font-black text-[#5A607F] uppercase tracking-widest">
                        Hierarchy Name <span className="text-[#EA5455]">*</span>
                    </label>
                    <div className="relative group">
                        <input
                            placeholder="e.g., Ward, Floor, Platform"
                            className="w-full rounded-xl border border-slate-200 bg-[#F8FAFB] px-4 py-3 text-sm font-medium text-[#007C85] outline-none focus:border-[#2D8E97] focus:bg-white focus:ring-4 focus:ring-[#E6F7F9] transition-all"
                        />
                    </div>
                </div>

                {/* Parent Hierarchy */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[11px] font-black text-[#5A607F] uppercase tracking-widest">
                        Parent Hierarchy <span className="text-slate-300 font-normal lowercase">(Optional)</span>
                    </label>
                    <select
                        defaultValue="No Parent"
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFB] px-4 py-3 text-sm font-bold text-[#2D8E97] outline-none focus:border-[#2D8E97] focus:bg-white transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%232D8E97%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                    >
                        <option>No Parent (Top Level)</option>
                        <option>Nagpur Urban</option>
                        <option>Dharampeth Zone</option>
                        <option>Nehru Nagar Zone</option>
                    </select>
                    <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-[#F0FAFB] rounded-lg">
                        <Info size={14} className="text-[#2D8E97]" />
                        <p className="text-[10px] font-bold text-[#2D8E97] uppercase tracking-tight">
                            Select a parent node to establish the structural mapping
                        </p>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 pt-4">
                    {/* Cancel */}
                    <button
                        onClick={() => router.back()}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-[#EA5455] hover:border-[#FCEAEB] transition-all active:scale-95"
                    >
                        <X size={16} />
                        Discard
                    </button>

                    {/* Submit */}
                    <button 
                        className="flex-[2] flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-black text-white uppercase tracking-widest shadow-[0_10px_20px_rgba(0,124,133,0.2)] hover:opacity-90 transition-all active:scale-95"
                        style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
                    >
                        <Check size={16} />
                        Create Location Hierarchy
                    </button>
                </div>
            </div>

            {/* Footer Status Feed */}
            <div className="px-8 py-3 bg-[#F8FAFB] border-t border-slate-50 flex items-center justify-end gap-2">
                <div className="h-2 w-2 rounded-full bg-[#28C76F]" />
                <span className="text-[10px] font-black text-[#2D8E97] uppercase tracking-tighter">
                    Live Registry Sync Active
                </span>
            </div>
        </div>
    );
}