"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import DatePicker from "react-datepicker";
import { format, parse } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import {
  Calendar as CalendarIcon,
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
        } bg-white px-4 py-2.5 text-sm text-[#8A8AB2] shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100`}
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
    option === value
      ? "bg-indigo-100 text-[#4B4E77] font-medium"
      : hoveredIndex === index
      ? "bg-indigo-50 text-[#4B4E77]"
      : "text-[#4B4E77] hover:bg-indigo-50"
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
  const router = useRouter();
  const [filters, setFilters] = useState({
    zone: "All Zones",
    location: "All Locations",
    cleaner: "All Cleaners",
    startDate: new Date(),
    endDate: new Date(),
    status: "All Status",
  });
  
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  
  // Handle click outside to close date picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowStartDatePicker(false);
        setShowEndDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleGenerateReport = () => {
    // Format dates to DD-MM-YYYY before sending
    const formatDate = (date) => format(date, 'dd-MM-yyyy');
    
    // Navigate to the generated report page with query parameters
    const queryParams = new URLSearchParams({
      type: reportType,
      zone: filters.zone,
      startDate: formatDate(filters.startDate),
      endDate: formatDate(filters.endDate),
      status: filters.status
    });
    router.push(`/dashboard/reports/generated?${queryParams.toString()}`);
  };

  const handleReset = () => {
    const today = new Date();
    setFilters({
      zone: "All Zones",
      location: "All Locations",
      cleaner: "All Cleaners",
      startDate: today,
      endDate: today,
      status: "All Status",
    });
    setReportType("Cleaning Report");
  };
  
  const handleStartDateChange = (date) => {
    setFilters({ ...filters, startDate: date });
    setShowStartDatePicker(false);
  };
  
  const handleEndDateChange = (date) => {
    setFilters({ ...filters, endDate: date });
    setShowEndDatePicker(false);
  };

  return (
    <div className="space-y-4 bg-white p-4 w-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white shadow-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2F3A45]">Reports</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Generate and export detailed reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="rounded-2xl border border-[#E6F6F7] bg-[#F4FBFC] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-[#2DB7C4]" />
          <h2 className="text-lg font-semibold text-[#2F3A45]">Select Report Type</h2>
        </div>
        <CustomDropdown
          label=""
          value={reportType}
          options={reportTypes}
          onChange={setReportType}
        />
        <p className="mt-3 text-sm text-[#6B7280]">
          View cleaner tasks with AI scores and compliance
        </p>
      </div>

      {/* Filters Section */}
      <div className="rounded-2xl border border-[#E6F6F7] bg-[#F4FBFC] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-[#2DB7C4]" />
          <h2 className="text-lg font-semibold text-[#2F3A45]">Filters</h2>
        </div>

        <div className="space-y-4">
          {/* First Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Zone / Location Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Zone / Location Type
              </label>
              <CustomDropdown
                value={filters.zone}
                options={zones}
                onChange={(value) => setFilters({ ...filters, zone: value })}
              />
            </div>

            {/* Location / Washroom */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Location / Washroom
              </label>
              <CustomDropdown
                value={filters.location}
                options={locations}
                onChange={(value) => setFilters({ ...filters, location: value })}
              />
            </div>

            {/* Cleaner */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Cleaner
              </label>
              <CustomDropdown
                value={filters.cleaner}
                options={cleaners}
                onChange={(value) => setFilters({ ...filters, cleaner: value })}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Start Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Start Date
              </label>
              <div className="relative w-full" ref={datePickerRef}>
                <div 
                  className="flex items-center justify-between w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm cursor-pointer h-[42px]"
                  onClick={() => setShowStartDatePicker(!showStartDatePicker)}
                >
                  <span className="text-sm">{format(filters.startDate, 'dd-MM-yyyy')}</span>
                  <CalendarIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                </div>
                {showStartDatePicker && (
                  <div className="absolute z-10 mt-1">
                    <DatePicker
                      selected={filters.startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={filters.startDate}
                      endDate={filters.endDate}
                      maxDate={new Date()}
                      inline
                      className="border border-slate-200 rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* End Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                End Date
              </label>
              <div className="relative w-full" ref={datePickerRef}>
                <div 
                  className="flex items-center justify-between w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm cursor-pointer h-[42px]"
                  onClick={() => setShowEndDatePicker(!showEndDatePicker)}
                >
                  <span className="text-sm">{format(filters.endDate, 'dd-MM-yyyy')}</span>
                  <CalendarIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                </div>
                {showEndDatePicker && (
                  <div className="absolute z-10 mt-1">
                    <DatePicker
                      selected={filters.endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={filters.startDate}
                      endDate={filters.endDate}
                      minDate={filters.startDate}
                      maxDate={new Date()}
                      inline
                      className="border border-slate-200 rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            
            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>
              <CustomDropdown
                value={filters.status}
                options={statuses}
                onChange={(value) => setFilters({ ...filters, status: value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3">
            <button 
              onClick={handleGenerateReport}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:ring-offset-2"
            >
              <FileText className="h-4 w-4 text-white" />
              Generate Report
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:ring-offset-2"
            >
              <RefreshCw className="h-4 w-4 text-white" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
