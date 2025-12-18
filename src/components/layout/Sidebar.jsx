"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  ChevronDown,
  Layers3,
  ListChecks,
  LogOut,
  Map,
  MapPin,
  MenuSquare,
  MessageSquare,
  Plus,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

/* ---------------- NAV DATA ---------------- */
const navSections = [
  {
    heading: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
      {
        label: "Location Hierarchy",
        icon: Layers3,
        children: [
          { label: "View Hierarchy", href: "/dashboard/location-hierarchy" },
          { label: "Add Hierarchy", href: "/dashboard/location-hierarchy/add", icon: Plus },
        ],
      },
      {
        label: "Washrooms",
        icon: ShieldCheck,
        children: [
          { label: "Washrooms List", href: "/dashboard/washrooms" },
          { label: "Add Washroom", href: "/dashboard/washrooms/add", icon: Plus },
        ],
      },
    ],
  },
  {
    heading: "Operations",
    items: [
      {
        label: "User Management",
        icon: Users,
        children: [
          { label: "User List", href: "/dashboard/user-management" },
          { label: "Add User", href: "/dashboard/user-management/add", icon: Plus },
        ],
      },
      {
        label: "Cleaner Mapping",
        icon: Map,
        children: [
          { label: "Mapped List", href: "/dashboard/cleaner-assignments" },
          { label: "Add Mapping", href: "/dashboard/cleaner-assignments/add", icon: ListChecks },
        ],
      },
      { label: "Locate On Map", href: "/dashboard/locate", icon: MapPin },
      { label: "Cleaner Activity", href: "/dashboard/cleaner-activity", icon: Activity },
      { label: "User Review", href: "/dashboard/user-reviews", icon: MessageSquare },
      { label: "Reports", href: "/dashboard/reports", icon: MenuSquare },
    ],
  },
];

/* ---------------- SIDEBAR ---------------- */
export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const pathname = usePathname();

  const initialOpen = useMemo(() => {
    const state = {};
    navSections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          state[item.label] = item.children.some((child) =>
            pathname.startsWith(child.href)
          );
        }
      });
    });
    return state;
  }, [pathname]);

  const [openGroups, setOpenGroups] = useState(initialOpen);

  useEffect(() => {
    setOpenGroups(initialOpen);
  }, [initialOpen]);

  const isActive = (href) => pathname.startsWith(href);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex ${
        collapsed ? "w-20" : "w-72"
      } flex-col bg-[#E8F4F5] border-r border-[#DEE9EB] transition-transform duration-200 md:static ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* HEADER */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-[#EAF2F5] bg-white">
        {!collapsed && (
          <>
            <div className="h-10 w-10 rounded-xl bg-[#EAF7F8] flex items-center justify-center">
              <Image
                src="/image/dashboard img.png"
                alt="Safai Logo"
                width={32}
                height={32}
                unoptimized
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280]">Admin Console</p>
              <p className="text-sm font-semibold text-[#2F3A45]">Safai</p>
            </div>
          </>
        )}
        <button
          onClick={onToggleCollapse}
          className="ml-auto h-8 w-8 rounded-lg border border-[#EAF2F5] bg-white flex items-center justify-center"
        >
          <ChevronDown className={`h-4 w-4 text-[#2DB7C4] ${collapsed ? "-rotate-90" : "rotate-90"}`} />
        </button>
      </div>

      {/* NAV */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.heading}>
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                {section.heading}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-[#EAF7F8] text-[#2DB7C4]"
                          : "text-[#2F3A45] hover:bg-[#F0F9FA]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {!collapsed && item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setOpenGroups((p) => ({
                          ...p,
                          [item.label]: !p[item.label],
                        }))
                      }
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[#2F3A45] hover:bg-[#F0F9FA]"
                    >
                      <Icon className="h-5 w-5" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition ${
                              openGroups[item.label] ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>

                    {!collapsed && openGroups[item.label] && (
                      <div className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-lg px-3 py-2 text-sm ${
                              isActive(child.href)
                                ? "bg-[#EAF7F8] text-[#2DB7C4]"
                                : "text-[#6B7280] hover:bg-[#F0F9FA]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t border-[#EAF2F5] p-4 bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-full bg-[#EAF7F8] flex items-center justify-center font-semibold text-[#2DB7C4]">
            TI
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2F3A45]">Test Intern</p>
              <p className="text-xs text-[#6B7280]">Admin</p>
            </div>
          )}
          {!collapsed && <Settings className="h-5 w-5 text-[#9CA3AF]" />}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#EAF2F5] px-3 py-2 text-sm font-semibold text-[#2F3A45] hover:bg-[#F0F9FA]">
          <LogOut className="h-4 w-4" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
