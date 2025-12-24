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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. Header Section */}
        <div className="bg-[#e6f7f9] rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-[#007c85] uppercase tracking-wide">CLEANER ASSIGNMENTS</h1>
              </div>
              <div className="mt-1 flex items-center text-sm">
                <span className="text-[#71b5bb]">System Personnel</span>
                <span className="mx-2 text-[#71b5bb]">/</span>
                <span className="text-[#71b5bb]">Mapping Registry</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/dashboard/cleaner-assignments/add"
                className="w-full sm:w-auto"
              >
                <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:opacity-90 transition-opacity">
                  <Plus size={18} className="h-4 w-4" />
                  Add Cleaner
                </button>
              </Link>
            </div>
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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-white">
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Cleaner
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Role
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Assigned On
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5F6F8]">
                {pageItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7FCFD] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white border border-[#D1F0F2] text-[#007C85] flex items-center justify-center font-semibold text-sm shadow-sm">
                          {item.cleanerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.cleanerName}</p>
                          <p className="text-xs text-[#71B5BB]">{item.cleanerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#007C85]">
                        {item.locationName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                        item.role === 'Supervisor' 
                          ? 'bg-blue-50 border-blue-100 text-blue-600' 
                          : 'bg-[#E5F6F8] border-[#D1F0F2] text-[#007C85]'
                      }`}>
                        {item.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                        item.status === 'Assigned' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                          : 'bg-amber-50 border-amber-100 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.assignedOn}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Assignment"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
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