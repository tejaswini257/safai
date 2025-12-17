"use client";

export default function AssignmentOptions({ assignmentType, setAssignmentType, startDate, setStartDate }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
      <div className="text-sm font-medium text-slate-800 mb-2">Assignment Options</div>

      <div className="flex items-center gap-2 mb-3 text-sm">
        <label className="text-xs text-slate-500 w-28">Type</label>
        <select
          value={assignmentType}
          onChange={(e) => setAssignmentType(e.target.value)}
          className="px-3 py-1 rounded border border-slate-200 text-sm"
        >
          <option value="many-to-many">Many-to-many</option>
          <option value="one-to-one">One-to-one</option>
          <option value="round-robin">Round-robin</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500 w-28">Start date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-1 rounded border border-slate-200 text-sm"
        />
      </div>
    </div>
  );
}
