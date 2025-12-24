"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, FolderPlus, MapPin } from "lucide-react";

export default function AddHierarchyHeader() {
    const router = useRouter();

    return (
        <div className="rounded-[24px] bg-[#e5f6f8] border border-slate-100 shadow-sm overflow-hidden relative group">

            {/* Soft background decorative tint matching your UI */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />

            <div className="relative z-10 px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Title & Description Section */}
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white border border-[#D1F0F2] flex items-center justify-center shadow-inner">
                        <FolderPlus className="h-6 w-6 text-[#007C85]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-[#007C85]">
                            Create New Hierarchy
                        </h1>
                        <p className="flex items-center gap-1.5 mt-0.5 text-xs font-bold uppercase tracking-widest text-[#2D8E97]/70">
                            <MapPin size={12} />
                            Define structural nodes & parent mappings
                        </p>
                    </div>
                </div>

                {/* Back Button: Themed to match Action column style */}
                <button
                    onClick={() => router.back()}
                    className="
                        flex items-center gap-2 
                        px-5 py-2.5 rounded-xl 
                        text-xs font-black uppercase tracking-widest text-white
                        hover:opacity-90 transition-all active:scale-95 shadow-sm
                    "
                    style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
                >
                    <ArrowLeft size={16} strokeWidth={3} />
                    Back to Registry
                </button>
            </div>
        </div>
    );
}