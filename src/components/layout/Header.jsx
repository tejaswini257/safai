"use client";

import { Building2, LogOut, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white">
      <div className="flex h-14 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-slate-900">
            <Building2 className="h-6 w-6 text-indigo-500" />
            <h1 className="text-lg font-semibold leading-none">
              Nagpur Muncipal Corporation 
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-slate-900">Test Intern</p>
            <p className="text-xs font-semibold text-red-600">ADMIN</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#111c31] px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow md:px-4">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

