export default function SummaryCards({
  total,
  assigned,
  unassigned,
  onClickCard,
  activeStatus,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <button
        onClick={() => onClickCard("total")}
        className={`flex items-center justify-between p-4 rounded-xl border text-left shadow-sm transition
        ${
          activeStatus === "all"
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-100 bg-white hover:bg-slate-50"
        }`}
      >
        <div>
          <div className="text-xs text-slate-500">Total</div>
          <div className="text-2xl font-semibold text-slate-900">
            {total}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
          👥
        </div>
      </button>

      <button
        onClick={() => onClickCard("assigned")}
        className={`flex items-center justify-between p-4 rounded-xl border text-left shadow-sm transition
        ${
          activeStatus === "assigned"
            ? "border-emerald-500 bg-emerald-50"
            : "border-slate-100 bg-white hover:bg-slate-50"
        }`}
      >
        <div>
          <div className="text-xs text-slate-500">Assigned</div>
          <div className="text-2xl font-semibold text-emerald-600">
            {assigned}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">
          ✅
        </div>
      </button>

      <button
        onClick={() => onClickCard("unassigned")}
        className={`flex items-center justify-between p-4 rounded-xl border text-left shadow-sm transition
        ${
          activeStatus === "unassigned"
            ? "border-amber-500 bg-amber-50"
            : "border-slate-100 bg-white hover:bg-slate-50"
        }`}
      >
        <div>
          <div className="text-xs text-slate-500">Unassigned</div>
          <div className="text-2xl font-semibold text-amber-600">
            {unassigned}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl">
          🕒
        </div>
      </button>
    </div>
  );
}
