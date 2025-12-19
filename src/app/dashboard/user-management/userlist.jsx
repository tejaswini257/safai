"use client"; 

import React, { useState } from 'react';
import Link from 'next/link'; 
import EditUserFormModal from './EditUserFormModal'; 
// 👇 NEW IMPORT for the Add User Form
import AddUserForm from './add-user/adduserform'; 


// --- MOCK DATA AND HELPER FUNCTIONS (UNCHANGED) ---

const initialUserRows = [
    { 
        id: 103, 
        name: 'Rajesh Sahani - Narendra square', 
        phone: '8955596876', 
        email: 'N/A', 
        role: 'Cleaner', 
        userId: 182, 
        locations: [
            { name: 'Narendra nagar square', assignedDate: '20 Nov 2025', active: true, coordinates: '21.10769962728607, 79.07983507777436' },
            { name: 'New Manish Nagar Chowk', assignedDate: '8 Dec 2025', active: true, coordinates: '21.08506067326107, 79.08774520874023' }
        ]
    },
    { 
        id: 101, 
        name: 'Test Intern', 
        phone: '9356150564', 
        email: 'test1@gmail.com', 
        role: 'Admin', 
        userId: 180, 
        locations: [] 
    },
    { 
        id: 102, 
        name: 'Omkar Supervisor', 
        phone: '3333333333', 
        email: 'richom056@gmail.com', 
        role: 'Supervisor', 
        userId: 181, 
        locations: [
            { name: 'Narendra nagar square', assignedDate: '20 Nov 2025', active: true, coordinates: '21.107, 79.079' }
        ]
    },
    { id: 104, name: 'Test Supervisor', phone: '9356150563', email: 'N/A', role: 'Supervisor', userId: 183, locations: [] },
    { id: 105, name: 'Test Admin', phone: '9356150562', email: 'N/A', role: 'Admin', userId: 184, locations: [] },
    { id: 106, name: 'Raju Choudhary', phone: '8210370052', email: 'N/A', role: 'Cleaner', userId: 185, locations: [] },
];

const getRoleStyle = (role) => {
    switch (role) {
        case 'Admin': return 'bg-blue-100 text-blue-800';
        case 'Supervisor': return 'bg-green-100 text-green-800';
        case 'Cleaner': return 'bg-gray-200 text-gray-800';
        default: return 'bg-gray-100 text-gray-600';
    }
};

// --- MODAL COMPONENTS (Modal wrappers use fixed inset-0) ---

