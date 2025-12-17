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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#10143A] via-[#353767] to-[#6A6C97] text-white">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Report Generated</h1>
            <p className="text-sm text-slate-500">View and download your report</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
          <button 
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Report Type
              </label>
              <div className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900">
                {reportType}
              </div>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Zone
              </label>
              <div className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900">
                {zone}
              </div>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Date Range
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900">
                  {startDate}
                </div>
                <span className="text-slate-400">to</span>
                <div className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900">
                  {endDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-r from-[#343667] to-[#686998] p-6 shadow-sm text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/90">Total Reports</p>
              <p className="mt-1 text-2xl font-bold text-white">24</p>
            </div>
            <div className="rounded-lg bg-white/20 p-3 text-white">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-[#FE9695] to-[#F9C3C4] p-6 shadow-sm text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/90">Completed</p>
              <p className="mt-1 text-2xl font-bold text-white">18</p>
            </div>
            <div className="rounded-lg bg-white/20 p-3 text-white">
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

        <div className="rounded-2xl bg-gradient-to-r from-[#F5A847] to-[#FEBF74] p-6 shadow-sm text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/90">In Progress</p>
              <p className="mt-1 text-2xl font-bold text-white">4</p>
            </div>
            <div className="rounded-lg bg-white/20 p-3 text-white">
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
                          ? 'bg-[#FFDEDF] text-[#FF989C]'
                          : item.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      {item.score}%
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
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
          <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Previous
          </button>
          <button className="rounded-md bg-gradient-to-r from-[#343667] to-[#686998] px-3 py-1.5 text-sm font-medium text-white hover:from-[#2a2c52] hover:to-[#54577a] transition-colors">
            1
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            2
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
