"use client";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <aside className="w-64 bg-slate-950 text-white p-4">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 bg-white p-6">{children}</main>
      </div>
    </div>
  );
}
