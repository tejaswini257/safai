"use client";
import { useState } from "react";
import { Save } from "lucide-react";

export function InputField({ label, value, type = "text", disabled = false, placeholder = "" }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{label}</label>
            <input
                type={type}
                defaultValue={value}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full px-5 py-3.5 rounded-2xl border border-slate-100 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#007C85]/20 transition-all ${disabled ? "bg-slate-50 opacity-60 cursor-not-allowed" : "bg-white"}`}
            />
        </div>
    );
}

export function ToggleButton({ label, description, active = false }) {
    const [isOn, setIsOn] = useState(active);
    return (
        <div className="p-5 bg-slate-50 rounded-3xl flex items-center justify-between gap-4">
            <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{label}</p>
                <p className="text-[10px] text-slate-400 font-bold">{description}</p>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isOn ? "bg-[#007C85]" : "bg-slate-200"}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isOn ? "right-1" : "left-1"}`} />
            </button>
        </div>
    );
}

export function SaveButton({ onClick, loading }) {
    return (
        <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
            <button
                onClick={onClick}
                disabled={loading}
                // Updated style for linear gradient and white text
                style={{
                    background: "linear-gradient(to right, #58BECF, #6D9CDC)",
                    color: "#FFFFFF"
                }}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-cyan-100"
            >
                {loading ? (
                    "Saving..."
                ) : (
                    <>
                        <Save className="h-4 w-4" />
                        Save Changes
                    </>
                )}
            </button>
        </div>
    );
}