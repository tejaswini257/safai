"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SummaryCards from "../../../components/cleanerAssignments/SummaryCards";
import FilterBar from "../../../components/cleanerAssignments/FilterBar";
import BulkActionsBar from "../../../components/cleanerAssignments/BulkActionsBar";
import AssignmentsTable from "../../../components/cleanerAssignments/AssignmentsTable";

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
  const [statusFilter, setStatusFilter] = useState("all"); // all | assigned | unassigned
  const [roleFilter, setRoleFilter] = useState("all"); // all | cleaner | supervisor
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
          (item.cleanerEmail &&
            item.cleanerEmail.toLowerCase().includes(term)) ||
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
              assignedOn:
                item.status === "assigned"
                  ? null
                  : new Date().toISOString().slice(0, 10),
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
    setAssignments((prev) =>
      prev.filter((item) => !selectedIds.includes(item.id))
    );
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
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Add button could go above; keeping focus on core layout */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Cleaner Assignments
            </h1>
            <p className="text-sm text-slate-500">
              Manage your cleaner-location mappings
            </p>
          </div>

          import Link from "next/link";

        <Link
          href="/dashboard/cleaner-assignments/add"
          className="inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500"
        >
            + Add Assignment
        </Link>

        </div>

        <SummaryCards
          total={totalCount}
          assigned={assignedCount}
          unassigned={unassignedCount}
          onClickCard={handleSummaryClick}
          activeStatus={statusFilter}
        />

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

        {selectedIds.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedIds.length}
            onClearSelection={clearSelection}
            onBulkAssign={bulkMarkAssigned}
            onBulkUnassign={bulkMarkUnassigned}
            onBulkDelete={bulkDelete}
          />
        )}

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
          <AssignmentsTable
            rows={pageItems}
            pageStartIndex={startIndex}
            isSelected={isSelected}
            onToggleSelectOne={toggleSelectOne}
            onToggleSelectAllCurrent={toggleSelectAllCurrentPage}
            onToggleAssign={handleToggleAssign}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
            <div>
              Showing{" "}
              <span className="font-medium">
                {filtered.length === 0 ? 0 : startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(startIndex + PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-medium">{filtered.length}</span> entries
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-2 py-1 rounded border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {pageCount}
              </span>
              <button
                disabled={currentPage === pageCount}
                onClick={() =>
                  setPage((p) => Math.min(pageCount, p + 1))
                }
                className="px-2 py-1 rounded border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
