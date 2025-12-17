"use client";

import { useMemo, useState } from "react";
import ModeToggle from "../../../../components/createAssignment/ModeToggle";
import UsersTypeahead from "../../../../components/createAssignment/UsersTypeahead";
import LocationsPicker from "../../../../components/createAssignment/LocationsPicker";
import AssignmentOptions from "../../../../components/createAssignment/AssignmentOptions";
import PreviewModal from "../../../../components/createAssignment/PreviewModal";
import { MOCK_USERS, MOCK_LOCATIONS } from "../../../../data/mockAssignments";
import { useRouter } from "next/navigation";

export default function CreateAssignmentsPage() {
  const router = useRouter();
  const [mode, setMode] = useState("multiple"); // "single" | "multiple"
  const [selectedUsers, setSelectedUsers] = useState([]); // array of user objects
  const [selectedLocations, setSelectedLocations] = useState([]); // array of location objects
  const [assignmentType, setAssignmentType] = useState("many-to-many"); // "many-to-many" | "one-to-one" | "round-robin"
  const [startDate, setStartDate] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    if (roleFilter === "all") return MOCK_USERS;
    return MOCK_USERS.filter((u) => u.role === roleFilter);
  }, [roleFilter]);

  const openPreview = () => {
    // basic validation
    if (selectedUsers.length === 0) {
      alert("Please select at least one user.");
      return;
    }
    if (selectedLocations.length === 0) {
      alert("Please select at least one location.");
      return;
    }
    if (assignmentType === "one-to-one" && selectedUsers.length !== selectedLocations.length) {
      alert("For one-to-one mapping, select equal number of users and locations.");
      return;
    }
    setPreviewOpen(true);
  };

  const handleCreate = async () => {
    // simulate API call: create assignments for preview
    // build payload
    const payload = {
      assignmentType,
      userIds: selectedUsers.map(u => u.id),
      locationIds: selectedLocations.map(l => l.id),
      startDate: startDate || null,
    };

    // simulate network delay
    await new Promise((res) => setTimeout(res, 800));

    // For demo: just show success and redirect back to assignments list (or keep)
    setPreviewOpen(false);
    alert(`Created ${payload.userIds.length * payload.locationIds.length} assignments (mock).`);
    // Optionally redirect to assignments list:
    // window.location.href = "/dashboard/cleaner-assignments";
  };

  return (
    <div className="min-h-screen bg-[var(--bg-surface)] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-md border border-[var(--border-subtle)] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--navy)] px-5 py-4 text-white">
            <div>
              <p className="text-sm uppercase tracking-wide text-indigo-100">
                Assign locations to users
              </p>
              <h1 className="text-2xl font-semibold">Create Assignments</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition"
              >
                Back
              </button>
              <button
                onClick={openPreview}
                className="px-4 py-2 rounded-lg bg-white text-[var(--navy)] text-sm font-semibold shadow-sm hover:bg-slate-100 transition"
              >
                Preview &amp; Create
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <ModeToggle value={mode} onChange={setMode} />

            {/* Role filter bar */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-700 mb-3">
                Filter by Role
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: "all", label: "All Roles", count: MOCK_USERS.length },
                  {
                    key: "supervisor",
                    label: "Supervisor",
                    count: MOCK_USERS.filter((u) => u.role === "supervisor").length,
                  },
                  {
                    key: "cleaner",
                    label: "Cleaner",
                    count: MOCK_USERS.filter((u) => u.role === "cleaner").length,
                  },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setRoleFilter(opt.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      roleFilter === opt.key
                        ? opt.key === "all"
                          ? "bg-[var(--navy)] text-white shadow-sm"
                          : opt.key === "supervisor"
                          ? "bg-amber-100 text-amber-800 border border-amber-200 shadow-sm"
                          : "bg-green-100 text-green-800 border border-green-200 shadow-sm"
                        : "bg-white text-slate-700 border border-[var(--border-subtle)] hover:bg-slate-50"
                    }`}
                  >
                    {opt.label} ({opt.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-[var(--border-subtle)] shadow-sm">
                  <h3 className="text-sm font-medium text-slate-800 mb-2">
                    Select Users
                  </h3>
                  <UsersTypeahead
                    available={filteredUsers}
                    selected={selectedUsers}
                    onChange={setSelectedUsers}
                    mode={mode}
                  />
                </div>

                <AssignmentOptions
                  assignmentType={assignmentType}
                  setAssignmentType={setAssignmentType}
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-[var(--border-subtle)] shadow-sm">
                  <h3 className="text-sm font-medium text-slate-800 mb-2">
                    Select Locations
                  </h3>
                  <LocationsPicker
                    available={MOCK_LOCATIONS}
                    selected={selectedLocations}
                    onChange={setSelectedLocations}
                  />
                </div>
                <div className="text-xs text-slate-500">
                  Tip: Click map markers to preview location, or click items on the left
                  list to add/remove.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer action */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openPreview}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-[var(--navy)] text-white font-semibold shadow-md hover:bg-slate-800 transition"
          >
            {`Create ${selectedUsers.length * selectedLocations.length || 0} Assignments`}
          </button>
        </div>
      </div>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        users={selectedUsers}
        locations={selectedLocations}
        assignmentType={assignmentType}
        startDate={startDate}
        onConfirm={handleCreate}
      />
    </div>
  );
}
