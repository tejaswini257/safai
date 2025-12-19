"use client";

import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function ActionMenu({ washroomId }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleAction = (action) => {
        setOpen(false);

        if (action === "View Cleaner") {
            router.push(`/dashboard/washrooms/${washroomId}/cleaners`);
        }

        if (action === "View Supervisor") {
            router.push(`/dashboard/washrooms/${washroomId}/supervisors`);
        }

        if (action === "Edit") {
            router.push(`/dashboard/washrooms/${washroomId}/edit`);
        }

        if (action === "Delete") {
            alert("Delete logic here");
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 hover:bg-gray-100 rounded-lg"
            >
                <HiDotsVertical />
            </button>

            {open && (
                <div className="absolute right-0 bg-white shadow-lg rounded-lg w-44 z-50 border">
                    {["View Cleaner", "View Supervisor", "Edit", "Delete"].map(item => (
                        <button
                            key={item}
                            onClick={() => handleAction(item)}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
