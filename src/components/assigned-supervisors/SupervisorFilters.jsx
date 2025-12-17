export default function SupervisorFilters() {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex gap-4">
            <input
                className="filter-input w-full max-w-md"
                placeholder="Search by name, email, or phone..."
            />
            <select className="filter-select w-[160px]">
                <option>All Status</option>
            </select>
        </div>
    );
}
