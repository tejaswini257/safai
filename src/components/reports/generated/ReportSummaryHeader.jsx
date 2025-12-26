"use client";

import { BarChart3, Download, Printer, FileSpreadsheet, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import the function directly
import * as XLSX from 'xlsx';

export default function ReportSummaryHeader({ reportType, data }) {
    const router = useRouter();

    // 1. PDF LOGIC
    const downloadPDF = () => {
        if (!data || data.length === 0) {
            alert("No data available to export.");
            return;
        }

        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(18);
        doc.text(`Safai Portal - ${reportType}`, 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

        const tableColumn = ["Cleaner", "Location", "Zone", "Date", "Status", "Score"];
        const tableRows = data.map(item => [
            item.cleaner,
            item.location,
            item.zone,
            item.date,
            item.status,
            `${item.score}%`
        ]);

        // FIX: Use the autoTable function directly
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: { fontSize: 8, font: "helvetica" },
            headStyles: { fillStyle: 'f', fillColor: [0, 124, 133] }, // Matches your Teal theme #007C85
        });

        doc.save(`Safai_Report_${new Date().getTime()}.pdf`);
    };

    // 2. EXCEL LOGIC
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, `Safai_Registry_${new Date().getTime()}.xlsx`);
    };

    // 3. PRINT LOGIC
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6 print:hidden">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-[#007C85] font-black text-[10px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
            >
                <ArrowLeft size={16} strokeWidth={3} /> Back to Parameters
            </button>

            <div className="bg-[#E6F7F9] rounded-[24px] border border-[#D1F0F2] p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
                <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-white">
                        <BarChart3 className="h-6 w-6 text-[#58BECF]" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                        <h1 className="text-lg font-black text-[#007C85] tracking-tight uppercase leading-none">Report Generated</h1>
                        <p className="text-[10px] font-bold text-[#2D8E97] uppercase tracking-widest opacity-70 mt-1">Registry Audit • {reportType}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* PDF Button */}
                    <button
                        onClick={downloadPDF}
                        className="bg-gradient-to-r from-[#58BECF] to-[#6D9CDC] flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg hover:brightness-105 active:scale-95 transition-all"
                    >
                        <Download size={14} /> PDF
                    </button>

                    {/* Excel Button */}
                    <button
                        onClick={downloadExcel}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-600 active:scale-95 transition-all"
                    >
                        <FileSpreadsheet size={14} /> Excel
                    </button>

                    {/* Print Button */}
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                    >
                        <Printer size={14} /> Print
                    </button>
                </div>
            </div>
        </div>
    );
}