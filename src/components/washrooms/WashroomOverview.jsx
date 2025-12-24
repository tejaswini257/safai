"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Map, Pencil, Trash2, Users, CheckCircle } from "lucide-react";

const MOCK_WASHROOM = {
  id: 1,
  name: "Abhyankar Nagar Garden",
  subtitle: "Abhyankar Nagar Garden, Main Entrance",
  zone: "Dharampeth Zone",
  city: "Nagpur",
  state: "Maharashtra",
  pincode: "440034",
  createdOn: "Nov 10, 2025",
  lat: 21.1458,
  lng: 79.0882,
  amenities: ["Female", "Male", "Unisex", "Paid Entry", "24/7 Open", "Has Attendant"],
};

export default function WashroomOverview({ washroom = MOCK_WASHROOM }) {
  const router = useRouter();

  const handleLocate = () => {
    router.push("/dashboard/locate");
  };

  const handleDelete = () => {
    const ok = window.confirm(
      `Are you sure you want to delete "${washroom.name}"? This action cannot be undone.`
    );
    if (!ok) return;
    alert(`Washroom "${washroom.name}" deleted.`);
  };

  return (
    <div className="space-y-6 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="md:flex">
          {/* Image */}
          <div className="relative h-56 md:w-1/3 md:h-auto">
            <Image
              src="/image/dashboard img.png"
              alt={washroom.name}
              fill
              className="object-cover rounded-l-xl"
              priority
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-medium text-gray-700">Active</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:w-2/3">
            <h1 className="text-xl font-bold text-gray-900 mb-1">{washroom.name}</h1>
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1.5 text-blue-500" />
              {washroom.subtitle}
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Zone</p>
                <p className="text-sm font-medium">{washroom.zone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">City</p>
                <p className="text-sm font-medium">{washroom.city}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">State</p>
                <p className="text-sm font-medium">{washroom.state}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Pincode</p>
                <p className="text-sm font-medium">{washroom.pincode}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={handleLocate}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Map className="h-4 w-4" />
                View on Map
              </button>
              
              <Link 
                href={`/dashboard/washrooms/${washroom.id}/edit`}
                className="flex-1"
              >
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:opacity-90 transition-opacity">
                  <Pencil className="h-4 w-4" />
                  Edit Details
                </button>
              </Link>
              
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-500" />
          Amenities & Features
        </h2>
        <div className="flex flex-wrap gap-3">
          {washroom.amenities.map((a) => (
            <span
              key={a}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#D1F0F2]"
              style={{
                backgroundColor: '#E5F6F8',
                color: '#007C85',
                borderColor: '#B8E6EB',
                transition: 'all 0.2s ease'
              }}
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Staff & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Assigned Staff */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Assigned Staff</h2>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              Manage Staff
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-200 text-center">
            <Users className="h-8 w-8 mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-600 mb-1">No staff assigned yet</p>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
              Assign staff members to manage this washroom facility
            </p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              Assign Staff
            </button>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Performance</h2>
          
          <div className="space-y-4">
            {/* User Rating */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">User Rating</span>
                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">0 Reviews</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">N/A</span>
                <span className="text-sm text-gray-500">/ 5</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-0"></div>
              </div>
            </div>

            {/* Staff Rating */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">Staff Rating</span>
                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">0 Reviews</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">N/A</span>
                <span className="text-sm text-gray-500">/ 5</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full w-0"></div>
              </div>
            </div>

            {/* Last Inspection */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">Last Inspection</span>
                <span className="text-xs text-gray-400">Not available</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                No recent inspections recorded
              </p>
              <button className="mt-2 text-xs font-medium text-blue-600 hover:underline">
                Schedule Inspection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Information */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Facility Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Location</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Address</span>
                <span className="text-sm font-medium text-right">{washroom.subtitle}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Zone</span>
                <span className="text-sm font-medium">{washroom.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">City</span>
                <span className="text-sm font-medium">{washroom.city}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Activity</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Created On</span>
                <span className="text-sm font-medium">{washroom.createdOn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}