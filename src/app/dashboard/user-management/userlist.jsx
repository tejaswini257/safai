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
        case 'Admin': return 'bg-purple-100 text-purple-800';
        case 'Supervisor': return 'bg-blue-100 text-blue-800';
        case 'Cleaner': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// --- DELETE CONFIRMATION MODAL ---
const DeleteConfirmModal = ({ user, onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-left">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-rose-50 p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 text-rose-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-rose-950 uppercase tracking-tight">Confirm Deletion</h2>
                <p className="text-xs sm:text-sm font-bold text-rose-800/60 mt-1.5 sm:mt-2 leading-relaxed">
                    Are you sure you want to remove <span className="text-rose-600">{user?.name}</span>? This action is permanent.
                </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs sm:text-[11px] font-black text-slate-500 sm:text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-xs sm:text-[11px] font-black text-white uppercase tracking-widest hover:opacity-90 transition-all"
                >
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
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
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
    const [users, setUsers] = useState(initialUserRows);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (user, e) => {
        e?.stopPropagation();
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const handleViewClick = (user, e) => {
        e?.stopPropagation();
        setSelectedUser(user);
    };

    const handleRowClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="space-y-4 sm:space-y-6 px-1 sm:px-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-xs sm:text-sm text-slate-500">Manage all users and their permissions</p>
                </div>
                <button
                    onClick={() => router.push('/dashboard/user-management/add-user')}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                >
                    <Plus size={14} className="sm:w-4 sm:h-4 w-3 h-3" />
                    <span>Add New User</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search users..."
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Users Table */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto -mx-1 sm:mx-0">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 hidden sm:table-header-group">
                            <tr>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleRowClick(user)}
                                >
                                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm sm:text-base">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="ml-3 sm:ml-4">
                                                <div className="text-sm sm:text-base font-medium text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">ID: {user.userId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.phone}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-none">{user.email}</div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2 sm:space-x-3">
                                            <button
                                                onClick={(e) => handleViewClick(user, e)}
                                                className="text-blue-600 hover:text-blue-900 p-1 sm:p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/dashboard/user-management/edit/${user.id}`);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 sm:p-1.5 rounded-full hover:bg-indigo-50 transition-colors"
                                                title="Edit User"
                                            >
                                                <Edit3 size={16} className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteClick(user, e)}
                                                className="text-red-600 hover:text-red-900 p-1 sm:p-1.5 rounded-full hover:bg-red-50 transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">No users found. Try a different search term.</p>
                </div>
            )}

            {/* Modals */}
            {showDeleteModal && (
                <DeleteConfirmModal
                    user={userToDelete}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                />
            )}

            {selectedUser && (
                <UserDetailCard
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

export default UserList;