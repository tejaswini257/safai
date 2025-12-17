export default function SupervisorStats() {
    return (
        <div className="flex gap-4 flex-wrap">
            <Stat label="Total Supervisors" value="0" color="green" />
            <Stat label="Pending Assignments" value="0" color="amber" />
        </div>
    );
}

function Stat({ label, value, color }) {
    const colors = {
        green: "bg-green-100 text-green-700",
        amber: "bg-amber-100 text-amber-700",
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full font-semibold ${colors[color]}`}>
                {value}
            </span>
            <span className="text-sm text-slate-600">{label}</span>
        </div>
    );
}
