"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Eye, Edit3, Trash2, MapPin, Mail, Phone, Shield, AlertTriangle } from 'lucide-react';

// --- MOCK DATA ---
const initialUserRows = [
    {
        id: 103,
        name: 'Rajesh Sahani',
        phone: '8955596876',
        email: 'rajesh@saaf.ai',
        role: 'Cleaner',
        userId: 182,
        locations: [
            { name: 'Narendra nagar square', assignedDate: '20 Nov 2025', active: true, coordinates: '21.107, 79.079' },
            { name: 'New Manish Nagar Chowk', assignedDate: '8 Dec 2025', active: true, coordinates: '21.085, 79.087' }
        ]
    },
    { id: 101, name: 'Test Intern', phone: '9356150564', email: 'test1@gmail.com', role: 'Admin', userId: 180, locations: [] },
    { id: 102, name: 'Omkar Supervisor', phone: '3333333333', email: 'richom056@gmail.com', role: 'Supervisor', userId: 181, locations: [{ name: 'Narendra nagar square', assignedDate: '20 Nov 2025', active: true, coordinates: '21.107, 79.079' }] },
];

const getRoleStyle = (role) => {
    switch (role) {
        case 'Admin': return 'role-badge admin';
        case 'Supervisor': return 'role-badge supervisor';
        case 'Cleaner': return 'role-badge cleaner';
        default: return 'role-badge';
    }
};

