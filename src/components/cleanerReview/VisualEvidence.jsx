"use client";

import { HiOutlinePhotograph } from "react-icons/hi";

export default function VisualEvidence() {
    // Construct the path to your public folder images
    const IMAGE_BASE_PATH = "/image/CleanerActivity";

    // Mapping images as pairs (1-2, 3-4, 5-6, 7-8) for Before/After comparison
    const evidencePhotos = [
        { id: "1.webp", label: "Before" },
        { id: "2.webp", label: "After" },
        { id: "3.webp", label: "Before" },
        { id: "4.webp", label: "After" },
        { id: "5.webp", label: "Before" },
        { id: "6.webp", label: "After" },
        { id: "7.webp", label: "Before" },
        { id: "8.webp", label: "After" },
    ];

    return (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-[var(--radius)] p-6 shadow-sm space-y-5">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#E0F7FA] rounded-lg shadow-sm">
                    <HiOutlinePhotograph className="text-[hsl(var(--primary))] text-xl" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                    Visual Evidence ({evidencePhotos.length} Photos)
                </h3>
            </div>

            {/* Status Labels */}
            <div className="flex items-center justify-between px-1">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary-dark))] opacity-80">
                        Status
                    </p>
                    <p className="text-sm font-bold text-[hsl(var(--primary))]">
                        Inspected & Completed
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded bg-[#FFF5F7] text-rose-500 border border-rose-100">
                        Before / After Comparison
                    </p>
                </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {evidencePhotos.map((photo, i) => (
                    <div
                        key={i}
                        className="group relative h-32 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--primary)/0.15)] overflow-hidden hover:border-[hsl(var(--primary))] transition-all duration-300 shadow-sm"
                    >
                        {/* ACTUAL IMAGE SOURCE */}
                        <img
                            src={`${IMAGE_BASE_PATH}/${photo.id}`}
                            alt={`Evidence ${photo.label}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150?text=No+Photo";
                            }}
                        />

                        {/* Tag: Dynamic label based on Before/After */}
                        <span className={`absolute top-2 left-2 rounded-lg backdrop-blur-sm px-2 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm border ${photo.label === "Before"
                            ? "bg-slate-800/80 text-white border-slate-700"
                            : "bg-white/90 text-[hsl(var(--primary-dark))] border-[hsl(var(--primary)/0.1)]"
                            }`}>
                            {photo.label}
                        </span>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            <p className="text-[11px] text-[hsl(var(--muted-foreground))] italic text-center pt-2">
                * View captured on 24/12/2025 as part of the Zonal Inspection Registry.
            </p>
        </div>
    );
}