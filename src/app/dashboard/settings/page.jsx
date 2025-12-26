"use client";

import { useState } from "react";
import { User, Bell, Map, Shield, CheckCircle2 } from "lucide-react";
import ProfileTab from "@/components/settings/ProfileTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import ZonalTab from "@/components/settings/ZonalTab";
import SecurityTab from "@/components/settings/SecurityTab";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [message, setMessage] = useState("");

    const notify = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User, component: ProfileTab },
        { id: "notifications", label: "Notifications", icon: Bell, component: NotificationsTab },
        { id: "zonal", label: "Zonal Config", icon: Map, component: ZonalTab },
        { id: "security", label: "Security", icon: Shield, component: SecurityTab },
    ];

    const ActiveComponent = tabs.find(t => t.id === activeTab).component;

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#007C85] tracking-tight">Account Settings</h1>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest opacity-70">
                        Manage your Safai Portal preferences
                    </p>
                </div>
                {message && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 animate-bounce">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">{message}</span>
                    </div>
                )}
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? "bg-[#007C85] text-white shadow-xl shadow-[#007C85]/20"
                                    : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                <main className="flex-1 bg-white border border-slate-100 rounded-[32px] p-6 md:p-10 shadow-sm relative overflow-hidden">
                    <ActiveComponent onNotify={notify} />
                </main>
            </div>
        </div>
    );
}