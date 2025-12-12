export default function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkAssign,
  onBulkUnassign,
  onBulkDelete,
}) {
  return (
    <div className="flex items-center justify-between text-xs bg-slate-900 text-slate-100 px-4 py-2 rounded-lg">
      <div>
        <span className="font-medium">{selectedCount}</span> selected
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onBulkAssign}
          className="px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-white"
        >
          Mark Assigned
        </button>
        <button
          onClick={onBulkUnassign}
          className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-white"
        >
          Mark Unassigned
        </button>
        <button
          onClick={onBulkDelete}
          className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white"
        >
          Delete
        </button>
        <button
          onClick={onClearSelection}
          className="px-2 py-1 rounded border border-slate-500 hover:bg-slate-800"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
