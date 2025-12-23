"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Save } from "lucide-react";
import Link from "next/link";

export default function EditProfilePage() {
    const router = useRouter();

    // Initial state matching your userData schema
    const [formData, setFormData] = useState({
        name: "Anil Saafai User",
        email: "anilRashilpur@gmail.com",
        phone: "8888888810",
        zone: "Nagpur Urban"
    });

    const handleSave = (e) => {
        e.preventDefault();
        // Here you would normally call your API
        alert("Profile Registry Updated Successfully!");
        router.push("/dashboard/profile");
    };

    return (
        <div className="min-h-screen bg-[#F8FAFB] pb-12 transition-colors duration-300">
            <div className="max-w-[800px] mx-auto p-4 md:p-8 space-y-6">

                {/* 1. HEADER WITH BACK ACTION */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard/profile"
                            className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#007C85] transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} strokeWidth={3} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-[#007C85] uppercase tracking-tight">Edit Profile</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update your administrative credentials</p>
                        </div>
                    </div>
                </div>

                {/* 2. MAIN EDIT FORM CARD */}
                <form onSubmit={handleSave} className="bg-white border border-slate-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="p-8 space-y-8">

                        {/* Avatar Edit Section */}
                        <div className="flex flex-col items-center gap-4 py-4 border-b border-slate-50">
                            <div className="relative group">
                                <div className="h-24 w-24 rounded-[32px] bg-[#E6F7F9] flex items-center justify-center border-4 border-white shadow-lg">
                                    <User size={40} className="text-[#58BECF]" />
                                </div>
                                <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-[#007C85] text-white rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Change Profile Photo</p>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#007C85] uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-[#F8FAFB] border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#58BECF]/10 focus:border-[#58BECF] transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#007C85] uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-[#F8FAFB] border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#58BECF]/10 focus:border-[#58BECF] transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#007C85] uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-[#F8FAFB] border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#58BECF]/10 focus:border-[#58BECF] transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#007C85] uppercase tracking-widest ml-1">Assigned Zone</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        value={formData.zone}
                                        readOnly
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-400 cursor-not-allowed outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Footer Actions */}
                    <div className="px-8 py-6 bg-[#F8FAFB] border-t border-slate-100 flex justify-end gap-3">
                        <Link
                            href="/dashboard/profile"
                            className="px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 bg-[#007C85] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#58BECF] hover:shadow-lg hover:shadow-[#007C85]/20 transition-all active:scale-95 shadow-md"
                        >
                            <Save size={14} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}