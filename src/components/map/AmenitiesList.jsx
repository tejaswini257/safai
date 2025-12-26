"use client";

import {
    Droplets,
    Zap,
    Info,
    Sparkles,
    Trash2,
    Users,
    Wind,
    Fan,
    Navigation,
    Baby,
    Waves
} from "lucide-react";
import {
    MdOutlineDryCleaning, // Fixed casing: C is now capital
    MdOutlineImage // Using Image as an alternative for Mirror
} from "react-icons/md";

/**
 * Mapping amenity strings to Icon components.
 * Standardized primarily on Lucide-React for build stability.
 */
const amenityMap = {
    "Water": Droplets,
    "Toilet": Info,
    "Light": Zap,
    "Basin": Waves, // Replaced MdOutlineWash with Lucide Waves for stability
    "Soap": Sparkles,
    "Dustbin": Trash2,
    "Sanitary Pad Vending Machine": Users,
    "Air Freshener": Wind,
    "Hand Dryer": MdOutlineDryCleaning, // Corrected casing
    "Shower": Droplets,
    "AC": Zap,
    "Sanitizer": Sparkles,
    "Soap Dispenser": Waves,
    "Baby Changing Station": Baby,
    "Mirror": MdOutlineImage,
    "Exhaust Fan": Fan,
    "Urinals": Info,
};

export default function AmenitiesList({ amenities = [] }) {
    return (
        <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Navigation className="w-3 h-3 text-blue-500" />
                Facility Amenities
            </h3>

            <div className="grid grid-cols-2 gap-2">
                {amenities.length > 0 ? (
                    amenities.map((amenity, index) => {
                        const Icon = amenityMap[amenity] || Info;
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg"
                            >
                                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                                    {amenity}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 col-span-2">
                        No amenities listed for this location.
                    </p>
                )}
            </div>
        </section>
    );
}