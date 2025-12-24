"use client";

import { ArrowLeft, UserPlus, Users } from "lucide-react";
import Link from "next/link";

export default function CleanerHeader() {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Left Section: Title and Breadcrumb */}
                <div>
                    <div className="flex items-center">
                        <Link href="/dashboard/washrooms" className="text-blue-600 hover:text-blue-800">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Assigned Cleaners</h1>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>Washroom Management</span>
                        <span className="mx-2">/</span>
                        <span className="text-blue-600">Abhyankar Nagar Garden</span>
                    </div>
                </div>

                {/* Right Section: Stats and Action Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <Users className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                            Staffing: <span className="font-semibold">2/2</span> Cleaners
                        </span>
                    </div>
                    
                    <Link href="/dashboard/washrooms/1/cleaners/add" className="w-full sm:w-auto">
                        <button className="
                            w-full flex items-center justify-center gap-2
                            px-6 py-2.5 
                            rounded-lg bg-blue-600 
                            text-white text-sm font-semibold 
                            hover:bg-blue-700 transition-colors
                            shadow-sm
                        ">
                            <UserPlus size={18} className="h-4 w-4" />
                            Add Cleaner
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}