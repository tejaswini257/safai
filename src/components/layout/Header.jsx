"use client";

import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({ onMenuClick }) {
  const router = useRouter();

  // Function to handle Sign Out logic
  const handleLogout = () => {
    // 1. Clear session and local storage data
    localStorage.clear();
    sessionStorage.clear();

    // 2. Clear authentication cookies (if applicable)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // 3. Redirect the user back to the login page
    router.push("auth/login");
  };

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

          {/* PROFILE LINK */}
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-all"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=TestIntern"
              alt="User Avatar"
              className="h-9 w-9 rounded-full border border-[#EAF7F8] bg-white group-hover:ring-2 group-hover:ring-[#58BECF]/30 transition-all"
            />

            <p className="hidden text-sm font-bold text-slate-900 md:block group-hover:text-[#007C85] transition-colors">
              Test Intern
            </p>
          </Link>

          <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden md:block" />

          {/* UPDATED: Logout Icon with functional click handler */}
          <button
            onClick={handleLogout}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 hover:shadow active:scale-90"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}