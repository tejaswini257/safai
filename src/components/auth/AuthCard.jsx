// src/components/auth/AuthCard.jsx
"use client";
import React from "react";
import Link from "next/link";

export default function AuthCard({ title, subtitle, logoUrl = "/globe.svg", children, footer }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg py-10 px-8 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          {/* logo circle */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center mb-4 shadow-sm">
            {/* replace with your svg, keeps white icon */}
            <img src={logoUrl} alt="portal logo" className="w-10 h-10 filter brightness-0 invert" />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 text-center">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mb-6 text-center">{subtitle}</p>}
        </div>

        <div className="space-y-4">
          {children}
        </div>

        {footer && (
          <div className="mt-6 text-center text-slate-500 text-sm">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
