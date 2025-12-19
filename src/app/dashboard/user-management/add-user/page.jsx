// src/app/dashboard/user-management/add-user/page.jsx

"use client"; // <-- ADD THIS LINE

import { useRouter } from 'next/navigation'; 
import AddUserForm from './adduserform';
import Link from 'next/link'; 

export default function AddUserPage() {
    const router = useRouter();
    
    // Function to handle ALL navigation back to the user list
    const handleGoBack = () => {
        // Correct path for the main user list page
        router.push('/dashboard/user-management'); 
    };

    // Function to handle the form submission
    const handleFormSubmit = (formData) => {
        console.log("Submitting new user data:", formData);
        
        // Navigate back to the main list after the user is "created".
        handleGoBack(); 
    };

    return (
        <div className="p-8 w-full min-h-screen bg-gray-50 flex flex-col items-center">
            
            {/* Link Container (For visual "Back to Users" text) */}
            <div className="w-full max-w-xl mb-4"> 
                <Link 
                    href="/dashboard/user-management" 
                    className="text-gray-500 hover:text-indigo-600 text-sm flex items-center font-medium"
                >
                    &larr; Back to Users
                </Link>
            </div>
            
            {/* The AddUserForm component (onClose and onSubmit now pass functions from a Client Component) */}
            <AddUserForm 
                onClose={handleGoBack} 
                onSubmit={handleFormSubmit} 
            />
        </div>
    );
}