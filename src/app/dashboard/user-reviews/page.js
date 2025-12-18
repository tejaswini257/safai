"use client";

import { useState, useMemo } from "react";
import ReviewHeader from "@/components/userReviews/ReviewHeader";
import ReviewList from "@/components/userReviews/ReviewList";
import EmptyState from "@/components/userReviews/EmptyState";

// Mock data
const initialReviews = [
  {
    id: 1,
    userName: "Amit Sharma",
    rating: 5,
    comment: "The washroom was very clean and well maintained.",
    createdAt: "2025-12-07T10:30:00Z",
    status: "none",
  },
  {
    id: 2,
    userName: "Priya Verma",
    rating: 3,
    comment: "Average cleanliness, needs more frequent cleaning.",
    createdAt: "2025-12-06T14:15:00Z",
    status: "pending",
  },
  {
    id: 3,
    userName: "Rajesh Kumar",
    rating: 2,
    comment: "Not clean at all. Needs immediate attention.",
    createdAt: "2025-12-05T09:45:00Z",
    status: "pending",
  },
];

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedRating, setSelectedRating] = useState(null);

  const filteredReviews = useMemo(() => {
    if (!selectedRating) return reviews;
    return reviews.filter((review) => review.rating === selectedRating);
  }, [reviews, selectedRating]);

  const totalReviews = filteredReviews.length;

  const handleToggleResolve = (reviewId) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id !== reviewId) return review;
        if (review.status === "pending") return { ...review, status: "resolved" };
        if (review.status === "resolved") return { ...review, status: "pending" };
        return review;
      })
    );
  };

  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <div className="max-w-5xl py-6 pl-2 pr-4 bg-white min-h-screen">
      <ReviewHeader totalReviews={totalReviews} />

      {/* Rating filter row */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-slate-500">Filter by rating:</span>

        <button
          onClick={() => setSelectedRating(null)}
          className={`px-3 py-1 rounded-full border text-xs transition-colors ${
            selectedRating === null
              ? "bg-[#F4B740] text-white border-[#F4B740]"
              : "bg-white text-[#2F3A45] border-[#D1E0E2] hover:border-[#F4B740]"
          }`}
        >
          All
        </button>

        {ratingOptions.map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={`px-3 py-1 rounded-full border text-xs transition-colors ${
              selectedRating === rating
                ? "bg-[#F4B740] text-white border-[#F4B740]"
                : "bg-white text-[#2F3A45] border-[#D1E0E2] hover:border-[#F4B740]"
            }`}
          >
            {rating}★
          </button>
        ))}
      </div>

      <section className="mt-6">
        {filteredReviews.length > 0 ? (
          <ReviewList 
            reviews={filteredReviews} 
            onToggleResolve={handleToggleResolve}
          />
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}
