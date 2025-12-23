"use client";

import { useRouter } from "next/navigation";
import { Network, ChevronLeft } from "lucide-react";

export default function ShowHeader() {
    const router = useRouter();

    return (
        <div className="w-full mb-8">
            <div className="bg-white rounded-[24px] border border-slate-100 p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">

                <div className="flex items-center gap-5">
                    {/* Branded Icon Box using your CSS Primary color */}
                    <div className="h-12 w-12 bg-[#E6F7F9] rounded-2xl flex items-center justify-center border border-[#D1F0F2]">
                        <Network className="h-6 w-6 text-[#58BECF]" strokeWidth={2.5} />
                    </div>

                    <div className="text-left">
                        <h1 className="text-lg font-black text-[#007C85] tracking-tight uppercase leading-none">
                            Zone Architecture
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                            Manage and organize functional zone relationships
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-[#007C85] text-[10px] font-black uppercase tracking-widest hover:bg-[#F8FAFB] transition-all active:scale-95"
                    >
                        <ChevronLeft size={14} strokeWidth={3} />
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
}