// --- DELETE CONFIRMATION MODAL ---
const DeleteConfirmModal = ({ user, onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-left">
        <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-rose-50 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-rose-600" />
                </div>
                <h2 className="text-xl font-black text-rose-950 uppercase tracking-tight">Confirm Deletion</h2>
                <p className="text-sm font-bold text-rose-800/60 mt-2 leading-relaxed">
                    Are you sure you want to remove <span className="text-rose-600">{user.name}</span>? This action is permanent.
                </p>
            </div>
            <div className="p-6 flex gap-3">
                <button onClick={onClose} className="flex-1 px-6 py-3.5 rounded-2xl border border-slate-200 bg-white text-[11px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Cancel
                </button>
                <button onClick={() => onConfirm(user.id)} className="flex-1 px-6 py-3.5 rounded-2xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:brightness-110 transition-all">
                    Delete User
                </button>
            </div>
        </div>
    </div>
);

// --- USER DETAIL CARD ---
const UserDetailCard = ({ user, onClose }) => {
    const activeLocations = user.locations.filter(l => l.active).length;
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center overflow-y-auto z-[60] p-4 text-left">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-[#E6F7F9] p-8 border-b border-[#D1F0F2] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-[#007C85] text-white flex items-center justify-center rounded-2xl text-2xl font-black shadow-lg">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-[#007C85] tracking-tight">{user.name}</h1>
                            <div className={`inline-flex items-center px-3 py-1 mt-2 rounded-lg border text-xs font-bold uppercase tracking-widest ${getRoleStyle(user.role)}`}>
                                <Shield className="w-3 h-3 mr-1.5" /> {user.role}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="px-5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#EA5455] transition-all">
                        Close Profile
                    </button>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-white">
                    <div className="space-y-1"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p><p className="font-bold text-slate-700 flex items-center gap-2 lowercase"><Mail size={14} /> {user.email}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p><p className="font-bold text-slate-700 flex items-center gap-2"><Phone size={14} /> {user.phone}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization</p><p className="font-bold text-slate-700 uppercase tracking-tight text-xs">Nagpur Municipal Corp</p></div>
                    <div className="space-y-1 text-right"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff ID</p><p className="font-mono font-bold text-[#007C85]">#{user.userId}</p></div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const UserList = () => {
    const router = useRouter();
    const [userRows, setUserRows] = useState(initialUserRows);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewingUser, setViewingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const filteredUsers = userRows.filter(user => {
        const term = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.phone.toLowerCase().includes(term)
        );
    });

    const handleDeleteUser = (id) => {
        setUserRows(prev => prev.filter(u => u.id !== id));
        setDeletingUser(null);
    };

    const isModalOpen = viewingUser || deletingUser;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className={`space-y-8 transition-all duration-300 ${isModalOpen ? 'blur-md scale-[0.98] pointer-events-none' : 'scale-100'}`}>

                {/* Header Section */}
                <div className="bg-[#E6F7F9] rounded-[18px] border border-[#D1F0F2] p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
                    <div className="flex items-center gap-4 text-left">
                        {/* Reduced from h-14 to h-10 */}
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Shield className="h-5 w-5 text-[#007C85]" />
                        </div>

                        <div className="text-left">
                            {/* Reduced from text-2xl to text-lg */}
                            <h1 className="text-lg font-black text-[#007C85] tracking-tight uppercase leading-none">
                                User Directory
                            </h1>
                            {/* Reduced from text-xs to text-[10px] */}
                            <p className="text-[10px] font-bold text-[#2D8E97] uppercase tracking-widest opacity-70 mt-0.5">
                                Manage access levels and mapping
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/dashboard/user-management/add-user')}
                        style={{ background: 'linear-gradient(to right, #58BECF, #6D9CDC)' }}
                        /* Reduced padding from px-8 py-3.5 to px-5 py-2 */
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-md shadow-teal-900/10 hover:brightness-110 active:scale-95 transition-all"
                    >
                        <Plus size={14} strokeWidth={3} /> Add User
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative group max-w-2xl text-left">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007C85] transition-colors" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="SEARCH BY NAME, EMAIL, OR STAFF ID..."
                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 bg-white text-xs font-bold uppercase tracking-widest outline-none focus:ring-4 focus:ring-[#E6F7F9] focus:border-[#2D8E97] transition-all shadow-sm"
                    />
                </div>

                {/* Table View */}
                <div className="rounded-[24px] bg-white shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-[#E6F7F9]">
                            <tr>
                                <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-[#2D8E97] border-b border-[#D1F0F2]">Staff Member</th>
                                <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-[#2D8E97] border-b border-[#D1F0F2]">Contact Info</th>
                                <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-[#2D8E97] border-b border-[#D1F0F2]">Permission Level</th>
                                <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-[#2D8E97] border-b border-[#D1F0F2]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-[#F8FAFB] transition-colors">
                                    <td className="px-8 py-5 text-left border-b border-slate-100">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#007C85] flex items-center justify-center font-black text-sm shadow-sm">{user.name.charAt(0)}</div>
                                            <div className="text-left">
                                                <div className="text-sm font-black text-[#007C85] uppercase tracking-tight">{user.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: #{user.userId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-left border-b border-slate-100">
                                        <div className="text-xs font-bold text-slate-600 lowercase">{user.email}</div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">{user.phone}</div>
                                    </td>
                                    <td className="px-8 py-5 text-left border-b border-slate-100">
                                        <span className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getRoleStyle(user.role)}`}>{user.role}</span>
                                    </td>
                                    <td className="px-8 py-5 text-right border-b border-slate-100">
                                        {/* Buttons are now always visible */}
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setViewingUser(user)}
                                                className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#007C85] hover:bg-[#E6F7F9] transition-all shadow-sm"
                                                title="View Profile"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/dashboard/user-management/edit/${user.id}`)}
                                                className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#2D8E97] hover:bg-[#E6F7F9] transition-all shadow-sm"
                                                title="Edit Account"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => setDeletingUser(user)}
                                                className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 transition-all shadow-sm"
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALS */}
            {viewingUser && <UserDetailCard user={viewingUser} onClose={() => setViewingUser(null)} />}
            {deletingUser && <DeleteConfirmModal user={deletingUser} onClose={() => setDeletingUser(null)} onConfirm={handleDeleteUser} />}
        </div>
    );
};

export default UserList;