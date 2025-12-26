"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2, Plus, Search, Users } from "lucide-react";

export default function UserManagementPage({ users = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-5 space-y-4">

      {/* HEADER + SEARCH + ACTION (ONE BOX) */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 shadow-sm">

        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h1 className="text-base font-semibold text-gray-900">
              Manage Users
            </h1>
          </div>

          {/* SOLID BUTTON (NO GRADIENT) */}
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md
            text-xs font-medium text-white
            bg-indigo-600 hover:bg-indigo-700
            transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300
            text-xs focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
      </div>

      {/* USERS TABLE (COMPACT) */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">

        {/* TABLE HEADER (SMALL, NO COLOR) */}
        <div className="grid grid-cols-12 px-4 py-2 text-[11px] font-medium
          text-gray-500 bg-gray-50 border-b">
          <div className="col-span-5">Name</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* TABLE ROWS */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-12 px-4 py-3 items-center
              border-b last:border-b-0
              text-xs hover:bg-gray-50 transition-colors"
            >
              {/* NAME + PHONE */}
              <div className="col-span-5">
                <p className="font-medium text-gray-900 leading-tight">
                  {user.name}
                </p>
                <p className="text-[11px] text-gray-500">
                  {user.phone}
                </p>
              </div>

              {/* EMAIL */}
              <div className="col-span-4 text-gray-600 truncate">
                {user.email || "N/A"}
              </div>

              {/* ROLE */}
              <div className="col-span-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-medium
                  ${
                    user.role === "Admin"
                      ? "bg-blue-100 text-blue-700"
                      : user.role === "Supervisor"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="col-span-1 flex justify-end gap-1.5">
                <button className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200">
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-xs text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}
