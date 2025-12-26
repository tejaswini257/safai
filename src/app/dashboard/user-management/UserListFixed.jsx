"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import EditUserFormModal from './EditUserFormModal';
import AddUserForm from './add-user/adduserform';
import { createPortal } from 'react-dom';

const initialUserRows = [
  { 
    id: 103, 
    name: 'Rajesh Sahani - Narendra square', 
    phone: '8955596876', 
    email: 'rajesh@example.com', 
    role: 'Cleaner', 
    userId: 182,
    status: 'active',
    lastActive: '2 hours ago',
    joinDate: '15 Jan 2023',
    locations: [
      { name: 'Narendra nagar square', assignedDate: '20 Nov 2025', active: true, coordinates: '21.10769962728607, 79.07983507777436' },
      { name: 'New Manish Nagar Chowk', assignedDate: '8 Dec 2025', active: true, coordinates: '21.08506067326107, 79.08774520874023' }
    ]
  },
  { 
    id: 101, 
    name: 'Test Admin', 
    phone: '9356150564', 
    email: 'admin@example.com', 
    role: 'Admin', 
    userId: 180,
    status: 'active',
    lastActive: '30 mins ago',
    joinDate: '10 Jan 2023',
    locations: []
  },
  { 
    id: 102, 
    name: 'Omkar Supervisor', 
    phone: '3333333333', 
    email: 'supervisor@example.com', 
    role: 'Supervisor', 
    userId: 181,
    status: 'active',
    lastActive: '1 hour ago',
    joinDate: '12 Jan 2023',
    locations: [
      { name: 'Narendra nagar square', assignedDate: '20 Nov 2025', active: true, coordinates: '21.107, 79.079' }
    ]
  }
];

const getRoleStyle = (role) => {
  switch (role) {
    case 'Admin': return 'bg-teal-100 text-teal-800';
    case 'Supervisor': return 'bg-blue-100 text-blue-800';
    case 'Cleaner': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusStyle = (status) => {
  return status === 'active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-gray-100 text-gray-800';
};

const DeleteConfirmModal = ({ user, onClose, onConfirm }) => {
  if (!user) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-4 border border-red-100">
        <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete user: <span className="font-semibold">{user.name}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(user)} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const LocationAssignmentCard = ({ location }) => (
  <div className="border border-gray-100 p-4 rounded-xl flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-gray-800 flex items-center">
        <span className="text-blue-500 mr-2">📍</span>{location?.name || 'Unnamed Location'}
      </h3>
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
        location?.active 
          ? 'bg-green-50 text-green-700 border border-green-100' 
          : 'bg-gray-50 text-gray-500 border border-gray-100'
      }`}>
        {location?.active ? 'Active' : 'Inactive'}
      </span>
    </div>
    <p className="text-xs text-gray-500 mb-2">
      <span className="block text-gray-700 font-medium">Nagpur, Maharashtra</span>
      <span className="text-gray-400">{location?.coordinates || 'Coordinates not available'}</span>
    </p>
    <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
      <span className="flex items-center">
        <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Assigned on {location?.assignedDate || 'N/A'}
      </span>
    </div>
  </div>
);

const UserDetailCard = ({ user, onClose }) => {
  if (!user) return null;
  
  const activeLocations = user.locations?.filter(l => l.active).length || 0;
  const totalLocations = user.locations?.length || 0;

  return createPortal(
    <div 
      className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-start justify-center overflow-y-auto z-50 py-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 my-8">
        <div className="p-6 border-b border-gray-200">
          <button 
            onClick={onClose} 
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center"
          >
            ← Back to Users
          </button>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-teal-600 text-white flex items-center justify-center rounded-full text-2xl font-bold mr-4">
              {user.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name || 'Unnamed User'}</h1>
              <p className="text-sm text-gray-500">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
                  {user.role || 'N/A'}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-medium text-gray-500">📧 EMAIL</p>
            <p className="mt-1">{user.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">📞 PHONE</p>
            <p className="mt-1">{user.phone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">👤 USER ID</p>
            <p className="mt-1">{user.userId || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">STATUS</p>
            <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(user.status)}`}>
              {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'N/A'}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">LAST ACTIVE</p>
            <p className="mt-1">{user.lastActive || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">JOIN DATE</p>
            <p className="mt-1">{user.joinDate || 'N/A'}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="text-teal-600 mr-2">📍</span> Assigned Locations
            </h2>
            <span className="text-sm text-gray-500">
              {activeLocations} active • {totalLocations} total
            </span>
          </div>

          {totalLocations > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.locations.map((location, index) => (
                <LocationAssignmentCard key={`${user.id}-${index}`} location={location} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No locations assigned to this user.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const UserList = () => {
  const [users, setUsers] = useState(initialUserRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phone?.includes(term) ||
      user.role?.toLowerCase().includes(term) ||
      user.userId?.toString().includes(term)
    );
  });

  const handleAddUser = (newUser) => {
    const newUserWithId = {
      ...newUser,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      userId: Math.max(...users.map(u => u.userId), 0) + 1,
      status: 'active',
      lastActive: 'Just now',
      joinDate: new Date().toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      locations: []
    };
    setUsers([newUserWithId, ...users]);
    setIsAddingUser(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    ));
    setEditingUser(null);
  };

  const handleDeleteUser = (userToDelete) => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setDeletingUser(null);
  };

  if (!isMounted) return null;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setIsAddingUser(true)}
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-gray-900 placeholder-gray-500"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(user.status)}`}>
                      {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setViewingUser(user)}
                        className="text-blue-600 hover:text-blue-900 p-1.5 rounded-full hover:bg-blue-50"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-amber-600 hover:text-amber-900 p-1.5 rounded-full hover:bg-amber-50"
                        title="Edit user"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeletingUser(user)}
                        className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-50"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No users found. {searchTerm ? 'Try a different search term.' : 'Add a new user to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Count */}
      <div className="mt-4 text-sm text-gray-500">
        Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
      </div>

      {/* Modals */}
      {isMounted && (
        <>
          {isAddingUser && (
            <AddUserForm
              onClose={() => setIsAddingUser(false)}
              onSubmit={handleAddUser}
            />
          )}
          
          {editingUser && (
            <EditUserFormModal
              user={editingUser}
              onClose={() => setEditingUser(null)}
              onSubmit={handleEditUser}
            />
          )}
          
          {deletingUser && (
            <DeleteConfirmModal
              user={deletingUser}
              onClose={() => setDeletingUser(null)}
              onConfirm={handleDeleteUser}
            />
          )}
          
          {viewingUser && (
            <UserDetailCard
              user={viewingUser}
              onClose={() => setViewingUser(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserList;