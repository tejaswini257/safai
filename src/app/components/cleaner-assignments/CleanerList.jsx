"use client";

import React from 'react';
import CleanerRow from './CleanerRow';

export default function CleanerList({ cleaners = [], onView, onDelete }) {
    return (
        <div className="mt-6 bg-white rounded-lg shadow-sm border overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-semibold">
                    <tr>
                        <th className="p-4 text-left">Sr. No.</th>
                        <th className="p-4 text-left">Cleaner Name</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Assigned On</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cleaners.map((c, idx) => (
                        <CleanerRow key={c.id || idx} cleaner={c} index={idx} onView={onView} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
