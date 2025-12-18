// src/app/dashboard/locate-in-map/page.jsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MOCK_USERS, MOCK_LOCATIONS } from "@/data/mockAssignments";

// dynamic import of the client-only map (no SSR)
const ToiletMap = dynamic(() => import("@/components/map/ToiletMap"), { ssr: false });

export default function LocateInMapPage() {
  const [searchUser, setSearchUser] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  const [assignmentType, setAssignmentType] = useState("many-to-many");
  const mapRef = useRef();

  const filteredUsers = useMemo(() => {
    const q = searchUser.trim().toLowerCase();
    if (!q) return MOCK_USERS;
    return MOCK_USERS.filter((u) => (u.name + u.email).toLowerCase().includes(q));
  }, [searchUser]);

  function toggleUser(userId) {
    setSelectedUserIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  }

  function toggleLocation(locId) {
    setSelectedLocationIds((prev) => (prev.includes(locId) ? prev.filter((id) => id !== locId) : [...prev, locId]));
  }

  function previewAndCreate() {
    const users = MOCK_USERS.filter((u) => selectedUserIds.includes(u.id));
    const locs = MOCK_LOCATIONS.filter((l) => selectedLocationIds.includes(l.id));
    alert(`Preview:\nUsers: ${users.map((u) => u.name).join(", ")}\nLocations: ${locs.map((l) => l.name).join(", ")}`);
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#2F3A45]">Create Assignments</h1>
            <p className="text-sm text-slate-500">
              Select users and locations to create assignments
            </p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/dashboard/cleaner-assignments" 
              className="inline-flex items-center px-4 py-2 border border-[#D1E0E2] rounded-lg text-sm font-medium text-[#2F3A45] hover:bg-[#F8FAFB] transition-colors"
            >
              Back
            </Link>
            <button 
              onClick={previewAndCreate} 
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:ring-offset-2 transition-all"
            >
              Preview & Create
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Assignment Mode */}
            <div className="bg-white rounded-2xl border border-[#EEF2F5] p-4">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-[#2F3A45]">Assignment Mode</h3>
                <p className="text-xs text-[#6B7280]">Choose single or multiple assignment workflows</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setAssignmentType("single")} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    assignmentType === "single" 
                      ? "bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white shadow-sm" 
                      : "bg-white border border-[#D1E0E2] text-[#2F3A45] hover:bg-[#F8FAFB]"
                  } transition-colors`}
                >
                  Single
                </button>
                <button
                  onClick={() => setAssignmentType("many-to-many")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    assignmentType === "many-to-many" 
                      ? "bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white shadow-sm" 
                      : "bg-white border border-[#D1E0E2] text-[#2F3A45] hover:bg-[#F8FAFB]"
                  } transition-colors`}
                >
                  Multiple
                </button>
              </div>
            </div>

            {/* Users */}
            <div className="bg-white rounded-2xl border border-[#EEF2F5] p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium text-[#2F3A45]">Select Users</h3>
                  <p className="text-xs text-[#6B7280]">Choose users to assign to locations</p>
                </div>
                <div className="text-xs text-[#6B7280]">
                  {selectedUserIds.length} selected{" "}
                  <button 
                    onClick={() => setSelectedUserIds([])} 
                    className="text-[#2DB7C4] hover:text-[#0E7C86]"
                    disabled={selectedUserIds.length === 0}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <input
                type="text"
                placeholder="Search users..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#D1E0E2] rounded-lg focus:ring-2 focus:ring-[#2DB7C4] focus:border-transparent"
              />

              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      selectedUserIds.includes(user.id) ? 'bg-[#F4FBFC]' : 'hover:bg-[#F8FAFB]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="h-4 w-4 rounded border-[#D1E0E2] text-[#2DB7C4] focus:ring-[#2DB7C4]"
                      />
                      <div>
                        <div className="text-sm font-medium text-[#2F3A45]">{user.name}</div>
                        <div className="text-xs text-[#6B7280]">{user.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-[#EEF2F5] p-4">
              <div className="h-[500px] w-full">
                <ToiletMap ref={mapRef} locations={MOCK_LOCATIONS} users={MOCK_USERS} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EEF2F5] p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#6B7280]">
                  Click on map markers to preview locations
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-[#6B7280]">Clean</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-[#6B7280]">Needs Cleaning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-[#6B7280]">Urgent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div style={{ background: color }} className="w-4 h-4 rounded-full border border-white shadow-sm" />
      <div className="text-sm text-gray-700">{label}</div>
    </div>
  );
}
