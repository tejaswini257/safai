"use client";

import { useState } from "react";
import ReportHeader from "@/components/reports/ReportHeader";
import ReportSidebar from "@/components/reports/ReportSidebar";
import ReportConfig from "@/components/reports/ReportConfig";
import "react-datepicker/dist/react-datepicker.css";

const reportConfigs = {
  "Cleaning Report": {
    description: "INCLUDES AI SCORES AND CLEANER COMPLIANCE METRICS",
    fields: [
      { type: "select", name: "status", label: "Status Filter", options: ["All Status", "Completed", "Pending"] },
      { type: "select", name: "zone", label: "Zone Selection", options: ["All Zones", "Dhantoli", "Dharampeth"] },
      { type: "select", name: "location", label: "Location / Washroom Node", options: ["All Locations", "Public Toilet 1"] },
      { type: "date-range", label: "Select Timeframe" }
    ]
  },
  "Washroom Report": {
    description: "VIEW SINGLE WASHROOM HYGIENE REPORT",
    fields: [
      { type: "select", name: "location", label: "Location / Washroom", options: ["All Locations", "Node A", "Node B"] },
      { type: "select", name: "status", label: "Status", options: ["All Status", "Clean", "Needs Attention"] },
      { type: "date-range", label: "Start Date", isStart: true },
      { type: "date-range", label: "End Date", isEnd: true },
    ]
  },
  "Cleaner Report": {
    description: "VIEW INDIVIDUAL CLEANER OR ALL CLEANERS PERFORMANCE",
    fields: [
      { type: "select", name: "location", label: "Location / Washroom", options: ["All Locations", "Main Block"] },
      { type: "select", name: "cleaner", label: "Cleaner", options: ["All Cleaners", "Rahul S.", "Priya M."] },
      { type: "select", name: "status", label: "Status", options: ["All Status", "Active", "Inactive"] },
      { type: "date-range", label: "Start Date", isStart: true },
      { type: "date-range", label: "End Date", isEnd: true },
    ]
  },
  "Washroom Hygiene Trend": {
    description: "VIEW DAILY HYGIENE SCORES ACROSS ALL WASHROOMS",
    fields: [
      { type: "date-range", label: "Start Date", isStart: true },
      { type: "date-range", label: "End Date", isEnd: true, description: "(Max 31 days from start)" }
    ]
  },
  "Detailed Cleaning Report": {
    description: "AGGREGATE PERFORMANCE METRICS FOR CLEANERS",
    fields: [
      { type: "select", name: "zone", label: "Zone / Location Type", options: ["All Zones", "Nagpur Urban", "Nagpur Rural"] },
      { type: "select", name: "location", label: "Location / Washroom", options: ["All Locations"] },
      { type: "date-single", label: "Choose Date", description: "Select a single date for detailed report" }
    ]
  }
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("Cleaning Report");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-6">

        <ReportHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <ReportSidebar
              reportConfigs={reportConfigs}
              selectedReport={selectedReport}
              setSelectedReport={setSelectedReport}
            />
          </div>

          <div className="lg:col-span-8">
            <ReportConfig
              selectedReport={selectedReport}
              config={reportConfigs[selectedReport]}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>

        {/* SYSTEM FOOTER */}
        <div className="text-center pt-8 opacity-30">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-500">
            Safai Analytics Engine // Nagpur Municipal Corporation
          </p>
        </div>
      </div>
    </div>
  );
}