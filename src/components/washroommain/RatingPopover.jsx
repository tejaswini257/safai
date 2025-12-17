"use client";

export default function RatingPopover({ rating }) {
    if (!rating) return <span>-</span>;

    return (
        <div className="relative group cursor-pointer inline-block">
            {/* Rating badge */}
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-semibold">
                {rating} Amazing
            </span>

            {/* Hover popup */}
            <div className="absolute left-0 top-8 hidden group-hover:block bg-white shadow-xl p-4 rounded-xl w-56 z-50">
                <p className="text-center text-3xl font-bold text-gray-800">
                    {rating}
                </p>
                <p className="text-center text-gray-500 text-sm">
                    Average Rating
                </p>

                <div className="mt-2 text-xs text-gray-400 text-center">
                    Based on user reviews
                </div>
            </div>
        </div>
    );
}
