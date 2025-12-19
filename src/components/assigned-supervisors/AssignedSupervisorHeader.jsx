import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AssignedSupervisorHeader() {
    return (
        <div className="header-container--navy flex justify-between items-center shadow">
            <div className="flex items-center gap-3">
                <Link href="/dashboard/washrooms">
                    <button className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </Link>
                <div>
                    <h1 className="h-page">Assigned Supervisors</h1>
                    <p className="h-sub">Abhyankar Nagar Garden</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="bg-white/10 px-4 py-1 rounded-full text-sm">
                    0 of 0
                </span>
                <Link href="/dashboard/washrooms/1/supervisors/add">
                    <button className="btn-primary bg-white text-[var(--navy)] hover:bg-slate-100 hover:text-[var(--navy)] flex items-center gap-2">
                        <UserPlus size={16} /> Add Supervisor
                    </button>
                </Link>
            </div>
        </div>
    );
}
