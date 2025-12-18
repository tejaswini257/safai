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
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-2xl border border-[#EEF2F5] shadow-sm">
      {/* Search */}
      <div className="flex-1">
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-[#9CA3AF] text-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11.1 11.1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by location or cleaner name..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#D1E0E2] text-sm text-[#2F3A45] focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:border-transparent placeholder-[#9CA3AF]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 text-sm">
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-[#D1E0E2] bg-white text-[#2F3A45] focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:border-transparent cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-[#D1E0E2] bg-white text-[#2F3A45] focus:outline-none focus:ring-2 focus:ring-[#2DB7C4] focus:border-transparent cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="cleaner">Cleaner</option>
            <option value="supervisor">Supervisor</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          onClick={onClearFilters}
          className="px-4 py-2 rounded-lg border border-[#D1E0E2] bg-white text-[#2F3A45] hover:bg-[#F8FAFB] transition-colors flex items-center gap-1.5 text-sm font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8H12" stroke="#2F3A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Clear
        </button>
      </div>
    </div>
  );
}
