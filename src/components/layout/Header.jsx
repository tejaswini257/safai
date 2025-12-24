"use client";

import { LogOut, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card">
      <div className="flex h-14 items-center justify-between px-4 md:px-8">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm transition hover:border-border/80 hover:shadow md:hidden"
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
          {/* Cartoon Avatar */}
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=TestIntern"
            alt="User Avatar"
            className="h-9 w-9 rounded-full border border-border bg-card"
          />

          {/* Username */}
          <p className="hidden text-sm font-medium text-foreground md:block">
            Test Intern
          </p>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Logout Icon */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:bg-accent hover:shadow"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
