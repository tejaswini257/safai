"use client";

import { useState } from "react";
import { SaveButton } from "./SharedUI";

export default function ZonalTab({ onNotify }) {
    const [loading, setLoading] = useState(false);

    // Initial zones based on your hierarchy
    const zones = [
        "Nagpur Urban",
        "Dharampeth Zone",
        "Sadar Zone",
        "Nehru Nagar Zone",
        "Manish Nagar Zone",
        "Nagpur East"
    ];

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onNotify("Zonal configuration saved!");
        }, 1000);
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            <div>
                <h2 className="text-xl font-black text-slate-800">Hierarchy Visibility</h2>
                <p className="text-sm text-slate-500 font-medium">
                    Configure which zones appear in your quick-access dashboard and daily reports.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {zones.map((zone) => (
                    <div
                        key={zone}
                        // Updated hover border to match your new branding (#58BECF)
                        className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-[#58BECF]/30 transition-all bg-slate-50/30 group"
                    >
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-700 uppercase tracking-tight">
                                {zone}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">
                                Active Coverage
                            </span>
                        </div>
                        <input
                            type="checkbox"
                            // Updated accent color to match the gradient start color
                            className="accent-[#58BECF] h-5 w-5 cursor-pointer rounded-lg"
                            defaultChecked
                        />
                    </div>
                ))}
            </div>

            {/* Note box color adjustment for consistency */}
            <div className="p-4 bg-[#58BECF]/5 rounded-2xl border border-[#58BECF]/10">
                <p className="text-[10px] text-[#4A8A94] font-black uppercase leading-relaxed">
                    Note: Disabling a zone here only hides it from your personal view.
                    It will still be tracked in the master inspection registry.
                </p>
            </div>

            {/* Inherits linear-gradient from SharedUI.js */}
            <SaveButton onClick={handleSave} loading={loading} />
        </div>
    );
}