"use client";

import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  FileText,
  Filter,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const reportTypes = [
  "Cleaning Report",
  "Washroom Report",
  "Cleaner Report",
  "Detailed Cleaning Report",
];

const zones = [
  "All Zones",
  "Dhantoli",
  "Dharampeth Zone",
  "Manish Nagar Zone",
  "Nagpur East",
  "Nagpur Ruaral",
  "Nagpur Urban",
  "Nehru Nagar Zone",
  "Sadar Zone",
  "Shanti Nagar",
];

const locations = [
  "All Locations",
  "Ambazari Dahan Ghat (Dharampeth Zone)",
  "Budhawar Bazaar (Nehru Nagar Zone)",
  "Children Traffic Park, Khare Town, Dharampeth (Dharampeth Zone)",
  "Kachipura Chowk (Dharampeth Zone)",
  "Meetha Neem Dargah Civil lines (Dharampeth Zone)",
  "Mehadiya Chowk Dhantoli (Dhantoli)",
  "Morbhavan (old bus stop / MorBhavan city bus stand — Sitabuldi) (Nagpur Urban)",
  "Narendra nagar square (Nagpur Urban)",
  "Ramnagar Chowk (Dharampeth Zone)",
  "Sakkardhar under bridge (Nehru Nagar Zone)",
  "SBT Kadimbhag (Dharampeth Zone)",
  "Shankar Nagar Chowk (Dharampeth Zone)",
  "Tuta Garden — Gandhi Chowk (Sadar) (Sadar Zone)",
  "Vidhan Bhavan Back side Civil lines (Dharampeth Zone)",
  "Zenda Chowk, Dharampeth (Dharampeth Zone)",
];

const cleaners = [
  "All Cleaners",
  "Anil Saafai User",
  "Ankit choudhary - Budhwar Bajar",
  "Manish jadhav - Meetha Neem Dargaha",
  "Nikhil Tupkar",
  "nitesh Mohadikar vidan bhavan toilet 🚽",
  "Omkar saaf cleaner",
  "Rajesh sahani - Narendra square",
  "Raju Choudhary Ambazhari dahan toilet 🚽",
];

const statuses = ["All Status", "Completed", "Ongoing"];

function CustomDropdown({ label, value, options, onChange, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-lg border ${
          isOpen ? "border-indigo-500" : "border-slate-300"
        } bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100`}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-slate-400" />}
          <span className="text-left">{value}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                className={`w-full px-4 py-2 text-left text-sm transition ${
                  option === value || hoveredIndex === index
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("Cleaning Report");
  const [filters, setFilters] = useState({
    zone: "All Zones",
    location: "All Locations",
    cleaner: "All Cleaners",
    startDate: "11-12-2025",
    endDate: "11-12-2025",
    status: "All Status",
  });

  const handleReset = () => {
    setFilters({
      zone: "All Zones",
      location: "All Locations",
      cleaner: "All Cleaners",
      startDate: "11-12-2025",
      endDate: "11-12-2025",
      status: "All Status",
    });
    setReportType("Cleaning Report");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
              <p className="text-sm text-slate-500 mt-1">
                Generate and export detailed reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Select Report Type</h2>
        </div>
        <CustomDropdown
          label=""
          value={reportType}
          options={reportTypes}
          onChange={setReportType}
        />
        <p className="mt-3 text-sm text-slate-600">
          View cleaner tasks with AI scores and compliance
        </p>
      </div>

      {/* Filters Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Zone / Location Type */}
          <CustomDropdown
            label="Zone / Location Type"
            value={filters.zone}
            options={zones}
            onChange={(value) => setFilters({ ...filters, zone: value })}
          />

          {/* Location / Washroom */}
          <CustomDropdown
            label="Location / Washroom"
            value={filters.location}
            options={locations}
            onChange={(value) => setFilters({ ...filters, location: value })}
          />

          {/* Cleaner */}
          <CustomDropdown
            label="Cleaner"
            value={filters.cleaner}
            options={cleaners}
            onChange={(value) => setFilters({ ...filters, cleaner: value })}
          />

          {/* Start Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Start Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="DD-MM-YYYY"
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              End Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="DD-MM-YYYY"
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Status */}
          <CustomDropdown
            label="Status"
            value={filters.status}
            options={statuses}
            onChange={(value) => setFilters({ ...filters, status: value })}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

