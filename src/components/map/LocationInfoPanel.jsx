"use client";

import { X, History, Users, Accessibility } from "lucide-react";
import LocationStats from "./LocationStats";
import AmenitiesList from "./AmenitiesList";
import ReviewsList from "./ReviewsList";

export default function LocationInfoPanel({ location, onClose }) {
    return (
        <div
            className={`
                absolute top-4 left-4
                h-[calc(100%-2rem)]
                w-[380px]
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border border-gray-200 dark:border-slate-700
                rounded-lg
                shadow-2xl
                z-20
                transition-transform duration-300 ease-in-out
                ${location ? "translate-x-0" : "-translate-x-[420px]"}
                overflow-hidden
            `}>
            {!location ? null : (
                <>
                    {/* HEADER */}
                    <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex justify-between items-start bg-blue-50 dark:bg-slate-800">
                        <div>
                            <h2 className="text-xl font-extrabold tracking-tight text-blue-800 dark:text-blue-300">
                                {location.name}
                            </h2>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {location.address}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-blue-800 dark:text-blue-300" />
                        </button>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 space-y-8 overflow-y-auto h-[calc(100%-88px)] custom-scrollbar">

                        {/* 1. AVAILABILITY & FACILITIES SECTION */}
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <Accessibility className="w-4 h-4 text-[hsl(var(--primary))]" />
                                Availability & Access
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                <div className={`flex flex-col items-center p-3 rounded-xl border ${location.availability?.mens ? 'bg-[#F4FBFC] border-[hsl(var(--primary)/0.2)]' : 'bg-gray-50 opacity-50'}`}>
                                    <span className="text-xs font-bold text-[hsl(var(--primary-dark))]">Men</span>
                                    <span className={`text-[10px] ${location.availability?.mens ? 'text-emerald-600' : 'text-gray-400'}`}>
                                        {location.availability?.mens ? 'Available' : 'N/A'}
                                    </span>
                                </div>
                                <div className={`flex flex-col items-center p-3 rounded-xl border ${location.availability?.womens ? 'bg-[#FFF5F7] border-rose-100' : 'bg-gray-50 opacity-50'}`}>
                                    <span className="text-xs font-bold text-rose-700">Women</span>
                                    <span className={`text-[10px] ${location.availability?.womens ? 'text-rose-500' : 'text-gray-400'}`}>
                                        {location.availability?.womens ? 'Available' : 'N/A'}
                                    </span>
                                </div>
                                <div className={`flex flex-col items-center p-3 rounded-xl border ${location.availability?.disabled ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 opacity-50'}`}>
                                    <span className="text-xs font-bold text-blue-700">Disabled</span>
                                    <span className={`text-[10px] ${location.availability?.disabled ? 'text-blue-500' : 'text-gray-400'}`}>
                                        {location.availability?.disabled ? 'Accessible' : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <LocationStats location={location} />

                        {/* 2. CLEANING HISTORY SECTION */}
                        <section className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <History className="w-4 h-4 text-[hsl(var(--primary))]" />
                                Cleaning History
                            </h3>
                            <div className="space-y-3">
                                {location.cleaningHistory?.length > 0 ? (
                                    location.cleaningHistory.map((log, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-[hsl(var(--muted))] rounded-xl border border-[hsl(var(--border))]">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[hsl(var(--primary)/0.2)]">
                                                <Users className="w-4 h-4 text-[hsl(var(--primary))]" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-[hsl(var(--foreground))]">{log.cleanerName}</p>
                                                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{log.timestamp}</p>
                                            </div>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                Done
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs italic text-[hsl(var(--muted-foreground))] text-center py-2">No recent logs found.</p>
                                )}
                            </div>
                        </section>

                        <AmenitiesList amenities={location.amenities} />

                        <ReviewsList reviews={location.reviews} />
                    </div>
                </>
            )}
        </div>
    );
}