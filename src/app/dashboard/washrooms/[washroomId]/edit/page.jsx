"use client";

import Link from "next/link";
import EditWashroomForm from "@/components/washrooms/EditWashroomForm";

export default function EditWashroomPage() {
  return (
    <div className="p-6 space-y-4">
      <Link href="/dashboard/washrooms">
        <button className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-white text-[var(--navy)] text-sm font-medium hover:bg-slate-50">
          ← Back to Washrooms
        </button>
      </Link>
      <EditWashroomForm />
    </div>
  );
}

