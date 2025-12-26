"use client";

import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
    <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-white shadow-sm transition hover:bg-slate-50 dark:hover:bg-slate-600 hover:shadow md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="text-lg font-semibold text-foreground">
            Nagpur Municipal Corporation
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-600 mx-1 hidden md:block" />

          {/* PROFILE LINK */}
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-all"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=TestIntern"
              alt="User Avatar"
              className="h-9 w-9 rounded-full border-2 border-white dark:border-slate-700 bg-white dark:bg-slate-600 group-hover:ring-2 group-hover:ring-[#58BECF]/30 transition-all"
            />

            <p className="hidden text-sm font-bold text-slate-900 md:block group-hover:text-[#007C85] transition-colors dark:text-white">
              Test Intern
            </p>
          </Link>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-600 mx-1 hidden md:block" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-white shadow-sm transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 hover:shadow active:scale-90 dark:hover:bg-rose-900/30 dark:hover:text-rose-400"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}