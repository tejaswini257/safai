import { UserPlus } from "lucide-react";

export default function EmptySupervisorState() {
    return (
        <div className="flex justify-center pt-10">
            <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <UserPlus className="text-slate-400" size={28} />
                </div>
                <h3 className="h-section mb-2">No Supervisors Assigned</h3>
                <p className="text-sm text-slate-500 mb-6">
                    No supervisors are currently assigned to this location.
                </p>
                <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                    Add First Supervisor
                </button>
            </div>
        </div>
    );
}
