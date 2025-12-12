"use client";

import { Plus, UserPlus, MapPin, ChevronDown, X, Eye, Trash2, ChevronLeft, Users, MoreVertical, Send } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
// Assuming you have components like WashroomRow, Header, Button, FilterBar, TableCard
// For this single file, I'll rely on pure JSX and styles for the main structure.

// --- Mock Data ---
const MOCK_WASHROOMS = [
    { id: 1, name: "New Manish Nagar Chowk", created: "8/12/2025", zone: "Manish Nagar Zone", score: "-", rating: null, cleaner: "Omkar saaf cleaner", company: "N/A", status: "Active" },
    { id: 2, name: "SBT Japnese garden", created: "25/11/2025", zone: "Dhantoli", score: "-", rating: { value: 9.6, label: "Amazing", reviews: 1 }, cleaner: "Raju Choudhary Ambazhari dahan toilet", company: "N/A", status: "Inactive" },
    { id: 3, name: "Tuta Garden — Gandhi Chowk (Sadar)", created: "15/11/2025", zone: "Sadar Zone", score: "4.9", rating: { value: 3.6, label: "Okay", reviews: 16 }, cleaner: "Anil Saafai User", company: "N/A", status: "Active" },
    { id: 4, name: "Panchshil Chowk", created: "10/11/2025", zone: "Dhantoli", score: "-", rating: null, cleaner: "Anil Saafai User", company: "N/A", status: "Inactive" },
];

const MOCK_CLEANERS = [
    { id: 1, name: 'Omkar saaf cleaner', phone: '+91 90000 00001', status: 'Active' },
    { id: 2, name: 'Raju Choudhary', phone: '+91 90000 00002', status: 'Active' },
    { id: 3, name: 'Anil Saafai User', phone: '+91 90000 00003', status: 'Inactive' },
];

const MOCK_SUPERVISOR = { name: 'Supervisor Name', phone: '+91 90123 45678', email: 'supervisor@example.com' };

