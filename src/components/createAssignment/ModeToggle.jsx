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
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            value === "single" 
              ? "bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white shadow-sm" 
              : "bg-white border border-[#D1E0E2] text-[#2F3A45] hover:bg-[#F8FAFB]"
          } transition-colors`}
        >
          Single
        </button>
        <button
          onClick={() => onChange("multiple")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            value === "multiple" 
              ? "bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9] text-white shadow-sm" 
              : "bg-white border border-[#D1E0E2] text-[#2F3A45] hover:bg-[#F8FAFB]"
          } transition-colors`}
        >
          Multiple
        </button>
      </div>
    </div>
  );
}
