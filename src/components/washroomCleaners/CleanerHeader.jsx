import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function CleanerHeader() {
    return (
        <div className="header-container--navy flex justify-between items-center shadow">

            <div className="flex items-center gap-3">
                <Link href="/dashboard/washrooms">
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </Link>

                <div>
                    <h1 className="h-page">Assigned Cleaners</h1>
                    <p className="h-sub">Abhyankar Nagar Garden</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="bg-white/10 px-4 py-1 rounded-full text-sm">
                    2 of 2
                </span>
                <Link href="/dashboard/washrooms/1/cleaners/add">
                    <button className="btn-primary bg-white text-[var(--navy)] hover:bg-slate-100 hover:text-[var(--navy)] flex items-center gap-2">
                        <UserPlus size={16} /> Add Cleaner
                    </button>
                </Link>
            </div>
        </div>
    );
}


