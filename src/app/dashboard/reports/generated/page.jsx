"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import ReportSummaryHeader from "@/components/reports/generated/ReportSummaryHeader";
import ReportStats from "@/components/reports/generated/ReportStats";
import ReportTable from "@/components/reports/generated/ReportTable";

function ReportContent() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Logical filter values from URL
  const reportType = searchParams.get('type') || 'Cleaning Report';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  // Simulation of fetched data
  const reportData = [
    { id: 1, cleaner: 'John Doe', zone: 'Dhantoli', location: 'Mehadiya Chowk', date: '22-12-2025', time: '09:00 AM', status: 'Completed', score: 95 },
    { id: 2, cleaner: 'Anil Saafai', zone: 'Dharampeth', location: 'Ramnagar Chowk', date: '22-12-2025', time: '10:30 AM', status: 'In Progress', score: 82 },
    { id: 3, cleaner: 'Meera Patil', zone: 'Sadar', location: 'Mount Road', date: '22-12-2025', time: '11:15 AM', status: 'Completed', score: 88 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8 px-8 space-y-8 w-full">
      <ReportSummaryHeader
        reportType={reportType}
        data={reportData} // FIX: You must pass the array here!
      />

      <ReportStats data={reportData} />
      <ReportTable data={reportData} />
    </div>
  );
}

export default function GeneratedReportPage() {
  return (
    <Suspense fallback={<div className="p-10 text-[#007C85] font-black animate-pulse uppercase tracking-[0.3em]">Syncing Registry Data...</div>}>
      <ReportContent />
    </Suspense>
  );
}