import { Users, MapPin, Calendar, Activity, Zap, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReportTable({ data }) {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden print:shadow-none print:border-slate-300">
            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0" id="report-table">
                    <thead>
                        <tr className="bg-[#E6F7F9] print:bg-slate-100">
                            <THeader Icon={Users} label="Cleaner" />
                            <THeader Icon={MapPin} label="Location" />
                            <THeader Icon={Calendar} label="Registry Date" />
                            <THeader Icon={Activity} label="Status" />
                            <THeader Icon={Zap} label="AI Score" />
                            <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-[#007C85] border-b border-[#D1F0F2] print:hidden">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-[#F4FBFC]/40 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-[#E6F7F9] text-[#007C85] flex items-center justify-center font-black text-[10px] border border-[#D1F0F2] print:border-slate-300">
                                            {item.cleaner.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <p className="text-sm font-bold text-slate-700">{item.cleaner}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-bold text-[#007C85]">{item.location}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.zone}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="text-sm font-black text-slate-600">{item.date}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${item.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-500' : 'bg-amber-50 border-amber-100 text-amber-500'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden print:border print:border-slate-200">
                                            <div className="h-full bg-[#2DB7C4]" style={{ width: `${item.score}%` }} />
                                        </div>
                                        <span className="text-sm font-black text-[#2DB7C4]">{item.score}%</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right print:hidden">
                                    <button className="text-[#58BECF] hover:text-[#007C85] text-[10px] font-black uppercase tracking-widest group-hover:underline">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function THeader({ Icon, label }) {
    return (
        <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.15em] text-[#007C85] border-b border-[#D1F0F2]">
            <div className="flex items-center gap-2">
                <Icon size={14} className="text-[#58BECF] print:text-slate-400" strokeWidth={2.5} />
                <span>{label}</span>
            </div>
        </th>
    );
}