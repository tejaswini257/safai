export default function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkAssign,
  onBulkUnassign,
  onBulkDelete,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#F8FAFB] border border-[#EEF2F5] rounded-2xl p-4 mb-4">
      <div className="flex items-center text-sm text-[#2F3A45] mb-3 sm:mb-0">
        <svg className="h-5 w-5 text-[#2DB7C4] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">{selectedCount}</span> item{selectedCount !== 1 ? 's' : ''} selected
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onBulkAssign}
          className="px-4 py-2 rounded-lg border border-[#2DB7C4] bg-[#E6F6F7] text-[#0E7C86] text-sm font-medium hover:bg-[#D1EEF1] transition-colors flex items-center"
        >
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Mark as Assigned
        </button>
        
        <button
          onClick={onBulkUnassign}
          className="px-4 py-2 rounded-lg border border-[#F4B740] bg-[#FEF9E6] text-[#8E6C1F] text-sm font-medium hover:bg-[#FEF3C7] transition-colors flex items-center"
        >
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Mark as Unassigned
        </button>
        
        <button
          onClick={onBulkDelete}
          className="px-4 py-2 rounded-lg border border-[#FEE4E2] bg-[#FEF3F2] text-[#B42318] text-sm font-medium hover:bg-[#FEE4E2] transition-colors flex items-center"
        >
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
        
        <button
          onClick={onClearSelection}
          className="px-4 py-2 rounded-lg border border-[#D1E0E2] bg-white text-[#2F3A45] text-sm font-medium hover:bg-[#F8FAFB] transition-colors flex items-center"
        >
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </button>
      </div>
    </div>
  );
}
