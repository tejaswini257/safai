"use client";

import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

export default function CleanerRow({ cleaner, index, onView, onDelete }) {
    return (
        <tr className="border-b last:border-b-0">
            <td className="p-4 align-middle">{index + 1}</td>
            <td className="p-4 align-middle">
                <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mr-3">{/* avatar */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-600"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z" fill="currentColor" /></svg>
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
