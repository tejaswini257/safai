"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    UserPlus,
    Briefcase,
    Lock,
    ShieldCheck,
    Check,
    X,
    ChevronDown
} from 'lucide-react';

export default function AddUserFullPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        company: 'Nagpur Municipal Corporation Pilot',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: 'Cleaner',
    });

    const roleOptions = ['Admin', 'Supervisor', 'Cleaner'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGoBack = () => {
        router.push('/dashboard/user-management');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.phone || !formData.password) {
            alert("Please fill out all required fields.");
            return;
        }
        handleGoBack();
    };

    return (
        // Changed pt-12 to pt-6 to keep it higher up on the screen
        <div className="h-screen bg-[#F8FAFB] w-full pt-6 pb-6 px-6 relative overflow-hidden flex flex-col items-center justify-center">

            {/* Background Decorative Blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6F7F9] rounded-full blur-[100px] opacity-50 -mr-40 -mt-40 pointer-events-none" />

            {/* 1. Back Button */}
            <div className="absolute top-6 left-8 z-20">
                <button
                    onClick={handleGoBack}
                    className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#58BECF] transition-all"
                >
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:border-[#58BECF] group-hover:shadow-md transition-all">
                        <ArrowLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="hidden lg:block">Back</span>
                </button>
            </div>

            {/* 2. Main Form Card - Reduced width to max-w-lg and padding to keep it compact */}
            <div className="max-w-lg w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-700 relative z-10">

                {/* Inner Card Header - Compact py-4 */}
                <div className="bg-[#E6F7F9] px-8 py-4 border-b border-[#D1F0F2] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                           <UserPlus size={18} className="text-[#007C85]" />
                        </div>
                        <h2 className="text-[#007C85] font-black text-xs uppercase tracking-widest">
                            Account Configuration
                        </h2>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-[#28C76F] animate-pulse" />
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">

                    {/* Organizational Node */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                            <Briefcase size={12} /> Assigned Operations Node
                        </label>
                        <div className="flex items-center justify-between border border-slate-50 rounded-2xl p-4 bg-[#F8FAFB]/80">
                            <div className="text-left">
                                <p className="text-[13px] font-black text-[#007C85] uppercase leading-tight">
                                    {formData.company}
                                </p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                                    Primary Management Group
                                </p>
                            </div>
                            {/* Improved Verified Badge */}
                            <span className="px-3 py-1.5 bg-white rounded-lg text-[10px] font-black text-[#007C85] border border-[#D1F0F2] uppercase shadow-sm flex items-center justify-center leading-none">
                                Verified
                            </span>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="space-y-4">
                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Legal Name"
                                className="w-full px-5 py-3.5 rounded-xl border border-slate-100 bg-[#F8FAFB] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#58BECF] transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="staff@saaf.ai"
                                    className="w-full px-5 py-3.5 rounded-xl border border-slate-100 bg-[#F8FAFB] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#58BECF] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                    className="w-full px-5 py-3.5 rounded-xl border border-slate-100 bg-[#F8FAFB] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#58BECF] transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Security & Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <Lock size={12} /> Password *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 rounded-xl border border-slate-100 bg-[#F8FAFB] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#58BECF] transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <ShieldCheck size={12} /> Access Level *
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-xl border border-slate-100 bg-[#F8FAFB] text-[11px] font-black text-[#007C85] outline-none appearance-none cursor-pointer uppercase tracking-widest"
                                    required
                                >
                                    {roleOptions.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#58BECF]">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Group - Centered Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className="flex-1 px-4 py-4 rounded-2xl border-2 border-slate-50 bg-white text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-all flex items-center justify-center gap-2"
                        >
                            <X size={14} strokeWidth={3} /> Discard
                        </button>
                        <button
                            type="submit"
                            style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
                            className="flex-[1.5] px-4 py-4 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Check size={18} strokeWidth={3} /> Initialize Staff
                        </button>
                    </div>
                </form>
            </div>

            {/* Footnote - Reduced mt */}
            <p className="mt-6 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center opacity-60 max-w-xs mx-auto relative z-10">
                Automatic synchronization with real-time operations enabled.
            </p>
        </div>
    );
}