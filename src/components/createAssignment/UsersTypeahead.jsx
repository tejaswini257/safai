"use client";
import { useMemo, useState, useEffect } from "react";

/*
  Props:
   - available: array of users (mock)
   - selected: array of selected user objects
   - onChange: function(newSelectedArray)
   - mode: "single" or "multiple"
*/

export default function UsersTypeahead({ available, selected, onChange, mode }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState(available);

  useEffect(() => {
    // simulate server-side fuzzy filter
    const t = q.trim().toLowerCase();
    if (!t) setResults(available);
    else {
      setResults(
        available.filter(
          (u) =>
            u.name.toLowerCase().includes(t) ||
            (u.email && u.email.toLowerCase().includes(t))
        )
      );
    }
  }, [q, available]);

  const toggleSelect = (user) => {
    if (mode === "single") {
      onChange(selected?.[0]?.id === user.id ? [] : [user]);
      return;
    }
    const exists = selected.find((s) => s.id === user.id);
    if (exists) onChange(selected.filter((s) => s.id !== user.id));
    else onChange([...selected, user]);
  };

  const clearAll = () => onChange([]);

  const selectedCount = selected.length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm"
        />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <div className="text-xs text-slate-500">{selectedCount} selected</div>
        <button onClick={clearAll} className="text-xs text-indigo-600">Clear</button>
      </div>

      <div className="max-h-56 overflow-auto space-y-2">
        {results.map((u) => {
          const checked = !!selected.find((s) => s.id === u.id);
          return (
            <div key={u.id} className="flex items-center justify-between p-2 rounded hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{u.name}</div>
                  <div className="text-[11px] text-slate-500">{u.email}</div>
                </div>
              </div>

              <div>
                <input type="checkbox" checked={checked} onChange={() => toggleSelect(u)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
