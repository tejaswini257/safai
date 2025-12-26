import { FileText, CheckCircle2, Clock } from 'lucide-react';

export default function ReportStats({ data }) {
    const stats = [
        { label: "Total Entries", val: data.length, color: "#FEF3EB", border: "#FDE0CF", iconColor: "#8E6C1F", Icon: FileText },
        { label: "Validated Tasks", val: data.filter(d => d.status === 'Completed').length, color: "#F0FDF4", border: "#DCFCE7", iconColor: "#15803D", Icon: CheckCircle2 },
        { label: "Pending Queue", val: data.filter(d => d.status !== 'Completed').length, color: "#F0F9FF", border: "#D1E9FF", iconColor: "#0070AD", Icon: Clock },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((s, i) => (
                <div key={i} style={{ backgroundColor: s.color, borderColor: s.border }} className="p-6 rounded-[24px] border flex items-center justify-between shadow-sm">
                    <div>
                        <p style={{ color: s.iconColor }} className="text-[10px] font-black uppercase tracking-widest leading-none">{s.label}</p>
                        <h3 className="text-3xl font-black text-slate-800 mt-2">{s.val < 10 ? `0${s.val}` : s.val}</h3>
                    </div>
                    <s.Icon size={24} style={{ color: s.iconColor }} className="opacity-30" />
                </div>
            ))}
        </div>
    );
}