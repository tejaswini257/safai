"use client";

import React from 'react';
import { MoreVertical, Eye, Users } from 'lucide-react';

const styles = {
    row: {
        borderBottom: '1px solid #e5e7eb',
        transition: 'background-color 0.15s',
    },
    td: {
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        fontSize: '0.95rem',
        color: '#1e293b',
    },
    indexBox: {
        backgroundColor: '#e2e8f0',
        color: '#0f172a',
        padding: '6px 10px',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '0.875rem',
    },
    zonePill: {
        backgroundColor: '#f1f5f9',
        color: '#475569',
        padding: '6px 12px',
        borderRadius: '8px',
        fontWeight: '500',
        fontSize: '0.875rem'
    },
    ratingPillBase: {
        padding: '6px 10px',
        borderRadius: '8px',
        fontWeight: 600,
        display: 'inline-block',
        minWidth: '80px',
        textAlign: 'center',
    },
    statusPillBase: {
        padding: '6px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '600',
        marginRight: '8px',
    },
    actionIcon: {
        color: '#64748b',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: '12px',
        background: 'none',
        border: 'none',
        padding: '4px',
    },
    cleanerMore: {
        color: '#2563eb',
        fontWeight: '600',
        fontSize: '12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    dropdownMenu: {
        position: 'absolute',
        right: '20px',
        top: '100%',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 100,
        minWidth: '180px',
        marginTop: '8px',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        padding: '10px 12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#1e293b',
        fontSize: '0.9rem',
    },
};

export default function WashroomRow({ w, index, menuOpenId, openMenu, openCleaners, openSupervisor }) {
    return (
        <tr style={styles.row}>
            <td style={{ ...styles.td, padding: '12px 16px' }}>
                <span style={styles.indexBox}>{index + 1}</span>
            </td>

            <td style={styles.td}>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>{w.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Created: {w.created}</div>
            </td>

            <td style={styles.td}>
                <span style={styles.zonePill}>{w.zone}</span>
            </td>

            <td style={styles.td}>
                <span style={{ fontWeight: 600, color: w.score === '-' ? '#94a3b8' : '#1e293b' }}>
                    {w.score}
                </span>
            </td>

            <td style={styles.td}>
                {w.rating ? (
                    <span style={{
                        ...styles.ratingPillBase,
                        backgroundColor: w.rating.label === 'Amazing' ? '#dcfce7' : w.rating.label === 'Okay' ? '#fef3c7' : '#f3f4f6',
                        color: w.rating.label === 'Amazing' ? '#166534' : w.rating.label === 'Okay' ? '#b45309' : '#6b7280'
                    }}>
                        ⭐ {w.rating.value} ({w.rating.label})
                    </span>
                ) : (
                    <span style={{ color: '#94a3b8' }}>—</span>
                )}
            </td>

            <td style={styles.td}>
                <div style={{ fontWeight: 600, color: '#1e293b' }}>{w.cleaner}</div>
                <button
                    onClick={() => openCleaners(w)}
                    style={styles.cleanerMore}
                >
                    View Cleaners
                </button>
            </td>

            <td style={styles.td}>{w.company}</td>

            <td style={{ ...styles.td, position: 'relative' }}>
                <span style={{
                    ...styles.statusPillBase,
                    backgroundColor: w.status === 'Active' ? '#dcfce7' : '#fee2e2',
                    color: w.status === 'Active' ? '#166534' : '#991b1b'
                }}>
                    {w.status}
                </span>
                <button
                    onClick={() => openMenu(w.id)}
                    style={styles.actionIcon}
                    title="More options"
                >
                    <MoreVertical size={16} />
                </button>

                {menuOpenId === w.id && (
                    <div style={styles.dropdownMenu}>
                        <button
                            onClick={() => openCleaners(w)}
                            style={{ ...styles.menuItem, borderBottom: '1px solid #e5e7eb' }}
                        >
                            <Eye size={16} /> View Cleaners
                        </button>
                        <button
                            onClick={() => openSupervisor(w)}
                            style={styles.menuItem}
                        >
                            <Users size={16} /> View Supervisor
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
