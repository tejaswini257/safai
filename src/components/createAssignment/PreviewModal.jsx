"use client";
import { useMemo } from "react";

export default function PreviewModal({ open, onClose, users = [], locations = [], assignmentType, startDate, onConfirm }) {
  const previewList = useMemo(() => {
    const list = [];
    if (assignmentType === "many-to-many") {
      users.forEach((u) =>
        locations.forEach((l) => list.push({ user: u, location: l }))
      );
    } else if (assignmentType === "one-to-one") {
      for (let i = 0; i < Math.min(users.length, locations.length); i++) {
        list.push({ user: users[i], location: locations[i] });
      }
    } else if (assignmentType === "round-robin") {
      for (let i = 0; i < locations.length; i++) {
        const user = users[i % users.length];
        list.push({ user, location: locations[i] });
      }
    }
    return list;
  }, [users, locations, assignmentType]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b">
          <h3 className="text-lg font-semibold">Preview Assignments</h3>
          <div className="text-sm text-slate-500">{previewList.length} assignments</div>
        </div>

        <div className="p-4 max-h-96 overflow-auto">
          <div className="text-sm text-slate-600 mb-3">Start date: {startDate || "Immediate"}</div>

          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 border-b">
              <tr>
                <th className="text-left pb-2">Cleaner</th>
                <th className="text-left pb-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {previewList.slice(0, 100).map((p, idx) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="py-2">{p.user.name} <div className="text-[11px] text-slate-400">{p.user.email}</div></td>
                  <td className="py-2">{p.location.name} <div className="text-[11px] text-slate-400">{p.location.ward}</div></td>
                </tr>
              ))}
            </tbody>
          </table>

          {previewList.length > 100 && (
            <div className="text-xs text-slate-500 mt-2">Showing first 100</div>
          )}
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-3 py-1.5 rounded border">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-indigo-600 text-white">Create Assignments</button>
        </div>
      </div>
    </div>
  );
}
