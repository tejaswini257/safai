"use client";

import { LogOut, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white">
      <div className="flex h-14 items-center justify-between px-4 md:px-8">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="text-lg font-semibold text-slate-900">
            Nagpur Municipal Corporation
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cartoon Avatar */}
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=TestIntern"
            alt="User Avatar"
            className="h-9 w-9 rounded-full border border-[#EAF7F8] bg-white"
          />

          {/* Username */}
          <p className="hidden text-sm font-medium text-slate-900 md:block">
            Test Intern
          </p>

          {/* Logout Icon */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
