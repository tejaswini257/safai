import AssignmentRow from "./AssignmentRow";

export default function AssignmentsTable({
  rows,
  pageStartIndex,
  isSelected,
  onToggleSelectOne,
  onToggleSelectAllCurrent,
  onToggleAssign,
  onDelete,
}) {
  const allPageSelected =
    rows.length > 0 && rows.every((row) => isSelected(row.id));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
            <th className="w-10 px-4 py-2 text-left">
              <input
                type="checkbox"
                checked={allPageSelected}
                onChange={onToggleSelectAllCurrent}
              />
            </th>
            <th className="w-8 px-2 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Assigned On</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-6 text-center text-slate-500"
              >
                No assignments found for current filters.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <AssignmentRow
                key={row.id}
                row={row}
                index={pageStartIndex + index + 1}
                checked={isSelected(row.id)}
                onToggleSelect={() => onToggleSelectOne(row.id)}
                onToggleAssign={() => onToggleAssign(row.id)}
                onDelete={() => onDelete(row.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
