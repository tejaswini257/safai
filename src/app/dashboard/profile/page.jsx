"use client";

import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, ShieldCheck, Edit3, LogOut, Camera } from "lucide-react";
import StatusBadge from "@/components/washroommain/StatusBadge";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        router.push("auth/login");
    };

    const userData = {
        name: "Anil Saafai User",
        role: "Zonal Supervisor",
        email: "anilRashilpur@gmail.com",
        phone: "8888888810",
        zone: "Nagpur Urban",
        joined: "12 Nov 2025",
        status: "active"
    };

    // Shared brand gradient
    const brandGradient = "linear-gradient(to right, #58BECF, #6D9CDC)";

    return (
        <div className="min-h-screen bg-[#F8FAFB] pb-12 transition-colors duration-300">
            <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-6">

                {/* 1. IDENTITY HEADER CARD */}
                <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    {/* Decorative Circle matching branding */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#58BECF] rounded-full -mr-32 -mt-32 opacity-10" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            {/* Avatar Container with Gradient */}
                            <div
                                style={{ background: brandGradient }}
                                className="h-32 w-32 rounded-[40px] flex items-center justify-center border-4 border-white shadow-xl"
                            >
                                <span className="text-4xl font-black text-white uppercase">{userData.name.charAt(0)}</span>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-[#58BECF] hover:scale-110 transition-transform">
                                <Camera size={18} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="text-center md:text-left space-y-2 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                                {/* Gradient Header Text */}
                                <h1
                                    className="text-3xl font-black tracking-tight"
                                    style={{
                                        background: brandGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    {userData.name}
                                </h1>
                                <StatusBadge status={userData.status} />
                            </div>
                            <p className="text-sm font-black text-[#58BECF] uppercase tracking-[0.2em]">{userData.role}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                    <MapPin size={14} /> {userData.zone}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                    <ShieldCheck size={14} /> Joined {userData.joined}
                                </div>
                            </div>
                        </div>

                        {/* Edit Profile Button with Gradient */}
                        <Link
                            href="/dashboard/profile/edit"
                            style={{ background: brandGradient }}
                            className="flex items-center gap-2 px-6 py-3 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 hover:shadow-lg transition-all active:scale-95"
                        >
                            <Edit3 size={14} /> Edit Profile
                        </Link>
                    </div>
                </div>

                {/* 2. INFORMATION GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Contact Registry</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-[#F8FAFB] rounded-xl text-[#58BECF]"><Mail size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-bold text-slate-700">{userData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-[#F8FAFB] rounded-xl text-[#58BECF]"><Phone size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                                    <p className="text-sm font-bold text-slate-700">{userData.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-50">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-3 text-rose-500 font-black text-[10px] uppercase tracking-[0.2em] border border-rose-50 rounded-2xl hover:bg-rose-50 transition-colors active:scale-[0.98]"
                            >
                                <LogOut size={14} /> Sign Out Account
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                        <div className="h-20 w-20 rounded-full bg-[#E6F7F9] flex items-center justify-center">
                            <ShieldCheck size={32} className="text-[#58BECF]" />
                        </div>
                        <div>
                            {/* Section title matches branding */}
                            <h4 className="font-black text-[#58BECF] text-sm uppercase tracking-widest">Workspace Compliance</h4>
                            <p className="text-xs font-bold text-slate-400 mt-1 max-w-xs">Data Verified Registry for Compliance Monitoring.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}