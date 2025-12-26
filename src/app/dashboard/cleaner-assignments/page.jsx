"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SummaryCards from "../../../components/cleanerAssignments/SummaryCards";
import FilterBar from "../../../components/cleanerAssignments/FilterBar";
import {
  Search,
  Plus,
  MapPin,
  Trash2,
  Users,
  UserCheck,
  UserMinus,
  Shield,
  ChevronLeft,
  ChevronRight,
  Activity,
  Settings,
  LayoutList
} from "lucide-react";

// Mock data
const initialAssignments = [
  { id: 1, cleanerName: "Omkar saaf cleaner", cleanerEmail: "omkar.cleaner@example.com", locationName: "New Manish Nagar Chowk", role: "Cleaner", status: "Assigned", assignedOn: "2025-12-08" },
  { id: 2, cleanerName: "Rajesh sahani - Narendra square", cleanerEmail: "rajesh.sahani@example.com", locationName: "New Manish Nagar Chowk", role: "Cleaner", status: "Assigned", assignedOn: "2025-12-08" },
  { id: 3, cleanerName: "Omkar Supervisor", cleanerEmail: "richom056@gmail.com", locationName: "Narendra nagar square", role: "Supervisor", status: "Assigned", assignedOn: "2025-12-08" },
  { id: 4, cleanerName: "Test Supervisor", cleanerEmail: "test.supervisor@example.com", locationName: "Budhwar Bazaar", role: "Supervisor", status: "Assigned", assignedOn: "2025-12-03" },
  { id: 5, cleanerName: "New Cleaner", cleanerEmail: "new.cleaner@example.com", locationName: "Untitled Location", role: "Cleaner", status: "Unassigned", assignedOn: "-" },
];

const PAGE_SIZE = 5;

export default function CleanerAssignmentsPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Deletion logic
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to remove this assignment?")) {
      setAssignments(prev => prev.filter(item => item.id !== id));
    }
  };

  const filtered = useMemo(() => {
    let data = [...assignments];
    if (search.trim()) {
      const term = search.toLowerCase();
      data = data.filter((item) =>
        item.cleanerName.toLowerCase().includes(term) ||
        item.locationName.toLowerCase().includes(term)
      );
    }
    return data;
  }, [assignments, search]);

  const startIndex = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8 px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 1. BRANDED HEADER SECTION (Updated to match Location Hierarchy style) */}
        <div className="w-full bg-[#E6F7F9] rounded-[24px] p-4 flex flex-col md:flex-row items-center justify-between border border-[#D1F0F2] gap-4">
          <div className="flex items-center gap-4">
            {/* Icon Box */}
            <div className="h-14 w-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-white/50">
              <Users size={24} className="text-[#007C85]" />
            </div>
            {/* Title Group */}
            <div className="text-left">
              <h1 className="text-[#007C85] font-black text-xl uppercase tracking-tight leading-none">
                Cleaner Assignments
              </h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Activity size={12} className="text-[#007C85]/60" />
                <p className="text-[10px] font-bold text-[#007C85]/60 uppercase tracking-widest">
                  System Personnel Mapping Registry
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              type="button"
              className="bg-white px-6 py-3 rounded-xl shadow-sm text-[#007C85] text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 border border-white"
            >
              <LayoutList size={14} /> Show Assignments
            </button>
            
            <Link
              href="/dashboard/cleaner-assignments/add"
              style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
              className="px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus size={16} strokeWidth={3} /> Add Cleaner
            </Link>
          </div>
        </div>

        {/* 2. Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FEF3EB] p-6 rounded-[24px] border border-[#FDE0CF] flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-[#8E6C1F] uppercase tracking-widest">Unassigned</p>
              <h3 className="text-3xl font-bold text-[#2F3A45] mt-1">
                {assignments.filter(a => a.status === "Unassigned").length}
              </h3>
            </div>
            <UserMinus className="text-[#F4B740]" size={32} opacity={0.5} />
          </div>
          <div className="bg-[#F0F9FF] p-6 rounded-[24px] border border-[#D1E9FF] flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-[#0070AD] uppercase tracking-widest">Assigned</p>
              <h3 className="text-3xl font-bold text-[#2F3A45] mt-1">
                {assignments.filter(a => a.status === "Assigned").length}
              </h3>
            </div>
            <UserCheck className="text-[#0070AD]" size={32} opacity={0.5} />
          </div>
          <div className="bg-[#F0FDF4] p-6 rounded-[24px] border border-[#DCFCE7] flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-[#15803D] uppercase tracking-widest">Total Staff</p>
              <h3 className="text-3xl font-bold text-[#2F3A45] mt-1">{assignments.length}</h3>
            </div>
            <Users className="text-[#15803D]" size={32} opacity={0.5} />
          </div>
        </div>

        {/* 3. Filter Bar */}
        <div className="bg-white/50 rounded-[24px] border border-slate-100 p-5 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#58BECF] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search registry by name or node..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-medium uppercase tracking-wider outline-none focus:ring-4 focus:ring-cyan-50 transition-all"
              />
            </div>
            <FilterBar statusFilter={statusFilter} onStatusChange={setStatusFilter} roleFilter={roleFilter} onRoleChange={setRoleFilter} />
          </div>
        </div>

        {/* 4. Main Data Table */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#E0F7FA]">
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-wider text-[#00838F] border-b border-cyan-100">
                    <div className="flex items-center gap-2"><Users size={14} strokeWidth={2.5} /> Cleaner</div>
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-wider text-[#00838F] border-b border-cyan-100">
                    <div className="flex items-center gap-2"><MapPin size={14} strokeWidth={2.5} /> Location</div>
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-wider text-[#00838F] border-b border-cyan-100">
                    <div className="flex items-center gap-2"><Shield size={14} strokeWidth={2.5} /> Role</div>
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-wider text-[#00838F] border-b border-cyan-100">
                    <div className="flex items-center gap-2"><Activity size={14} strokeWidth={2.5} /> Status</div>
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-wider text-[#00838F] border-b border-cyan-100">
                    <div className="flex items-center gap-2"><LayoutList size={14} strokeWidth={2.5} /> Assigned On</div>
                  </th>
                  <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-wider text-[#00838F] border-b border-cyan-100">
                    <div className="flex items-center justify-end gap-2"><Settings size={14} strokeWidth={2.5} /> Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pageItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F4FBFC]/60 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-white border border-cyan-100 text-[#00838F] flex items-center justify-center font-bold text-[11px] shadow-sm">
                          {item.cleanerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-slate-700 leading-none mb-1">{item.cleanerName}</p>
                          <p className="text-[10px] font-medium text-slate-400">{item.cleanerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-[#007C85] hover:text-[#58BECF] transition-colors cursor-pointer">
                        {item.locationName}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${item.role === 'Supervisor' ? 'bg-blue-50 border-blue-100 text-blue-500' : 'bg-teal-50 border-teal-100 text-teal-600'}`}>
                        {item.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${item.status === 'Assigned' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-400'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-400">
                      {item.assignedOn}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete Assignment"
                        >
                          <Trash2 size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Navigation */}
          <div className="bg-[#F8FAFB]/80 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Showing <span className="text-slate-600">{startIndex + 1}-{Math.min(startIndex + PAGE_SIZE, filtered.length)}</span> of {filtered.length} entries
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#58BECF] disabled:opacity-30 shadow-sm"
              >
                <ChevronLeft size={16} strokeWidth={3} />
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={startIndex + PAGE_SIZE >= filtered.length}
                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#58BECF] disabled:opacity-30 shadow-sm"
              >
                <ChevronRight size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}