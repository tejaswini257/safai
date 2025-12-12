// src/app/dashboard/user-management/add-user/adduserform.jsx

"use client";

import React, { useState } from 'react';

// Using a mock icon component for the 'Add User' symbol (User with Plus)
const UserPlusIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-10 w-10 text-indigo-600 mb-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const AddUserForm = ({ onClose, onSubmit, initialUser = {}, isEditMode = false }) => {
    // Determine the default role for the form
    const defaultRole = initialUser.role || 'Cleaner'; 
    
    const [formData, setFormData] = useState({
        company: 'Nagpur Municipal Corporation Pilot',
        fullName: initialUser.fullName || initialUser.name || '',
        email: initialUser.email || '',
        phone: initialUser.phone || '',
        password: '',
        role: defaultRole,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation check (basic)
        if (!formData.fullName || !formData.phone || !formData.role || (!isEditMode && !formData.password)) {
            alert("Please fill out all required fields.");
            return;
        }

        // Pass the new/updated user data up to the parent component
        onSubmit(formData); // THIS IS THE CRITICAL LINE
        // Assuming onClose handles navigation/modal closing
        onClose(); 
    };

    const title = isEditMode ? "Edit User" : "Add New User";
    
    // Role options based on your previous mock data
    const roleOptions = ['Admin', 'Supervisor', 'Cleaner'];

    return (
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8">
            
            {/* ❌ REMOVED: The "Back to Users" button div block has been removed here. */}

            {/* Centered Header Section (Icon + Title) */}
            <div className="flex flex-col items-center mb-8 text-center">
                <UserPlusIcon />
                <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Company Field (Read-only banner style from the image) */}
                <div>
                    <span className="text-sm font-medium text-gray-700 block mb-1">Company</span>
                    <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-gray-50">
                        <div className="text-gray-800 font-medium">
                            {formData.company}
                            <p className="text-xs text-gray-500 mt-0.5">
                                New user will be added to your company.
                            </p>
                        </div>
                        <button 
                            type="button"
                            className="text-xs font-medium text-indigo-600 border border-indigo-200 bg-white px-2 py-1 rounded hover:bg-indigo-50"
                        >
                            Current Company
                        </button>
                    </div>
                </div>

                {/* Full Name */}
                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Full Name *</span>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                        required
                    />
                </label>

                {/* Email and Phone (Side-by-side) */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <label className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">Email *</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                            required
                        />
                    </label>

                    {/* Phone Number */}
                    <label className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">Phone *</span>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            className="mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                            required
                        />
                    </label>
                </div>

                {/* Password and Role (Stacked) */}
                
                {/* Password (Only visible in Add Mode, hidden in Edit Mode for security) */}
                {!isEditMode && (
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Password *</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                            required
                        />
                    </label>
                )}
                
                {/* Role */}
                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Role *</span>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none pr-10"
                        required
                    >
                        <option value="" disabled>Select a role</option>
                        {roleOptions.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </label>

                {/* Form Actions (Aligned right, matching the image) */}
                <div className="flex justify-end pt-4 space-x-3 mt-8">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
                    >
                        {isEditMode ? 'Save Changes' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;