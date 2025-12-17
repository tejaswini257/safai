// src/app/dashboard/locate-in-map/page.jsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MOCK_USERS, MOCK_LOCATIONS } from "@/data/mockAssignments"; // keep alias if configured; otherwise use relative path

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
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Create Assignments</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-md">Back</button>
          <button onClick={previewAndCreate} className="px-4 py-2 bg-purple-600 text-white rounded-md shadow">
            Preview & Create
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Assignment mode */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Assignment Mode</div>
                <div className="text-xs text-gray-400">Choose single or multiple assignment workflows</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setAssignmentType("single")} className={`px-3 py-1 rounded-md border ${assignmentType === "single" ? "bg-gray-100" : ""}`}>
                  Single
                </button>
                <button
                  onClick={() => setAssignmentType("many-to-many")}
                  className={`px-3 py-1 rounded-md border ${assignmentType === "many-to-many" ? "bg-purple-50 border-purple-200 text-purple-700" : ""}`}
                >
                  Multiple
                </button>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Select Users</div>
              <div className="text-xs text-gray-400">
                {selectedUserIds.length} selected{" "}
                <button onClick={() => setSelectedUserIds([])} className="text-xs text-blue-500 ml-2">
                  Clear
                </button>
              </div>
            </div>

            <input value={searchUser} onChange={(e) => setSearchUser(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-3" placeholder="Search users by name or email..." />

            <div className="max-h-60 overflow-auto space-y-2">
              {filteredUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium">
                      {(u.name || "?").split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{u.name}</div>
                      <div className="text-xs text-gray-400">{u.email}</div>
                    </div>
                  </div>

                  <div>
                    <input type="checkbox" checked={selectedUserIds.includes(u.id)} onChange={() => toggleUser(u.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-sm font-semibold mb-2">Assignment Options</div>
            <div className="text-sm text-gray-600 mb-2">Type</div>
            <select className="w-full border rounded-md p-2 mb-3" value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)}>
              <option value="many-to-many">Many-to-many</option>
              <option value="one-to-many">One-to-many</option>
            </select>
            <div className="text-sm text-gray-500">Start date</div>
            <input type="date" className="w-full border rounded-md p-2 mt-2" />
          </div>
        </div>

        {/* map + locations */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="bg-white rounded-lg shadow p-3">
            <div className="grid grid-cols-12 gap-3 items-start">
              <div className="col-span-12 lg:col-span-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold">Select Locations</div>
                  <div className="text-xs text-gray-400">
                    {selectedLocationIds.length} selected <button onClick={() => setSelectedLocationIds([])} className="text-xs text-blue-500 ml-2">Clear</button>
                  </div>
                </div>

                <div className="max-h-72 overflow-auto space-y-2">
                  {MOCK_LOCATIONS.map((loc) => (
                    <div key={loc.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <div className="font-medium text-sm">{loc.name}</div>
                        <div className="text-xs text-gray-400">{loc.ward}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => {
                            toggleLocation(loc.id);
                            mapRef.current?.panToLocation(loc.id);
                          }}
                          className={`px-3 py-1 rounded-md text-sm ${selectedLocationIds.includes(loc.id) ? "bg-purple-600 text-white" : "bg-white border"}`}
                        >
                          {selectedLocationIds.includes(loc.id) ? "Selected" : "Select"}
                        </button>
                        <button onClick={() => mapRef.current?.panToLocation(loc.id)} className="text-xs text-gray-500">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7">
                {/* dynamic client-only map */}
                <ToiletMap ref={mapRef} locations={MOCK_LOCATIONS} users={MOCK_USERS} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">Tip: Click map markers to preview location, or click items on the left list to add/remove.</div>
            <div className="flex items-center gap-3">
              <LegendDot color="#16a34a" label="Clean" />
              <LegendDot color="#f59e0b" label="Needs cleaning" />
              <LegendDot color="#ef4444" label="Urgent" />
              <LegendDot color="#6b7280" label="Offline" />
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
