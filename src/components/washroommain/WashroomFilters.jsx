"use client";

export default function WashroomFilters({
    search,
    onSearchChange,
    typeFilter,
    onTypeFilterChange,
    companyFilter,
    onCompanyFilterChange,
    ratingFilter,
    onRatingFilterChange,
    assignmentFilter,
    onAssignmentFilterChange,
    onClear,
}) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 space-y-3 border border-[var(--border-subtle)]">

            {/* ROW 1: SEARCH + DROPDOWNS */}
            <div className="flex flex-wrap items-center gap-3">

                <input
                    className="filter-input w-[260px]"
                    placeholder="Search washrooms..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />

                <select
                    className="filter-select w-[150px]"
                    value={typeFilter}
                    onChange={(e) => onTypeFilterChange(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="Public Toilet">Public Toilets</option>
                    <option value="Community Toilet">Community Toilets</option>
                </select>

                <select
                    className="filter-select w-[200px]"
                    value={companyFilter}
                    onChange={(e) => onCompanyFilterChange(e.target.value)}
                >
                    <option value="all">All Facility Companies</option>
                    <option value="N/A">N/A</option>
                </select>

                <select
                    className="filter-select w-[140px]"
                    value={ratingFilter}
                    onChange={(e) => onRatingFilterChange(e.target.value)}
                >
                    <option value="all">All Ratings</option>
                    <option value="8plus">8.0+</option>
                    <option value="9plus">9.0+</option>
                </select>

                <button type="button" onClick={onClear} className="filter-btn">
                    Clear
                </button>
            </div>

            {/* ROW 2: STATUS FILTER */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => onAssignmentFilterChange("all")}
                    className={`px-4 h-9 rounded-lg text-sm transition ${
                        assignmentFilter === "all"
                            ? "bg-[var(--navy)] text-white"
                            : "border border-[var(--border-subtle)] bg-white hover:bg-slate-100"
                    }`}
                >
                    All
                </button>
                <button
                    type="button"
                    onClick={() => onAssignmentFilterChange("assigned")}
                    className={`px-4 h-9 rounded-lg text-sm transition ${
                        assignmentFilter === "assigned"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "border border-[var(--border-subtle)] bg-white hover:bg-slate-100"
                    }`}
                >
                    Assigned
                </button>
                <button
                    type="button"
                    onClick={() => onAssignmentFilterChange("unassigned")}
                    className={`px-4 h-9 rounded-lg text-sm transition ${
                        assignmentFilter === "unassigned"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "border border-[var(--border-subtle)] bg-white hover:bg-slate-100"
                    }`}
                >
                    Unassigned
                </button>
            </div>

        </div>
    );
}

