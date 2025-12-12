export default function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  roleFilter,
  onRoleChange,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="flex-1">
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by location or cleaner name..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 text-xs">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white"
        >
          <option value="all">Status: All</option>
          <option value="assigned">Status: Assigned</option>
          <option value="unassigned">Status: Unassigned</option>
        </select>

        <select
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white"
        >
          <option value="all">Role: All</option>
          <option value="cleaner">Role: Cleaner</option>
          <option value="supervisor">Role: Supervisor</option>
        </select>

        <button
          onClick={onClearFilters}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
