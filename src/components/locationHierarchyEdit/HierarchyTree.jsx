"use client";

import { GitBranch } from "lucide-react";

export default function HierarchyTree() {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm h-full">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-10 w-10 rounded-xl bg-[#E6F7F9] flex items-center justify-center">
                    <GitBranch size={20} className="text-[#58BECF]" strokeWidth={2.5} />
                </div>
                <div className="text-left">
                    <h2 className="text-[11px] font-black text-[#007C85] uppercase tracking-widest leading-none">
                        Zone Topology
                    </h2>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Live Relationship Map
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center py-4">
                {/* Root Zone */}
                <div className="relative">
                    <div className="rounded-2xl border-2 border-[#58BECF] bg-white px-6 py-4 shadow-md text-[#007C85] font-black text-[11px] uppercase tracking-wider z-10 relative">
                        Nagpur Urban <span className="ml-2 text-slate-300 font-bold">#114</span>
                    </div>
                    <div className="absolute left-1/2 top-full h-10 w-0.5 bg-slate-100 -translate-x-1/2"></div>
                </div>

                <div className="mt-10 flex gap-8 relative">
                    <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-100 -translate-y-10"></div>

                    {/* Children */}
                    {[
                        { name: "Nagpur Rural", id: "134", active: false },
                        { name: "Dharampeth", id: "115", active: true }
                    ].map((node) => (
                        <div key={node.id} className="relative">
                            <div className="absolute -top-10 left-1/2 h-10 w-0.5 bg-slate-100 -translate-x-1/2"></div>
                            <div className={`rounded-2xl px-5 py-3 shadow-sm border font-black text-[10px] uppercase tracking-wider transition-all ${node.active
                                    ? "bg-[#E6F7F9] border-[#D1F0F2] text-[#007C85]"
                                    : "bg-[#F8FAFB] border-slate-100 text-slate-400"
                                }`}>
                                {node.name} <span className="ml-1 opacity-40">#{node.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}