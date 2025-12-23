"use client";

import { Network, Building2, Map, Hash, ChevronRight, Activity } from "lucide-react";

export default function HierarchyTreePreview() {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden h-full">
            {/* Header: Branded Light Cyan */}
            <div className="bg-[#E6F7F9] px-8 py-5 border-b border-[#D1F0F2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Network className="h-5 w-5 text-[#58BECF]" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-[#007C85] font-black text-[11px] uppercase tracking-[0.2em] leading-none">
                            Architecture Preview
                        </h2>
                        <p className="text-[9px] font-bold text-[#2D8E97] uppercase tracking-widest mt-1 opacity-70">
                            Real-time Mapping Logic
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full border border-white">
                    <Activity size={10} className="text-[#28C76F] animate-pulse" />
                    <span className="text-[8px] font-black text-[#007C85] uppercase tracking-tighter">Live Preview</span>
                </div>
            </div>

            <div className="p-10 relative bg-[#F8FAFB]/50">
                {/* Visual Connector: Branded Teal Path */}
                <svg className="absolute left-[54px] top-[115px] w-10 h-48 pointer-events-none" fill="none">
                    <path
                        d="M 2 0 V 160 H 35"
                        stroke="#D1F0F2"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 2 0 V 65 H 35"
                        stroke="#D1F0F2"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>

                <div className="space-y-16 relative">

                    {/* ROOT NODE: Master Zone */}
                    <div className="flex items-center gap-6 group">
                        <div className="relative z-10 h-10 w-10 rounded-2xl bg-[#007C85] border-4 border-white shadow-lg flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
                            <Building2 size={18} className="text-white" />
                        </div>
                        <div className="flex-1 bg-white border border-slate-100 rounded-[22px] p-5 shadow-sm transition-all group-hover:shadow-md group-hover:border-[#58BECF]/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black text-[#007C85] uppercase tracking-[0.1em]">Nagpur Urban</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Master Root Zone</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F8FAFB] rounded-lg border border-slate-100">
                                    <Hash size={10} className="text-[#58BECF]" />
                                    <span className="text-[10px] font-black text-[#2D8E97]">113</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CHILD NODES CONTAINER */}
                    <div className="space-y-8 ml-14">

                        {/* CHILD 01 */}
                        <div className="flex items-center gap-5 group">
                            <div className="relative z-10 h-6 w-6 rounded-xl bg-white border-2 border-[#D1F0F2] shadow-sm flex-shrink-0 flex items-center justify-center transition-all group-hover:bg-[#E6F7F9]">
                                <div className="h-2 w-2 rounded-full bg-[#28C76F]" />
                            </div>
                            <div className="flex-1 bg-white border border-slate-100 rounded-[18px] p-4 transition-all group-hover:shadow-sm group-hover:border-[#D1F0F2]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#F8FAFB] rounded-lg">
                                            <Map size={14} className="text-[#58BECF]" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-700 uppercase tracking-tight">Dharampeth Zone</p>
                                            <p className="text-[9px] font-bold text-[#28C76F] mt-0.5 uppercase tracking-tighter">Status: Active Architecture</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-200 group-hover:text-[#58BECF] transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* CHILD 02 */}
                        <div className="flex items-center gap-5 group">
                            <div className="relative z-10 h-6 w-6 rounded-xl bg-white border-2 border-[#D1F0F2] shadow-sm flex-shrink-0 flex items-center justify-center transition-all group-hover:bg-[#E6F7F9]">
                                <div className="h-2 w-2 rounded-full bg-[#58BECF]" />
                            </div>
                            <div className="flex-1 bg-white border border-slate-100 rounded-[18px] p-4 transition-all group-hover:shadow-sm group-hover:border-[#D1F0F2]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#F8FAFB] rounded-lg">
                                            <Map size={14} className="text-[#58BECF]" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-700 uppercase tracking-tight">Nagpur East</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">Status: Pending Sync</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-200 group-hover:text-[#58BECF] transition-colors" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer Summary */}
            <div className="bg-[#F8FAFB] px-8 py-5 border-t border-slate-100 flex justify-between items-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Structural Integrity: Validated
                </p>
                <span className="text-[9px] font-black text-[#58BECF] uppercase tracking-widest">
                    v2.4.0-build
                </span>
            </div>
        </div>
    );
}