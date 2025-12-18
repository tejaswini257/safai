"use client";

import { useSearchParams } from 'next/navigation';
import { FileText, Download, ChevronDown, Filter, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export default function GeneratedReport() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Get filter values from URL
  const reportType = searchParams.get('type') || 'Cleaning Report';
  const zone = searchParams.get('zone') || 'All Zones';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const status = searchParams.get('status') || 'All Status';

  // Sample data - replace with actual data fetching logic
  const reportData = [
    {
      id: 1,
      cleaner: 'John Doe',
      zone: 'Zone A',
      location: 'Location 1',
      date: '01-01-2023',
      time: '09:00 AM',
      status: 'Completed',
      score: 95,
      details: 'All areas cleaned properly'
    },
    // Add more sample data as needed
  ];

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Report Generated</h1>
            <p className="text-sm text-slate-500">View and download your report</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:ring-offset-2 transition-all">
            <Download className="h-4 w-4 text-white" />
            Download PDF
          </button>
          <button 
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:ring-offset-2 transition-all"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 text-white" />
            Filters
            <ChevronDown className={`h-4 w-4 text-white transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="rounded-2xl border border-[#E6F6F7] bg-[#F4FBFC] p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Report Type
              </label>
              <div className="rounded-lg border border-[#D1E0E2] bg-white px-4 py-2.5 text-sm text-[#2F3A45]">
                {reportType}
              </div>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Zone
              </label>
              <div className="rounded-lg border border-[#D1E0E2] bg-white px-4 py-2.5 text-sm text-[#2F3A45]">
                {zone}
              </div>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Date Range
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-[#D1E0E2] bg-white px-4 py-2.5 text-sm text-[#2F3A45]">
                  {startDate || 'Start date'}
                </div>
                <span className="text-[#6B7280]">to</span>
                <div className="flex-1 rounded-lg border border-[#D1E0E2] bg-white px-4 py-2.5 text-sm text-[#2F3A45]">
                  {endDate || 'End date'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Gold / Highlight Card */}
        <div className="rounded-2xl bg-[#FFF3E0] border-2 border-[#F4B740] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#2F3A45]">Total Reports</p>
              <p className="mt-1 text-2xl font-bold text-[#2F3A45]">24</p>
            </div>
            <div className="rounded-lg bg-[#F4B740] p-3 text-white">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Blue / Secondary Card */}
        <div className="rounded-2xl bg-[#EEF4FF] border-2 border-[#4F7FD9] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#2F3A45]">Completed</p>
              <p className="mt-1 text-2xl font-bold text-[#2F3A45]">18</p>
            </div>
            <div className="rounded-lg bg-[#4F7FD9] p-3 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bronze / Neutral Card */}
        <div className="rounded-2xl bg-[#FFF1E8] border-2 border-[#C77C5C] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#2F3A45]">In Progress</p>
              <p className="mt-1 text-2xl font-bold text-[#2F3A45]">4</p>
            </div>
            <div className="rounded-lg bg-[#C77C5C] p-3 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Cleaner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Zone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Score
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {reportData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                    {item.cleaner}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {item.zone}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {item.location}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    <div>{item.date}</div>
                    <div className="text-xs text-slate-400">{item.time}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === 'Completed'
                          ? 'bg-[#E6F6F7] text-[#0E7C86]'
                          : item.status === 'In Progress'
                          ? 'bg-[#FEF9E6] text-[#8E6C1F]'
                          : 'bg-[#FEF3F2] text-[#B42318]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-[#2DB7C4]"></div>
                      {item.score}%
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-[#4F7FD9] hover:text-[#3A5FA8]">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">24</span> results
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="rounded-md border border-[#D1E0E2] bg-white px-3 py-1.5 text-sm font-medium text-[#2F3A45] hover:bg-[#F4FBFC]">
            Previous
          </button>
          <button className="rounded-md bg-[#2DB7C4] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2397A3] transition-colors">
            1
          </button>
          <button className="rounded-md border border-[#D1E0E2] bg-white px-3 py-1.5 text-sm font-medium text-[#2F3A45] hover:bg-[#F4FBFC]">
            2
          </button>
          <button className="rounded-md border border-[#D1E0E2] bg-white px-3 py-1.5 text-sm font-medium text-[#2F3A45] hover:bg-[#F4FBFC]">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
