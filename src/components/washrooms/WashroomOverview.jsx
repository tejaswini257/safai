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
    <div className="space-y-6 pb-10">
      {/* Top card with image and details */}
      <div className="bg-white rounded-[var(--radius)] shadow-sm border border-[hsl(var(--border))] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-0">
          <div className="relative h-64 md:h-full min-h-[250px] bg-[hsl(var(--muted))]">
            <Image
              src="/image/dashboard img.png"
              alt={washroom.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[hsl(var(--primary-dark))]">
                  {washroom.name}
                </h1>
                <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span>{washroom.subtitle}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[#E0F7FA] px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--primary-dark))] mb-1">
                  Location Hierarchy / Zone
                </div>
                <div className="text-sm font-bold text-[hsl(var(--primary-dark))]">
                  {washroom.zone}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-2 py-2">
                {[
                  { label: "City", value: washroom.city },
                  { label: "State", value: washroom.state },
                  { label: "Pincode", value: washroom.pincode },
                  { label: "Created", value: washroom.createdOn },
                ].map((item) => (
                  <div key={item.label} className="text-xs">
                    <span className="text-[hsl(var(--muted-foreground))] font-bold uppercase tracking-tighter mr-1">{item.label}:</span>
                    <span className="text-[hsl(var(--foreground))] font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleLocate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-white text-[hsl(var(--primary-dark))] text-sm font-bold hover:bg-teal-50 transition-all active:scale-95 shadow-sm"
              >
                <Map className="h-4 w-4" />
                Locate on Map
              </button>

              <Link href={`/dashboard/washrooms/${washroom.id}/edit`}>
                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[hsl(var(--primary))] text-white text-sm font-bold hover:brightness-110 transition-all active:scale-95 shadow-[0_4px_14px_0_rgba(45,183,196,0.3)]">
                  <Pencil className="h-4 w-4" />
                  Edit Details
                </button>
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 bg-white text-rose-600 text-sm font-bold hover:bg-rose-50 transition-all active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities section */}
      <div className="bg-white rounded-[var(--radius)] border border-[hsl(var(--border))] shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-widest text-[hsl(var(--muted-foreground))] flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-[hsl(var(--primary))]" />
          Amenities & Features
        </h2>
        <div className="flex flex-wrap gap-2">
  {washroom.amenities.map((a) => (
    <span
      key={a}
      className="px-3 py-1.5 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] text-xs font-medium border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors"
    >
      {a}
    </span>
  ))}
</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assigned users */}
        <div className="bg-white rounded-[var(--radius)] border border-[hsl(var(--border))] shadow-sm p-6">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
            Assigned Users
          </h2>
          <div className="flex items-center justify-center py-6 border-2 border-dashed border-[hsl(var(--border))] rounded-xl">
            <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] italic">No staff currently assigned to this location.</p>
          </div>
        </div>

        {/* Review statistics */}
        <div className="bg-white rounded-[var(--radius)] border border-[hsl(var(--border))] shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Review Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#F4FBFC] border border-[hsl(var(--primary)/0.1)] p-4">
              <p className="text-[10px] font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter mb-1">User Rating</p>
              <p className="text-2xl font-black text-[hsl(var(--primary-dark))]">N/A</p>
              <p className="text-[10px] font-bold text-[hsl(var(--muted-foreground))]">0 User Reviews</p>
            </div>
            <div className="rounded-xl bg-[#F4FBFC] border border-[hsl(var(--primary)/0.1)] p-4">
              <p className="text-[10px] font-bold text-[hsl(var(--primary-dark))] uppercase tracking-tighter mb-1">Staff Rating</p>
              <p className="text-2xl font-black text-[hsl(var(--primary-dark))]">N/A</p>
              <p className="text-[10px] font-bold text-[hsl(var(--muted-foreground))]">0 Cleaner Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}