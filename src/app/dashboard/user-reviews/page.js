"use client";

import { useState, useMemo } from "react";
import ReviewHeader from "../../../components/userReviews/ReviewHeader";
import ReviewList from "../../../components/userReviews/ReviewList";
import EmptyState from "../../../components/userReviews/EmptyState";

// Mock data for now – later you can replace with API data
// status: "none" | "pending" | "resolved"
const initialReviews = [
  {
    id: 1,
    userName: "Amit Sharma",
    rating: 5,
    comment: "The washroom was very clean and well maintained.",
    createdAt: "2025-12-07T10:30:00Z",
    status: "none", // ✅ good feedback, no action needed
  },
  {
    id: 2,
    userName: "Priya Verma",
    rating: 3,
    comment: "Average cleanliness, needs more frequent cleaning.",
    createdAt: "2025-12-06T14:15:00Z",
    status: "pending", // ✅ already identified as issue
  },
  {
    id: 3,
    userName: "Rajesh Kumar",
    rating: 2,
    comment: "Handwash and tissue were not available.",
    createdAt: "2025-12-05T09:00:00Z",
    status: "pending", // ✅ issue – needs follow-up
  },
];

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedRating, setSelectedRating] = useState(null); // null = all

  const totalReviews = reviews.length;

  const filteredReviews = useMemo(() => {
    if (!selectedRating) return reviews;
    return reviews.filter((r) => r.rating === selectedRating);
  }, [reviews, selectedRating]);

  // 👉 When admin says "this review is an issue"
  const handleMarkIssue = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id && r.status === "none" ? { ...r, status: "pending" } : r
      )
    );
  };

  // 👉 Toggle between pending <-> resolved
  const handleToggleResolve = (id) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (r.status === "pending") return { ...r, status: "resolved" };
        if (r.status === "resolved") return { ...r, status: "pending" };
        return r; // status === "none" -> do nothing
      })
    );
  };

  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <ReviewHeader totalReviews={totalReviews} />

      {/* Rating filter row */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-slate-500">Filter by rating:</span>

        <button
          onClick={() => setSelectedRating(null)}
          className={`px-3 py-1 rounded-full border text-xs ${
            selectedRating === null
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-900 border-slate-300"
          }`}
        >
          All
        </button>

        {ratingOptions.map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={`px-3 py-1 rounded-full border text-xs flex items-center gap-1 ${
              selectedRating === rating
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-900 border-slate-300"
            }`}
          >
            {rating} ★
          </button>
        ))}
      </div>

      {/* Reviews card */}
      <section className="mt-6 bg-white rounded-xl p-6 min-h-[300px] shadow-sm border border-slate-100">
        {filteredReviews.length === 0 ? (
          <EmptyState />
        ) : (
          <ReviewList
            reviews={filteredReviews}
            onToggleResolve={handleToggleResolve}
            onMarkIssue={handleMarkIssue}
          />
        )}
      </section>
    </div>
  );
}
