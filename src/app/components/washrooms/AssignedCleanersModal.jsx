"use client";

import React from "react";
import { ChevronLeft, UserPlus, Users, Eye, Trash2 } from "lucide-react";

export default function AssignedCleanersModal({ open, onClose, cleaners = [], washroom = null }) {
    if (!open) return null;

    const styles = {
        overlay: { position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(2,6,23,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 },
        modalContainer: { width: '92vw', maxWidth: '1100px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(2,6,23,0.12)' },
        modalHeader: { backgroundColor: '#0f172a', color: '#fff', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        modalHeaderLeft: { display: 'flex', gap: 16, alignItems: 'center' },
        backPill: { background: 'rgba(255,255,255,0.06)', padding: 8, borderRadius: 8, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' },
        modalTitle: { margin: 0, fontSize: '1.25rem', fontWeight: 700 },
        modalSub: { margin: 0, opacity: 0.85, fontSize: '0.95rem' },
        modalHeaderRight: { display: 'flex', gap: 12, alignItems: 'center' },
        smallBadge: { background: '#1f2937', color: '#fff', padding: '8px 12px', borderRadius: 8, opacity: 0.9, fontWeight: 700 },
        addCleanerBtn: { background: '#2563eb', color: '#fff', padding: '10px 14px', borderRadius: 10, display: 'flex', gap: 8, alignItems: 'center', border: 'none', cursor: 'pointer' },
        modalFilters: { background: '#fff', padding: '18px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #eef2f7' },
        searchModalInput: { flexGrow: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #e6eef7', background: '#f8fafc' },
        modalTableCard: { background: '#fff', padding: 0 },
        avatarCircle: { width: 36, height: 36, borderRadius: 9999, background: '#eef2ff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
        actionEye: { color: '#2563eb', cursor: 'pointer', marginRight: 12 },
        actionTrash: { color: '#ef4444', cursor: 'pointer' },
        tableFooter: { padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', borderTop: '1px solid #f1f5f9' }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <div style={styles.modalHeaderLeft}>
                        <div onClick={onClose} style={styles.backPill} aria-label="back">
                            <ChevronLeft size={18} />
                        </div>
                        <div>
                            <h3 style={styles.modalTitle}>Assigned Cleaners</h3>
                            <div style={styles.modalSub}>{washroom?.name}</div>
                        </div>
                    </div>

                    <div style={styles.modalHeaderRight}>
                        <div style={styles.smallBadge}>1 of {cleaners.length}</div>
                        <button style={styles.addCleanerBtn}><UserPlus size={14} /> Add Cleaner</button>
                    </div>
                </div>

                <div style={styles.modalFilters}>
                    <input style={styles.searchModalInput} placeholder="Search by name, email, or phone..." />
                    <select style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e6eef7' }}>
                        <option>All Status</option>
                        <option>Assigned</option>
                        <option>Unassigned</option>
                    </select>
                </div>

                <div style={styles.modalTableCard}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', color: '#475569', fontWeight: 600 }}>
                                <th style={{ padding: '14px' }}>Sr. No.</th>
                                <th style={{ padding: '14px' }}>Cleaner Name</th>
                                <th style={{ padding: '14px' }}>Phone</th>
                                <th style={{ padding: '14px' }}>Status</th>
                                <th style={{ padding: '14px' }}>Assigned On</th>
                                <th style={{ padding: '14px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cleaners.map((c, idx) => (
                                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '14px 10px' }}>{idx + 1}</td>
                                    <td style={{ padding: '14px 10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={styles.avatarCircle}><Users size={16} color="#5b21b6" /></div>
                                            <div>
                                                <div style={{ fontWeight: 700 }}>{c.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 10px', color: '#64748b' }}>{c.phone}</td>
                                    <td style={{ padding: '14px 10px' }}>
                                        <span style={{ padding: '6px 10px', borderRadius: 999, background: '#f1f5f9', color: '#475569', fontWeight: 600 }}>unassigned</span>
                                    </td>
                                    <td style={{ padding: '14px 10px' }}>Dec 8, 2025</td>
                                    <td style={{ padding: '14px 10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Eye size={16} style={styles.actionEye} />
                                            <Trash2 size={16} style={styles.actionTrash} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={styles.tableFooter}>
                        <div>Showing {cleaners.length} of {cleaners.length} cleaner{cleaners.length > 1 ? 's' : ''}</div>
                        <div>Last updated: {new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
