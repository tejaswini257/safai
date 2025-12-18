"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SummaryCards from "../../../components/cleanerAssignments/SummaryCards";
import BulkActionsBar from "../../../components/cleanerAssignments/BulkActionsBar";
import FilterBar from "../../../components/cleanerAssignments/FilterBar";

// Mock data
const initialAssignments = [
  {
    id: 1,
    cleanerName: "Omkar saaf cleaner",
    cleanerEmail: "omkar.cleaner@example.com",
    locationName: "New Manish Nagar Chowk",
    role: "cleaner",
    status: "assigned",
    assignedOn: "2025-12-08",
  },
  {
    id: 2,
    cleanerName: "Rajesh sahani - Narendra square",
    cleanerEmail: "rajesh.sahani@example.com",
    locationName: "New Manish Nagar Chowk",
    role: "cleaner",
    status: "assigned",
    assignedOn: "2025-12-08",
  },
  {
    id: 3,
    cleanerName: "Omkar Supervisor",
    cleanerEmail: "richom056@gmail.com",
    locationName: "Narendra nagar square",
    role: "supervisor",
    status: "assigned",
    assignedOn: "2025-12-08",
  },
  {
    id: 4,
    cleanerName: "Test Supervisor",
    cleanerEmail: "test.supervisor@example.com",
    locationName: "Budhwar Bazaar",
    role: "supervisor",
    status: "assigned",
    assignedOn: "2025-12-03",
  },
  {
    id: 5,
    cleanerName: "New Cleaner",
    cleanerEmail: "new.cleaner@example.com",
    locationName: "Untitled Location",
    role: "cleaner",
    status: "unassigned",
    assignedOn: null,
  },
];

const PAGE_SIZE = 5;

