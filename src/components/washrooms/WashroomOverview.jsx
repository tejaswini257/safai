"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Map, Pencil, Trash2 } from "lucide-react";

const MOCK_WASHROOM = {
  id: 1,
  name: "Abhyankar Nagar Garden",
  subtitle: "Abhyankar Nagar Garden",
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
  const handleLocate = () => {
    if (!washroom?.lat || !washroom?.lng) return;
    const url = `https://www.google.com/maps?q=${washroom.lat},${washroom.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDelete = () => {
    const ok = window.confirm(
      `Are you sure you want to delete "${washroom.name}"? This action cannot be undone (demo only).`
    );
    if (!ok) return;
    alert(`Washroom "${washroom.name}" deleted (demo).`);
  };
  return (
    <div className="space-y-6">
      {/* Top card with image and details */}
      <div className="bg-white rounded-2xl shadow-md border border-[var(--border-subtle)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-0">
          <div className="relative h-64 md:h-full">
            <Image
              src="/image/dashboard img.png"
              alt={washroom.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-xl md:text-2xl font-semibold text-[var(--navy)]">
                  {washroom.name}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  <span>{washroom.subtitle}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <div className="text-[10px] uppercase text-slate-500">
                  Location Hierarchy / Zone
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {washroom.zone}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                <span>City: {washroom.city}</span>
                <span>State: {washroom.state}</span>
                <span>Pincode: {washroom.pincode}</span>
                <span>Created on {washroom.createdOn}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleLocate}
                className="btn-primary bg-white text-[var(--navy)] border border-[var(--border-subtle)] hover:bg-slate-100 flex items-center gap-2"
              >
                <Map className="h-4 w-4" />
                Locate on Map
              </button>
              <Link href={`/dashboard/washrooms/${washroom.id}/edit`}>
                <button className="btn-primary bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="btn-primary bg-red-600 hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities section */}
      <div className="bg-white rounded-2xl border border-[var(--border-subtle)] shadow-sm p-4 space-y-3">
        <h2 className="text-sm font-semibold text-slate-700">Amenities & Features</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {washroom.amenities.map((a) => (
            <span
              key={a}
              className="px-3 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Assigned users placeholder */}
      <div className="bg-white rounded-2xl border border-[var(--border-subtle)] shadow-sm p-4 text-sm text-slate-500">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">Assigned Users</h2>
        <p>No user currently assigned to this location.</p>
      </div>

      {/* Review statistics placeholder */}
      <div className="bg-white rounded-2xl border border-[var(--border-subtle)] shadow-sm p-4 space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">Review Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">User Reviews</p>
              <p className="text-lg font-semibold text-slate-800">N/A</p>
              <p className="text-xs text-slate-400">0 User Reviews</p>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Cleaner Reviews</p>
              <p className="text-lg font-semibold text-slate-800">N/A</p>
              <p className="text-xs text-slate-400">0 Cleaner Reviews</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          No user reviews yet. Be the first to share your experience with this washroom.
        </div>
      </div>
    </div>
  );
}


