// src/app/auth/login/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import AuthCard from "../../../components/auth/AuthCard";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Lock, Phone, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  // Check if user just signed up successfully
  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      setJustSignedUp(true);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setJustSignedUp(false);

    // Logical Validation
    if (!formData.phone || !formData.password) {
      setError("Identification and Access Key are required.");
      return;
    }

    setLoading(true);

    try {
      // Simulate API Authentication
      await new Promise((r) => setTimeout(r, 1500));

      // Mock check (e.g., if phone is '1234567890' and pass is 'password')
      // In production, replace with: const res = await signIn('credentials', {...})

      // Success Logic: Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = "w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3.5 bg-[#F8FAFB] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#58BECF] transition-all font-bold text-sm shadow-sm";
  const labelStyles = "text-[10px] font-black uppercase tracking-[0.2em] text-[#007C85] ml-1";
  const iconStyles = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#58BECF] transition-colors";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F8FAFB] overflow-hidden py-10">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E0F7FA]/50 blur-[120px] rounded-full -ml-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E6F7F9]/60 blur-[120px] rounded-full -mr-48 -mb-48 pointer-events-none" />

      <AuthCard
        title="SAFAI PORTAL"
        subtitle="Initialize an encrypted session to manage your workspace."

        /* REPLACE logoUrl="/globe.svg" WITH THIS customLogo PROP
           This uses the Light Cyan and Teal theme from your table headers.
        */
        customLogo={
          <div className="h-16 w-16 rounded-2xl bg-[#E6F7F9] border border-[#D1F0F2] flex items-center justify-center shadow-sm mx-auto mb-4">
            <ShieldCheck className="h-9 w-9 text-[#58BECF]" strokeWidth={2} />
          </div>
        }
        footer={
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            New administrator?{" "}
            <Link href="/auth/sign-in" className="text-[#58BECF] font-black hover:text-[#007C85] transition-colors ml-1 uppercase tracking-widest">
              Request Portal Access
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
          {/* Success Notification */}
          {justSignedUp && (
            <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-[10px] font-black uppercase tracking-wide text-emerald-600 border border-emerald-100 mb-2">
              <CheckCircle2 size={16} />
              Account Created. Please sign in to verify.
            </div>
          )}

          {/* Identity/Phone Field */}
          <div className="space-y-2">
            <label className={labelStyles}>Personnel Identity (Phone)</label>
            <div className="relative group">
              <div className={iconStyles}><Phone size={18} /></div>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter registered number"
                className={inputStyles}
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Access Key/Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className={labelStyles}>Access Key</label>
              <Link href="#" className="text-[9px] font-black text-[#58BECF] uppercase tracking-widest hover:text-[#007C85]">
                Lost Key?
              </Link>
            </div>
            <div className="relative group">
              <div className={iconStyles}><Lock size={18} /></div>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputStyles}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="animate-in fade-in zoom-in-95 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-[10px] font-black uppercase tracking-wide text-rose-500 border border-rose-100">
              <AlertCircle size={14} strokeWidth={3} />
              {error}
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
            className="group relative w-full overflow-hidden rounded-xl py-4 font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="relative flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Authorize Session</span>
              )}
            </div>
          </button>
        </form>
      </AuthCard>
    </div>
  );
}