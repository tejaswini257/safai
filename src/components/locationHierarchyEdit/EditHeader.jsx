"use client";

import { ChevronLeft, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditHeader() {
    const router = useRouter();

    return (
        <div className="w-full mb-6">
            {/* Pure white card with shadow to separate from the #F8FAFB background */}
            <div className="bg-white rounded-[24px] border border-slate-100 p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">

                <div className="flex items-center gap-5">
                    {/* Themed Icon Box - Using the light cyan here as an accent, not the whole background */}
                    <div className="h-12 w-12 bg-[#E6F7F9] rounded-2xl flex items-center justify-center border border-[#D1F0F2]">
                        <Edit3 className="h-6 w-6 text-[#58BECF]" strokeWidth={2.5} />
                    </div>

                    <div className="text-left">
                        <h1 className="text-lg font-black text-[#007C85] tracking-tight uppercase leading-none">
                            Edit Zone Type
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                            Configuration Portal • Workspace Management
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F8FAFB] border border-slate-200 text-[#007C85] text-[10px] font-black uppercase tracking-widest hover:bg-white hover:shadow-md transition-all active:scale-95"
                >
                    <ChevronLeft size={14} strokeWidth={3} />
                    Back to List
                </button>
            </div>
        </div>
    );
}