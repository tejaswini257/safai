"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, FolderPlus, MapPin } from "lucide-react";

export default function AddHierarchyHeader() {
    const router = useRouter();

    return (
        /* UI UPDATE: Pure white floating card with refined shadow */
        <div className="rounded-[24px] bg-white border border-slate-100 shadow-sm overflow-hidden relative group">

            {/* Subtle background decorative tint for brand identity */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6F7F9]/40 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />

            <div className="relative z-10 px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Title & Description Section */}
                <div className="flex items-center gap-5">
                    {/* Branded Icon Shield - Slightly reduced size to match new header style */}
                    <div className="h-11 w-11 rounded-2xl bg-[#E6F7F9] border border-[#D1F0F2] flex items-center justify-center shadow-inner">
                        <FolderPlus className="h-5 w-5 text-[#58BECF]" strokeWidth={3} />
                    </div>
                    <div className="text-left">
                        {/* UPDATED HEADING: Increased size and bold weight to match user management */}
                        <h1 className="text-lg font-black tracking-tight text-[#007C85] uppercase leading-none">
                            Add New Zone Type
                        </h1>
                        {/* UPDATED SUBTITLE: Increased text size for legibility */}
                        <p className="flex items-center gap-1.5 mt-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                            <MapPin size={13} className="text-[#58BECF]" />
                            Configure Workspace Architecture
                        </p>
                    </div>
                </div>

                {/* Back Button: Styled as a tactile white button */}
                <button
                    onClick={() => router.back()}
                    className="
                        flex items-center gap-2 
                        px-6 py-3 rounded-xl 
                        bg-white border border-slate-200 
                        text-[11px] font-black uppercase tracking-widest text-[#007C85] 
                        hover:bg-[#F8FAFB] hover:border-[#58BECF]/30 hover:shadow-md
                        transition-all active:scale-95 shadow-sm
                    "
                >
                    <ChevronLeft size={16} strokeWidth={3} />
                    Back to List
                </button>
            </div>
        </div>
    );
}