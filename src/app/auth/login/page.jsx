// src/app/auth/login/page.jsx
"use client";
import React, { useState } from "react";
import AuthCard from "../../../components/auth/AuthCard"; // keep your import style
import Link from "next/link";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!phone || !password) {
      setError("Please enter phone number and password.");
      return;
    }
    setLoading(true);
    try {
      // replace with real API
      await new Promise((r) => setTimeout(r, 700));
      alert("Demo login — replace with real auth flow");
    } catch {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Safai Portal"
      subtitle="Welcome Back! Please login to your account."
      logoUrl="/globe.svg"
      footer={(
        <div>
          <span>Don't have an account? </span>
          <Link href="/auth/sign-in" className="text-purple-600 font-medium">Sign Up</Link>
        </div>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            inputMode="tel"
            aria-label="phone"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            aria-label="password"
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          className="mt-1 w-full rounded-lg py-3 font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:from-purple-700 hover:to-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}
