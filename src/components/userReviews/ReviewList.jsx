import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews, onToggleResolve, onMarkIssue }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div 
          key={review.id} 
          className="bg-[#F4FBFC] rounded-2xl p-6 shadow-sm border border-[#E6F6F7] hover:shadow-md transition-all"
        >
          <ReviewCard
            review={review}
            onToggleResolve={onToggleResolve}
            onMarkIssue={onMarkIssue}
          />
        </div>
      ))}
    </div>
  );
}