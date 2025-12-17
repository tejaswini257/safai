"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BadgeCheck,
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

const navSections = [
  {
    heading: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
      {
        label: "Location Hierarchy",
        icon: Layers3,
        children: [
          { label: "View Location Hierarchy", href: "/dashboard/location-hierarchy" },
          { label: "Add Location Hierarchy", href: "/dashboard/location-hierarchy/add", icon: Plus },
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

// Custom component for the active link background with the requested gradient
const ActiveGradientBackground = ({ active, children }) => {
  const activeStyle = active
    ? {
        background: "linear-gradient(to right, #FF9391, #FE7775)", // Custom gradient from #FF9391 to #FE7775
        color: "white",
        boxShadow: "0 4px 6px -1px rgba(254, 119, 117, 0.4), 0 2px 4px -2px rgba(254, 119, 117, 0.4)",
      }
    : {};

  // We apply the custom style directly using the 'style' prop when active
  // and pass through the children. The classes will be applied in the parent.
  return (
    <div className="flex-1" style={activeStyle}>
      {children}
    </div>
  );
};


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

  // Auto-expand groups when pathname changes (e.g., when clicking stat cards)
  useEffect(() => {
    setOpenGroups(initialOpen);
  }, [initialOpen]);

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href) => pathname.startsWith(href);
  const isParentActive = (item) =>
    item.href ? isActive(item.href) : item.children?.some((c) => isActive(c.href));

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex ${
        collapsed ? "w-20" : "w-72"
      } flex-col bg-[#0c1224] text-slate-100 shadow-2xl transition-transform duration-200 md:static md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex h-16 items-center gap-3 border-b border-white/10 bg-[#0f1730] px-3">
        {!collapsed && (
          <>
            <div className="relative h-10 w-10 flex-shrink-0 rounded-xl overflow-hidden bg-white">
              <Image
                src="/image/dashboard img.png"
                alt="Safai Logo"
                width={60}
                height={60}
                className="object-contain w-full h-full scale-125"
                quality={100}
                unoptimized
                priority
              />
            </div>
            <div className="flex flex-1 flex-col leading-tight">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Admin Console</span>
                <button
                  onClick={onToggleCollapse}
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/20 hover:bg-white/10"
                  aria-label="Toggle sidebar"
                >
                  <ChevronDown className="rotate-90 h-3 w-3" />
                </button>
              </div>
              <span className="text-base font-semibold text-white">Safai</span>
            </div>
          </>
        )}
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/20 hover:bg-white/10"
            aria-label="Toggle sidebar"
          >
            <ChevronDown className="-rotate-90 h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-6">
          {navSections.map((section) => (
            <div key={section.heading} className="space-y-2">
              {!collapsed && (
                <p className="px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {section.heading}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isParentActive(item);
                  const hasChildren = Boolean(item.children?.length);
                  const expanded = openGroups[item.label];

                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        // Applying common styles first
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                          active
                            ? "text-white" // Text color handled by style prop
                            : "text-slate-200 hover:bg-white/5 hover:text-white"
                        }`}
                        // Applying custom gradient/color directly when active
                        style={active ? {
                            background: "linear-gradient(to right, #FF9391, #FE7775)",
                            boxShadow: "0 4px 6px -1px rgba(254, 119, 117, 0.4), 0 2px 4px -2px rgba(254, 119, 117, 0.4)",
                        } : {}}
                      >
                        <Icon
                          className={`h-5 w-5 flex-shrink-0 transition ${
                            active
                              ? "text-white"
                              : "text-slate-300 group-hover:text-white"
                          }`}
                        />
                        {!collapsed && (
                          <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    );
                  }

                  return (
                    <div key={item.label} className="space-y-0.5">
                      <button
                        onClick={() => toggleGroup(item.label)}
                        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                          active
                            ? "bg-white/10 text-white" // Keeping this as a different style for parent menu items
                            : "text-slate-200 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 flex-shrink-0 transition ${
                            active
                              ? "text-white"
                              : "text-slate-300 group-hover:text-white"
                          }`}
                        />
                        {!collapsed && (
                          <>
                            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-left">
                              {item.label}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
                                expanded ? "rotate-180" : ""
                              } ${active ? "text-white" : "text-slate-400"}`}
                            />
                          </>
                        )}
                      </button>
                      {!collapsed && expanded && (
                        <div className="space-y-0.5 pl-11">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            const childActive = isActive(child.href);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
                                    childActive
                                      ? "text-white" // Text color handled by style prop
                                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                                }`}
                                style={childActive ? {
                                    background: "linear-gradient(to right, #FF9391, #FE7775)",
                                    boxShadow: "0 2px 4px -2px rgba(254, 119, 117, 0.2)",
                                } : {}}
                              >
                                {ChildIcon ? (
                                  <ChildIcon
                                    className={`h-4 w-4 flex-shrink-0 transition ${
                                      childActive
                                        ? "text-white"
                                        : "text-slate-300 group-hover:text-white"
                                    }`}
                                  />
                                ) : (
                                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${childActive ? 'bg-white' : 'bg-slate-400 group-hover:bg-indigo-300'}`} />
                                )}
                                <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                  {child.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#0f1730] p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-semibold">
            TI
          </div>
          {!collapsed && (
            <>
              <div className="flex-1">
                <p className="text-sm font-semibold">Test Intern</p>
                <p className="text-xs text-slate-400">Admin</p>
              </div>
              <Settings className="h-5 w-5 text-slate-300" />
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}