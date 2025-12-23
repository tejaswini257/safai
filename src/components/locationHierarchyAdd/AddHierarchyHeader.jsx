"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, FolderPlus, MapPin } from "lucide-react";

export default function AddHierarchyHeader() {
    const router = useRouter();

    return (
        /* UI UPDATE: 
           Pure white floating card with refined shadow to pop against #F8FAFB background.
        */
        <div className="rounded-[24px] bg-white border border-slate-100 shadow-sm overflow-hidden relative group">

            {/* Subtle background decorative tint for brand identity */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6F7F9]/40 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />

            <div className="relative z-10 px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Title & Description Section */}
                <div className="flex items-center gap-5">
                    {/* Branded Icon Shield */}
                    <div className="h-12 w-12 rounded-2xl bg-[#E6F7F9] border border-[#D1F0F2] flex items-center justify-center shadow-inner">
                        <FolderPlus className="h-6 w-6 text-[#58BECF]" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-[#007C85] uppercase leading-none">
                            Add New Zone Type
                        </h1>
                        <p className="flex items-center gap-1.5 mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <MapPin size={12} className="text-[#58BECF]" />
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
                        text-[10px] font-black uppercase tracking-widest text-[#007C85] 
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