const DeleteConfirmModal = ({ user, onClose, onConfirm }) => (
    // FIX APPLIED: fixed inset-0 ensures full viewport coverage
    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center z-50"> 
        <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm mx-4">
            <h2 className="text-xl font-bold mb-4 text-red-700">Confirm Deletion</h2>
            <p className="mb-6">
                Are you sure you want to delete user: <span className="font-semibold">{user.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
                <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">Cancel</button>
                <button onClick={() => onConfirm(user)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
        </div>
    </div>
);

const LocationAssignmentCard = ({ location }) => (
    <div className="border border-gray-200 p-4 rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 flex items-center">
                <span className="text-blue-500 mr-2">📍</span>{location.name}
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">assigned</span>
        </div>
        <p className="text-xs text-gray-500 mb-2">
            Nagpur, Maharashtra - 839292<br/>
            {location.coordinates}
        </p>
        <div className="text-xs text-gray-600">
            <span className="mr-1">🗓️</span> Assigned on {location.assignedDate}
        </div>
    </div>
);

const UserDetailCard = ({ user, onClose }) => {
    const activeLocations = user.locations.filter(l => l.active).length;

    return (
        // FIX APPLIED: fixed inset-0 ensures full viewport coverage
        <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center overflow-y-auto z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 my-8">
                
                <div className="p-6 border-b border-gray-200">
                    <button onClick={onClose} className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center">← Back to Users</button>
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold mr-4">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-sm text-gray-500">
                                <span className={`font-semibold ${getRoleStyle(user.role)} px-2 py-0.5 rounded-md`}>
                                    {user.role}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-b grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <p className="text-xs font-medium text-gray-500">📧 EMAIL</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">📞 PHONE</p>
                        <p>{user.phone}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-xs font-medium text-gray-500">🏢 COMPANY</p>
                        <p>Nagpur Municipal Corporation Pilot</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">👤 USER ID</p>
                        <p>{user.userId}</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <span className="text-indigo-600 mr-2">📍</span> Locations
                        </h2>
                        <span>{activeLocations} / {user.locations.length}</span>
                    </div>

                    {user.locations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.locations.map((loc, i) => (
                                <LocationAssignmentCard key={i} location={loc} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No locations assigned.</p>
                    )}
                </div>

            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---

const UserList = () => {
    const [userRows, setUserRows] = useState(initialUserRows);
    const [searchTerm, setSearchTerm] = useState("");

    const [viewingUser, setViewingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    // 👇 NEW STATE for Add User Modal
    const [isAddingUser, setIsAddingUser] = useState(false); 


    const filteredUsers = userRows.filter(user => {
        const term = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.phone.toLowerCase().includes(term)
        );
    });

    // 👇 NEW HANDLER: Logic to add a new user to the state
    const handleAddUserSubmit = (newUserData) => {
        // 1. Determine the highest current IDs for mocking
        const maxId = userRows.length > 0 ? Math.max(...userRows.map(u => u.id)) : 100;
        const maxUserId = userRows.length > 0 ? Math.max(...userRows.map(u => u.userId)) : 180;

        const newUser = {
            id: maxId + 1, // Assign new ID
            name: newUserData.fullName,
            phone: newUserData.phone,
            email: newUserData.email,
            role: newUserData.role, 
            userId: maxUserId + 1, // Assign new User ID
            locations: [], // New users start with no locations
        };

        // 2. Update the state by adding the new user (at the beginning of the array)
        setUserRows(prev => [newUser, ...prev]);

        // 3. Close the modal
        setIsAddingUser(false); 
    };
    
    // Handler for editing an existing user (already worked)
    const handleEditUserSubmit = (updatedUserFormData) => {
        setUserRows(prev => prev.map(u => 
            u.id === editingUser.id ? { ...u, 
                name: updatedUserFormData.fullName,
                email: updatedUserFormData.email,
                phone: updatedUserFormData.phone,
                role: updatedUserFormData.role,
            } : u
        ));
        setEditingUser(null);
    };

    // Handler for deleting a user (already worked)
    const handleDeleteConfirm = (userToDelete) => {
        setUserRows(prev => prev.filter(u => u.id !== userToDelete.id));
        setDeletingUser(null);
    };

    const isModalOpen = viewingUser || deletingUser || editingUser || isAddingUser; 

    return (
        <div className="p-6 relative">
            
            <div className={isModalOpen ? 'pointer-events-none blur-sm' : ''}>
                
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-semibold">👥 Manage Users</h1>
                    
                    {/* 👇 CHANGE: Replace Link with Button to open modal */}
                    <button 
                        onClick={() => setIsAddingUser(true)} // Open the new Add User modal
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                    >
                        + Add User
                    </button>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Search by name, email, or phone..."
                        className="w-full p-3 border rounded-lg"
                    />
                </div>

                {/* TABLE (UNCHANGED) */}
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed"> 

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Name
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Email
                                </th>
                                <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Role
                                </th>
                                <th className="w-1/12 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    
                                    <td className="px-6 py-4 truncate">
                                        <div className="text-sm font-medium">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.phone}</div>
                                    </td>

                                    <td className="px-6 py-4 truncate">{user.email}</td>

                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-1.5"> 
                                            
                                            {/* View Button (Green) */}
                                            <button 
                                                onClick={() => setViewingUser(user)} 
                                                title="View User"
                                                className="p-2 rounded-lg transition-colors duration-150 text-green-600 border border-green-200 bg-green-50 hover:bg-green-100"
                                            >
                                                {/* Eye Icon SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>

                                            {/* Edit Button (Blue) */}
                                            <button 
                                                onClick={() => setEditingUser(user)} 
                                                title="Edit User"
                                                className="p-2 rounded-lg transition-colors duration-150 text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100"
                                            >
                                                {/* Edit Icon SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>

                                            {/* Delete Button (Red) */}
                                            <button 
                                                onClick={() => setDeletingUser(user)} 
                                                title="Delete User"
                                                className="p-2 rounded-lg transition-colors duration-150 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100"
                                            >
                                                {/* Trash Icon SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Showing <b>{filteredUsers.length}</b> of <b>{userRows.length}</b> users
                </div>

            </div>

            {/* MODALS */}
            {/* 1. Edit User Modal */}
            {editingUser && (
                <EditUserFormModal 
                    initialUser={editingUser}
                    onClose={() => setEditingUser(null)} 
                    onSubmit={handleEditUserSubmit}
                />
            )}

            {/* 2. View User Modal */}
            {viewingUser && (
                <UserDetailCard user={viewingUser} onClose={() => setViewingUser(null)} />
            )}

            {/* 3. Delete User Modal */}
            {deletingUser && (
                <DeleteConfirmModal 
                    user={deletingUser}
                    onClose={() => setDeletingUser(null)}
                    onConfirm={handleDeleteConfirm}
                />
            )}
            
            {/* 👇 4. NEW: Add User Modal */}
            {isAddingUser && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
                    <AddUserForm 
                        onClose={() => setIsAddingUser(false)} 
                        onSubmit={handleAddUserSubmit}
                    />
                </div>
            )}
        </div>
    );
};

export default UserList;