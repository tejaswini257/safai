export default function CleanerFilters() {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-4 items-center shadow-sm">

            <input
                className="filter-input w-[260px]"
                placeholder="Search by name or phone..."
            />

            <button className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition">
                Unassigned
            </button>

            <div className="ml-auto flex gap-3">
                <input className="filter-input w-[180px]" placeholder="Search" />
                <select className="filter-select w-[140px]">
                    <option>All Status</option>
                </select>
            </div>
        </div>
    );
}