// --- Styles ---
const styles = {
    container: { padding: '16px', backgroundColor: '#f1f5f9', minHeight: '100vh' },
    // Header Styles
    header: { backgroundColor: '#0f172a', color: '#fff', padding: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    headerIcon: { color: '#4f46e5', padding: '4px', backgroundColor: '#1e293b', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' },
    actionButtonBase: { display: 'flex', alignItems: 'center', padding: '10px 16px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', color: 'white', border: 'none', cursor: 'pointer', gap: '6px' },
    primaryBtn: { backgroundColor: '#2563eb' },
    successBtn: { backgroundColor: '#16a34a' },

    // Filter Card Styles
    filterCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', marginTop: '20px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' },
    searchContainer: { display: 'flex', gap: '8px', marginBottom: '12px' },
    searchBox: { flexGrow: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', paddingLeft: '35px', backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center', },
    filterPills: { display: 'flex', gap: '4px' },
    pillBase: { padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer', transition: 'background-color 0.2s' },
    pillDefault: { color: '#475569' },
    pillActive: { backgroundColor: '#0f172a', color: '#fff', border: '1px solid #0f172a' },
    dropdownRow: { display: 'flex', gap: '12px', alignItems: 'center' },
    select: { padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.9rem', cursor: 'pointer', appearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'calc(100% - 10px) center', paddingRight: '30px' },
    clearBtn: { backgroundColor: '#475569', color: '#fff', padding: '10px 14px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' },

    // Table Styles
    tableCard: { backgroundColor: '#fff', borderRadius: '12px', marginTop: '20px', overflowX: 'auto', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' },
    thead: { backgroundColor: '#f8fafc', color: '#475569', fontWeight: '600' },
    th: { padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569', fontSize: '0.9rem', borderBottom: '1px solid #e5e7eb' },
    td: { padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.95rem', color: '#1e293b' },
    mutedText: { color: '#64748b', fontSize: '12px' },
    indexBox: { backgroundColor: '#e2e8f0', color: '#0f172a', padding: '6px 10px', borderRadius: '6px', fontWeight: '600', fontSize: '0.875rem' },
    zonePill: { backgroundColor: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: '8px', fontWeight: '500', fontSize: '0.875rem' },
    ratingPillBase: { padding: '6px 10px', borderRadius: '8px', fontWeight: 600, display: 'inline-block', minWidth: '80px', textAlign: 'center' },
    statusPillBase: { padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', marginRight: '8px' },
    actionIcon: { color: '#64748b', cursor: 'pointer', fontSize: '16px', marginLeft: '12px' },
    cleanerMore: { color: '#2563eb', fontWeight: '600', fontSize: '12px' },

    // Modal Styles
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
    avatarCircle: { width: 36, height: 36, borderRadius: 9999, background: '#eef2ff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: '#2563eb' },
    actionEye: { color: '#2563eb', cursor: 'pointer', marginRight: 12 },
    actionTrash: { color: '#ef4444', cursor: 'pointer' },
    tableFooter: { padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', borderTop: '1px solid #f1f5f9' }
};

// --- Component Logic ---
export default function WashroomsPage() {
    const [viewFilter, setViewFilter] = useState("All");
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [cleanersModal, setCleanersModal] = useState({ open: false, washroom: null });
    const [supervisorModal, setSupervisorModal] = useState({ open: false, washroom: null });

    function openMenu(id) {
        setMenuOpenId(prev => (prev === id ? null : id));
    }

    function openCleaners(washroom) {
        setCleanersModal({ open: true, washroom });
        setMenuOpenId(null);
    }

    function openSupervisor(washroom) {
        setSupervisorModal({ open: true, washroom });
        setMenuOpenId(null);
    }

    function closeModals() {
        setCleanersModal({ open: false, washroom: null });
        setSupervisorModal({ open: false, washroom: null });
    }

    // --- Main Render ---
    return (
        <div style={styles.container}>
            {/* ---------- HEADER (Top Blue Bar) ---------- */}
            <div style={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={styles.headerIcon}>
                        <MapPin size={20} />
                    </span>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Washroom Locations</h1>
                        <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem', color: '#fff' }}>Overview of location details, cleaner assignments, and facility ratings</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href="/dashboard/washrooms/add-location" passHref legacyBehavior>
                        <a style={{ ...styles.actionButtonBase, ...styles.primaryBtn }}>
                            <Plus size={14} /> Add Location
                        </a>
                    </Link>
                    <Link href="/dashboard/cleaner-assignments/add" passHref legacyBehavior>
                        <a style={{ ...styles.actionButtonBase, ...styles.successBtn }}>
                            <UserPlus size={14} /> Assign
                        </a>
                    </Link>
                </div>
            </div>

            {/* ---------- FILTER BAR (White Card) ---------- */}
            <div style={styles.filterCard}>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search washroom, zone or cleaner name"
                        style={styles.searchBox}
                    />
                    {/* Placeholder for the filter icon next to search box (not in main screenshot, but common) */}
                    <ChevronDown size={20} style={{ color: '#94a3b8', cursor: 'pointer' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={styles.filterPills}>
                        {['All', 'Assigned', 'Unassigned'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setViewFilter(filter)}
                                style={{
                                    ...styles.pillBase,
                                    ...(viewFilter === filter ? styles.pillActive : styles.pillDefault)
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <button style={styles.clearBtn}>
                        <X size={14} /> Clear
                    </button>
                </div>
            </div>

            {/* ---------- TABLE ---------- */}
            <div style={styles.tableCard}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={styles.thead}>
                            <Th style={{ minWidth: '60px' }}>Sr No</Th>
                            <Th style={{ minWidth: '200px' }}>Washroom Name <span style={styles.mutedText}>↕</span></Th>
                            <Th style={{ minWidth: '150px' }}>Zone Name</Th>
                            <Th style={{ minWidth: '100px' }}>Current Score</Th>
                            <Th style={{ minWidth: '150px' }}>Average Rating <span style={styles.mutedText}>↕</span></Th>
                            <Th style={{ minWidth: '200px' }}>Cleaner Name</Th>
                            <Th style={{ minWidth: '120px' }}>Facility Company</Th>
                            <Th style={{ minWidth: '150px' }}>Status & Action <span style={styles.mutedText}>↕</span></Th>
                        </tr>
                    </thead>

                    <tbody>
                        {MOCK_WASHROOMS.map((w, i) => (
                            <tr key={w.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <Td style={{ padding: '12px 16px' }}>
                                    <span style={styles.indexBox}>{i + 1}</span>
                                </Td>
                                <Td>
                                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{w.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Created: {w.created}</div>
                                </Td>
                                <Td>
                                    <span style={styles.zonePill}>{w.zone}</span>
                                </Td>
                                <Td>
                                    <span style={{ fontWeight: 600, color: w.score === '-' ? '#94a3b8' : '#1e293b' }}>
                                        {w.score}
                                    </span>
                                </Td>
                                <Td>
                                    {w.rating ? (
                                        <span style={{
                                            ...styles.ratingPillBase,
                                            backgroundColor: w.rating.label === 'Amazing' ? '#dcfce7' : w.rating.label === 'Okay' ? '#fef3c7' : '#f3f4f6',
                                            color: w.rating.label === 'Amazing' ? '#166534' : w.rating.label === 'Okay' ? '#b45309' : '#6b7280'
                                        }}>
                                            {w.rating.value} {w.rating.label}
                                            <span style={{ fontSize: '0.75rem', marginLeft: '4px', opacity: 0.8 }}>({w.rating.reviews})</span>
                                        </span>
                                    ) : (
                                        <span style={{ color: '#94a3b8' }}>—</span>
                                    )}
                                </Td>
                                <Td>
                                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{w.cleaner.split(' Ambazhari dahan toilet')[0]}</div>
                                    {w.id === 2 && (
                                        <div style={{ marginTop: '4px' }}>
                                            <span style={styles.cleanerMore}>+2 more</span>
                                            <span style={{ marginLeft: '8px', color: '#a78bfa', fontSize: '18px' }}>&#9733;&#9733;</span>
                                        </div>
                                    )}
                                </Td>
                                <Td style={styles.mutedText}>{w.company}</Td>
                                <Td style={{ position: 'relative' }}>
                                    <span style={{
                                        ...styles.statusPillBase,
                                        backgroundColor: w.status === 'Active' ? '#dcfce7' : '#fee2e2',
                                        color: w.status === 'Active' ? '#166534' : '#991b1b'
                                    }}>
                                        {w.status}
                                    </span>
                                    <Send size={16} style={{ ...styles.actionIcon, marginLeft: '0px' }} />
                                    <button
                                        onClick={() => openMenu(w.id)}
                                        style={{ background: 'none', border: 'none', ...styles.actionIcon }}
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                    {menuOpenId === w.id && (
                                        <div style={{
                                            position: 'absolute', right: '10px', top: '50px', backgroundColor: '#fff',
                                            borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, minWidth: '180px', padding: '8px 0'
                                        }} onMouseLeave={() => setMenuOpenId(null)}>
                                            <button
                                                onClick={() => openCleaners(w)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b', fontSize: '0.9rem', textAlign: 'left' }}
                                            >
                                                <Eye size={16} /> View Cleaners
                                            </button>
                                            <button
                                                onClick={() => openSupervisor(w)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b', fontSize: '0.9rem', textAlign: 'left' }}
                                            >
                                                <Users size={16} /> View Supervisor
                                            </button>
                                        </div>
                                    )}
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assigned Cleaners Modal */}
            {cleanersModal.open && (
                <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(2,6,23,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }} onClick={closeModals}>
                    <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <div style={styles.modalHeaderLeft}>
                                <button onClick={closeModals} style={styles.backPill}>
                                    <ChevronLeft size={20} />
                                </button>
                                <div>
                                    <h2 style={styles.modalTitle}>Assigned Cleaners</h2>
                                    <p style={styles.modalSub}>{cleanersModal.washroom?.name}</p>
                                </div>
                            </div>
                            <div style={styles.modalHeaderRight}>
                                <span style={styles.smallBadge}>{MOCK_CLEANERS.length} cleaners</span>
                                <button style={styles.addCleanerBtn}>
                                    <Plus size={14} /> Add Cleaner
                                </button>
                            </div>
                        </div>

                        <div style={styles.modalFilters}>
                            <input
                                type="text"
                                placeholder="Search cleaners..."
                                style={styles.searchModalInput}
                            />
                        </div>

                        <div style={styles.modalTableCard}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={styles.thead}>
                                        <th style={{ ...styles.th, textAlign: 'left' }}>Cleaner Name</th>
                                        <th style={{ ...styles.th, textAlign: 'left' }}>Phone</th>
                                        <th style={{ ...styles.th, textAlign: 'left' }}>Status</th>
                                        <th style={{ ...styles.th, textAlign: 'left' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_CLEANERS.map((c) => (
                                        <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                            <Td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span style={styles.avatarCircle}>
                                                        <Users size={16} />
                                                    </span>
                                                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                                                </div>
                                            </Td>
                                            <Td>{c.phone}</Td>
                                            <Td>
                                                <span style={{
                                                    backgroundColor: c.status === 'Active' ? '#dcfce7' : '#fee2e2',
                                                    color: c.status === 'Active' ? '#166534' : '#991b1b',
                                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '500'
                                                }}>
                                                    {c.status}
                                                </span>
                                            </Td>
                                            <Td>
                                                <button style={{ ...styles.actionIcon, ...styles.actionEye }} title="View"><Eye size={16} /></button>
                                                <button style={{ ...styles.actionIcon, ...styles.actionTrash }} title="Remove"><Trash2 size={16} /></button>
                                            </Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={styles.tableFooter}>
                                <span>Showing {MOCK_CLEANERS.length} cleaners</span>
                                <button onClick={closeModals} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb', fontWeight: '600' }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Supervisor Modal */}
            {supervisorModal.open && (
                <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(2,6,23,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }} onClick={closeModals}>
                    <div style={{ width: 420, background: '#fff', borderRadius: 12, padding: 20 }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ marginTop: 0 }}>Supervisor for "{supervisorModal.washroom?.name}"</h3>
                        <div style={{ marginTop: 12 }}>
                            <div style={{ fontWeight: 700 }}>{MOCK_SUPERVISOR.name}</div>
                            <div style={{ color: '#64748b', marginTop: 6 }}>Phone: {MOCK_SUPERVISOR.phone}</div>
                            <div style={{ color: '#64748b', marginTop: 6 }}>Email: {MOCK_SUPERVISOR.email}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                            <button onClick={closeModals} style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper components for table cells (defined here for completeness, 
// though ideally they would be in components/Table/Table.jsx)
const Td = ({ children, style = {} }) => (
    <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '0.95rem', color: '#1e293b', ...style }}>{children}</td>
);
const Th = ({ children, style = {} }) => (
    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569', fontSize: '0.9rem', borderBottom: '1px solid #e5e7eb', ...style }}>{children}</th>
);
