"use client";

import { Camera } from "lucide-react";
import { InputField, SaveButton } from "./SharedUI";
import { useState } from "react";

export default function ProfileTab({ onNotify }) {
    const [loading, setLoading] = useState(false);

    const save = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onNotify("Profile Updated!");
        }, 1000);
    };

    // Constant for the custom gradient style
    const buttonStyle = {
        background: "linear-gradient(to right, #58BECF, #6D9CDC)",
        color: "#FFFFFF",
        border: "none"
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="h-24 w-24 rounded-full border-4 border-[#E0F7FA] overflow-hidden bg-slate-100">
                        <img
                            src="/image/dashboard img.png"
                            alt="Avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-[#007C85] text-white rounded-full border-2 border-white hover:bg-[#58BECF] transition-colors">
                        <Camera className="h-4 w-4" />
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-800">Omkar Saaf</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Zonal Supervisor</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name" value="Omkar Saaf" />
                <InputField label="Official Email" value="omkar.saaf@safai.gov.in" disabled />
                <InputField label="Phone Number" value="+91 98765 43210" />
                <InputField label="Assigned Zone" value="Nagpur Urban" disabled />
            </div>

            {/* Applied custom background gradient and white text color */}
            <SaveButton
                onClick={save}
                loading={loading}
                style={buttonStyle}
                className="hover:opacity-90 transition-all duration-200 active:scale-95"
            />
        </div>
    );
}