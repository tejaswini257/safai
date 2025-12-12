// src/app/auth/sign-in/page.jsx
"use client";
import React, { useState } from "react";
import AuthCard from "../../../components/auth/AuthCard";
import Link from "next/link";

export default function SignInPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name || !email || !phone || !password) {
      setError("Please complete all fields.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      alert("Demo signup — replace with real API");
    } catch {
      setError("Sign up failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Safai Portal"
      subtitle="Create a new account."
      logoUrl="/globe.svg"
      footer={(
        <div>
          <span>Already have an account? </span>
          <Link href="/auth/login" className="text-purple-600 font-medium">Sign In</Link>
        </div>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            aria-label="full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            aria-label="email"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
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
              placeholder="Create a password"
              className="w-full rounded-md border border-gray-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
              aria-label="password"
            />
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          className="mt-1 w-full rounded-lg py-3 font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:from-purple-700 hover:to-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </AuthCard>
  );
}
