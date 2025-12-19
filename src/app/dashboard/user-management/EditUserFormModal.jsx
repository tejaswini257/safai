// src/app/dashboard/user-management/edit-user-form/EditUserFormModal.jsx

"use client";

import React, { useState } from 'react';

// Using a mock icon component for the 'User' symbol
const UserIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-indigo-600 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 3.582-8 8v1h16v-1c0-4.418-3.582-8-8-8z" />
    </svg>
);

// This component is structurally identical to AddUserForm, 
// but is explicitly for editing (isEditMode is internally managed).
const EditUserFormModal = ({ onClose, onSubmit, initialUser }) => {

    // Hardcoded to true for this dedicated Edit component
    const isEditMode = true;
    const defaultRole = initialUser.role || 'Cleaner';

    const [formData, setFormData] = useState({
        company: 'Nagpur Municipal Corporation Pilot',
        // Ensure name is read correctly from the initial user data structure
        fullName: initialUser.name || initialUser.fullName || '',
        email: initialUser.email || '',
        phone: initialUser.phone || '',
        // Password is not used/shown in edit mode
        role: defaultRole,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation check (basic, password check is skipped as isEditMode is true)
        if (!formData.fullName || !formData.phone || !formData.role) {
            alert("Please fill out all required fields.");
            return;
        }

        // Pass the updated user data up to the parent component
        onSubmit(formData);
        onClose();
    };

    const title = "Edit User"; // Always "Edit User"
    const submitButtonText = 'Save Changes';
    const roleOptions = ['Admin', 'Supervisor', 'Cleaner'];

    return (
        // FIX APPLIED: fixed inset-0 ensures full viewport coverage
        <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8 my-8">

                {/* Centered Header Section (Icon + Title) */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <UserIcon />
                    <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Company Field (Read-only) */}
                    <div>
                        <span className="text-sm font-medium text-gray-700 block mb-1">Company</span>
                        <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-gray-50">
                            <div className="text-gray-800 font-medium">
                                {formData.company}
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Editing user within this company.
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

                    {/* Password is omitted here because isEditMode is true */}

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

                    {/* Form Actions */}
                    <div className="flex justify-end pt-4 space-x-3 mt-8">

                        {/* Cancel Button - Styled like a secondary button (light background/border) */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium transition-colors"
                        >
                            Cancel
                        </button>

                        {/* Save Changes Button - Kept as primary color/solid background */}
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
                        >
                            {submitButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserFormModal;