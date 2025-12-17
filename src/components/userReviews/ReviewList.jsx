import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews, onToggleResolve, onMarkIssue }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div 
          key={review.id} 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
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