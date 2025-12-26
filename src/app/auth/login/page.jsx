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

    if (!formData.phone || !formData.password) {
      setError("Identification and Access Key are required.");
      return;
    }

    setLoading(true);

    try {
      // 1. Simulate API Authentication delay
      await new Promise((r) => setTimeout(r, 1500));

      /**
       * FIX: Set the Auth Cookie
       * Your middleware is looking for 'auth-token'. 
       * We set it here so the middleware allows the /dashboard redirect.
       */
      document.cookie = "auth-token=true; path=/; max-age=3600; SameSite=Lax";

      // 2. Success Logic: Redirect to dashboard
      // Now that the cookie exists, middleware will let the user through.
      router.push("/dashboard");
      router.refresh(); // Optional: forces a refresh to ensure middleware state syncs

    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = "w-full rounded-xl border border-slate-200 pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-[#F8FAFB] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#58BECF] transition-all font-medium sm:font-bold text-sm shadow-sm";
  const labelStyles = "text-[10px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#007C85] ml-1";
  const iconStyles = "absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#58BECF] transition-colors";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F8FAFB] overflow-hidden p-4 sm:p-6 md:py-10">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-[#E0F7FA]/50 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full -ml-32 sm:-ml-40 md:-ml-48 -mt-32 sm:-mt-40 md:-mt-48 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-[#E6F7F9]/60 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full -mr-32 sm:-mr-40 md:-mr-48 -mb-32 sm:-mb-40 md:-mb-48 pointer-events-none" />

      <AuthCard
        title="SAFAI PORTAL"
        subtitle="Initialize an encrypted session to manage your workspace."
        customLogo={
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-[#E6F7F9] border border-[#D1F0F2] flex items-center justify-center shadow-sm mx-auto mb-3 sm:mb-4">
            <ShieldCheck className="h-8 w-8 sm:h-9 sm:w-9 text-[#58BECF]" strokeWidth={2} />
          </div>
        }
        footer={
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
            New administrator?{" "}
            <Link href="/auth/sign-in" className="text-[#58BECF] font-black hover:text-[#007C85] transition-colors ml-1 uppercase tracking-widest whitespace-nowrap">
              Request Portal Access
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
          {justSignedUp && (
            <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-2 sm:gap-3 rounded-xl bg-emerald-50 p-3 sm:p-4 text-[9px] sm:text-[10px] font-black uppercase tracking-wide text-emerald-600 border border-emerald-100 mb-2">
              <CheckCircle2 size={14} className="flex-shrink-0" />
              <span>Account Created. Please sign in to verify.</span>
            </div>
          )}

          <div className="space-y-1.5 sm:space-y-2">
            <label className={labelStyles}>Personnel Identity (Phone)</label>
            <div className="relative group">
              <div className={iconStyles}><Phone size={16} className="sm:w-4 sm:h-4 w-[14px] h-[14px]" /></div>
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

          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className={labelStyles}>Access Key</label>
              <Link href="#" className="text-[8px] sm:text-[9px] font-black text-[#58BECF] uppercase tracking-widest hover:text-[#007C85]">
                Lost Key?
              </Link>
            </div>
            <div className="relative group">
              <div className={iconStyles}><Lock size={16} className="sm:w-4 sm:h-4 w-[14px] h-[14px]" /></div>
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

          {error && (
            <div className="animate-in fade-in zoom-in-95 flex items-start sm:items-center gap-2 rounded-xl bg-rose-50 p-3 text-[9px] sm:text-[10px] font-black uppercase tracking-wide text-rose-500 border border-rose-100">
              <AlertCircle size={12} strokeWidth={3} className="flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
            className="group relative w-full overflow-hidden rounded-xl py-3 sm:py-4 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="relative flex items-center justify-center gap-2 sm:gap-3">
              {loading ? (
                <>
                  <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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