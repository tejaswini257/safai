"use client";
export default function ModeToggle({ value, onChange }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <div className="font-semibold text-slate-800">Assignment Mode</div>
        <div className="text-sm text-slate-500">Choose single or multiple assignment workflows</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange("single")}
          className={`px-3 py-1 rounded-md text-sm ${
            value === "single" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200"
          }`}
        >
          Single
        </button>
        <button
          onClick={() => onChange("multiple")}
          className={`px-3 py-1 rounded-md text-sm ${
            value === "multiple" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200"
          }`}
        >
          Multiple
        </button>
      </div>
    </div>
  );
}
