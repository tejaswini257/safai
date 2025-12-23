"use client";

import { useMemo, useState } from "react";
import WashroomHeader from "../../../components/washroommain/WashroomHeader";
import WashroomFilters from "../../../components/washroommain/WashroomFilters";
import WashroomTable from "../../../components/washroommain/WashroomTable";

const WASHROOMS = [
  {
    id: "294",
    name: "New Manish Nagar Chowk",
    location_types: { name: "Manish Nagar Zone" },
    current_cleaning_score: 7.0,
    averageRating: 8.7,
    cleaner_assignments: [
      { status: "assigned", cleaner_user: { name: "Nikhil Tupkar", phone: "7777777777" } },
      { status: "unassigned", cleaner_user: { name: "Raju Chaudhari", phone: "8210370052" } },
      { status: "unassigned", cleaner_user: { name: "Suresh Mane", phone: "9527632627" } }
    ],
    facility_companies: { name: "N/A" },
    status: false,
    latitude: 21.085,
    longitude: 79.067
  },
  {
    id: "289",
    name: "SBT Japnese garden",
    location_types: { name: "Dhantoli" },
    current_cleaning_score: 8.9,
    averageRating: 9.6,
    cleaner_assignments: [
      { status: "assigned", cleaner_user: { name: "Raju Choudhary", phone: "8210370052" } }
    ],
    facility_companies: { name: "N/A" },
    status: true,
    latitude: 21.161,
    longitude: 79.064
  },
  {
    id: "278",
    name: "Budhawar Bazaar",
    location_types: { name: "Nehru Nagar Zone" },
    current_cleaning_score: 8.5,
    averageRating: 8.9,
    cleaner_assignments: [
      { status: "assigned", cleaner_user: { name: "Ankit Choudhary", phone: "7499667264" } }
    ],
    facility_companies: { name: "N/A" },
    status: true,
    latitude: 21.127,
    longitude: 79.111
  }
];

export default function WashroomsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [assignmentFilter, setAssignmentFilter] = useState("all");

  const filtered = useMemo(() => {
    return WASHROOMS.filter((w) => {
      const q = search.trim().toLowerCase();
      if (q && !w.name.toLowerCase().includes(q) && !w.location_types.name.toLowerCase().includes(q)) return false;
      if (typeFilter !== "all" && w.location_types.name !== typeFilter) return false;
      if (companyFilter !== "all" && w.facility_companies?.name !== companyFilter) return false;
      if (ratingFilter === "8plus" && w.averageRating < 8) return false;
      if (ratingFilter === "9plus" && w.averageRating < 9) return false;

      const isAssigned = w.cleaner_assignments.some(a => a.status === "assigned");
      if (assignmentFilter === "assigned" && !isAssigned) return false;
      if (assignmentFilter === "unassigned" && isAssigned) return false;

      return true;
    });
  }, [search, typeFilter, companyFilter, ratingFilter, assignmentFilter]);

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCompanyFilter("all");
    setRatingFilter("all");
    setAssignmentFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] pb-12 transition-colors duration-300">
      <div className="max-w-full mx-auto p-4 md:p-8 space-y-6">

        {/* 1. Header Section */}
        <div className="z-20">
          <WashroomHeader />
        </div>

        {/* 2. Filter Card */}
        <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
          <WashroomFilters
            search={search}
            onSearchChange={setSearch}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            companyFilter={companyFilter}
            onCompanyFilterChange={setCompanyFilter}
            ratingFilter={ratingFilter}
            onRatingFilterChange={setRatingFilter}
            assignmentFilter={assignmentFilter}
            onAssignmentFilterChange={setAssignmentFilter}
            onClear={handleClearFilters}
          />
        </div>

        {/* 3. Table Container - STRIP REMOVED HERE */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#58BECF]/5 to-[#6D9CDC]/5 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

          <div className="relative bg-white border border-slate-100 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            {/* The 1.5px blue gradient line has been removed to achieve the clean look */}
            <div className="p-2 overflow-x-auto">
              <WashroomTable items={filtered} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}