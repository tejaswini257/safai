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
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#2F3A45]">Create Assignments</h1>
            <p className="text-sm text-[#6B7280]">Assign locations to users</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/cleaner-assignments">
              <button className="px-4 py-2 rounded-lg border border-[#D1E0E2] bg-white text-[#2F3A45] text-sm font-medium hover:bg-[#F8FAFB] transition-colors">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </span>
              </button>
            </Link>
            <button
              onClick={openPreview}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:ring-offset-2 transition-all shadow-sm"
            >
              Preview & Create
            </button>
          </div>
        </div>

        <ModeToggle value={mode} onChange={setMode} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#F4FBFC] p-6 rounded-2xl border border-[#E6F6F7] shadow-sm">
              <h3 className="text-sm font-medium text-[#2F3A45] mb-3">Select Users</h3>
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
            <div className="bg-[#F4FBFC] p-6 rounded-2xl border border-[#E6F6F7] shadow-sm">
              <h3 className="text-sm font-medium text-[#2F3A45] mb-3">Select Locations</h3>
              <LocationsPicker
                available={MOCK_LOCATIONS}
                selected={selectedLocations}
                onChange={setSelectedLocations}
              />
            </div>
            <div className="text-xs text-[#6B7280] bg-[#F4FBFC] p-4 rounded-2xl border border-[#E6F6F7] shadow-sm">
              <span className="font-medium text-[#2F3A45]">Tip:</span> Click map markers to preview location, or click items on the left list to add/remove.
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
