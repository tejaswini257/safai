"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardPlus,
  Users,
  ChevronDown,
  ArrowLeft,
  ShieldCheck,
  Check
} from "lucide-react";

export default function CreateAssignmentsPage() {
  const router = useRouter();
  const [isMultipleMode, setIsMultipleMode] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const roles = ["All Roles", "Cleaner", "Supervisor"];

  const handleBack = () => router.back();

  return (
    <div className="min-h-screen bg-[#F8FAFB] w-full pt-8 pb-12 px-6 flex flex-col items-center relative overflow-hidden">

      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6F7F9] rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />

      {/* 1. Back Button: Absolute Left (Matches previous pages) */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#58BECF] transition-all"
        >
          <div className="h-9 w-9 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:border-[#58BECF] group-hover:shadow-md transition-all">
            <ArrowLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="hidden lg:block">Return</span>
        </button>
      </div>



      {/* 3. Compact Assignment Card (Reduced Width: max-w-xl) */}
      <div className="max-w-xl w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">

        {/* Inner Card Banner */}
        <div className="bg-[#E6F7F9] px-6 py-4 border-b border-[#D1F0F2] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClipboardPlus size={16} className="text-[#58BECF]" />
            <h1 className="text-lg font-extrabold tracking-tight text-[#007c85]"> Create Assignments</h1>

          </div>
          <div className="h-2 w-2 rounded-full bg-[#28C76F] animate-pulse" />
        </div>

        <form className="p-8 space-y-6">

          {/* Mode Toggle Box (Compact) */}
          <div className="bg-[#F8FAFB] border border-slate-50 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="text-[#58BECF]" size={18} />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">Multiple Mode</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Bulk Mapping Active</p>
              </div>
            </div>

            {/* Custom Toggle Switch (Teal Color) */}
            <button
              type="button"
              onClick={() => setIsMultipleMode(!isMultipleMode)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ${isMultipleMode ? 'bg-[#58BECF]' : 'bg-slate-200'
                }`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-md ${isMultipleMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Filter Bar (Teal Branded) */}
          <div className="text-left space-y-3 bg-[#F0FBFC] p-5 rounded-2xl border border-cyan-50">
            <p className="text-[9px] font-black text-[#007C85]/60 uppercase tracking-widest ml-1">Filter by Role</p>
            <div className="flex gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setRoleFilter(role)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${roleFilter === role
                    ? 'bg-[#58BECF] border-[#58BECF] text-white shadow-md'
                    : 'bg-white border-slate-100 text-slate-400 hover:border-cyan-200'
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Selection Dropdowns */}
          <div className="space-y-4">
            <div className="text-left space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Users</label>
              <div className="relative cursor-pointer group">
                <input
                  type="text"
                  readOnly
                  placeholder="Choose personnel..."
                  className="w-full px-5 py-3 rounded-xl border border-slate-100 bg-[#F8FAFB] text-xs font-bold text-slate-700 outline-none focus:border-[#58BECF] transition-all cursor-pointer"
                />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-[#58BECF]" size={16} />
              </div>
            </div>

            <div className="text-left space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Locations</label>
              <div className="relative cursor-pointer group">
                <input
                  type="text"
                  readOnly
                  placeholder="Choose facilities..."
                  className="w-full px-5 py-3 rounded-xl border border-slate-100 bg-[#F8FAFB] text-xs font-bold text-slate-700 outline-none focus:border-[#58BECF] transition-all cursor-pointer"
                />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-[#58BECF]" size={16} />
              </div>
            </div>
          </div>

          {/* Action Button: Teal Gradient */}
          <div className="pt-4 border-t border-slate-50">
            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
              className="w-full py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-cyan-500/20 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Check size={16} strokeWidth={3} /> Initialize Assignments
            </button>
          </div>
        </form>
      </div>

      <p className="mt-8 text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] opacity-60">
        System Registry Synchronization Active
      </p>
    </div>
  );
}