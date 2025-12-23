"use client";

import { Search, Filter, Building2, Star, XCircle, CheckCircle2, UserMinus } from "lucide-react";

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
        <div className="bg-white rounded-[var(--radius)] shadow-sm p-3 border border-[hsl(var(--border))]">
            <div className="flex flex-wrap items-center gap-3">

                {/* 1. COMPACT SEARCH */}
                <div className="relative group min-w-[240px] flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[hsl(var(--muted-foreground))] group-focus-within:text-[hsl(var(--primary))]" />
                    <input
                        className="w-full pl-9 pr-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-xl text-sm focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all font-medium"
                        placeholder="Search washrooms..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* 2. COMPACT SELECTS */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <select
                            className="appearance-none bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none cursor-pointer"
                            value={typeFilter}
                            onChange={(e) => onTypeFilterChange(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="Nagpur Urban">Nagpur Urban</option>
                            <option value="Dharampeth Zone">Dharampeth Zone</option>
                            <option value="Nehru Nagar Zone">Nehru Nagar Zone</option>
                            <option value="Dhantoli">Dhantoli</option>
                            <option value="Sadar Zone">Sadar Zone</option>
                            <option value="Nagpur East">Nagpur East</option>
                            <option value="Manish Nagar Zone">Manish Nagar Zone</option>
                            <option value="Shanti Nagar">Shanti Nagar</option>
                            <option value="Nagpur Ruaral">Nagpur Ruaral</option>
                            <option value="Butobori">Butobori</option>
                        </select>
                        <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--muted-foreground))] pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            className="appearance-none bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none cursor-pointer"
                            value={companyFilter}
                            onChange={(e) => onCompanyFilterChange(e.target.value)}
                        >
                            <option value="all">All Facility Companies</option>
                            <option value="N/A">Unassigned</option>
                        </select>
                        <Building2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--muted-foreground))] pointer-events-none" />
                    </div>

                    {/* RATING SELECT - Values match the logic below */}
                    <div className="relative">
                        <select
                            className="appearance-none bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none cursor-pointer"
                            value={ratingFilter}
                            onChange={(e) => onRatingFilterChange(e.target.value)}
                        >
                            <option value="all">All Ratings</option>
                            <option value="9plus">9.0+ Stars</option>
                            <option value="8plus">8.0+ Stars</option>
                            <option value="7plus">7.0+ Stars</option>
                            <option value="below5">Below 5.0</option>
                        </select>
                        <Star className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--muted-foreground))] pointer-events-none" />
                    </div>
                </div>

                {/* 3. SEGMENTED ASSIGNMENT CONTROL */}
                <div className="flex bg-[hsl(var(--muted))] p-1 rounded-xl border border-[hsl(var(--border))]">
                    <button
                        type="button"
                        onClick={() => onAssignmentFilterChange("all")}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${assignmentFilter === "all"
                            ? "bg-white text-[hsl(var(--primary-dark))] shadow-sm"
                            : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                            }`}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        onClick={() => onAssignmentFilterChange("assigned")}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${assignmentFilter === "assigned"
                            ? "bg-[#E0F7FA] text-emerald-700 shadow-sm"
                            : "text-[hsl(var(--muted-foreground))] hover:text-emerald-600"
                            }`}
                    >
                        <CheckCircle2 className="h-3 w-3" />
                        Assigned
                    </button>
                    <button
                        type="button"
                        onClick={() => onAssignmentFilterChange("unassigned")}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${assignmentFilter === "unassigned"
                            ? "bg-amber-50 text-amber-700 shadow-sm"
                            : "text-[hsl(var(--muted-foreground))] hover:text-amber-600"
                            }`}
                    >
                        <UserMinus className="h-3 w-3" />
                        None
                    </button>
                </div>

                {/* 4. CLEAR ACTION */}
                <button
                    type="button"
                    onClick={onClear}
                    className="p-2 text-[hsl(var(--muted-foreground))] hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    title="Clear All Filters"
                >
                    <XCircle className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}