export default function CleanerAssignmentsPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  const totalCount = assignments.length;
  const assignedCount = assignments.filter((a) => a.status === "assigned").length;
  const unassignedCount = assignments.filter((a) => a.status === "unassigned").length;

  // Filtering
  const filtered = useMemo(() => {
    let data = [...assignments];

    if (search.trim()) {
      const term = search.toLowerCase();
      data = data.filter((item) => {
        return (
          item.cleanerName.toLowerCase().includes(term) ||
          (item.cleanerEmail && item.cleanerEmail.toLowerCase().includes(term)) ||
          item.locationName.toLowerCase().includes(term)
        );
      });
    }

    if (statusFilter !== "all") {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (roleFilter !== "all") {
      data = data.filter((item) => item.role === roleFilter);
    }

    return data;
  }, [assignments, search, statusFilter, roleFilter]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  // Selection helpers
  const isSelected = (id) => selectedIds.includes(id);

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAllCurrentPage = () => {
    const pageIds = pageItems.map((item) => item.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const clearSelection = () => setSelectedIds([]);

  // Row-level actions
  const handleToggleAssign = (id) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "assigned" ? "unassigned" : "assigned",
              assignedOn: item.status === "assigned" ? null : new Date().toISOString().slice(0, 10),
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setAssignments((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  // Bulk actions
  const bulkMarkAssigned = () => {
    setAssignments((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id)
          ? {
              ...item,
              status: "assigned",
              assignedOn: new Date().toISOString().slice(0, 10),
            }
          : item
      )
    );
    clearSelection();
  };

  const bulkMarkUnassigned = () => {
    setAssignments((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id)
          ? { ...item, status: "unassigned", assignedOn: null }
          : item
      )
    );
    clearSelection();
  };

  const bulkDelete = () => {
    setAssignments((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    clearSelection();
  };

  // Click on summary cards -> status filters
  const handleSummaryClick = (type) => {
    if (type === "total") setStatusFilter("all");
    if (type === "assigned") setStatusFilter("assigned");
    if (type === "unassigned") setStatusFilter("unassigned");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Add button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#2F3A45]">
              Cleaner Assignments
            </h1>
            <p className="text-sm text-slate-500">
              Manage your cleaner-location mappings
            </p>
          </div>

          <Link
            href="/dashboard/cleaner-assignments/add"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:ring-offset-2 transition-all"
          >
            Add Cleaner
          </Link>
        </div>

        <div className="space-y-4">
          <SummaryCards
            total={totalCount}
            assigned={assignedCount}
            unassigned={unassignedCount}
            onClickCard={handleSummaryClick}
            activeStatus={statusFilter}
          />

          <div className="bg-[#F4FBFC] rounded-2xl border border-[#E6F6F7] p-6 shadow-sm">
            <FilterBar
              search={search}
              onSearchChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              statusFilter={statusFilter}
              onStatusChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
              roleFilter={roleFilter}
              onRoleChange={(value) => {
                setRoleFilter(value);
                setPage(1);
              }}
              onClearFilters={() => {
                setSearch("");
                setStatusFilter("all");
                setRoleFilter("all");
                setPage(1);
              }}
            />
          </div>

          {selectedIds.length > 0 && (
            <BulkActionsBar
              selectedCount={selectedIds.length}
              onClearSelection={clearSelection}
              onBulkAssign={bulkMarkAssigned}
              onBulkUnassign={bulkMarkUnassigned}
              onBulkDelete={bulkDelete}
            />
          )}

          <div className="bg-white rounded-2xl border border-[#EEF2F5] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#EEF2F5]">
                <thead className="bg-[#F8FAFB]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      <div className="flex items-center">
                        <input
                          id="select-all-rows"
                          name="select-all-rows"
                          type="checkbox"
                          className="h-4 w-4 rounded border-[#D1E0E2] text-[#2DB7C4] focus:ring-[#2DB7C4]"
                          checked={selectedIds.length > 0 && selectedIds.length === pageItems.length}
                          onChange={toggleSelectAllCurrentPage}
                        />
                        <span className="ml-2">Cleaner</span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Assigned On
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#EEF2F5]">
                  {pageItems.map((item) => (
                    <tr
                      key={item.id}
                      className={isSelected(item.id) ? 'bg-[#F4FBFC]' : 'hover:bg-[#F8FAFB] transition-colors'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            id={`select-${item.id}`}
                            name={`select-${item.id}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-[#D1E0E2] text-[#2DB7C4] focus:ring-[#2DB7C4]"
                            checked={isSelected(item.id)}
                            onChange={() => toggleSelectOne(item.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="ml-4 flex items-center">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 font-medium text-white ${
                              item.role === 'supervisor' 
                                ? 'bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9]' 
                                : 'bg-[#0E7C86]'
                            }`}>
                              {item.cleanerName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                            </div>
                            <div className="text-sm font-medium text-[#2F3A45]">
                              {item.cleanerName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2F3A45]">
                        {item.locationName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            item.role === 'supervisor'
                              ? 'bg-[#F0F5FF] text-[#2E5FD4]'
                              : 'bg-[#E6F6F7] text-[#0E7C86]'
                          }`}
                        >
                          {item.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            item.status === 'assigned'
                              ? 'bg-[#E6F6F7] text-[#0E7C86]'
                              : 'bg-[#FEF9E6] text-[#8E6C1F]'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                        {item.assignedOn || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            className={`inline-flex items-center px-2.5 py-1 border text-xs font-medium rounded ${
                              item.status === 'assigned'
                                ? 'border-[#F4B740] text-[#8E6C1F] bg-[#FEF9E6] hover:bg-[#FEF3C7]'
                                : 'border-[#2DB7C4] text-[#0E7C86] bg-[#E6F6F7] hover:bg-[#D1EEF1]'
                            } transition-colors`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleAssign(item.id);
                            }}
                          >
                            {item.status === 'assigned' ? 'Unassign' : 'Assign'}
                          </button>
                          <button
                            type="button"
                            className="text-[#B42318] hover:text-[#912018] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                          >
                            <span className="sr-only">Delete</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-[#EEF2F5] text-sm text-[#6B7280] bg-[#F8FAFB]">
              <div>
                Showing{' '}
                <span className="font-medium text-[#2F3A45]">
                  {filtered.length === 0 ? 0 : startIndex + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium text-[#2F3A45]">
                  {Math.min(startIndex + PAGE_SIZE, filtered.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium text-[#2F3A45]">
                  {filtered.length}
                </span>{' '}
                entries
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-md border border-[#D1E0E2] text-[#2F3A45] bg-white hover:bg-[#F4FBFC] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#F8FAFB] transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentPage === pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  className="px-3 py-1.5 rounded-md border border-[#D1E0E2] text-[#2F3A45] bg-white hover:bg-[#F4FBFC] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#F8FAFB] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}