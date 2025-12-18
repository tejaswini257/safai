"use client";

import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

export default function CleanerRow({ cleaner, index, onView, onDelete }) {
    return (
        <tr className="border-b last:border-b-0">
            <td className="p-4 align-middle">{index + 1}</td>
            <td className="p-4 align-middle">
                <div className="flex items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 font-medium text-white ${
                        cleaner.role === 'supervisor' 
                            ? 'bg-gradient-to-r from-[#2DB7C4] to-[#4F7FD9]' 
                            : 'bg-[#0E7C86]'
                    }`}>
                        {cleaner.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                    </div>
                    <div>
                        <div className="font-semibold">{cleaner.name}</div>
                        <div className="text-xs text-slate-500">{cleaner.phone}</div>
                    </div>
                </div>
            </td>
            <td className="p-4 align-middle text-sm text-slate-600">{cleaner.status || 'unassigned'}</td>
            <td className="p-4 align-middle text-sm text-slate-500">{cleaner.assignedOn || '—'}</td>
            <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                    <button onClick={() => onView && onView(cleaner)} className="text-blue-600"><Eye size={16} /></button>
                    <button onClick={() => onDelete && onDelete(cleaner)} className="text-red-500"><Trash2 size={16} /></button>
                </div>
            </td>
        </tr>
    );
}
