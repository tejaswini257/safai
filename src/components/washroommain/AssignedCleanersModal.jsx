"use client";

import { X, User, Phone, ShieldCheck } from "lucide-react";

export default function AssignedCleanersModal({ cleaners, onClose }) {
    if (!cleaners) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            {/* Modal Container */}
            <div className="bg-white rounded-[28px] w-full max-w-sm shadow-2xl overflow-hidden border border-slate-100">

                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFB]">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#E6F7F9] flex items-center justify-center">
                            <ShieldCheck size={18} className="text-[#58BECF]" />
                        </div>
                        <h3 className="font-black text-[#007C85] text-xs uppercase tracking-widest">
                            Assigned Cleaners
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-400 hover:text-slate-600 active:scale-90"
                    >
                        <X size={20} strokeWidth={3} />
                    </button>
                </div>

                {/* Cleaners List */}
                <div className="p-5 space-y-3 max-h-[400px] overflow-y-auto">
                    {cleaners.length > 0 ? (
                        cleaners.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFB] border border-slate-100 group transition-all">
                                <div className="text-left space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User size={12} className="text-[#58BECF]" />
                                        <p className="text-sm font-bold text-slate-700">
                                            {item.cleaner_user?.name || "Unknown User"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={10} className="text-slate-300" />
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                            {item.cleaner_user?.phone || "No Phone"}
                                        </p>
                                    </div>
                                </div>

                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${item.status === 'assigned'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-slate-100 text-slate-400 border-slate-200'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            No cleaners assigned
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-[#F8FAFB] border-t border-slate-50">
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] text-center">
                        Safai Portal Registry
                    </p>
                </div>
            </div>
        </div>
    );
}