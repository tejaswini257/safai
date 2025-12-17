"use client";
import React from 'react';
import SearchInput from './SearchInput';

export default function FilterBar({ children }) {
    const styles = {
        card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginTop: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb' },
        searchRow: { display: 'flex', gap: 8, marginBottom: 12 },
        pills: { display: 'flex', gap: 4 }
    };

    return (
        <div style={styles.card}>
            <div style={styles.searchRow}>
                <SearchInput placeholder="Search washrooms..." style={{ flexGrow: 1 }} />
                <div style={styles.pills}>
                    {['All', 'Assigned', 'Unassigned'].map((p) => (
                        <button key={p} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>{p}</button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <select style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.9rem' }}>
                    <option>All Types</option>
                </select>
                <select style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.9rem' }}>
                    <option>All Facility Companies</option>
                </select>
                <select style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.9rem' }}>
                    <option>All Ratings</option>
                </select>
                <div style={{ marginLeft: 'auto' }}>{children}</div>
            </div>
        </div>
    );
}
