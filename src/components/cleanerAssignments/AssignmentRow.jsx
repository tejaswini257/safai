function Avatar({ name, role }) {
  const initial = name?.charAt(0).toUpperCase() || "?";
  const colors = {
    supervisor: 'bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white',
    default: 'bg-[#0E7C86] text-white'
  };
  
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
      role === 'supervisor' ? colors.supervisor : colors.default
    }`}>
      {initial}
    </div>
  );
}

function RolePill({ role }) {
  const base =
    "inline-flex px-3 py-1 rounded-full text-[10px] font-medium capitalize";
  if (role === "supervisor") {
    return (
      <span className={`${base} bg-[#E6F6F7] text-[#2DB7C4]`}>{role}</span>
    );
  }
  return (
    <span className={`${base} bg-[#E6F0FF] text-[#4F7FD9]`}>{role}</span>
  );
}

function StatusPill({ status }) {
  const base =
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-medium capitalize";
  if (status === "assigned") {
    return (
      <span className={`${base} bg-[#E6F6F7] text-[#2DB7C4]`}>
        <span>●</span> assigned
      </span>
    );
  }
  return (
    <span className={`${base} bg-[#FEF3E6] text-[#F4B740]`}>
      <span>●</span> unassigned
    </span>
  );
}

export default function AssignmentRow({
  row,
  index,
  checked,
  onToggleSelect,
  onToggleAssign,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/60">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggleSelect}
        />
      </td>
      <td className="px-2 py-3 text-slate-500">{index}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar name={row.cleanerName} role={row.role} />
          <div>
            <div className="text-xs font-medium text-slate-900">
              {row.cleanerName}
            </div>
            {row.cleanerEmail && (
              <div className="text-[11px] text-slate-500">
                {row.cleanerEmail}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 text-xs text-slate-700">
          <span>📍</span>
          <span>{row.locationName}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <RolePill role={row.role} />
      </td>
      <td className="px-4 py-3">
        <StatusPill status={row.status} />
      </td>
      <td className="px-4 py-3 text-xs text-slate-600">
        {row.assignedOn || "-"}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center gap-2">
          <button
            onClick={onToggleAssign}
            className="px-3 py-1 rounded-md border border-slate-200 text-[11px] hover:bg-slate-100"
          >
            {row.status === "assigned" ? "Mark Unassigned" : "Assign"}
          </button>
          <button
            onClick={onDelete}
            className="text-rose-600 hover:text-rose-700 text-lg leading-none"
          >
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
}
