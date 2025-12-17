"use client";

import { useState } from "react";
import ModeToggle from "../../../../components/createAssignment/ModeToggle";
import UsersTypeahead from "../../../../components/createAssignment/UsersTypeahead";
import LocationsPicker from "../../../../components/createAssignment/LocationsPicker";
import AssignmentOptions from "../../../../components/createAssignment/AssignmentOptions";
import PreviewModal from "../../../../components/createAssignment/PreviewModal";
import { MOCK_USERS, MOCK_LOCATIONS } from "../../../../data/mockAssignments";
import Link from "next/link";

export default function CreateAssignmentsPage() {
  const [mode, setMode] = useState("multiple"); // "single" | "multiple"
  const [selectedUsers, setSelectedUsers] = useState([]); // array of user objects
  const [selectedLocations, setSelectedLocations] = useState([]); // array of location objects
  const [assignmentType, setAssignmentType] = useState("many-to-many"); // "many-to-many" | "one-to-one" | "round-robin"
  const [startDate, setStartDate] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Create Assignments</h1>
            <p className="text-sm text-slate-500">Assign locations to users</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/cleaner-assignments">
              <button className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm">Back</button>
            </Link>
            <button
              onClick={openPreview}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500"
            >
              Preview & Create
            </button>
          </div>
        </div>

        <ModeToggle value={mode} onChange={setMode} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <h3 className="text-sm font-medium text-slate-800 mb-2">Select Users</h3>
              <UsersTypeahead
                available={MOCK_USERS}
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
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <h3 className="text-sm font-medium text-slate-800 mb-2">Select Locations</h3>
              <LocationsPicker
                available={MOCK_LOCATIONS}
                selected={selectedLocations}
                onChange={setSelectedLocations}
              />
            </div>
            <div className="text-xs text-slate-500">
              Tip: Click map markers to preview location, or click items on the left list to add/remove.
            </div>
          </div>
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
