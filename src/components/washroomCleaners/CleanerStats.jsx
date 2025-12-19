export default function CleanerStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="Total Cleaners"
                value="2"
                color="indigo"
            />
            <StatCard
                title="Assigned"
                value="2"
                color="green"
            />
            <StatCard
                title="Unassigned"
                value="0"
                color="amber"
            />
        </div>
    );
}

function StatCard({ title, value, color }) {
    const colors = {
        indigo: "bg-indigo-100 text-indigo-700",
        green: "bg-green-100 text-green-700",
        amber: "bg-amber-100 text-amber-700",
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">{title}</p>
            <span className={`inline-block px-4 py-1 rounded-full text-lg font-semibold ${colors[color]}`}>
                {value}
            </span>
        </div>
    );
}
