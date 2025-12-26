"use client";
import React from "react";

export default function AuthCard({ title, subtitle, customLogo, logoUrl = "/globe.svg", children, footer }) {
  return (
    <div className="w-full max-w-[95%] sm:max-w-md bg-white rounded-3xl sm:rounded-[32px] shadow-sm py-8 sm:py-10 px-5 sm:px-8 border border-slate-100 relative overflow-hidden">
      {/* Decorative Header Detail */}
      <div
        className="absolute top-0 left-0 w-full h-1.5"
        style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
      />

      <div className="flex flex-col items-center mb-5 sm:mb-6">
        {/* Logo Container - Updated from Purple to Branded Cyan/Teal */}
        {customLogo ? (
          customLogo
        ) : (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E6F7F9] border border-[#D1F0F2] flex items-center justify-center mb-3 sm:mb-4 shadow-sm transition-transform hover:scale-105">
            <img
              src={logoUrl}
              alt="portal logo"
              className="w-8 h-8 sm:w-9 sm:h-9 opacity-80"
              style={{ filter: 'invert(72%) sepia(54%) saturate(452%) hue-rotate(143deg) brightness(92%) contrast(88%)' }}
            />
          </div>
        )}

        <h1 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[10px] sm:text-[11px] font-bold text-[#2D8E97] uppercase tracking-widest opacity-70 mt-1.5 sm:mt-2 text-center max-w-[90%] mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {children}
      </div>

      {footer && (
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-50 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}