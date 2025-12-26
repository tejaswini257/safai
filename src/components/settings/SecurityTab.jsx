import { KeyRound, Eye } from "lucide-react";
import { InputField, ToggleButton, SaveButton } from "./SharedUI";
import { useState } from "react";

export default function SecurityTab({ onNotify }) {
    const [loading, setLoading] = useState(false);
    const save = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); onNotify("Security Settings Saved!"); }, 1000);
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-black text-slate-800">Security & Privacy</h2>
            <div className="grid gap-6 p-6 border border-slate-100 rounded-[24px] bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2">
                    <KeyRound className="h-4 w-4 text-[#007C85]" />
                    <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Update Password</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Current Password" type="password" placeholder="••••••••" />
                    <InputField label="New Password" type="password" placeholder="••••••••" />
                </div>
            </div>
            <div className="space-y-4">
                <ToggleButton label="Two-Factor Authentication (2FA)" description="Secure your account with a mobile code." />
                <ToggleButton label="Session Timeout" description="Auto logout after 30 mins." active />
            </div>
            <SaveButton onClick={save} loading={loading} />
        </div>
    );
}